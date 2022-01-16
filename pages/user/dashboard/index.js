import { useEffect } from 'react';
import Nav from '../../../components/NavBar';
import Footer from '../../../components/Footer';
import { useMoralis, useMoralisFile } from 'react-moralis';
import { useRouter } from 'next/router';
import React, { useCallback } from 'react';
import { useDropzone } from 'react-dropzone';
import { Tab } from '@headlessui/react';
import { Fragment } from 'react/cjs/react.production.min';
import Pagination from '../../../components/Pagination';
export default function Dashboard() {
  const { error, isUploading, moralisFile, saveFile } = useMoralisFile();

  const router = useRouter();

  useEffect(() => {
    if (!isAuthenticated) {
      router.push('/');
    }
  });

  const { isAuthenticated } = useMoralis();

  const onDrop = useCallback(async (acceptedFiles) => {
    let file = acceptedFiles[0];

    // const reader = new FileReader();
    // // reader.onload = () => {
    // //   const fileAsBinaryString = reader.result;
    // //   // furture file content magic check here
    // // };
    // reader.onabort = () => console.log('file reading was aborted');
    // reader.onerror = () => {
    //   console.log('file reading has failed');
    //   return;
    // };
    // reader.readAsBinaryString(file);
    const formData = new FormData();
    formData.append('file', file);

    await fetch('/api/uploader', {
      method: 'POST',
      body: formData
    })
      .then((res) => res.json())
      .then((json) => {
        if (json.error) {
          console.log(json.error);
        } else {
          //console.log(json);
          //saveFile(json);
        }
      });

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
    accept: 'jpg, .jpeg, .png, .pdf, .mp4, .mp3, .webp, .webm ' // add more extention
  });

  return (
    isAuthenticated && (
      <main className="mx-auto dark:bg-gray-900 dark:text-gray-300">

        <Tab.Group
          onChange={(index) => {
            //console.log('Changed selected tab to:', index);
          }}>
          <Tab.List className="flex justify-center py-2">
            <Tab as={Fragment}>
              {({ selected }) => (
                <button
                  className={
                    selected
                      ? 'bg-blue-500 text-white dark:bg-black dark:text-indigo-400 rounded-lg px-4 py-2'
                      : 'bg-white text-black dark:bg-gray-900 dark:text-indigo-400 rounded-lg px-4 py-2'
                  }>
                  <div className="flex items-center px-2">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="w-6 h-6"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor">
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12"
                      />
                    </svg>
                    <p className="underline ">Upload</p>
                  </div>
                </button>
              )}
            </Tab>

            <Tab as={Fragment}>
              {({ selected }) => (
                <button
                  className={
                    selected
                      ? 'bg-blue-500 text-white dark:bg-black dark:text-indigo-400 rounded-lg px-4 py-2'
                      : 'bg-white text-black dark:bg-gray-900 dark:text-indigo-400 rounded-lg px-4 py-2'
                  }>
                  <div className="flex items-center px-2">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="w-6 h-6"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor">
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                      />
                    </svg>
                    Sells
                  </div>
                </button>
              )}
            </Tab>

            <Tab as={Fragment}>
              {({ selected }) => (
                <button
                  className={
                    selected
                      ? 'bg-blue-500 text-white dark:bg-black dark:text-indigo-400 rounded-lg px-4 py-2'
                      : 'bg-white text-black dark:bg-gray-900 dark:text-indigo-400 rounded-lg px-4 py-2'
                  }>
                  <div className="flex items-center px-2">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="w-6 h-6"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor">
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"
                      />
                    </svg>
                    Downloads
                  </div>
                </button>
              )}
            </Tab>
          </Tab.List>
          <Tab.Panels>
            <Tab.Panel>
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

                  <button className="absolute w-24 px-4 py-2 mr-2 text-indigo-400 bg-indigo-500 rounded-lg right-8 hover:bg-indigo-600 dark:text-gray-300">
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
                To enable buy and bang button you need to sell set a price for buy and bang input or
                leave it empty. and it will be removed from marketplace{' '}
              </p>
            </Tab.Panel>
            <Tab.Panel>
              <div className="flex flex-col mx-14">
                <div className="overflow-x-auto sm:-mx-6 lg:-mx-8">
                  <div className="inline-block min-w-full py-2 sm:px-6 lg:px-8">
                    <div className="overflow-hidden shadow-md sm:rounded-lg">
                      <table className="min-w-full">
                        <thead className="bg-gray-100 dark:bg-gray-700">
                          <tr>
                            <th
                              scope="col"
                              className="px-6 py-3 text-xs font-medium tracking-wider text-left text-gray-700 uppercase dark:text-gray-400">
                              Name
                            </th>
                            <th
                              scope="col"
                              className="px-6 py-3 text-xs font-medium tracking-wider text-left text-gray-700 uppercase dark:text-gray-400">
                              Category
                            </th>
                            <th
                              scope="col"
                              className="px-6 py-3 text-xs font-medium tracking-wider text-left text-gray-700 uppercase dark:text-gray-400">
                              Price
                            </th>
                          </tr>
                        </thead>
                        <tbody>
                          <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-600">
                            <td className="px-6 py-4 text-sm font-medium text-gray-900 whitespace-nowrap dark:text-white">
                              Awsome Video
                            </td>

                            <td className="px-6 py-4 text-sm text-gray-500 whitespace-nowrap dark:text-gray-400">
                              Perfect Photo
                            </td>
                            <td className="px-6 py-4 text-sm text-gray-500 whitespace-nowrap dark:text-green-400">
                              +$2999
                            </td>
                          </tr>

                          <tr className="border-b bg-gray-50 dark:bg-gray-700 dark:border-gray-600">
                            <td className="px-6 py-4 text-sm font-medium text-gray-900 whitespace-nowrap dark:text-white">
                              Amazing Audio
                            </td>

                            <td className="px-6 py-4 text-sm text-gray-500 whitespace-nowrap dark:text-gray-400">
                              Desktop Pc
                            </td>
                            <td className="px-6 py-4 text-sm text-gray-500 whitespace-nowrap dark:text-green-400">
                              +$1999
                            </td>
                          </tr>

                          <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-600">
                            <td className="px-6 py-4 text-sm font-medium text-gray-900 whitespace-nowrap dark:text-white">
                              Perfect Photo
                            </td>

                            <td className="px-6 py-4 text-sm text-gray-500 whitespace-nowrap dark:text-gray-400">
                              Phone
                            </td>
                            <td className="px-6 py-4 text-sm text-gray-500 whitespace-nowrap dark:text-green-400">
                              +$999
                            </td>
                          </tr>

                          <tr className="border-b bg-gray-50 dark:bg-gray-700 dark:border-gray-600">
                            <td className="px-6 py-4 text-sm font-medium text-gray-900 whitespace-nowrap dark:text-white">
                              Top Game Asset
                            </td>

                            <td className="px-6 py-4 text-sm text-gray-500 whitespace-nowrap dark:text-gray-400">
                              Accessories
                            </td>
                            <td className="px-6 py-4 text-sm text-gray-500 whitespace-nowrap dark:text-green-400">
                              +$999
                            </td>
                          </tr>

                          <tr className="bg-white dark:bg-gray-800">
                            <td className="px-6 py-4 text-sm font-medium text-gray-900 whitespace-nowrap dark:text-white">
                              Best Book
                            </td>

                            <td className="px-6 py-4 text-sm text-gray-500 whitespace-nowrap dark:text-gray-400">
                              E-books
                            </td>
                            <td className="px-6 py-4 text-sm text-gray-500 whitespace-nowrap dark:text-green-400">
                              +$599
                            </td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>
              </div>
              <div className="mx-14">
                <Pagination />
              </div>
            </Tab.Panel>
            <Tab.Panel>
              <div className="flex flex-col mx-14">
                <div className="overflow-x-auto sm:-mx-6 lg:-mx-8">
                  <div className="inline-block min-w-full py-2 sm:px-6 lg:px-8">
                    <div className="overflow-hidden shadow-md sm:rounded-lg">
                      <table className="min-w-full">
                        <thead className="bg-gray-100 dark:bg-gray-700">
                          <tr>
                            <th
                              scope="col"
                              className="px-6 py-3 text-xs font-medium tracking-wider text-left text-gray-700 uppercase dark:text-gray-400">
                              Name
                            </th>
                            <th
                              scope="col"
                              className="px-6 py-3 text-xs font-medium tracking-wider text-left text-gray-700 uppercase dark:text-gray-400">
                              Category
                            </th>
                            <th
                              scope="col"
                              className="px-6 py-3 text-xs font-medium tracking-wider text-left text-gray-700 uppercase dark:text-gray-400">
                              Link
                            </th>
                          </tr>
                        </thead>
                        <tbody>
                          <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-600">
                            <td className="px-6 py-4 text-sm font-medium text-gray-900 whitespace-nowrap dark:text-white">
                              Awsome Video
                            </td>

                            <td className="px-6 py-4 text-sm text-gray-500 whitespace-nowrap dark:text-gray-400">
                              Perfect Photo
                            </td>
                            <td className="px-6 py-4 text-sm text-gray-500 whitespace-nowrap dark:text-green-400 ">
                              <a className="px-4 py-2 bg-gray-300 rounded-lg dark:bg-gray-900">
                                Download
                              </a>
                            </td>
                          </tr>

                          <tr className="border-b bg-gray-50 dark:bg-gray-700 dark:border-gray-600">
                            <td className="px-6 py-4 text-sm font-medium text-gray-900 whitespace-nowrap dark:text-white">
                              Amazing Audio
                            </td>

                            <td className="px-6 py-4 text-sm text-gray-500 whitespace-nowrap dark:text-gray-400">
                              Desktop Pc
                            </td>
                            <td className="px-6 py-4 text-sm text-gray-500 whitespace-nowrap dark:text-green-400">
                              <a className="px-4 py-2 bg-gray-300 rounded-lg dark:bg-gray-900">
                                Download
                              </a>
                            </td>
                          </tr>

                          <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-600">
                            <td className="px-6 py-4 text-sm font-medium text-gray-900 whitespace-nowrap dark:text-white">
                              Perfect Photo
                            </td>

                            <td className="px-6 py-4 text-sm text-gray-500 whitespace-nowrap dark:text-gray-400">
                              Phone
                            </td>
                            <td className="px-6 py-4 text-sm text-gray-500 whitespace-nowrap dark:text-green-400">
                              <a className="px-4 py-2 bg-gray-300 rounded-lg dark:bg-gray-900">
                                Download
                              </a>
                            </td>
                          </tr>

                          <tr className="border-b bg-gray-50 dark:bg-gray-700 dark:border-gray-600">
                            <td className="px-6 py-4 text-sm font-medium text-gray-900 whitespace-nowrap dark:text-white">
                              Top Game Asset
                            </td>

                            <td className="px-6 py-4 text-sm text-gray-500 whitespace-nowrap dark:text-gray-400">
                              Accessories
                            </td>
                            <td className="px-6 py-4 text-sm text-gray-500 whitespace-nowrap dark:text-green-400">
                              <a className="px-4 py-2 bg-gray-300 rounded-lg dark:bg-gray-900">
                                Download
                              </a>
                            </td>
                          </tr>

                          <tr className="bg-white dark:bg-gray-800">
                            <td className="px-6 py-4 text-sm font-medium text-gray-900 whitespace-nowrap dark:text-white">
                              Best Book
                            </td>

                            <td className="px-6 py-4 text-sm text-gray-500 whitespace-nowrap dark:text-gray-400">
                              E-books
                            </td>
                            <td className="px-6 py-4 text-sm text-gray-500 whitespace-nowrap dark:text-green-400">
                              <a className="px-4 py-2 bg-gray-300 rounded-lg dark:bg-gray-900">
                                Download
                              </a>
                            </td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>
              </div>
              <div className="mx-14">
                <Pagination />
              </div>
            </Tab.Panel>
          </Tab.Panels>
        </Tab.Group>

      </main>
    )
  );
}
