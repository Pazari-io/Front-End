import { Swiper, SwiperSlide } from 'swiper/react';
import { useRef } from 'react';
// Import Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';

import Card from './Card';

import SwiperCore, { FreeMode, Pagination, Navigation } from 'swiper';
import ClientOnly from './ClientOnly';
import { getProductsFromDB } from './MoralisDAO';

import { Loading } from './Loading';

SwiperCore.use([Pagination, FreeMode, Navigation]);

function getSlides(props, items) {
  let res = [];
  for (let i = 0; i < items.data.length; i++) {
    let item = items.data[i];

    let slide = (
      <>
        <SwiperSlide key={Math.random().toString()}>
          <Card type={props.type} item={item} />
        </SwiperSlide>
      </>
    );
    res.push(slide);
  }
  return <>{res}</>;
}

export default function Slider(props) {
  let items = getProductsFromDB(props.slides, props.searchQuery);
  // loading
  if (!items.loaded) return <Loading type="category" />;
  // handle error
  if (items.error) return <>Error loading products</>;
  // items loaded and has the data can use items.data
  if (items.loaded && items.data) {
    let slides = getSlides(props.slides, items);

    let len = slides.props.children.length;
    let slideCount = len && len < 3 ? len : 3;
    if (len == 0) {
      return (
        <div className="py-4">
          <div>No {props.type} matches the given criteria. Please try a new search!</div>
        </div>
      );
    }

    return (
      <div className="py-4">
        <ClientOnly>
          <Swiper
            slidesPerView={slideCount}
            spaceBetween={10}
            freeMode={true}
            loop={true}
            navigation
            pagination={{ clickable: true, type: 'fraction' }}
            // breakpoints={{
            //   640: {
            //     slidesPerView: 1,
            //     spaceBetween: 20
            //   },
            //   768: {
            //     slidesPerView: 2,
            //     spaceBetween: 20
            //   },
            //   1024: {
            //     slidesPerView: 3,
            //     spaceBetween: 20
            //   }
            // }}
            className="SwiperClass">
            {slides}
          </Swiper>
        </ClientOnly>
      </div>
    );
  }else{
    return <>No Products to Show</>;
  }
  return <div>No Items found :(</div>
}
