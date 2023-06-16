import React from 'react';
import useAxiosSecure from '../../../../../hooks/useAxiosSecure';
import Swal from 'sweetalert2';
import { Link } from 'react-router-dom';

const SingleMyClass = ({ cls }) => {

    const { name, feedback, image, _id, availableSeats, status, students, price } = cls

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
                <span className='capitalize'>{status}</span>
            </td>
            <td>
                {feedback}
            </td>
            <th className='flex justify-end gap-4'>
                <Link to={`/dashboard/instructor/updateClass/${_id}`}>
                    <button className="btn btn-outline">
                        Update
                    </button>
                </Link>
            </th>
        </>
    );
};

export default SingleMyClass;