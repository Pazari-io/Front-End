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
  return (
    <main className="min-h-screen mx-auto dark:bg-gray-900">
      <Nav />

      <div className="bg-white dark:bg-gray-900 ">
        <div className="px-4 mx-auto sm:py-24 lg:py-12 sm:px-6 lg:px-8">
          <h1 className="py-4 text-4xl font-extrabold tracking-tight text-gray-900 dark:text-indigo-600">
            Explore categories
          </h1>

          {photoCategories.map((category) => {
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

      <CategoryFilter photos={[1, 2]} filters={filters} />
      <Footer />
    </main>
  );
}
