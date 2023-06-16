import React from 'react';
import FadeLoader from "react-spinners/FadeLoader";
import useClasses from '../../../hooks/useClasses';
import SectionHeading from '../../../components/SectionHeading/SectionHeading';
import ApprovedClasses from '../../Classes/ApprovedClasses/ApprovedClasses';
import useFeaturedClasses from '../../../hooks/useFeaturedClasses';
import { Link } from 'react-router-dom';

const FeaturedClasses = () => {
    const { featuredClasses, refetch, loading } = useFeaturedClasses()



    if (loading) {
        return (
            <div className='w-screen h-screen flex items-center justify-center'>
                <FadeLoader color="#000" />
            </div>
        )
    }

    return (
        <section className='py-16 xl:py-28 px-5'>
            <SectionHeading subHeading={'classes'} heading={'Our Featured Classes'} />
            <ApprovedClasses featured={true} classes={featuredClasses} refetch={refetch}></ApprovedClasses>
            <Link to={'/classes'} className='mx-auto block w-fit'>
                <button className="my-btn mt-10">
                    See All
                </button>
            </Link>
        </section>
    );
};

export default FeaturedClasses;