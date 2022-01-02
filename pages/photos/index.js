import PageTypes from '../pageTypes.js';

const filters = [
  {
    id: 'properties',
    name: 'Properties',
    options: [
      { value: 'verfied', label: 'Verfied publisher', checked: false },
      { value: 'exlusive', label: 'Exclusive publication', checked: false },
      { value: 'commercial', label: 'Commercial license', checked: false },
      { value: 'editorial', label: 'Editorial license', checked: false }
    ]
  }
];

let photoCategories = [
  'Family',
  'Fashion',
  'Food',
  'Drink',
  'Fitness',
  'Healthcare',
  'Holidays',
  'Industrial',
  'Music',
  'City',
  'Creativity',
  'Culture',
  'Education',
  'Backgrounds',
  'Animals',
  'Architecture',
  'Business',
  'Nature',
  'Vehicles',
  'Home',
  'Outdoors',
  'Science',
  'Sports',
  'Transportation',
  'Travel',
  'Wedding',
  'Vintage',
  'People',
  'Agriculture',
  'Home',
  'Lifestyle'
];

export default function Home() {
  return <PageTypes categories={photoCategories} type="photo" filters={filters}/>
}
