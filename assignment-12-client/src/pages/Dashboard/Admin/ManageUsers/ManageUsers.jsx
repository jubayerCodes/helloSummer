import React from 'react';
import useUsers from '../../../../hooks/useUsers';
import SingleUser from './SingleUser/SingleUser';
import FadeLoader from "react-spinners/FadeLoader";
import { Helmet } from 'react-helmet-async';

const ManageUsers = () => {

    const { admins, instructors, students, refetch, isLoading } = useUsers()

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
                <title>Manage Users - Hello Summer</title>
            </Helmet>

            <section className='py-24 w-full px-24'>
                <div className="overflow-x-auto">
                    <table className="table">
                        {/* head */}
                        <thead>
                            <tr>
                                <th></th>
                                <th>Name</th>
                                <th>Email</th>
                                <th>Role</th>
                                <th>Edit Role</th>
                                <th></th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                admins?.map(user => <tr key={user._id}><SingleUser user={user} refetch={refetch} /></tr>)
                            }
                            {
                                instructors?.map(user => <tr key={user._id}><SingleUser user={user} refetch={refetch} /></tr>)
                            }
                            {
                                students?.map(user => <tr key={user._id}><SingleUser user={user} refetch={refetch} /></tr>)
                            }
                        </tbody>

                    </table>
                </div>
            </section>
        </>
    );
};

export default ManageUsers;