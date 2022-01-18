import { ethers } from 'ethers';
import { pazariMvpAbi, marketplaceAbi } from '../contracts/abi';

// const FACTORY_ADDRESS = '0xD373d7993AF55DcA04392FD7a5776F9eE7d1fe5b';
// const MARKETPLACE_ADDRESS = '0x34D068C19B140F7CB21E8EC3ADdA47011c7bb34f';
// const PAZARI_TOKEN_ADDRESS = '0x9D9644A6691df2cc45Ce6717F53DEb7dA78712C2';

const PAZARI_MVP_ADDRESS_GANACHE = '0xE1b80aDA46Bca26DBE8B939a7E0939A51a38c0ac';
const MARKETPLACE_ADDRESS_GANACHE = '0x8550e33355d2d975d9C60e6f669F63882E67b92A';
// const STABLECOIN_LOCAL = '0x0F41b1FE36A98518081dFd1508417d586965b3Ff';


export function createNewItem(user, signer, tokenData, units, price, Moralis) {
  console.log('Uploading new item');
  saveToIpfs(Moralis, tokenData).then((url) => {
    const pazariMVP = new ethers.Contract(PAZARI_MVP_ADDRESS_GANACHE, pazariMvpAbi, signer);
    pazariMVP.connect(signer);
    pazariMVP.newTokenListing(url, units, price);
  });
}

//When this gets called, funds go from buyer acct -> marketplace -> router -> seller
export function buyItem(itemID, amount) {
    console.log('buying item');
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