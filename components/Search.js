import { Menu } from '@headlessui/react';
import { useState } from 'react';
import { Listbox } from '@headlessui/react';

const categories = [
  { id: 1, name: 'Everything', unavailable: false },
  { id: 2, name: 'Videos', unavailable: false },
  { id: 3, name: 'Audios', unavailable: false },
  { id: 4, name: 'Images', unavailable: true },
  { id: 5, name: 'Games', unavailable: false },
  { id: 5, name: 'Graphic', unavailable: false }
];

export default function Search() {
  const [selectedCategory, SetselectedCategory] = useState(categories[0]);

  return (
    <div className="flex items-center justify-center py-4 bg-gray-300 dark:bg-gray-900">
      <div className="container relative left-0 z-50 flex justify-center ">
        <div className="relative flex items-center w-full lg:w-1/2 group">
          <div className="absolute z-50 items-center justify-center block w-auto h-10 p-3 pr-2 text-sm text-gray-500 uppercase cursor-pointer sm:hidden">
            <svg
              fill="none"
              className="relative w-5 h-5"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              stroke="currentColor"
              viewBox="0 0 24 24">
              <path d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"></path>
            </svg>
          </div>
          <svg
            className="absolute left-0 z-20 hidden w-4 h-4 ml-4 text-gray-500 pointer-events-none fill-current group-hover:text-gray-400 sm:block"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 20 20">
            <path d="M12.9 14.32a8 8 0 1 1 1.41-1.41l5.35 5.33-1.42 1.42-5.33-5.34zM8 14A6 6 0 1 0 8 2a6 6 0 0 0 0 12z"></path>
          </svg>
          <input
            type="text"
            className="block w-full py-1.5 pl-10 pr-4 leading-normal rounded-2xl focus:border-transparent focus:outline-none focus:ring-2 focus:ring-blue-500 ring-opacity-90 bg-gray-100 dark:bg-gray-800 text-gray-400 aa-input"
            placeholder="Search"
          />
          <div className="absolute right-0 hidden h-auto px-2 py-1 mr-2 text-xs text-gray-400 border border-gray-300 rounded-2xl md:block dark:bg-gray-800">
            +
            <Listbox value={selectedCategory} onChange={SetselectedCategory}>
              <Listbox.Button>{selectedCategory.name}</Listbox.Button>
              <Listbox.Options>
                {categories.map((category) => (
                  <Listbox.Option key={category.id} value={category}>
                    {category.name}
                  </Listbox.Option>
                ))}
              </Listbox.Options>
            </Listbox>
          </div>
        </div>
      </div>
    </div>
  );
}
