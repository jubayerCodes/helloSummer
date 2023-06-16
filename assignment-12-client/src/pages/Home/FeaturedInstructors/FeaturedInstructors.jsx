import React from 'react';
import SectionHeading from '../../../components/SectionHeading/SectionHeading';
import useFeaturedInstructors from '../../../hooks/useFeaturedInstructors';
import FadeLoader from "react-spinners/FadeLoader";
import InstructorCard from '../../Shared/InstructorCard/InstructorCard';
import { Link } from 'react-router-dom';

const FeaturedInstructors = () => {

    const { featuredInstructors, isLoading, refetch } = useFeaturedInstructors()

    if (isLoading) {
        return (
            <div className='w-screen h-screen flex items-center justify-center'>
                <FadeLoader color="#000" />
            </div>
        )
    }

    return (
        <section className='py-16 xl:py-28 px-5'>
            <SectionHeading subHeading={'instructors'} heading={'Our Featured instructors'} />
            <div className="my-container grid grid-cols-1 xl:grid-cols-3 gap-10 mt-20">
                {
                    featuredInstructors?.map(instructor => <InstructorCard key={instructor._id} instructor={instructor} refetch={refetch}></InstructorCard>)
                }
            </div>
            <Link to={'/instructors'} className='mx-auto block w-fit'>
                <button className="my-btn mt-10">
                    See All
                </button>
            </Link>
        </section>
    );
};

export default FeaturedInstructors;