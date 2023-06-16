import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import Swal from 'sweetalert2';
import useAxiosSecure from '../../../../../hooks/useAxiosSecure';
import { AuthContext } from '../../../../../providers/AuthProvider';
import { FaCheck, FaCheckCircle } from 'react-icons/fa';

const SingleEnrolledClass = ({ cls, refetch }) => {

    const { name, instructor, image, _id, availableSeats, instructorEmail, students, price } = cls

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
            <th className='flex justify-start gap-4'>

                <FaCheckCircle className='text-3xl text-green-600'></FaCheckCircle>
            </th>
        </>
    );
};

export default SingleEnrolledClass;