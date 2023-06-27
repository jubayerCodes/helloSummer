import React from 'react';
import facilityImg from '../../../assets/images/gallery_img4-540x675.jpg'
import { FaCheckCircle } from "react-icons/fa";

const AboutSection = () => {
    return (
        <section className='px-5'>
            <div className="my-container flex flex-col xl:flex-row justify-between items-center py-20 gap-16">
                <div className='flex-1'>
                    <div className='mb-10 mx-auto'>
                        <div className="divider uppercase w-[150px] font-semibold text-base text-[#9abe29]">ABOUT US</div>
                        <h2 className={`text-left text-3xl font-bold underline uppercase`}>
                            WE ARE THE BEST SUMMER CAMP!
                        </h2>
                    </div>
                    <p className='text-[#757c7e] mb-10'>
                        <span className='text-[#9abe29] font-semibold'>7Hills Camp is for Boys and Girls. </span>
                        Nestled on the sandy beaches of beautiful Lake Ossipee amidst the White Mountains of New Hampshire, Camp offers a summer experience rich in fun, friendship, learning and adventure. Campers range in age from seven to fifteen.
                    </p>
                    <button className="my-btn">
                        Find Out More
                    </button>
                </div>
                <div className='flex-1 flex flex-col-reverse xl:flex-row justify-between items-start xl:items-center gap-12 xl:gap-5'>

                    <div className='flex-1'>
                        <h2 className={`text-left text-3xl font-bold underline uppercase`}>
                            facilities
                        </h2>
                        <ul className='list-inside list-disc facilities-list mt-10 flex flex-col gap-3 font-semibold'>
                            <li className='flex items-center justify-start gap-2'><FaCheckCircle className='text-[#fc5640]' />BOYS & GIRLS</li>
                            <li className='flex items-center justify-start gap-2'><FaCheckCircle className='text-[#fc5640]' />AGES 7-15</li>
                            <li className='flex items-center justify-start gap-2'><FaCheckCircle className='text-[#fc5640]' />TEAM & INDIVIDUAL SPORTS</li>
                            <li className='flex items-center justify-start gap-2'><FaCheckCircle className='text-[#fc5640]' />PERFORMING & CREATIVE ARTS</li>
                            <li className='flex items-center justify-start gap-2'><FaCheckCircle className='text-[#fc5640]' />WATERFRONT ACTIVITIES</li>
                            <li className='flex items-center justify-start gap-2'><FaCheckCircle className='text-[#fc5640]' />SPECIAL EVENTS & TRIPS</li>
                            <li className='flex items-center justify-start gap-2'><FaCheckCircle className='text-[#fc5640]' />PROFESSIONAL STAFF</li>
                        </ul>
                    </div>
                    <div className='flex-1'>
                        <img src={facilityImg} alt="" />
                    </div>
                </div>
            </div>
        </section>
    );
};

export default AboutSection;