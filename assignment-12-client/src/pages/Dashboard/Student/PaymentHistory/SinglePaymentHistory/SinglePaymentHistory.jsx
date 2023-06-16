import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import Swal from 'sweetalert2';
import useAxiosSecure from '../../../../../hooks/useAxiosSecure';
import { AuthContext } from '../../../../../providers/AuthProvider';
import { FaCheck, FaCheckCircle } from 'react-icons/fa';
import moment from 'moment/moment';

const SinglePaymentHistory = ({ cls, refetch }) => {

    const { name, instructor, image, price, transactionId, date } = cls

    const paidDate = moment.unix(date).format('Do MMMM YYYY, h:mm:ss a');

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
                {price}
            </td>
            <td>
                <span className='capitalize'>{instructor}</span>
            </td>
            <td>
                {transactionId}
            </td>
            <th>
                {paidDate}
            </th>
        </>
    );
};

export default SinglePaymentHistory;