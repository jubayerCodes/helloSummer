import React, { useState } from 'react';
import HomeBanner from './HomeBanner/HomeBanner';
import FeaturedInstructors from './FeaturedInstructors/FeaturedInstructors';
import FeaturedClasses from './FeaturedClasses/FeaturedClasses';
import Gallery from './Gallery/Gallery';
import { Fade } from 'react-awesome-reveal';
import { Helmet } from 'react-helmet-async';

const Home = () => {

    return (
        <>
            <Helmet>
                <title>Hello Summer</title>
            </Helmet>
            <HomeBanner></HomeBanner>
            <Fade>
                <FeaturedClasses></FeaturedClasses>
                <Gallery></Gallery>
                <FeaturedInstructors></FeaturedInstructors>
            </Fade>
        </>
    );
};

export default Home;