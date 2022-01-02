import PageTypes from '../pageTypes.js';

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
  return <PageTypes categories={bookCategories} type="book" filters={filters}/>
}
