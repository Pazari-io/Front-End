import { useEffect } from 'react';
import Nav from '../../components/NavBar';
import Footer from '../../components/Footer';
import { useMoralis, useMoralisFile } from 'react-moralis';
// import { Moralis } from 'Moralis';
import { useRouter } from 'next/router';
import React, { useCallback } from 'react';
import { useDropzone } from 'react-dropzone';
import { Tab } from '@headlessui/react';
import { Fragment } from 'react/cjs/react.production.min';
import Pagination from '../../components/Pagination';
import Link from 'next/link';
import { getProfileFromDB, getProductForProfileNoMarketplace } from '../../components/MoralisDAO';
import { displayUserLoginButton, displayProfileButton } from '../../components/util/ErrorDisplays';
import { ethers } from 'ethers';

/*
1. User clicks 'Create new token' - FactoryPazariTokenMVP.newPazariTokenMVP is triggered and we save the address of new contract
2. User clicks 'Create new item' - PazariTokenMVP.createNewToken is triggered with the new contract address
3. User clicks 'Upload to marketplace' - Marketplace.createMarketItem is triggered
//This process is obviously way too complicated, so waiting for wrapper contract we can use
*/
const FACTORY_ADDRESS = '0xD373d7993AF55DcA04392FD7a5776F9eE7d1fe5b';
const FACTORY_ADDRESS_LOCAL = '0xf9a92AC8AC2Ad8EB8eF04F134bb51AA4A800E660';
const MARKETPLACE_ADDRESS = '0x34D068C19B140F7CB21E8EC3ADdA47011c7bb34f';
const PAZARI_TOKEN_ADDRESS = '0x9D9644A6691df2cc45Ce6717F53DEb7dA78712C2';
const FACTORY_ABI = [
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: 'address',
        name: 'tokenAddr',
        type: 'address'
      },
      {
        indexed: false,
        internalType: 'address',
        name: 'sender',
        type: 'address'
      }
    ],
    name: 'PazariTokenCreated',
    type: 'event'
  },
  {
    inputs: [
      {
        internalType: 'address[]',
        name: '_contractOwners',
        type: 'address[]'
      }
    ],
    name: 'newPazariTokenMVP',
    outputs: [
      {
        internalType: 'address',
        name: 'newContract',
        type: 'address'
      }
    ],
    stateMutability: 'nonpayable',
    type: 'function'
  }
];
function createNewContract(user, signer) {
  console.log('Uploading ebook');
  console.log(user.get('ethAddress'));
  const factoryPazariTokenMVP = new ethers.Contract(FACTORY_ADDRESS_LOCAL, FACTORY_ABI, signer);

  factoryPazariTokenMVP.connect(signer);
  factoryPazariTokenMVP.newPazariTokenMVP([user.get('ethAddress')]);
  //TODO update contractAddr in profile after creating new contract.
  // Or else reference the TokenCreated contract
}

function uploadEbook(user, signer) {
  console.log('Uploading ebook');
  console.log(user.get('ethAddress'));
  // const provider = new ethers.providers.Web3Provider(window.ethereum);
  // const signer = provider.getSigner();
  const factoryPazariTokenMVP = new ethers.Contract(FACTORY_ADDRESS_LOCAL, FACTORY_ABI, signer);
  // const Marketplace = new ether
  factoryPazariTokenMVP.connect(signer);
  factoryPazariTokenMVP.newPazariTokenMVP([user.get('ethAddress')]);
}

function doUpload(profile, user, signer) {
  if (!profile.get('contractAddr') || profile.get('contractAddr') === '') {
    //Need to upload the contract
    console.log('uploadContract');
    createNewContract(user, signer);
  } else {
    console.log('create that item');
  }
}

export default function Upload() {
  const { error, isUploading, moralisFile, saveFile } = useMoralisFile();

  const router = useRouter();

  useEffect(() => {
    if (!isAuthenticated) {
      return <div></div>;
      //   router.push('/');
    }
  });

  const { isAuthenticated, authenticate, user } = useMoralis();

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
  if (!user) {
    return displayUserLoginButton(authenticate);
  }
  if (profile.length == 0) {
    return displayProfileButton();
  }
  profile = profile[0];

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
            />
            <p>Project description</p>

            <textarea className="w-full px-4 py-2 my-2 border rounded-lg dark:border-indigo-400 h-44 dark:bg-gray-700 dark:text-gray-400" />

            <div className="flex">
              <p>Units sold from 1 to N</p>
              <input
                type="text"
                placeholder="3"
                className="w-1/5 px-4 py-1 border rounded-lg dark:border-indigo-400 dark:bg-gray-700 dark:text-gray-400"
              />
              <p className="px-2">Price in USD 0 for free</p>
              <input
                placeholder="100"
                type="text"
                className="w-1/5 px-4 py-1 border rounded-lg dark:border-indigo-400 dark:bg-gray-700 dark:text-gray-400"
              />

              <p className="px-2">Buy and Bang price in USD</p>
              <input
                placeholder="10000"
                type="text"
                className="w-1/5 px-4 py-1 border rounded-lg dark:border-indigo-400 dark:bg-gray-700 dark:text-gray-400"
              />
            </div>

            <button
              className="absolute w-24 px-4 py-2 mr-2 text-indigo-400 bg-indigo-500 rounded-lg right-8 hover:bg-indigo-600 dark:text-gray-300"
              onClick={() => doUpload(profile, user, signer)}>
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
