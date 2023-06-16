import React from 'react';
import useClasses from '../../../../hooks/useClasses';
import SingleClassDb from './SignleClassDb/SingleClassDb';
import FadeLoader from "react-spinners/FadeLoader";
import { Helmet } from 'react-helmet-async';

const ManageClasses = () => {

    const { classes, refetch, loading } = useClasses()

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
                <title>Manage Classes - Hello Summer</title>
            </Helmet>
            <section className='py-24 w-full px-24'>
                <div className="overflow-x-auto">
                    <table className="table">
                        <thead>
                            <tr>
                                <th></th>
                                <th>Name</th>
                                <th>Instructor</th>
                                <th>Instructor Email</th>
                                <th>Available Seats</th>
                                <th>Status</th>
                                <th></th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                classes?.map(cls => <tr key={cls._id}><SingleClassDb cls={cls} refetch={refetch} /></tr>)
                            }
                        </tbody>

                    </table>
                </div>
            </section>
        </>
    );
};

export default ManageClasses;