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
  const router = useRouter();

  useEffect(() => {
    if (!isAuthenticated) {
      router.replace('/');
    }
  });

  const { isAuthenticated } = useMoralis();

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
