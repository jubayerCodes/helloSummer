import React from 'react';
import { Bounce } from 'react-awesome-reveal';
import { Link } from 'react-router-dom';

const BannerSlide = ({ bg }) => {

    // TODO: Helmet
    return (
        <div className="hero min-h-screen" style={{ backgroundImage: `url(${bg})` }}>
            <div className="hero-overlay bg-opacity-40"></div>
            <div className="hero-content text-center text-white">
                <Bounce>
                    <div className="w-full">
                        <h1 className="text-5xl xl:text-7xl font-bold mb-5 xl:mb-10">Make your Summer</h1>
                        <h2 className='text-3xl xl:text-5xl handwriting capitalize mb-10'>unforgettable!</h2>
                        <Link to='/classes'>
                            <button className="my-btn">explore</button>
                        </Link>
                    </div>
                </Bounce>
            </div>
        </div>
    );
};

export default BannerSlide;