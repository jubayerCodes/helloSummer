import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import Swal from 'sweetalert2';
import useAxiosSecure from '../../../../../hooks/useAxiosSecure';
import { AuthContext } from '../../../../../providers/AuthProvider';
import useEnrolledClasses from '../../../../../hooks/useEnrolledClasses';

const SingleSelectedClass = ({ cls, refetch }) => {
    const { name, instructor, image, _id, availableSeats, instructorEmail, students, price } = cls
    const { axiosSecure } = useAxiosSecure()
    const { user } = useContext(AuthContext)

    const { enrolledClasses } = useEnrolledClasses()

    const exist = enrolledClasses.find(c => c._id === _id)

    const handleDelete = (id) => {
        Swal.fire({
            title: 'Are you sure?',
            text: "You won't be able to revert this!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, delete it!'
        }).then((result) => {
            if (result.isConfirmed) {

                axiosSecure.delete(`/selectedClasses/${id}?studentEmail=${user?.email}`)
                    .then(res => {
                        if (res.data.deletedCount > 0) {

                            Swal.fire(
                                'Deleted!',
                                'Your file has been deleted.',
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
                {availableSeats}
            </td>
            <td>
                <span>{students}</span>
            </td>
            <td>
                {price}
            </td>
            <td>
                <span className='capitalize'>{instructor}</span>
            </td>
            <td>
                {instructorEmail}
            </td>
            <th className='flex justify-end gap-4'>
                <button onClick={() => handleDelete(_id)} className="btn btn-outline">
                    Delete
                </button>
                {
                    exist ?
                        <button disabled={exist} className="btn btn-outline">
                            {exist ? 'Paid' : 'Pay'}
                        </button>
                        :
                        <Link to={`/dashboard/student/payment/${_id}`}>
                            <button disabled={exist} className="btn btn-outline">
                                {exist ? 'Paid' : 'Pay'}
                            </button>
                        </Link>
                }
            </th>
        </>
    );
};

export default SingleSelectedClass;