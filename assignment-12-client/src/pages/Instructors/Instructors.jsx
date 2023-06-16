import React from 'react';
import useInstructors from '../../hooks/useInstructors';
import FadeLoader from "react-spinners/FadeLoader";
import SectionHeading from '../../components/SectionHeading/SectionHeading';
import InstructorCard from '../Shared/InstructorCard/InstructorCard';
import { Helmet } from 'react-helmet-async';

const Instructors = () => {

    const { instructors, isLoading, refetch } = useInstructors()

    if (isLoading) {
        return (
            <div className='w-screen h-screen flex items-center justify-center'>
                <FadeLoader color="#000" />
            </div>
        )
    }

    return (
        <>
            <Helmet>
                <title>Instructors - Hello Summer</title>
            </Helmet>
            <section className='pt-40 pb-24'>
                <SectionHeading subHeading={'instructors'} heading={'Our Qualified instructors'} />
                <div className="my-container grid grid-cols-3 gap-10 mt-20">
                    {
                        instructors?.map(instructor => <InstructorCard key={instructor._id} instructor={instructor} refetch={refetch}></InstructorCard>)
                    }
                </div>
            </section>
        </>
    );
};

export default Instructors;