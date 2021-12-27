import Nav from '../../components/NavBar';
import CategoryFilter from '../../components/CategoryFilter';
import Footer from '../../components/Footer';

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
  },
  {
    id: 'type',
    name: 'Type',
    options: [
      { value: 'stock', label: 'Stock Videos', checked: false },
      { value: 'template', label: 'Templates', checked: false }
    ]
  },
  {
    id: 'resolution',
    name: 'Resolutions',
    options: [
      { value: '2k', label: '2K', checked: false },
      { value: '4k', label: '4K', checked: false },
      { value: '5k', label: '5K+', checked: false }
    ]
  },
  {
    id: 'software',
    name: 'Software',
    options: [
      { value: 'aftereffects', label: 'Adone After Effect', checked: false },
      { value: 'premiere', label: 'Adobe Premiere Pro', checked: false },
      { value: 'davinci', label: 'Davinci Resolve', checked: false },
      { value: 'finalcut', label: 'Final Cut Pro', checked: false },
      { value: 'motiongraphic', label: 'Motion Graphics', checked: false }
    ]
  }
];

let videoCategories = [
  'People',
  'Nature',
  'Business',
  'Corporate',
  'Food',
  'Lifestyle',
  'Sports',
  'Building',
  'Medical',
  'Technology',
  'Industrial',
  'Holidays',
  'Vehicles',
  'City',
  'Education',
  'Overhead',
  'Time Lap',
  'Science',
  'Slow Motion',
  'Construction',
  'Special effects',
  'Kids',
  'Religious',
  'Weather',
  'Military',
  'Stop Mot',
  'Cartoons'
];

export default function Home() {
  return (
    <main className="min-h-screen mx-auto dark:bg-gray-900">
      <Nav />

      <div className="bg-white dark:bg-gray-900 ">
        <div className="px-4 mx-auto sm:py-24 lg:py-12 sm:px-6 lg:px-8">
          <h1 className="py-4 text-4xl font-extrabold tracking-tight text-gray-900 dark:text-indigo-600">
            Explore categories
          </h1>

          {videoCategories.map((category) => {
            return (
              <div className="inline-flex px-2 py-1" key={category}>
                <span className="px-4 py-2 text-base text-white bg-indigo-500 rounded-full ">
                  {category}
                </span>
              </div>
            );
          })}
        </div>
      </div>

      <CategoryFilter videos={[1, 2]} filters={filters} />
      <Footer />
    </main>
  );
}
