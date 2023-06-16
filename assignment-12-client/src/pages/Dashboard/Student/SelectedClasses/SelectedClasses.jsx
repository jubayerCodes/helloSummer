import React from 'react';
import useSelectedClasses from '../../../../hooks/useSelectedClasses';
import FadeLoader from "react-spinners/FadeLoader";
import SectionHeading from '../../../../components/SectionHeading/SectionHeading';
import SingleSelectedClass from './SingleSelectedClass/SingleSelectedClass';
import { Helmet } from 'react-helmet-async';

const SelectedClasses = () => {

    const { selectedClasses, refetch, isLoading } = useSelectedClasses()

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
                <title>Selected Classes - Hello Summer</title>
            </Helmet>
            <section className='py-24 w-full px-24'>
                <SectionHeading subHeading={'selected classes'} heading={'classes you selected'} />
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
                                <th></th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                selectedClasses?.map(cls => <tr key={cls._id}><SingleSelectedClass cls={cls} refetch={refetch} /></tr>)
                            }
                        </tbody>

                    </table>
                </div>
            </section>
        </>
    );
};

export default SelectedClasses;