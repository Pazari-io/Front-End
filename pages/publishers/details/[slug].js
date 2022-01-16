import Nav from '../../../components/NavBar';
import Slider from '../../../components/Slider';
import Footer from '../../../components/Footer';
import { SwiperSlide } from 'swiper/react';
import Card from '../../../components/Card';
import Pagination from '../../../components/Pagination';
const bookSlides = (
  <>
    {/* <SwiperSlide>
      <Card type="book" />
    </SwiperSlide>
    <SwiperSlide>
      <Card type="book" />
    </SwiperSlide>
    <SwiperSlide>
      <Card type="book" />
    </SwiperSlide> */}
  </>
);

export default function Profile(props) {
  return (
    <main className="mx-auto dark:bg-gray-900 dark:text-gray-300">

      <div className="contrainer px-14 ">
        <div className="flex items-center justify-center w-full px-4 py-4 md:px-18 lg:px-28 ">
          <h1 className="text-2xl dark:text-gray-300">Awesome Author </h1>
          <img
            className="w-10 h-10 mx-2"
            src="https://verified-badge.vedb.me/wp-content/uploads/2020/07/Facebook-Logo-Verified-Badge-PNG.png"></img>
        </div>

        <p className="px-8 py-2 mb-4">
          Adam Silvera is the New York Times bestselling author of They Both Die at the End, More
          Happy Than Not, and History Is All You Left Me and—together with Becky Albertalli—coauthor
          of What If It’s Us. He was named a Publishers Weekly Flying Start. Adam was born and
          raised in the Bronx. He was a bookseller before shifting to children’s publishing and has
          worked at a literary development company and a creative writing website for teens and as a
          book reviewer of children’s and young adult novels. He is tall for no reason and lives in
          Los Angeles. Visit him online at www.adamsilvera.com.
        </p>

        <hr className="my-4 border-indigo-600" />
        <input
          type="text"
          placeholder="Search ..."
          className="w-1/3 rounded-lg dark:bg-gray-700 dark:text-gray-300"
        />

        <h1 className="py-8 text-2xl dark:text-indigo-600">Latest releases </h1>

        {/* <Slider slides={bookSlides} />
        <Slider slides={bookSlides} />
        <Slider slides={bookSlides} /> */}

        <Pagination />
      </div>

    </main>
  );
}
