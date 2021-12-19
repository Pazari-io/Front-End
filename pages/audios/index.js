import Nav from '../../components/NavBar';
import CategoryFilter from '../../components/CategoryFilter';
import Footer from '../../components/Footer';
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
  'Miscellaneous',
  'Percussion',
  'Pop',
  'Rock',
  'Soul, R&B',
  'Vocals, Voice',
  'World Beat'
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

          {audioCategories.map((category) => {
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

      <CategoryFilter audioUrls={audioUrls} />
      <Footer />
    </main>
  );
}
