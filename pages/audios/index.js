import Nav from '../../components/NavBar';
import CategoryFilter from '../../components/CategoryFilter';
import Footer from '../../components/Footer';
import { useState } from 'react';

const filters = [
  {
    id: 'properties',
    name: 'Properties',
    options: [
      { value: 'verfied', label: 'Verfied publisher', checked: false },
      { value: 'exlusive', label: 'Exclusive publication', checked: false },
      { value: 'erpo', label: 'Exclude R.P.O', checked: false },
      { value: 'rpoo', label: 'R.P.O only', checked: false }
    ]
  },
  {
    id: 'type',
    name: 'Type',
    options: [
      { value: 'sfx', label: 'SFX', checked: false },
      { value: 'music', label: 'Music', checked: false }
    ]
  },
  {
    id: 'length',
    name: 'Length',
    options: [
      { value: 'lessthan1', label: 'Less than 1 minutes', checked: false },
      { value: 'morethan1', label: 'More than 1 miutes', checked: false },
      { value: 'morethan3', label: 'More than 3 minutes', checked: false }
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

const audioUrls = [
  'https://www.mfiles.co.uk/mp3-downloads/brahms-st-anthony-chorale-theme-two-pianos.mp3',
  'https://www.mfiles.co.uk/mp3-downloads/franz-schubert-standchen-serenade.mp3'
];

let audioCategories = [
  'Ambient',
  'Children',
  'Cinematic',
  'Classical',
  'Corporate',
  'Country, Western',
  'Drum & Bass, Breakbeat',
  'Electronica',
  'Experimental, Abstract',
  'Folk, Acoustic',
  'Funk, Groove',
  'Hip-Hop',
  'Holiday & Seasonal',
  'House',
  'Jazz',
  'Percussion',
  'Pop',
  'Rock',
  'Soul, R&B',
  'Vocals, Voice',
  'World Beat',
  'Game',
  'Urban',
  'Domestic',
  'Nature',
  'Industrial',
  'Human',
  'Transitions',
  'Futuristic',
  'Interface',
  'Animals',
  'Creatures',
  'Foley',
  'Miscellaneous',
  'Vehicles',
  'Voices'
];

export default function Home() {
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

          {audioCategories.map((category) => {
            return (
              <div className="inline-flex px-2 py-1" key={category}>
                <button
                  key={category}
                  className={catFilters.has(category) ? classNameOff : classNameOn}
                  onClick={() => updateSearch(category)}
                >
                  {category}
                </button>
              </div>
            );
          })}
        </div>
      </div>

      <CategoryFilter audioUrls={audioUrls} filters={filters} catFilters={catFilters}/>
      <Footer />
    </main>
  );
}
