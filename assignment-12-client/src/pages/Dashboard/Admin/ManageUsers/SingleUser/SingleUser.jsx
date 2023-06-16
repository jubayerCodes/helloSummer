import axios from 'axios';
import React from 'react';
import { FaEdit, FaNotesMedical } from 'react-icons/fa';
import Swal from 'sweetalert2';
import useAxiosSecure from '../../../../../hooks/useAxiosSecure';

const SingleUser = ({ user, refetch }) => {

    const { axiosSecure } = useAxiosSecure()

    const { name, email, role, photo, _id } = user

    const handleEditRole = (newRole) => {
        Swal.fire({
            title: 'Are you sure?',
            text: "You won't be able to revert this!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, update it!'
        }).then((result) => {
            if (result.isConfirmed) {

                axiosSecure.patch(`/users/${email}`, { role: newRole })
                    .then(res => {
                        if (res?.data?.modifiedCount > 0) {
                            Swal.fire(
                                'Updated!',
                                'Role updated successfully',
                                'success'
                            ).then(() => {
                                refetch()
                            })
                        }
                    })

            }
        })
    }

    const handleDelete = (email) => {

        Swal.fire({
            title: 'Are you sure?',
            text: "You won't be able to revert this!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, Delete!'
        }).then((result) => {
            if (result.isConfirmed) {

                axiosSecure.delete(`/users/${email}`)
                    .then(res => {
                        if (res?.data?.deletedCount > 0) {
                            Swal.fire(
                                'Logged Out!',
                                'You are successfully logged out.',
                                'success'
                            ).then(() => {
                                refetch()
                            })
                        }
                    })
            }

        })
    }

    return (
        <>
            <td>
                <div className="avatar">
                    <div className="mask mask-squircle w-12 h-12">
                        <img src={photo} alt="Avatar Tailwind CSS Component" />
                    </div>
                </div>
            </td>
            <td>
                <div className="flex items-center space-x-3">
                    <div>
                        <div className="font-bold">{name}</div>
                    </div>
                </div>
            </td>
            <td>
                {email}
            </td>
            <td>
                <span className='text-lg capitalize'>{role}</span>
            </td>
            <td className='flex flex-col justify-center gap-2 w-[220px]'>

                <button onClick={() => handleEditRole('admin')} className="btn btn-outline btn-sm" disabled={role === 'admin'}>
                    Make Admin
                </button>
                <button onClick={() => handleEditRole('instructor')} className="btn btn-outline btn-sm" disabled={role === 'instructor'}>
                    Make Instructor
                </button>

            </td>
            <th>
                {
                    role !== 'admin' && <button onClick={() => handleDelete(email)} className="btn btn-circle btn-outline">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" /></svg>
                    </button>
                }
            </th>
        </>
    );
};

export default SingleUser;