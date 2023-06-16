import React from 'react';
import useEnrolledClasses from '../../../../hooks/useEnrolledClasses';
import { FadeLoader } from 'react-spinners';
import SectionHeading from '../../../../components/SectionHeading/SectionHeading';
import SingleEnrolledClass from './SingleEnrolledClass/SingleEnrolledClass';
import { Helmet } from 'react-helmet-async';

const EnrolledClasses = () => {

    const { enrolledClasses, isLoading, refetch } = useEnrolledClasses()

    if (isLoading) {
        return (
            <div className='w-full h-screen flex items-center justify-center'>
                <FadeLoader color="#000" />
            </div>
        )
    }

    return (
        <>
            <Helmet>
                <title>Enrolled Classes - Hello Summer</title>
            </Helmet>
            <section className='py-24 w-full px-24'>
                <SectionHeading subHeading={'enrolled classes'} heading={'classes you enrolled'} />

                <div className="overflow-x-auto mt-16">
                    <table className="table">
                        <thead>
                            <tr>
                                <th></th>
                                <th>Name</th>
                                <th>Available Seats</th>
                                <th>Students</th>
                                <th>Price</th>
                                <th>Instructor</th>
                                <th>Instructor Email</th>
                                <th>Paid</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                enrolledClasses?.map(cls => <tr key={cls._id}><SingleEnrolledClass cls={cls} refetch={refetch} /></tr>)
                            }
                        </tbody>

                    </table>
                </div>
            </section>
        </>
    );
};

export default EnrolledClasses;