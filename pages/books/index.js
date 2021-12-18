import Nav from '../../components/NavBar';
import CategoryFilter from '../../components/CategoryFilters';
import Footer from '../../components/Footer';
const products = [
  {
    id: 1,
    name: 'Basic Tee',
    href: '#',
    imageSrc:
      'https://i2-prod.walesonline.co.uk/incoming/article6890072.ece/ALTERNATES/s615b/hp1.jpg',
    imageAlt: "Front of men's Basic Tee in black.",
    price: '$35',
    color: 'Black'
  }
  // More products...
];

let bookCategories = [
  'Computer',
  'Programming',
  'Design',
  'Action',
  'Adventure',
  'Art',
  'Aarchitecture',
  'Autobiography',
  'Anthology',
  'Biography',
  'Business',
  'Children',
  'Crafts',
  'Classic',
  'Cookbook',
  'Comic',
  'Diary',
  'Encyclopedia',
  'Drama',
  'Guide',
  'Fairytale',
  'Security',
  'Fitness',
  'Health',
  'Fantasy',
  'History',
  'Home',
  'Historical',
  'Garden',
  'Humor',
  'Horror',
  'Journal',
  'Mystery',
  'Math',
  'Paranormal',
  'Memoir',
  'Philosophy',
  'Poetry',
  'Prayer',
  'Political',
  'Religion',
  'Romance',
  'Fiction',
  'Review',
  'Short',
  'Science',
  'Suspense',
  'Help',
  'Thriller',
  'Sports',
  'Western',
  'Travel',
  'Young',
  'Crime'
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

          {bookCategories.map((category) => {
            return (
              <div className="inline-flex px-2 py-1">
                <span class="px-4 py-2  text-base rounded-full text-white  bg-indigo-500 ">
                  {category}
                </span>
              </div>
            );
          })}
        </div>
      </div>

      <CategoryFilter />
      <Footer />
    </main>
  );
}
