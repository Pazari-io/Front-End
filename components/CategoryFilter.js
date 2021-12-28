import { Fragment, useState, useRef, useEffect } from 'react';
import { Dialog, Disclosure, Menu, Transition } from '@headlessui/react';
import { XIcon } from '@heroicons/react/outline';
import {
  ChevronDownIcon,
  FilterIcon,
  MinusSmIcon,
  PlusSmIcon,
  ViewGridIcon
} from '@heroicons/react/solid';
import Slider from './Slider';
import AudioPlayer from './AudioPlayer';
import Pagination from './Pagination';

import Card from './Card';
import { SwiperSlide } from 'swiper/react';
import { useMoralisQuery } from "react-moralis";

const sortOptions = [
  { name: 'Most Popular', href: '#', current: true },
  { name: 'Best Rating', href: '#', current: false },
  { name: 'Newest', href: '#', current: false },
  { name: 'Price: Low to High', href: '#', current: false },
  { name: 'Price: High to Low', href: '#', current: false }
];
const subCategories = [
  // { name: 'Ebook', href: '#' },
  // { name: 'Shorts', href: '#' },
  // { name: 'Guides', href: '#' }
];

function getMarketItems(type) {
    // const{data, error, isLoading} = useMoralisQuery("MarketplaceItems");
    const{data, error, isLoading} = useMoralisQuery("MarketplaceItems", query =>
        query
          .equalTo("type", type)
          .ascending("itemID"),
        [type]
    );
    if (error) {
        return <span>Error getting items from Moralis</span>;
    }
    if (isLoading) {
        return <span>Loading items...</span>;
    }
    return data;

}

function getSlides(type) {
    let items = getMarketItems(type);
    let res = [];
    for (let i = 0; i < items.length; i++) {
        let item = items[i];
        let slide = <SwiperSlide><Card type={type} item={item}/></SwiperSlide>;
        res.push(slide);
    }
    return <>{res}</>;
}

function classNames(...classes) {
  return classes.filter(Boolean).join(' ');
}

export default function CategoriesFilter(props) {
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);

  return (
    <div className="bg-white dark:bg-gray-900 dark:text-gray-300">
      <div>
        {/* Mobile filter dialog */}
        <Transition.Root show={mobileFiltersOpen} as={Fragment}>
          <Dialog
            as="div"
            className="fixed inset-0 z-40 flex lg:hidden "
            onClose={setMobileFiltersOpen}>
            <Transition.Child
              as={Fragment}
              enter="transition-opacity ease-linear duration-300"
              enterFrom="opacity-0"
              enterTo="opacity-100"
              leave="transition-opacity ease-linear duration-300"
              leaveFrom="opacity-100"
              leaveTo="opacity-0">
              <Dialog.Overlay className="fixed inset-0 bg-black bg-opacity-25" />
            </Transition.Child>

            <Transition.Child
              as={Fragment}
              enter="transition ease-in-out duration-300 transform"
              enterFrom="translate-x-full"
              enterTo="translate-x-0"
              leave="transition ease-in-out duration-300 transform"
              leaveFrom="translate-x-0"
              leaveTo="translate-x-full">
              <div className="relative flex flex-col w-full h-full max-w-xs py-4 pb-12 ml-auto overflow-y-auto bg-white shadow-xl dark:bg-gray-800 dark:text-gray-300">
                <div className="flex items-center justify-between px-4">
                  <h2 className="text-lg font-medium text-gray-900 dark:text-gray-300">Filters</h2>
                  <button
                    type="button"
                    className="flex items-center justify-center w-10 h-10 p-2 -mr-2 text-gray-400 bg-white rounded-md dark:bg-gray-800"
                    onClick={() => setMobileFiltersOpen(false)}>
                    <span className="sr-only">Close menu</span>
                    <XIcon className="w-6 h-6" aria-hidden="true" />
                  </button>
                </div>

                {/* Filters */}
                <form className="mt-4 border-t border-gray-200 dark:bg-gray-800 dark:text-gray-300">
                  <h3 className="sr-only">Categories</h3>
                  {/* <ul
                    role="list"
                    className="px-2 py-3 font-medium text-gray-900 dark:text-gray-300">
                    {subCategories.map((category) => (
                      <li key={category.name}>
                        <a href={category.href} className="block px-2 py-3">
                          {category.name}
                        </a>
                      </li>
                    ))}
                  </ul> */}

                  {props.filters.map((section) => (
                    <Disclosure
                      as="div"
                      key={section.id}
                      className="px-4 py-6 border-t border-gray-200">
                      {({ open }) => (
                        <>
                          <h3 className="flow-root -mx-2 -my-3">
                            <Disclosure.Button className="flex items-center justify-between w-full px-2 py-3 text-gray-400 bg-white dark:bg-gray-800 hover:text-gray-500">
                              <span className="font-medium text-gray-900 dark:text-gray-300">
                                {section.name}
                              </span>
                              <span className="flex items-center ml-6">
                                {open ? (
                                  <MinusSmIcon className="w-5 h-5" aria-hidden="true" />
                                ) : (
                                  <PlusSmIcon className="w-5 h-5" aria-hidden="true" />
                                )}
                              </span>
                            </Disclosure.Button>
                          </h3>
                          <Disclosure.Panel className="pt-6">
                            <div className="space-y-6">
                              {section.options.map((option, optionIdx) => (
                                <div
                                  key={option.value}
                                  className="flex items-center dark:text-gray-300">
                                  <input
                                    id={`filter-mobile-${section.id}-${optionIdx}`}
                                    name={`${section.id}[]`}
                                    defaultValue={option.value}
                                    type="checkbox"
                                    defaultChecked={option.checked}
                                    className="w-4 h-4 text-indigo-600 border-gray-300 rounded focus:ring-indigo-500"
                                  />
                                  <label
                                    htmlFor={`filter-mobile-${section.id}-${optionIdx}`}
                                    className="flex-1 min-w-0 ml-3 text-gray-500 dark:text-gray-300">
                                    {option.label}
                                  </label>
                                </div>
                              ))}
                            </div>
                          </Disclosure.Panel>
                        </>
                      )}
                    </Disclosure>
                  ))}
                </form>
              </div>
            </Transition.Child>
          </Dialog>
        </Transition.Root>

        <main className="mx-auto sm:px-6 lg:px-8">
          <div className="relative z-10 flex items-center justify-between pt-16 pb-6 border-b border-gray-200">
            <h1 className="text-2xl font-extrabold tracking-tight text-gray-900 dark:text-indigo-600">
              Filters
            </h1>

            <input
              type="text"
              placeholder="Search ..."
              className="w-1/3 rounded-lg dark:bg-gray-700 dark:text-gray-300"
            />

            <div className="flex items-center">
              <Menu as="div" className="relative inline-block text-left">
                <div>
                  <Menu.Button className="inline-flex justify-center text-sm font-medium text-gray-700 group dark:text-gray-300 dark:hover:text-gray-500 hover:text-gray-900">
                    Sort
                    <ChevronDownIcon
                      className="flex-shrink-0 w-5 h-5 ml-1 -mr-1 text-gray-400 group-hover:text-gray-500"
                      aria-hidden="true"
                    />
                  </Menu.Button>
                </div>

                <Transition
                  as={Fragment}
                  enter="transition ease-out duration-100"
                  enterFrom="transform opacity-0 scale-95"
                  enterTo="transform opacity-100 scale-100"
                  leave="transition ease-in duration-75"
                  leaveFrom="transform opacity-100 scale-100"
                  leaveTo="transform opacity-0 scale-95">
                  <Menu.Items className="absolute right-0 w-40 mt-2 origin-top-right bg-white rounded-md shadow-2xl ring-1 ring-black ring-opacity-5 focus:outline-none">
                    <div className="py-1">
                      {sortOptions.map((option) => (
                        <Menu.Item key={option.name}>
                          {({ active }) => (
                            <a
                              href={option.href}
                              className={classNames(
                                option.current ? 'font-medium text-gray-900' : 'text-gray-500',
                                active ? 'bg-gray-100' : '',
                                'block px-4 py-2 text-sm'
                              )}>
                              {option.name}
                            </a>
                          )}
                        </Menu.Item>
                      ))}
                    </div>
                  </Menu.Items>
                </Transition>
              </Menu>

              {/* <button
                type="button"
                className="p-2 ml-5 -m-2 text-gray-400 sm:ml-7 hover:text-gray-500">
                <span className="sr-only">View grid</span>
                <ViewGridIcon className="w-5 h-5" aria-hidden="true" />
              </button> */}

              <button
                type="button"
                className="p-2 ml-4 -m-2 text-gray-400 sm:ml-6 hover:text-gray-500 lg:hidden "
                onClick={() => setMobileFiltersOpen(true)}>
                <span className="sr-only">Filters</span>
                <FilterIcon className="w-5 h-5" aria-hidden="true" />
              </button>
            </div>
          </div>

          <section aria-labelledby="products-heading" className="pt-6 pb-24">
            <h2 id="products-heading" className="sr-only">
              Products
            </h2>

            <div className="grid grid-cols-1 lg:grid-cols-4 gap-x-8 gap-y-10">
              {/* Filters */}
              <form className="hidden lg:block">
                <h3 className="sr-only dark:text-gray-300">Categories</h3>
                <ul
                  role="list"
                  className="pb-6 space-y-4 text-sm font-medium text-gray-900 border-b border-gray-200 dark:text-gray-300">
                  {subCategories.map((category) => (
                    <li key={category.name}>
                      <a href={category.href}>{category.name}</a>
                    </li>
                  ))}
                </ul>

                {props.filters.map((section) => (
                  <Disclosure as="div" key={section.id} className="py-6 border-b border-gray-200">
                    {({ open }) => (
                      <>
                        <h3 className="flow-root -my-3">
                          <Disclosure.Button className="flex items-center justify-between w-full py-3 text-sm text-gray-400 bg-white dark:bg-gray-900 dark:text-gray-300 hover:text-gray-500">
                            <span className="font-medium text-gray-900 dark:text-gray-300">
                              {section.name}
                            </span>
                            <span className="flex items-center ml-6">
                              {open ? (
                                <MinusSmIcon className="w-5 h-5" aria-hidden="true" />
                              ) : (
                                <PlusSmIcon className="w-5 h-5" aria-hidden="true" />
                              )}
                            </span>
                          </Disclosure.Button>
                        </h3>
                        <Disclosure.Panel className="pt-6">
                          <div className="space-y-4">
                            {section.options.map((option, optionIdx) => (
                              <div key={option.value} className="flex items-center">
                                <input
                                  id={`filter-${section.id}-${optionIdx}`}
                                  name={`${section.id}[]`}
                                  defaultValue={option.value}
                                  type="checkbox"
                                  defaultChecked={option.checked}
                                  className="w-4 h-4 text-indigo-600 border-gray-300 rounded focus:ring-indigo-500"
                                />
                                <label
                                  htmlFor={`filter-${section.id}-${optionIdx}`}
                                  className="ml-3 text-sm text-gray-600 dark:text-gray-400">
                                  {option.label}
                                </label>
                              </div>
                            ))}
                          </div>
                        </Disclosure.Panel>
                      </>
                    )}
                  </Disclosure>
                ))}
              </form>

              {/* Product grid */}
              <div className="lg:col-span-3">
                {/* main category content */}
                <div>{props.audioUrls && <AudioPlayer audioUrls={props.audioUrls} />}</div>
                <div>{props.type && <Slider slides={getSlides(props.type)} type={props.type}/>}</div>

                <Pagination />
                {/* /End replace */}
              </div>
            </div>
          </section>
        </main>
      </div>
    </div>
  );
}
