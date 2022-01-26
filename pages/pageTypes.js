import CategoryFilter from '../components/CategoryFilter';
import { useState } from 'react';
import { getCategoriesFromDB } from '../components/MoralisDAO';

export default function PageTypes(props) {
  const [catFilters, setFilters] = useState(new Set());

  //Used to update the current filters.  If a filter is already selected it will toggle off.
  const updateSearch = (text) => {
    if (!catFilters.has(text)) {
      let newFilters = new Set(catFilters);
      newFilters.add(text);
      setFilters(newFilters);
    } else {
      let newFilters = new Set(catFilters);
      newFilters.delete(text);
      setFilters(newFilters);
    }
  };

  let classNameOn = 'px-4 py-2 text-base text-white bg-indigo-500 rounded-full ';
  let classNameOff = 'px-4 py-2 text-base text-white bg-orange-500 rounded-full ';
  let categoriesObj = getCategoriesFromDB(props.type);

  let subCategories = [];
  let filters = [];
  if (categoriesObj && categoriesObj.length !== 0) {
    subCategories = categoriesObj[0].get('subCategories')[0];
    filters = categoriesObj[0].get('filters')[0];
  }

  return (
    <main className="mx-auto dark:bg-gray-900">

      <div className="bg-white dark:bg-gray-900 ">
        <div className="px-4 mx-auto sm:py-24 lg:py-12 sm:px-6 lg:px-8">
          <h1 className="py-4 text-4xl font-extrabold tracking-tight text-gray-900 dark:text-indigo-600">
            Explore categories
          </h1>

          {subCategories.map((category) => {
            return (
              <div className="inline-flex px-2 py-1" key={category}>
                <button
                  key={category}
                  className={catFilters.has(category) ? classNameOff : classNameOn}
                  onClick={() => updateSearch(category)}>
                  {category}
                </button>
              </div>
            );
          })}
        </div>
      </div>

      <CategoryFilter
        type={props.type}
        filters={filters}
        catFilters={catFilters}
        audioUrls={props.audioUrls}
      />
    </main>
  );
}
