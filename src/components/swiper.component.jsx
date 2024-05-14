import React, { useRef, useEffect } from 'react';
import Swiper from 'swiper';
import 'swiper/swiper-bundle.css';

const BannerSlider = () => {
  const swiperRef = useRef(null);

  useEffect(() => {
    if (swiperRef.current) {
      new Swiper(swiperRef.current, {
        loop: true,
        autoplay: {
          delay: 5000,
        },
        pagination: {
          el: '.swiper-pagination',
          clickable: true,
        },
      });
    }
  }, []);

  return (
    <div className="swiper-container" ref={swiperRef}>
      <div className="swiper-wrapper">
        <div className="swiper-slide">
          <img src="/src/imgs/slide1.png" alt="Slide 1" />
        </div>
        <div className="swiper-slide">
          <img src="/src/imgs/slide2.png" alt="Slide 2" />
        </div>
        <div className="swiper-slide">
          <img src="/src/imgs/slide3.png" alt="Slide 3" />
        </div>
      </div>
      <div className="swiper-pagination"></div>
    </div>
  );
};

export default BannerSlider;
