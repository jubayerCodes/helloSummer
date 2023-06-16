import React from 'react';
import useAxiosSecure from '../../../../../hooks/useAxiosSecure';
import Swal from 'sweetalert2';
import { FaCheck } from 'react-icons/fa';

const SingleClassDb = ({ cls, refetch }) => {

    const { axiosSecure } = useAxiosSecure()

    const { name, instructorEmail, instructor, image, _id, availableSeats, status, students } = cls

    const handleDeny = (id) => {
        Swal.fire({
            title: 'Are you sure?',
            text: "You won't be able to revert this!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, Deny!'
        }).then((result) => {
            if (result.isConfirmed) {

                axiosSecure.patch(`/classes/${id}`, { status: 'denied' })
                    .then(res => {
                        if (res?.data?.modifiedCount > 0) {
                            Swal.fire(
                                'Denied!',
                                'Class denied successfully',
                                'success'
                            ).then(() => {
                                refetch()
                            })
                        }
                    })
            }
        })
    }

    const handleApprove = (id) => {
        Swal.fire({
            title: 'Are you sure?',
            text: "You won't be able to revert this!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, Approve!'
        }).then((result) => {
            if (result.isConfirmed) {

                axiosSecure.patch(`/classes/${id}`, { status: 'approved' })
                    .then(res => {
                        if (res?.data?.modifiedCount > 0) {
                            Swal.fire(
                                'Approve!',
                                'Class approved successfully',
                                'success'
                            ).then(() => {
                                refetch()
                            })
                        }
                    })

            }
        })
    }

    const handleFeedback = (id) => {
        Swal.fire({
            title: 'Send Your feedback',
            input: 'textarea',
            inputAttributes: {
                autocapitalize: 'off'
            },
            showCancelButton: true,
            confirmButtonText: 'Send Feedback',
            allowOutsideClick: () => !Swal.isLoading()
        }).then((result) => {
            if (result.isConfirmed) {

                const feedback = result.value

                axiosSecure.patch(`/classes/${id}`, { feedback: feedback })
                    .then(res => {
                        if (res?.data?.modifiedCount > 0) {
                            Swal.fire(
                                'Feedback sent!',
                                'Feedback sent successfully',
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
                        <img src={image} alt="Avatar Tailwind CSS Component" />
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
                {instructor}
            </td>
            <td>
                <span>{instructorEmail}</span>
            </td>
            <td>
                {availableSeats}
            </td>
            <td>
                <span className='capitalize'>{status}</span>
            </td>
            <th className='flex justify-end gap-4'>
                <button onClick={() => handleFeedback(_id)} className="btn btn-outline">
                    Feedback
                </button>
                <button disabled={status !== 'pending'} onClick={() => handleDeny(_id)} className="btn btn-outline">
                    Deny
                </button>
                <button disabled={status !== 'pending'} onClick={() => handleApprove(_id)} className="btn btn-outline">
                    Approve
                </button>
            </th>
        </>
    );
};

export default SingleClassDb;