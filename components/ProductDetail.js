import React, { useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/free-mode';
import 'swiper/css/navigation';
import 'swiper/css/thumbs';

import SwiperCore, { FreeMode, Navigation, Thumbs } from 'swiper';
SwiperCore.use([FreeMode, Navigation, Thumbs]);

function getSlides(product, thumbsSwiper, setThumbsSwiper) {
  let result = [];
  let productImageUrls = product.get('productImageUrls');
  if (!productImageUrls || productImageUrls.length == 0) {
    let url = product.get('previewUrl');
    result.push(
      <SwiperSlide>
        <img src={url} />
      </SwiperSlide>
    );
    thumbResult.push()
  } else {
    let i = 0;
    for (const val of productImageUrls) {
    result.push(
      <SwiperSlide key={i}>
        <img src={val} />
      </SwiperSlide>
    );
    }
  }

  return (
    <>
      <Swiper
        style={{ '--swiper-navigation-color': '#fff', '--swiper-pagination-color': '#fff' }}
        loop={true}
        spaceBetween={10}
        navigation={true}
        thumbs={{ swiper: thumbsSwiper }}
        className="mySwiper2">
          {result}
      </Swiper>
      <Swiper
        onSwiper={setThumbsSwiper}
        loop={true}
        spaceBetween={10}
        slidesPerView={4}
        freeMode={true}
        watchSlidesProgress={true}
        className="mySwiper">
          {result}
        </Swiper>
        </>
  );
}

export default function BookDetail(props) {
  const [thumbsSwiper, setThumbsSwiper] = useState(null);

  return <>{getSlides(props.product, thumbsSwiper, setThumbsSwiper)} </>;

 // ["https://swiperjs.com/demos/images/nature-3.jpg", "https://swiperjs.com/demos/images/nature-2.jpg", "https://swiperjs.com/demos/images/nature-5.jpg"]
}
