import Image from 'next/image';
import Link from 'next/link';
import Audios from '../public/images/Audios.png';
import Books from '../public/images/Books.png';
import Games from '../public/images/Games.png';
import Photos from '../public/images/Photos.png';
import Videos from '../public/images/Videos.png';
import Graphics from '../public/images/Graphics.png';

export default function Marketplace() {
  return (
    <main className="mx-auto dark:bg-gray-900">
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
    </main>
  );
}