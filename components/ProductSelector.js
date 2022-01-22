import Image from 'next/image';
import Audios from '../public/images/Audios.png';
import Books from '../public/images/Books.png';
import Games from '../public/images/Games.png';
import Photos from '../public/images/Photos.png';
import Videos from '../public/images/Videos.png';
import Graphics from '../public/images/Graphics.png';
import { useState, useEffect } from 'react';
import Uploader from './Uploader';
import React from 'react';
import { getCategoriesFromDB } from '../components/MoralisDAO';
import { uploadToMoralis } from './Uploader';
import { createNewItem } from '../components/ContractAccess';
import { ethers } from 'ethers';

function doUpload(user, signer, tokenData, units, price, Moralis, productImageFiles) {
  uploadToMoralis(productImageFiles, Moralis).then((fileNames) => {
    if (fileNames.length > 0) {
      tokenData.productImageUrls = fileNames;
      tokenData.previewUrl = fileNames[fileNames.length-1];
    }
    createNewItem(user, signer, tokenData, units, price, Moralis);
  });
}

/*
Process:
1. User clicks 'Create new token' - 
  1.1 Metadata is uploaded to IPFS.
  1.2 PazariToken.newUser/newTokenListing is triggered
  1.3 We listen to the events and save data to our tables (in progress)
  1.4 Front end all updates beautifully
*/
function ShowUpload(props) {
  const user = props.user;
  const Moralis = props.Moralis;
  const [tokenData, setTokenData] = useState({
    name: '',
    description: '',
    type: props.category,
    subCategory: props.subCategory,
    previewUrl: props.previewURL,
    productImageUrls: []
  });
  const [units, setUnits] = useState(0);
  const [price, setPrice] = useState(0);
  const [productImages, setProductImages] = useState([]);

  const provider = new ethers.providers.Web3Provider(window.ethereum);
  const signer = provider.getSigner();
  return (
    <main className="mx-auto dark:bg-gray-900 dark:text-gray-300">
      <div className="flex justify-center py-2">
        <div className="flex items-center px-1">
          <div className="text-lg font-bold text-center text-indigo-500">
            Step VI: Please fill product details
          </div>
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
          Product images, these will not be watermarked.  First image will be the preview image.
          <div className="w-full px-4 py-1 border rounded-lg dark:bg-gray-700 dark:text-gray-400 dark:border-indigo-400">
            <Uploader
              Moralis={props.Moralis}
              allowMultiple={true}
              files={productImages}
              setFiles={setProductImages}
            />
          </div>
          <button
            className="w-24 px-4 py-2 my-4 mr-2 text-indigo-400 bg-indigo-500 rounded-lg right-8 hover:bg-indigo-600 dark:text-gray-300"
            onClick={() => doUpload(user, signer, tokenData, units, price, Moralis, productImages)}>
            Save
          </button>
        </div>
      </div>
    </main>
  );
}

function ShowPreview(props) {
  let audio = ['.mp3', '.wav'];
  let video = ['.mp4', '.mpg', '.mpeg', '.avi', '.mkv', '.webm', '.m4v', '.mov', '.wmv'];
  let book = ['.pdf'];
  let photo = ['.jpg', '.png', '.jpeg', '.psd', '.gif', '.bmp', '.tiff', '.webp', '.heic', '.svg'];
  let rest = ['.zip', '.7z'];

  if (audio.includes(props.type))
    return (
      <>
        <div className="text-lg font-bold text-center text-indigo-500">
          Step V : check your product
        </div>

        <div className="flex justify-center">
          <audio controls="controls" src={props.url} className="w-1/3 rounded-lg " />
        </div>

        <div className="flex justify-center mt-2">
          <button
            onClick={() => props.setStep(6)}
            className="px-4 py-4 text-sm font-semibold leading-6 text-center text-white transition duration-150 ease-in-out bg-indigo-500 rounded-md shadow justify centeritems-center hover:bg-indigo-400">
            Proceed to upload
          </button>
        </div>
      </>
    );

  if (video.includes(props.type))
    return (
      <>
        <div className="flex justify-center">
          <video controls="controls" src={props.url} className="w-1/3 rounded-lg " />;{' '}
        </div>

        <div className="flex justify-center mt-2">
          <button
            onClick={() => props.setStep(6)}
            className="px-4 py-4 text-sm font-semibold leading-6 text-center text-white transition duration-150 ease-in-out bg-indigo-500 rounded-md shadow justify centeritems-center hover:bg-indigo-400">
            Proceed to upload
          </button>
        </div>
      </>
    );

  if (photo.includes(props.type))
    return (
      <>
        <div className="flex justify-center">
          <img src={props.url} className="w-1/3 rounded-lg " />;{' '}
        </div>

        <div className="flex justify-center mt-2">
          <button
            onClick={() => props.setStep(6)}
            className="px-4 py-4 text-sm font-semibold leading-6 text-center text-white transition duration-150 ease-in-out bg-indigo-500 rounded-md shadow justify centeritems-center hover:bg-indigo-400">
            Proceed to upload
          </button>
        </div>
      </>
    );

  if (book.includes(props.type))
    return (
      <>
        <div className="flex justify-center">
          <object data={props.url} type="application/pdf" height={600} width={400} />
        </div>

        <div className="flex justify-center mt-2">
          <button
            onClick={() => props.setStep(6)}
            className="px-4 py-4 text-sm font-semibold leading-6 text-center text-white transition duration-150 ease-in-out bg-indigo-500 rounded-md shadow justify centeritems-center hover:bg-indigo-400">
            Proceed to upload
          </button>
        </div>
      </>
    );

  if (rest.includes(props.type))
    return (
      <>
        <div href={props.url} className="flex justify-center w-1/3 rounded-lg ">
          {' '}
          <button className="px-4 py-4 text-sm font-semibold leading-6 text-center text-white transition duration-150 ease-in-out bg-indigo-500 rounded-md shadow justify centeritems-center hover:bg-indigo-400">
            Download Encrypted
          </button>
        </div>

        <div className="flex justify-center mt-2">
          <button
            onClick={() => props.setStep(6)}
            className="px-4 py-4 text-sm font-semibold leading-6 text-center text-white transition duration-150 ease-in-out bg-indigo-500 rounded-md shadow justify centeritems-center hover:bg-indigo-400">
            Proceed to upload
          </button>
        </div>
      </>
    );

    return (
      <div>Error uploading your item, please check your extension type!</div>
    )
}

// this will change soon
function ShowWaterMark(props) {
  let taskID = props.taskID;

  const previewURL = props.previewURL;
  const setPreviewURL = props.setPreviewURL;

  useEffect(() => {
    fetch('/api/preview?taskID=' + taskID, {
      method: 'GET'
    })
      .then((response) => response.json()) //TODO catch errors
      .then((json) => {
        setPreviewURL({ url: json.url, type: json.type });
      });

    // BLOB implementiation
    //   .then((response) => response.blob())
    //   .then((blob) => {
    //     const ObjectURL = URL.createObjectURL(blob);
    //     setPreviewURL({ url: ObjectURL, type: blob.type });
    //   });
  }, [taskID]);

  return (
    <div className="py-14">
      <div className="flex justify-center">
        {previewURL.url === '' && (
          <div className="flex flex-col">
            <p> Pazari engine is processing your preview ...</p>
          </div>
        )}
      </div>
      {previewURL.url !== '' && (
        <ShowPreview url={previewURL.url} type={previewURL.type} setStep={props.setStep} />
      )}
    </div>
  );
}

function CheckEngineStatus(props) {
  let taskID = props.taskID;

  useEffect(() => {
    fetch('/api/task?taskID=' + taskID, {
      method: 'GET'
    })
      .then((res) => res.json())
      .then((json) => {
        if (json.error) {
          console.log(json.error);
          return;
        } else {
          if (json.status === 'done') {
            props.setStep(5);
            return;
          }
        }
      });
  }, [taskID]);

  return (
    <div className="py-14">
      <div className="flex justify-center">
        <button
          type="button"
          className="inline-flex items-center px-4 py-4 text-sm font-semibold leading-6 text-white transition duration-150 ease-in-out bg-indigo-500 rounded-md shadow cursor-not-allowed hover:bg-indigo-400"
          disabled="">
          <svg
            className="w-5 h-5 mr-3 -ml-1 text-white animate-spin"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24">
            <circle
              className="opacity-25"
              cx="12"
              cy="12"
              r="10"
              stroke="currentColor"
              strokeWidth="4"></circle>
            <path
              className="opacity-75"
              fill="currentColor"
              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
          </svg>
          <div className="flex flex-col">
            <p> Pazari engine is processing your file.</p>
          </div>
        </button>
      </div>
      <div className="py-2 text-center dark:text-gray-500">
        Please do not close this page. this might take several minutes.
      </div>
    </div>
  );
}

function UploadToEngine(props) {
  const [files, setFiles] = useState();

  const [extentionErr, SetExtentionErr] = useState('');

  // to avoid re-renders upload duplicate ;)
  const [uploaded, setUploaded] = useState(false);

  // let's define some extention
  let allowedExtentions = [];
  let type = props.category;
  // allowed extention based on file type
  switch (type) {
    case 'audio':
      allowedExtentions.push('mp3', 'wav');
      break;
    case 'video':
      allowedExtentions.push('mp4', 'mpg', 'mpeg', 'avi', 'mkv', 'webm', 'm4v', 'mov', 'wmv');
      break;
    case 'book':
      allowedExtentions.push('pdf');
      break;
    case 'photo':
      allowedExtentions.push(
        'jpg',
        'png',
        'jpeg',
        'psd',
        'gif',
        'bmp',
        'tiff',
        'webp',
        'heic',
        'svg'
      );
      break;
    case 'graphic':
      allowedExtentions.push('zip');
      break;
    case 'game':
      allowedExtentions.push('zip');
      break;
  }

  useEffect(() => {
    // process unique files
    if (uploaded) return;
    if (typeof files !== 'undefined') {
      if (files.length > 0) {
        let file = files[0].file;

        // upload the file to engine
        if (typeof file !== 'undefined') {
          let extention = file.name.split('.').pop();

          console.log(allowedExtentions.includes(extention));
          if (!allowedExtentions.includes(extention)) {
            console.log('here');
            SetExtentionErr('Invalid extention');
            return;
          }
          const formData = new FormData();
          formData.append('file', file);

          fetch('/api/uploader', {
            method: 'POST',
            body: formData
          })
            .then((res) => res.json())
            .then((json) => {
              if (json.error) {
                setUploaded(false);
                console.log(json.error);
              } else {
                setUploaded(true);
                props.setStep(4);
                props.setTaskID(json.data.taskID);
              }
            });
        }
        setUploaded(true);
      }
    }
  }, [files]);

  return (
    <div className="w-1/3 mx-auto py-14 dark:text-gray-500">
      <div className="text-lg font-bold text-center text-indigo-500">
        Step III : Upload to pazari engine
      </div>

      <p>You are about to upload a(n) {type} file </p>
      <Uploader allowMultiple={false} files={files} setFiles={setFiles} />
      <div>
        Allowed extentions :{' '}
        <div className="flex-shrink text-center">
          {allowedExtentions.map((value) => (
            <span key={Math.random()} className="px-1 text-xs dark:text-gray-600">
              {value}{' '}
            </span>
          ))}
        </div>
        {extentionErr !== '' ? <div className="text-red-500 text-bold">Invalid extention</div> : ''}
      </div>
    </div>
  );
}

function GetSubCategories(props) {
  function handleClick(name) {
    props.setSubCategory(name);
    props.setStep(3);
  }

  let categoriesObj = getCategoriesFromDB(props.category);
  let subCategories = [];
  let options = [];
  options.push(
    <option key="defaultCat" disabled value="">
      Subcategory
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
    <div className="min-h-screen py-4">
      <div className="flex flex-col">
        <div className="text-lg font-bold text-center text-indigo-500">
          Step II: please select your sub-category
        </div>
      </div>
      <div className="flex justify-center">
        <select
          className="w-2/5 px-4 py-1 border rounded-lg dark:border-indigo-400 dark:bg-gray-700 dark:text-gray-400"
          id="typeSelector"
          name="typeSelector"
          value={props.subCategory ? props.subCategory : ''}
          onChange={(event) => handleClick(event.target.value)}>
          {options}
        </select>
      </div>
    </div>
  );
}

function SelectCategory(props) {
  function handleClick(name) {
    props.setCategory(name);
    props.setStep(2);
  }

  return (
    <div className="py-14">
      <div className="flex flex-col text-lg font-bold text-center text-indigo-500">
        Step I: please select your category
      </div>

      <div className="flex items-center justify-between w-full px-4 py-4 md:px-18 lg:px-28 ">
        <div
          className="flex flex-col text-center cursor-pointer"
          onClick={() => {
            handleClick('book');
          }}>
          <Image src={Books} alt="Ebooks" width={200} height={200} />
          <h3 className="py-2 text-2xl dark:text-white">E-Book</h3>
        </div>

        <div
          className="flex flex-col text-center cursor-pointer"
          onClick={() => {
            handleClick('audio');
          }}>
          <Image src={Audios} alt="Audios" width={200} height={200} />
          <h3 className="py-2 text-2xl dark:text-white">Audio</h3>
        </div>

        <div
          className="flex flex-col text-center cursor-pointer"
          onClick={() => {
            handleClick('video');
          }}>
          <Image src={Videos} alt="Videos" width={200} height={200} />
          <h3 className="py-2 text-2xl dark:text-white">Video</h3>
        </div>
      </div>

      <div className="flex items-center justify-between w-full py-4 px-28 ">
        <div
          className="flex flex-col text-center cursor-pointer"
          onClick={() => {
            handleClick('photo');
          }}>
          <Image src={Photos} alt="Photos" width={200} height={200} />
          <h3 className="py-2 text-2xl dark:text-white">Photo</h3>
        </div>

        <div
          className="flex flex-col text-center cursor-pointer"
          onClick={() => {
            handleClick('graphic');
          }}>
          <Image src={Graphics} alt="Graphics" width={200} height={200} />
          <h3 className="py-2 text-2xl dark:text-white">Graphics</h3>
        </div>

        <div
          className="flex flex-col text-center cursor-pointer"
          onClick={() => {
            handleClick('game');
          }}>
          <Image src={Games} alt="Game" width={200} height={200} />
          <h3 className="py-2 text-2xl dark:text-white">Game Asset</h3>
        </div>
      </div>
    </div>
  );
}

export default function ProductSelector(props) {
  // setup all required steps
  const [category, setCategory] = useState('');
  const [subCategory, setSubCategory] = useState('');
  const [taskID, setTaskID] = useState('');
  const [previewURL, setPreviewURL] = useState({ url: '', type: '' });
  const [step, setStep] = useState(1);
  const Moralis = props.Moralis;
  const user = props.user;

  return (
    <main className="mx-auto dark:text-gray-300">
      {/* Step I select a category */}
      {step === 1 && <SelectCategory setCategory={setCategory} setStep={setStep} />}

      {/* Step II select a sub-category */}

      {step === 2 && (
        <GetSubCategories
          category={category}
          setSubCategory={setSubCategory}
          subCategory={subCategory}
          setStep={setStep}
        />
      )}

      {/* Step III upload to engine */}

      {step === 3 && (
        <UploadToEngine
          category={category}
          subCategory={subCategory}
          setStep={setStep}
          setTaskID={setTaskID}
        />
      )}

      {/* Step IV wait for watermark / encryption */}
      {step === 4 && <CheckEngineStatus taskID={taskID} setStep={setStep} />}

      {/* Step V ok file is processed by engine */}
      {step === 5 && (
        <ShowWaterMark
          taskID={taskID}
          setStep={setStep}
          previewURL={previewURL}
          setPreviewURL={setPreviewURL}
        />
      )}

      {/* Step VI ok file is processed by engine */}
      {step === 6 && (
        <ShowUpload
          taskID={taskID}
          category={category}
          subCategory={subCategory}
          user={user}
          Moralis={Moralis}
        />
      )}
    </main>
  );
}
