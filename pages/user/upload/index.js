import { useEffect, useState } from 'react';
import Nav from '../../../components/NavBar';
import Footer from '../../../components/Footer';
import { useMoralis } from 'react-moralis';
import { useRouter } from 'next/router';
import React, { useCallback } from 'react';
import { useDropzone } from 'react-dropzone';
import {
  getProfileFromDB,
  getTokenForProfile,
  getCategoriesFromDB
} from '../../../components/MoralisDAO';
import ZeroProfile from '../../../components/ZeroProfile';
import { displayUserLoginButton, displayProfileButton } from '../../../components/UserLoader';
import { pazariMvpAbi, FACTORY_ABI } from '../../../contracts/abi';
import { ethers } from 'ethers';

const FACTORY_ADDRESS = '0xD373d7993AF55DcA04392FD7a5776F9eE7d1fe5b';
const MARKETPLACE_ADDRESS = '0x34D068C19B140F7CB21E8EC3ADdA47011c7bb34f';
const PAZARI_TOKEN_ADDRESS = '0x9D9644A6691df2cc45Ce6717F53DEb7dA78712C2';
// const FACTORY_ADDRESS_LOCAL = '0xf9a92AC8AC2Ad8EB8eF04F134bb51AA4A800E660';
const FACTORY_ADDRESS_LOCAL = '0xCF3E28A7352Ae6bF1aaA3E02698370fd88FEd311';
const MARKETPLACE_ADDRESS_LOCAL = '0x5fc8d32690cc91d4c39d9d3abcbd16989f875707';
const ROUTER_ADDRESS_LOCAL = '0xdc64a140aa3e981100a9beca4e685f962f0cf6c9';
// const PAZARI_MVP_ADDRESS_GANACHE = '0x634E2bA437D792Ea4D0A1Fd751AF7117112E8618';
const PAZARI_MVP_ADDRESS_GANACHE = '0xE1b80aDA46Bca26DBE8B939a7E0939A51a38c0ac';
// const PAZARI_MVP_ADDRESS_HARDHAT = '0x2279b7a0a67db372996a5fab50d91eaa73d2ebe6';

function createNewContract(signer, tokenData, units, price, Moralis) {
  saveToIpfs(Moralis, tokenData).then((url) => {
    const pazariMVP = new ethers.Contract(PAZARI_MVP_ADDRESS_GANACHE, pazariMvpAbi, signer);

    pazariMVP.connect(signer);
    pazariMVP.newUser(url, units, price);
  });
}

async function saveToIpfs(Moralis, data) {
  let dataFile = { base64: btoa(JSON.stringify(data)) };
  const file = new Moralis.File('data.json', dataFile);
  await file.saveIPFS();
  return file.ipfs();
}

function createNewItem(user, signer, tokenData, units, price, Moralis) {
  console.log('Uploading new item');
  saveToIpfs(Moralis, tokenData).then((url) => {
    const pazariMVP = new ethers.Contract(PAZARI_MVP_ADDRESS_GANACHE, pazariMvpAbi, signer);
    pazariMVP.connect(signer);
    pazariMVP.newTokenListing(url, units, price);
  });
}

function doUpload(user, signer, tokenData, units, price, Moralis) {
  // if (token === '') {
  //   //Need to upload the contract
  //   console.log('uploadContract');
  //   createNewContract(signer, tokenData, units, price, Moralis);
  // } else {
    // console.log('create new item for token: ' + token);
    createNewItem(user, signer, tokenData, units, price, Moralis);
  // }
}

function getSubcategories(tokenData, setTokenData) {
  let categoriesObj = getCategoriesFromDB(tokenData.type);
  let subCategories = [];
  let options = [];
  options.push(
    <option key="defaultCat" disabled value="">
      Subcategories:
    </option>
  );
  if (categoriesObj && categoriesObj.length !== 0) {
    subCategories = categoriesObj[0].get('subCategories')[0];
    subCategories.forEach((cat) =>
      options.push(
        <option key={'sub' + cat} value={cat}>
          {cat}
        </option>
      )
    );
  }

  return (
    <select
      className="w-2/5 px-4 py-1 border rounded-lg dark:border-indigo-400 dark:bg-gray-700 dark:text-gray-400"
      id="typeSelector"
      name="typeSelector"
      value={tokenData.subCategory}
      onChange={(event) =>
        setTokenData({
          ...tokenData,
          subCategory: event.target.value
        })
      }>
      {options}
    </select>
  );
}

/*
Process:
1. User clicks 'Create new token' - 
  1.1 Metadata is uploaded to IPFS.
  1.2 PazariToken.newUser/newTokenListing is triggered
  1.3 We listen to the events and save data to our tables (in progress)
  1.4 Front end all updates beautifully
*/
function UploadForm(props) {
  const [tokenData, setTokenData] = useState({
    name: '',
    description: '',
    type: '',
    subCategory: '',
    cover_image: ''
  });
  const [units, setUnits] = useState(0);
  const [price, setPrice] = useState(0);
  let user = props.user;
  let Moralis = props.Moralis;


  let subCategories = getSubcategories(tokenData, setTokenData);

  const provider = new ethers.providers.Web3Provider(window.ethereum);
  const signer = provider.getSigner();
  return (
    (
      <main className="mx-auto dark:bg-gray-900 dark:text-gray-300">

        <div className="flex justify-center py-2">
          <div className="flex items-center px-1">
            <p>Upload Items</p>
          </div>
        </div>
        <div className="flex items-start mx-12 justify-evenly">
          <div className="w-1/2 px-4 mx-auto ">
            <p>Project Name</p>
            <input
              type="text"
              className="w-full px-4 py-1 border rounded-lg dark:bg-gray-700 dark:text-gray-400 dark:border-indigo-400 "
              value={tokenData.name}
              onChange={(event) =>
                setTokenData({
                  ...tokenData,
                  name: event.target.value
                })
              }
            />
            <p>Project description</p>

            <textarea
              className="w-full px-4 py-2 my-2 border rounded-lg dark:border-indigo-400 h-44 dark:bg-gray-700 dark:text-gray-400"
              value={tokenData.description}
              onChange={(event) =>
                setTokenData({
                  ...tokenData,
                  description: event.target.value
                })
              }
            />

            <div className="flex py-2">
              <p className="px-2">Units sold from 1 to N</p>
              <input
                type="text"
                value={units}
                onChange={(event) => setUnits(event.target.value)}
                placeholder="3"
                className="w-1/5 px-4 py-1 border rounded-lg dark:border-indigo-400 dark:bg-gray-700 dark:text-gray-400"
              />
              <p className="px-2">Price in USD 0 for free</p>
              <input
                placeholder="100"
                type="text"
                value={price}
                onChange={(event) => setPrice(event.target.value)}
                className="w-1/5 px-4 py-1 border rounded-lg dark:border-indigo-400 dark:bg-gray-700 dark:text-gray-400"
              />
            </div>
            <div className="flex py-2">
              <p className="px-4">Item type</p>
              <select
                className="w-1/5 px-4 py-1 border rounded-lg dark:border-indigo-400 dark:bg-gray-700 dark:text-gray-400"
                id="typeSelector"
                name="typeSelector"
                value={tokenData.type}
                onChange={(event) =>
                  setTokenData({
                    ...tokenData,
                    type: event.target.value,
                    subCategory: ''
                  })
                }>
                <option key="default" disabled value="">
                  Types:{' '}
                </option>
                <option key="book" value="book">
                  Ebook
                </option>
                <option key="photo" value="photo">
                  Photo
                </option>
                <option key="video" value="video">
                  Video
                </option>
                <option key="audio" value="audio">
                  Audio
                </option>
                <option key="game" value="game">
                  Game
                </option>
                <option key="graphic" value="graphic">
                  Graphic
                </option>
              </select>
              <p className="px-4">Subcategory</p>
              {subCategories}
            </div>

            <button
              className="absolute w-24 px-4 py-2 mr-2 text-indigo-400 bg-indigo-500 rounded-lg right-8 hover:bg-indigo-600 dark:text-gray-300"
              onClick={() => doUpload(user, signer, tokenData, units, price, Moralis)}>
              Save
            </button>
          </div>

          <div className="relative w-1/2 h-64 px-4 py-16 mx-auto my-6 text-center border-2 border-indigo-400 border-dashed rounded-lg dark:bg-gray-700">
            aha
          </div>
        </div>

        {/* </Tab.Panel>
          </Tab.Panels>
        </Tab.Group> */}

      </main>
    )
  );
}
  function AuthenticatedProfile(props) {
    let Moralis = props.Moralis;
    let user = props.user;
  
    let profile = getProfileFromDB(user, Moralis);
    return <></>
  
    // // loading
    // if (!profile.loaded) return <>Loading...</>;
    // // handle error
    // if (profile.error) return <>Error loading profile</>;
    // // profile loaded and has the data can use profile.data
    // if (profile.loaded && profile.data)
    //   return <UploadForm user={user} Moralis={Moralis} />;
    // // profile is loaded but has no data
    // if (profile.loaded && !profile.data) return <ZeroProfile user={user} Moralis={Moralis} />;
  }
  
  export default function Upload() {
    const { isAuthenticated, authenticate, user, Moralis } = useMoralis();
  
    if (!user) {
      return displayUserLoginButton(authenticate);
    }
  
    return isAuthenticated && <AuthenticatedProfile user={user} Moralis={Moralis} />;
  }
