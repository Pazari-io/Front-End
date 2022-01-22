import { ethers } from 'ethers';
import { etherToWei } from '../components/EtherUtils';
import { pazariMvpAbi, marketplaceAbi, stablecoinAbi } from '../contracts/abi';

// const FACTORY_ADDRESS = '0xD373d7993AF55DcA04392FD7a5776F9eE7d1fe5b';
// const MARKETPLACE_ADDRESS = '0x34D068C19B140F7CB21E8EC3ADdA47011c7bb34f';
// const PAZARI_TOKEN_ADDRESS = '0x9D9644A6691df2cc45Ce6717F53DEb7dA78712C2';

//Local
const PAZARI_MVP_ADDRESS = '0xE1b80aDA46Bca26DBE8B939a7E0939A51a38c0ac';
const MARKETPLACE_ADDRESS = '0x8550e33355d2d975d9C60e6f669F63882E67b92A';
const STABLECOIN_ADDRESS = '0x0F41b1FE36A98518081dFd1508417d586965b3Ff';

// Testnet
// const PAZARI_MVP_ADDRESS = '0xCDeEA13D2d2eAb6ca644103D04927aE72D65d1AB';
// const MARKETPLACE_ADDRESS = '0x1cBb576102d02D6F599baa968c7b6E0835D5714a';
// const STABLECOIN_ADDRESS = '0x3D5AE180Db22bB319a137a46089fdE639fEc7e64';


export function createNewItem(user, signer, tokenData, units, price, Moralis) {
  console.log('Uploading new item');
  saveToIpfs(Moralis, tokenData).then((url) => {
    let wei = etherToWei(price);
    const pazariMVP = new ethers.Contract(PAZARI_MVP_ADDRESS, pazariMvpAbi, signer);
    pazariMVP.connect(signer);
    pazariMVP.newTokenListing(url, units, wei);
  });
}

//When this gets called, funds go from buyer acct -> marketplace -> router -> seller
export function buyItem(itemID, wei, quantity) {
  const provider = new ethers.providers.Web3Provider(window.ethereum);
  const signer = provider.getSigner();

  const stablecoin = new ethers.Contract(STABLECOIN_ADDRESS, stablecoinAbi, signer);
  stablecoin.connect(signer);
  stablecoin.approve(MARKETPLACE_ADDRESS, wei.toString()).then((tx) => {
    console.log('calling marketplace');
    const marketplace = new ethers.Contract(MARKETPLACE_ADDRESS, marketplaceAbi, signer);
    marketplace.connect(signer);
    console.log(itemID + ',' + quantity);
    marketplace.buyMarketItem(itemID, quantity);
  });

}


async function saveToIpfs(Moralis, data) {
  let dataFile = { base64: btoa(JSON.stringify(data)) };
  const file = new Moralis.File('data.json', dataFile);
  await file.saveIPFS();
  return file.ipfs();
}