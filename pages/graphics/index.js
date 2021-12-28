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
    id: 'software',
    name: 'Software',
    options: [
      { value: 'canva', label: 'Canva', checked: false },
      { value: 'illustrator', label: 'Adobe Illustrator', checked: false },
      { value: 'photoshop', label: 'Adobe Photoshop', checked: false },
      { value: 'xd', label: 'Adobe XD', checked: false },
      { value: 'sketch', label: 'Sketch', checked: false },
      { value: 'pages', label: 'Apple Pages', checked: false },
      { value: 'slides', label: 'Google Slides', checked: false },
      { value: 'powerpoint', label: 'MS PowerPoint', checked: false }
    ]
  }
];

let photoCategories = [
  'Vectors',
  'Backgrounds',
  'Print Templates',
  'Logo Templates',
  'Web Elements',
  'Email Templates',
  'Presentation Templates',
  'Icons',
  'Fonts',
  'YouTube',
  'Facebook',
  'Instagram',
  'LinkedIn',
  'TikTok',
  'Twitter',
  'Vimeo',
  'Twitch',
  'Bundle'
];

export default function Graphics() {
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

      <CategoryFilter type="graphic" filters={filters} />
      <Footer />
    </main>
  );
}
