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

import { useMoralisQuery } from "react-moralis";

function generateItem(item) {

    return <div class="my-1 px-1 w-full md:w-1/2 lg:my-4 lg:px-4 lg:w-1/3">


        <article class="overflow-hidden rounded-lg shadow-lg">

            <a href="#">
                <img alt="Placeholder" class="block h-auto w-full" src="https://picsum.photos/600/400/?random" />
            </a>

            <header class="flex items-center justify-between leading-tight p-2 md:p-4">
                <h1 class="text-lg">
                    <a class="no-underline hover:underline text-black dark:text-gray-300" href="#">
                            Item {item.get("itemID")}
                        </a>
                </h1>
                <p class="text-grey-darker dark:text-gray-300 text-sm">
                    11/1/19
                    </p>
            </header>

            <footer class="flex items-center justify-between leading-none p-2 md:p-4">
                <a class="flex items-center no-underline hover:underline text-b dark:text-gray-300" href="#">
                    <img alt="Placeholder" class="block rounded-full" src="https://picsum.photos/32/32/?random" />
                    <p class="ml-2 text-sm">
                            Cost: {item.get("price")}
                        </p>
                </a>
                <a class="no-underline text-grey-darker dark:text-gray-300 hover:text-red-dark" href="#">
                    <span class="hidden">Like</span>
                    <i class="fa fa-heart"></i>
                </a>
            </footer>

        </article>


    </div>
}

function displayMarketItems() {
    let items = getMarketItems();
    let res = [];
    for (let i = 0; i < items.length; i++) {
        let item = items[i];
        res.push(generateItem(item))

    }
    return <div class="flex flex-wrap -mx-1 lg:-mx-4">{res}</div>;
}

function getMarketItems() {
    const{data, error, isLoading} = useMoralisQuery("MarketplaceItems");
    if (error) {
        return <span>Error getting items from Moralis</span>;
    }
    if (isLoading) {
        return <span>Loading items...</span>;
    }
    return data;

}

// if you see SVG console errors it seems to be a react
// bug https://github.com/facebook/react/issues/15187
// there should be a fix for this but not concerning
// buy and remove button
//export default function Home() {
//
//
//return (
//    <main className="min-h-screen mx-auto dark:bg-gray-900">
//    <Nav/>
//
//    <div class="container  mx-auto px-4 md:px-12 dark:bg-gray-900">
//        {displayMarketItems()}
//    <div class="flex flex-wrap -mx-1 lg:-mx-4">
//
//    </div>
//</div>
//
//
//
//    </div>
//
//
//    )
//}

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
