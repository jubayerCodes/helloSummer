import React from 'react';
import SingleMyClass from './SingleMyClass/SingleMyClass';
import useMyClasses from '../../../../hooks/useMyClasses';
import SectionHeading from '../../../../components/SectionHeading/SectionHeading';
import FadeLoader from "react-spinners/FadeLoader";
import { Helmet } from 'react-helmet-async';

const MyClasses = () => {
    const { myClasses, refetch, loading } = useMyClasses()

    if (loading) {
        return (
            <div className='w-full h-screen flex items-center justify-center'>
                <FadeLoader color="#000" />
            </div>
        )
    }

    return (
        <>
            <Helmet>
                <title>My Classes - Hello Summer</title>
            </Helmet>
            <section className='py-24 w-full px-24'>
                <SectionHeading subHeading={'classes'} heading={'My classes'} />
                <div className="overflow-x-auto mt-16">
                    <table className="table">
                        <thead>
                            <tr>
                                <th></th>
                                <th>Name</th>
                                <th>Available Seats</th>
                                <th>Enrolled Students</th>
                                <th>Price</th>
                                <th>Status</th>
                                <th>Feedback</th>
                                <th></th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                myClasses?.map(cls => <tr key={cls._id}><SingleMyClass cls={cls} refetch={refetch} /></tr>)
                            }
                        </tbody>

                    </table>
                </div>
            </section>
        </>
    );
};

export default MyClasses;