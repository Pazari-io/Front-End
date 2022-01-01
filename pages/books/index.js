import Nav from '../../components/NavBar';
import CategoryFilter from '../../components/CategoryFilter';
import Footer from '../../components/Footer';
import { useState } from 'react';

const filters = [
  {
    id: 'properties',
    name: 'Properties',
    options: [
      { value: 'verfied', label: 'Verfied publisher', checked: true },
      { value: 'exclusive', label: 'Exclusive release', checked: true },
      { value: 'hasaudio', label: 'With audio', checked: false },
      { value: 'waterfree', label: 'No watermarks', checked: false },
      { value: 'permissions', label: 'Full permissions', checked: false }
    ]
  },
  {
    id: 'age',
    name: 'Age',
    options: [
      { value: 'every', label: 'Every age', checked: false },
      { value: 'kids', label: 'Kids', checked: false },
      { value: 'young', label: 'Young adults', checked: true },
      { value: 'adults', label: '+18', checked: false }
    ]
  },
  {
    id: 'length',
    name: 'Length',
    options: [
      { value: 'lessthan100', label: 'Less than 100 pages', checked: false },
      { value: 'morethan100', label: 'More than 100 pages', checked: false },
      { value: 'morethan300', label: 'More than 300 pages', checked: false }
    ]
  }
];

/*
Adobe stock
ShutterStock
Istock
CreativeMarket
Motionarray
Evanto 

*/

// aduioCategories = [
//   'Ambient',
//   'Children',
//   'Cinematic',
//   'Classical',
//   'Corporate',
//   'Country, Western',
//   'Drum & Bass, Breakbeat',
//   'Electronica',
//   'Experimental, Abstract',
//   'Folk, Acoustic',
//   'Funk, Groove',
//   'Hip-Hop',
//   'Holiday & Seasonal',
//   'House',
//   'Jazz',
//   'Miscellaneous',
//   'Percussion',
//   'Pop',
//   'Rock',
//   'Soul, R&B',
//   'Vocals, Voice',
//   'World Beat'
// ];

let bookCategories = [
  'Computer',
  'Programming',
  'Design',
  'Action',
  'Adventure',
  'Art',
  'Aarchitecture',
  'Autobiography',
  // 'Anthology',
  // 'Biography',
  // 'Business',
  // 'Children',
  // 'Crafts',
  'Classic',
  // 'Cookbook',
  // 'Comic',
  // 'Diary',
  // 'Encyclopedia',
  'Drama',
  // 'Guide',
  // 'Fairytale',
  // 'Security',
  // 'Fitness',
  // 'Health',
  'Fantasy',
  // 'History',
  // 'Home',
  // 'Historical',
  // 'Garden',
  // 'Humor',
  // 'Horror',
  // 'Journal',
  // 'Mystery',
  // 'Math',
  // 'Paranormal',
  // 'Memoir',
  // 'Philosophy',
  // 'Poetry',
  // 'Prayer',
  // 'Political',
  // 'Religion',
  // 'Romance',
  // 'Fiction',
  // 'Review',
  // 'Short',
  // 'Science',
  // 'Suspense',
  // 'Help',
  // 'Thriller',
  // 'Sports',
  // 'Western',
  // 'Travel',
  // 'Young',
  // 'Crime'
];

export default function Home() {
  const [catFilters, setFilters] = useState(new Set());
  const updateSearch= (text) => {
    if (!catFilters.has(text)) {
      let newFilters = new Set(catFilters);
      newFilters.add(text);
      setFilters(newFilters);
    } else {
      let newFilters = new Set(catFilters);
      newFilters.delete(text);
      setFilters(newFilters);
    }
  }

  let classNameOn = "px-4 py-2 text-base text-white bg-indigo-500 rounded-full ";
  let classNameOff = "px-4 py-2 text-base text-white bg-orange-500 rounded-full ";

  return (
    <main className="min-h-screen mx-auto dark:bg-gray-900">
      <Nav />

      <div className="bg-white dark:bg-gray-900 ">
        <div className="px-4 mx-auto sm:py-24 lg:py-12 sm:px-6 lg:px-8">
          <h1 className="py-4 text-4xl font-extrabold tracking-tight text-gray-900 dark:text-indigo-600">
            Explore categories
          </h1>

          {bookCategories.map((category) => {
            return (
              <div className="inline-flex px-2 py-1" key={category}>
                <button 
                  key={category}
                  className={catFilters.has(category) ? classNameOff : classNameOn}
                  onClick={() =>updateSearch(category)}
                  >
                  {category}
                </button>
              </div>
            );
          })}
        </div>
      </div>

      <CategoryFilter type="book" filters={filters} catFilters={catFilters}/>
      <Footer />
    </main>
  );
}
