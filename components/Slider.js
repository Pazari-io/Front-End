import { Swiper, SwiperSlide } from 'swiper/react';
import { useState } from 'react';
// Import Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';

import Card from './Card';

import SwiperCore, { FreeMode, Pagination, Navigation } from 'swiper';

SwiperCore.use([Pagination, FreeMode, Navigation]);

export default function Slider() {
  const [thumbsSwiper, setThumbsSwiper] = useState(null);

  return (
    <div className="py-4">
      <Swiper
        slidesPerView={1}
        spaceBetween={10}
        freeMode={true}
        loop={true}
        navigation={true}
        breakpoints={{
          640: {
            slidesPerView: 1,
            spaceBetween: 30
          },
          768: {
            slidesPerView: 2,
            spaceBetween: 30
          },
          1024: {
            slidesPerView: 4,
            spaceBetween: 30
          }
        }}
        className="MySwiper">
        <SwiperSlide>
          <Card />
        </SwiperSlide>
        <SwiperSlide>
          <Card />
        </SwiperSlide>
        <SwiperSlide>
          <Card />
        </SwiperSlide>
      </Swiper>
    </div>
  );
}
