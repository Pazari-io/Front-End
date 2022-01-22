import { ethers } from 'ethers';
import { pazariMvpAbi, marketplaceAbi, stablecoinAbi } from '../contracts/abi';

// const FACTORY_ADDRESS = '0xD373d7993AF55DcA04392FD7a5776F9eE7d1fe5b';
// const MARKETPLACE_ADDRESS = '0x34D068C19B140F7CB21E8EC3ADdA47011c7bb34f';
// const PAZARI_TOKEN_ADDRESS = '0x9D9644A6691df2cc45Ce6717F53DEb7dA78712C2';

// const PAZARI_MVP_ADDRESS_GANACHE = '0xE1b80aDA46Bca26DBE8B939a7E0939A51a38c0ac';
// const MARKETPLACE_ADDRESS_GANACHE = '0x8550e33355d2d975d9C60e6f669F63882E67b92A';
const PAZARI_MVP_ADDRESS_GANACHE = '0xCDeEA13D2d2eAb6ca644103D04927aE72D65d1AB';
const MARKETPLACE_ADDRESS_GANACHE = '0x1cBb576102d02D6F599baa968c7b6E0835D5714a';
const STABLECOIN_TESTNET = '0x3D5AE180Db22bB319a137a46089fdE639fEc7e64';

export function createNewItem(user, signer, tokenData, units, price, Moralis) {
  console.log('Uploading new item');
  saveToIpfs(Moralis, tokenData).then((url) => {
    const pazariMVP = new ethers.Contract(PAZARI_MVP_ADDRESS_GANACHE, pazariMvpAbi, signer);
    pazariMVP.connect(signer);
    pazariMVP.newTokenListing(url, units, price);
  });
}

//When this gets called, funds go from buyer acct -> marketplace -> router -> seller
export async function buyItem(itemID, amount) {
  console.log('buying item');
  const provider = new ethers.providers.Web3Provider(window.ethereum);
  const signer = provider.getSigner();

  const stablecoin = new ethers.Contract(STABLECOIN_TESTNET, stablecoinAbi, signer);
  const allowance = await stablecoin.allowance(await signer.getAddress(), MARKETPLACE_ADDRESS_GANACHE);
  if (allowance.lt(ethers.constants.MaxUint256)) {
    console.log('approving token transfer')
    const approveTx = await stablecoin.approve(
      MARKETPLACE_ADDRESS_GANACHE,
      ethers.constants.MaxUint256
    );
    const { transactionHash } = await approveTx.wait();
    console.log(transactionHash);
  }

  console.log('calling marketplace');
  const marketplace = new ethers.Contract(MARKETPLACE_ADDRESS_GANACHE, marketplaceAbi, signer);
  console.log(itemID + ',' + amount);
  const buyTx = await marketplace.buyMarketItem(itemID, amount);
  const { transactionHash } = await buyTx.wait();
  console.log(transactionHash);
}

export function approveMarketplace(amount) {
  const provider = new ethers.providers.Web3Provider(window.ethereum);
  const signer = provider.getSigner();
  const marketplace = new ethers.Contract(MARKETPLACE_ADDRESS_GANACHE, marketplaceAbi, signer);
  marketplace.connect(signer);
  console.log(itemID + ',' + amount);
  marketplace.buyMarketItem(itemID, amount);
}

async function saveToIpfs(Moralis, data) {
  let dataFile = { base64: btoa(JSON.stringify(data)) };
  const file = new Moralis.File('data.json', dataFile);
  await file.saveIPFS();
  return file.ipfs();
}
