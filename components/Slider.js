import { Swiper, SwiperSlide } from 'swiper/react';
import { useState } from 'react';
// Import Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';

//import Card from './Card';

import SwiperCore, { FreeMode, Pagination, Navigation } from 'swiper';
import ClientOnly from './ClientOnly';

SwiperCore.use([Pagination, FreeMode, Navigation]);

export default function Slider(props) {
  //const [thumbsSwiper, setThumbsSwiper] = useState(null);
  let len = props.slides.props.children.length;
  let slideCount = len && len < 3 ? len : 3;
  if (len == 0) {
    return  <div className="py-4">
      <ClientOnly>
        <div>No {props.type} matches the given criteria.  Please try a new search!</div>
      </ClientOnly>
    </div>
  } 

  return (
    <div className="py-4">
      <ClientOnly>
        <Swiper
          slidesPerView={slideCount}
          spaceBetween={10}
          freeMode={true}
          loop={true}
          navigation={true}
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
          {props.slides}
        </Swiper>
      </ClientOnly>
    </div>
  );
}
