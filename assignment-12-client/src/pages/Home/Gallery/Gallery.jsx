import React from 'react';
import SectionHeading from '../../../components/SectionHeading/SectionHeading';
import bg from '../../../assets/images/bg_gallery.jpg'
import gallery1 from '../../..//assets/images/gallery_img1.jpg'
import gallery2 from '../../..//assets/images/gallery_img2.jpg'
import gallery3 from '../../..//assets/images/gallery_img3.jpg'
import gallery4 from '../../..//assets/images/gallery_img4.jpg'
import "swiper/css";
import "swiper/css/effect-coverflow";
import "swiper/css/pagination";
import { EffectCoverflow, Pagination } from "swiper";
import { Swiper, SwiperSlide } from 'swiper/react';
import Slides from './Slides';
import './Gallery.css'
import { Bounce, Fade, Zoom } from 'react-awesome-reveal';

const Gallery = () => {

    const gallery = [gallery1, gallery2, gallery3, gallery4]

    return (
        <section className='gallery py-16 xl:py-28 bg-center bg-no-repeat px-5' style={{ backgroundImage: `url(${bg})` }}>
            <SectionHeading whiteText={true} subHeading={'gallery'} heading={'WATCH OUR SUMMER SLIDESHOW'}></SectionHeading>
                <div className='my-container'>
                    <Swiper
                        effect={"coverflow"}
                        loop={true}
                        grabCursor={true}
                        centeredSlides={true}
                        slidesPerView={"auto"}
                        coverflowEffect={{
                            rotate: 50,
                            stretch: 0,
                            depth: 100,
                            modifier: 1,
                            slideShadows: true,
                        }}
                        pagination={true}
                        modules={[EffectCoverflow, Pagination]}
                        className="mySwiper"
                    >
                        {
                            gallery.map((img, idx) => <SwiperSlide key={idx}><Slides img={img}></Slides></SwiperSlide>)
                        }
                    </Swiper>
                </div>
        </section>
    );
};

export default Gallery;