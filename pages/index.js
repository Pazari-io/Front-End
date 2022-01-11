import Image from 'next/image';
import Link from 'next/link';
import Nav from '../components/NavBar';
import Search from '../components/Search';
import Footer from '../components/Footer';
import Slider from '../components/Slider';
import Card from '../components/Card';

// category images going with png for the svg bug
import Audios from '../public/images/Audios.png';
import Books from '../public/images/Books.png';
import Games from '../public/images/Games.png';
import Photos from '../public/images/Photos.png';
//import Socials from '../public/images/Socials.png';
import Videos from '../public/images/Videos.png';
import Graphics from '../public/images/Graphics.png';
import Banner from '../public/images/Banner.png';

// if you see SVG console errors it seems to be a react
// bug https://github.com/facebook/react/issues/15187
// there should be a fix for this but not concerning
// buy and remove button

export default function Home() {
  return (
    <main className="min-h-screen mx-auto dark:bg-gray-900">
      <Nav />
      {/* <Search /> */}

      <div>
        <h1 className="py-4 text-4xl font-extrabold tracking-tight text-gray-900 px-14 dark:text-indigo-600">
          Indie Publication revolution
        </h1>

        <h3 className="py-4 text-xl px-14 dark:text-gray-200">
          Pazari a new era of publishing digital assets
        </h3>
      </div>

      <div className="py-14">
        <div className="flex items-center justify-between w-full px-4 py-4 md:px-18 lg:px-28 ">
          <Link href="/books">
            <span className="px-2 mx-2 text-center bg-gray-300 rounded-lg cursor-pointer dark:bg-gray-800 md:w-1/3">
              <Image src={Books} alt="Picture of the author" width={256} height={256} />
              <h3 className="py-2 text-2xl dark:text-white">E-Books</h3>
            </span>
          </Link>

          <Link href="/audios">
            <span className="px-2 mx-2 text-center bg-gray-300 rounded-lg cursor-pointer dark:bg-gray-800 md:w-1/3">
              <Image src={Audios} alt="Picture of the author" width={256} height={256} />
              <h3 className="py-2 text-2xl dark:text-white">Audios</h3>
            </span>
          </Link>

          <Link href="/videos">
            <span className="px-2 mx-2 text-center bg-gray-300 rounded-lg cursor-pointer dark:bg-gray-800 md:w-1/3">
              <Image src={Videos} alt="Picture of the author" width={256} height={256} />
              <h3 className="py-2 text-2xl dark:text-white">Videos</h3>
            </span>
          </Link>
        </div>

        <div className="flex items-center justify-center w-full py-4 px-28 ">
          <Link href="/photos">
            <span className="px-2 mx-2 text-center bg-gray-300 rounded-lg cursor-pointer dark:bg-gray-800 md:w-1/3">
              <Image src={Photos} alt="Picture of the author" width={256} height={256} />
              <h3 className="py-2 text-2xl dark:text-white">Photos</h3>
            </span>
          </Link>

          <Link href="/graphics">
            <span className="px-2 mx-2 text-center bg-gray-300 rounded-lg cursor-pointer dark:bg-gray-800 md:w-1/3">
              <Image src={Graphics} alt="Picture of the author" width={256} height={256} />
              <h3 className="py-2 text-2xl dark:text-white">Graphics</h3>
            </span>
          </Link>

          <Link href="/games">
            <span className="px-2 mx-2 text-center bg-gray-300 rounded-lg cursor-pointer dark:bg-gray-800 md:w-1/3">
              <Image src={Games} alt="Picture of the author" width={256} height={256} />
              <h3 className="py-2 text-2xl dark:text-white">Game Assets</h3>
            </span>
          </Link>
        </div>
      </div>

      <Footer />
    </main>
  );
}
