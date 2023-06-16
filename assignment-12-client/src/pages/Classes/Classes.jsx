import React from 'react';
import ApprovedClasses from './ApprovedClasses/ApprovedClasses';
import useClasses from '../../hooks/useClasses';
import FadeLoader from "react-spinners/FadeLoader";

import SectionHeading from '../../components/SectionHeading/SectionHeading';
import { Helmet } from 'react-helmet-async';

const Classes = () => {

    const { classes, refetch, loading } = useClasses()

    if (loading) {
        return (
            <div className='w-screen h-screen flex items-center justify-center'>
                <FadeLoader color="#000" />
            </div>
        )
    }

    return (
        <>
            <Helmet>
                <title>Classes - Hello Summer</title>
            </Helmet>
            <section className='pt-40 pb-24'>
                <SectionHeading subHeading={'classes'} heading={'Our Qualified Classes'} />
                <ApprovedClasses classes={classes} refetch={refetch}></ApprovedClasses>
            </section>
        </>
    );
};

export default Classes;