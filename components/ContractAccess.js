import { ethers, BigNumber } from 'ethers';
import { etherToWei } from '../components/EtherUtils';
import { pazariMvpAbi, marketplaceAbi, stablecoinAbi } from '../contracts/abi';

const PAZARI_MVP_ADDRESS = process.env.NEXT_PUBLIC_PAZARI_MVP_ADDRESS || '';
const MARKETPLACE_ADDRESS = process.env.NEXT_PUBLIC_MARKETPLACE_ADDRESS || '';
const STABLECOIN_ADDRESS = process.env.NEXT_PUBLIC_STABLECOIN_ADDRESS || '';

export async function createNewItem(user, signer, tokenData, units, price, Moralis) {
  console.log('Uploading new item');

  try {
    const url = await saveToIpfs(Moralis, tokenData);
    const wei = etherToWei(price);
    const pazariMVP = new ethers.Contract(PAZARI_MVP_ADDRESS, pazariMvpAbi, signer);
    const tx = await pazariMVP.newTokenListing(url, units, wei);
    const { transactionHash } = await tx.wait();
  } catch (error) {
    throw error;
  }
}

//When this gets called, funds go from buyer acct -> marketplace -> router -> seller
export async function buyItem(itemID, wei, quantity) {
  const provider = new ethers.providers.Web3Provider(window.ethereum);
  const signer = provider.getSigner();

  const stablecoin = new ethers.Contract(STABLECOIN_ADDRESS, stablecoinAbi, signer);
  const marketplace = new ethers.Contract(MARKETPLACE_ADDRESS, marketplaceAbi, signer);

  const allowance = await stablecoin.allowance(await signer.getAddress(), MARKETPLACE_ADDRESS);
  const totalPrice = BigNumber.from(wei.toString()).mul(quantity);
  if (allowance.lt(totalPrice)) {
    console.log('approving token transfer');
    const approveTx = await stablecoin.approve(MARKETPLACE_ADDRESS, ethers.constants.MaxUint256);
    const { transactionHash } = await approveTx.wait();
    console.log(transactionHash);
  }

  console.log('calling marketplace');
  console.log(itemID + ',' + quantity);
  const buyTx = await marketplace.buyMarketItem(itemID, quantity);
  const { transactionHash } = await buyTx.wait();
  console.log(transactionHash);
}

async function saveToIpfs(Moralis, data) {
  let dataFile = { base64: btoa(JSON.stringify(data)) };
  const file = new Moralis.File('data.json', dataFile);
  await file.saveIPFS();
  return file.ipfs();
}
