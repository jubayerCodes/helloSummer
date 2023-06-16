import React from 'react';
import BannerSlide from '../BannerSlide/BannerSlide';
import banner1 from '../../../assets/images/homeBanner1.jpg'
import banner2 from '../../../assets/images/homeBanner2.jpg'
import banner3 from '../../../assets/images/homeBanner3.jpg'

import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";
import { Autoplay, Pagination } from 'swiper';

const slides = [banner1, banner2, banner3]

const HomeBanner = () => {
    return (

        <Swiper pagination={true} modules={[Pagination, Autoplay]} className="mySwiper" autoplay={{ delay: 2500, disableOnInteraction: false, }}>
            {
                slides.map((slide, idx) => <SwiperSlide key={idx}><BannerSlide bg={slide}></BannerSlide></SwiperSlide>)
            }
        </Swiper>
    );
};

export default HomeBanner;