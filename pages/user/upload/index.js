import { useEffect, useState } from 'react';
import Nav from '../../../components/NavBar';
import Footer from '../../../components/Footer';
import { useMoralis } from 'react-moralis';
import { useRouter } from 'next/router';
import React, { useCallback } from 'react';
import { useDropzone } from 'react-dropzone';
import { getProfileFromDB, getTokenForProfile } from '../../../components/MoralisDAO';
import {
  displayUserLoginButton,
  displayProfileButton
} from '../../../components/util/ErrorDisplays';
import { pazariMvpAbi } from '../../../components/util/abiUtil';
import { ethers } from 'ethers';

const FACTORY_ADDRESS = '0xD373d7993AF55DcA04392FD7a5776F9eE7d1fe5b';
const MARKETPLACE_ADDRESS = '0x34D068C19B140F7CB21E8EC3ADdA47011c7bb34f';
const PAZARI_TOKEN_ADDRESS = '0x9D9644A6691df2cc45Ce6717F53DEb7dA78712C2';
// const FACTORY_ADDRESS_LOCAL = '0xf9a92AC8AC2Ad8EB8eF04F134bb51AA4A800E660';
const FACTORY_ADDRESS_LOCAL = '0xa513e6e4b8f2a923d98304ec87f64353c4d5c853';
const MARKETPLACE_ADDRESS_LOCAL = '0x5fc8d32690cc91d4c39d9d3abcbd16989f875707';
const ROUTER_ADDRESS_LOCAL = '0xdc64a140aa3e981100a9beca4e685f962f0cf6c9';
const PAZARI_MVP_ADDRESS_GANACHE = '0x1A98c616f5e2f6E7E6bcf864Ac7D981e692bAd9a';
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

function createNewItem(signer, tokenData, units, price, Moralis) {
  console.log('Uploading new item');
  saveToIpfs(Moralis, tokenData).then((url) => {
    const pazariMVP = new ethers.Contract(PAZARI_MVP_ADDRESS_GANACHE, pazariMvpAbi, signer);

    pazariMVP.connect(signer);
    pazariMVP.newTokenListing(url, units, price);
  });
}

function doUpload(token, signer, tokenData, units, price, Moralis) {
  if (token === '') {
    //Need to upload the contract
    console.log('uploadContract');
    createNewContract(signer, tokenData, units, price, Moralis);
  } else {
    console.log('create new item for token: ' + token);
    createNewItem(signer, tokenData, units, price, Moralis);
  }
}

/*
Process:
1. User clicks 'Create new token' - 
  1.1 Metadata is uploaded to IPFS.
  1.2 PazariToken.newUser/newTokenListing is triggered
  1.3 We listen to the events and save data to our tables (in progress)
  1.4 Front end all updates beautifully
*/
export default function Upload() {
  const [tokenData, setTokenData] = useState({
    name: '',
    description: '',
    cover_image: ''
  });
  const [units, setUnits] = useState(0);
  const [price, setPrice] = useState(0);
  const router = useRouter();

  useEffect(() => {
    if (!isAuthenticated) {
      return <div></div>;
      //   router.push('/');
    }
  });

  const { isAuthenticated, authenticate, user, Moralis } = useMoralis();

  const onDrop = useCallback((acceptedFiles) => {
    console.log(acceptedFiles[0]);

    // acceptedFiles.forEach((file) => {
    //   console.log(file);
    // });
    //{error && console.log(error)}
    //{isUploading && console.log("uploading")}
    //saveFile("batman.jpeg", acceptedFiles[0]);
    //saveFile("batman.jpeg", file, { saveIPFS: true });
  }, []);

  const { getRootProps, getInputProps, isDragActive, fileRejections } = useDropzone({
    onDrop,
    accept: '.jpg, .jpeg, .png .pdf .mp4 .mp3 .webp .webm ' // add more extention
  });

  let profile = getProfileFromDB(user);
  let tokens = getTokenForProfile(user);
  if (!user) {
    return displayUserLoginButton(authenticate);
  }
  if (profile.length == 0) {
    return displayProfileButton();
  }
  profile = profile[0];
  let token = '';
  if (tokens.length !== 0) {
    token = tokens[0].get('tokenAddr');
  }

  const provider = new ethers.providers.Web3Provider(window.ethereum);
  const signer = provider.getSigner();
  return (
    isAuthenticated && (
      <main className="min-h-screen mx-auto dark:bg-gray-900 dark:text-gray-300">
        <Nav />

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

            <div className="flex">
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

            <button
              className="absolute w-24 px-4 py-2 mr-2 text-indigo-400 bg-indigo-500 rounded-lg right-8 hover:bg-indigo-600 dark:text-gray-300"
              onClick={() => doUpload(token, signer, tokenData, units, price, Moralis)}>
              Save
            </button>
          </div>

          <div
            {...getRootProps()}
            className="relative w-1/2 h-64 px-4 py-16 mx-auto my-6 text-center border-2 border-indigo-400 border-dashed rounded-lg dark:bg-gray-700">
            <input {...getInputProps()} />
            {isDragActive ? (
              <p>Drop the files here ...</p>
            ) : (
              <>
                <p>Drag 'n' drop some files here, or click to select files</p>
                <p className="hidden md:block">
                  Allowed extentions : .jpg, .jpeg, .png .pdf .mp4 .mp3 .webp .webm
                </p>
              </>
            )}
          </div>
        </div>

        <p className="py-4 mx-16">
          To enable buy and bang button you need to sell set a price for buy and bang input or leave
          it empty. and it will be removed from marketplace{' '}
        </p>
        {/* </Tab.Panel>
          </Tab.Panels>
        </Tab.Group> */}

        <Footer />
      </main>
    )
  );
}
