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
import Uploader from '../../../components/Uploader';
import { uploadToMoralis } from '../../../components/Uploader';
import { createNewItem } from '../../../components/ContractAccess';
import { ethers } from 'ethers';
import ProductSelector from '../../../components/ProductSelector';

// function doUpload(
//   user,
//   signer,
//   tokenData,
//   units,
//   price,
//   Moralis,
//   productImageFiles,
//   previewImageFile
// ) {
//   uploadToMoralis(productImageFiles, Moralis).then((fileNames) => {
//     if (fileNames.length > 0) {
//       tokenData.productImageUrls = fileNames;
//     }
//     uploadToMoralis(previewImageFile, Moralis).then((previewFileNames) => {
//       if (previewFileNames.length > 0) {
//         tokenData.previewUrl = previewFileNames[0];
//       }
//       createNewItem(user, signer, tokenData, units, price, Moralis);
//     });
//   });
// }

// function getSubcategories(tokenData, setTokenData) {
//   let categoriesObj = getCategoriesFromDB(tokenData.type);
//   let subCategories = [];
//   let options = [];
//   options.push(
//     <option key="defaultCat" disabled value="">
//       Subcategories:
//     </option>
//   );
//   if (categoriesObj && categoriesObj.length !== 0) {
//     subCategories = categoriesObj[0].get('subCategories')[0];
//     subCategories.forEach((cat) =>
//       options.push(
//         <option key={'sub' + cat} value={cat}>
//           {cat}
//         </option>
//       )
//     );
//   }

//   return (
//     <select
//       className="w-2/5 px-4 py-1 border rounded-lg dark:border-indigo-400 dark:bg-gray-700 dark:text-gray-400"
//       id="typeSelector"
//       name="typeSelector"
//       value={tokenData.subCategory}
//       onChange={(event) =>
//         setTokenData({
//           ...tokenData,
//           subCategory: event.target.value
//         })
//       }>
//       {options}
//     </select>
//   );
// }

/*
Process:
1. User clicks 'Create new token' - 
  1.1 Metadata is uploaded to IPFS.
  1.2 PazariToken.newUser/newTokenListing is triggered
  1.3 We listen to the events and save data to our tables (in progress)
  1.4 Front end all updates beautifully
*/
// function UploadForm(props) {
//   const [tokenData, setTokenData] = useState({
//     name: '',
//     description: '',
//     type: '',
//     subCategory: '',
//     previewUrl: '',
//     productImageUrls: []
//   });
//   const [units, setUnits] = useState(0);
//   const [price, setPrice] = useState(0);
//   const [productFiles, setProductFiles] = useState([]);
//   const [previewFiles, setPreviewFiles] = useState([]);
//   let user = props.user;
//   let Moralis = props.Moralis;

//   let subCategories = getSubcategories(tokenData, setTokenData);
//   console.log(tokenData);

//   const provider = new ethers.providers.Web3Provider(window.ethereum);
//   const signer = provider.getSigner();
//   return (
//     <main className="mx-auto dark:bg-gray-900 dark:text-gray-300">
//       <div className="flex justify-center py-2">
//         <div className="flex items-center px-1">
//         <div className="text-lg font-bold text-center text-indigo-500">
//           Step VI: Please fill product details
//         </div>
//         </div>
//       </div>
//       <div className="flex items-start mx-12 justify-evenly">
//         <div className="w-1/2 px-4 mx-auto ">
//           <p>Project Name</p>
//           <input
//             type="text"
//             className="w-full px-4 py-1 border rounded-lg dark:bg-gray-700 dark:text-gray-400 dark:border-indigo-400 "
//             value={tokenData.name}
//             onChange={(event) =>
//               setTokenData({
//                 ...tokenData,
//                 name: event.target.value
//               })
//             }
//           />
//           <p>Project description</p>
//           <textarea
//             className="w-full px-4 py-2 my-2 border rounded-lg dark:border-indigo-400 h-44 dark:bg-gray-700 dark:text-gray-400"
//             value={tokenData.description}
//             onChange={(event) =>
//               setTokenData({
//                 ...tokenData,
//                 description: event.target.value
//               })
//             }
//           />
//           <div className="flex py-2">
//             <p className="px-2">Units sold from 1 to N</p>
//             <input
//               type="text"
//               value={units}
//               onChange={(event) => setUnits(event.target.value)}
//               placeholder="3"
//               className="w-1/5 px-4 py-1 border rounded-lg dark:border-indigo-400 dark:bg-gray-700 dark:text-gray-400"
//             />
//             <p className="px-2">Price in USD 0 for free</p>
//             <input
//               placeholder="100"
//               type="text"
//               value={price}
//               onChange={(event) => setPrice(event.target.value)}
//               className="w-1/5 px-4 py-1 border rounded-lg dark:border-indigo-400 dark:bg-gray-700 dark:text-gray-400"
//             />
//           </div>
//           {/* <div className="flex py-2">
//             <p className="px-4">Item type</p>
//             <select
//               className="w-1/5 px-4 py-1 border rounded-lg dark:border-indigo-400 dark:bg-gray-700 dark:text-gray-400"
//               id="typeSelector"
//               name="typeSelector"
//               value={tokenData.type}
//               onChange={(event) =>
//                 setTokenData({
//                   ...tokenData,
//                   type: event.target.value,
//                   subCategory: ''
//                 })
//               }>
//               <option key="default" disabled value="">
//                 Types:{' '}
//               </option>
//               <option key="book" value="book">
//                 Ebook
//               </option>
//               <option key="photo" value="photo">
//                 Photo
//               </option>
//               <option key="video" value="video">
//                 Video
//               </option>
//               <option key="audio" value="audio">
//                 Audio
//               </option>
//               <option key="game" value="game">
//                 Game
//               </option>
//               <option key="graphic" value="graphic">
//                 Graphic
//               </option>
//             </select>
//             <p className="px-4">Subcategory</p>
//             {subCategories}
//           </div> */}
//           {/* Preview photo
//           <div className="w-full px-4 py-1 border rounded-lg dark:bg-gray-700 dark:text-gray-400 dark:border-indigo-400">
//             <Uploader
//               Moralis={props.Moralis}
//               allowMultiple={false}
//               files={previewFiles}
//               setFiles={setPreviewFiles}
//             />
//           </div> */}
//           Product images, these will not be watermarked
//           <div className="w-full px-4 py-1 border rounded-lg dark:bg-gray-700 dark:text-gray-400 dark:border-indigo-400">
//             <Uploader
//               Moralis={props.Moralis}
//               allowMultiple={true}
//               files={productFiles}
//               setFiles={setProductFiles}
//             />
//           </div>
//           <button
//             className="w-24 px-4 py-2 my-4 mr-2 text-indigo-400 bg-indigo-500 rounded-lg right-8 hover:bg-indigo-600 dark:text-gray-300"
//             onClick={() =>
//               doUpload(user, signer, tokenData, units, price, Moralis, productFiles, previewFiles)
//             }>
//             Save
//           </button>
//         </div>
//       </div>
//     </main>
//   );
// }

function AuthenticatedProfile(props) {
  let Moralis = props.Moralis;
  let user = props.user;

  let profile = getProfileFromDB(user);

  // loading
  if (!profile.loaded) return <></>; //
  // handle error
  if (profile.error) return <>Error loading profile</>;
  // profile loaded and has the data can use profile.data
  if (profile.loaded && profile.data) return <ProductSelector user={user} Moralis={Moralis} />; //<UploadForm user={user} Moralis={Moralis} />;
  // profile is loaded but has no data
  if (profile.loaded && !profile.data) return <ZeroProfile user={user} Moralis={Moralis} />;
}

export default function Upload() {
  const { isAuthenticated, authenticate, user, Moralis } = useMoralis();

  if (!user) {
    return displayUserLoginButton(authenticate);
  }

  return isAuthenticated && <AuthenticatedProfile user={user} Moralis={Moralis} />;
}
