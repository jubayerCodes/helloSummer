import React, { useContext } from 'react';
import { AuthContext } from '../../../providers/AuthProvider';
import { Navigate, useLocation, useNavigate } from 'react-router-dom';
import useRole from '../../../hooks/useRole';
import useAxiosSecure from '../../../hooks/useAxiosSecure';
import Swal from 'sweetalert2';

const ClassCard = ({ cls, refetch, featured }) => {

    const { axiosSecure } = useAxiosSecure()

    const { user } = useContext(AuthContext)
    const { role } = useRole()

    const location = useLocation()

    const navigate = useNavigate()

    const { image, name, instructor, availableSeats, price, _id, students } = cls

    const handleSelect = (cls) => {

        if (!user) {
            return navigate('/login', { state: { from: location } })
        } else {
            const selectedClass = { classId: cls._id, studentEmail: user.email }

            axiosSecure.post('/selectedClasses', selectedClass)
                .then(res => {
                    if (res.data.exist) {
                        Swal.fire(
                            'Denied!',
                            'Class already selected',
                            'error'
                        )
                    } else if (res.data.insertedId) {
                        Swal.fire(
                            'Selected!',
                            'Class selected successfully',
                            'success'
                        ).then(() => {
                            refetch()
                        })
                    }
                })

        }
    }

    return (
        <div className={`${((availableSeats === 0) && !featured) && 'bg-red-400'} card w-full bg-base-100 shadow-xl`}>
            <figure><img src={image} alt="class" className='h-[250px] w-full' /></figure>
            <div className="card-body gap-0">
                <h2 className="card-title mb-3">{name}</h2>
                <p>Instructor: {instructor}</p>
                <p>Students: {students}</p>
                <p>Available seats: {availableSeats}</p>
                <p>Price: {price}</p>
                {
                    !featured && <>
                        <div className="card-actions justify-start mt-4">
                            <button disabled={(role === 'instructor') || (role === 'admin') || (availableSeats === 0)} onClick={() => handleSelect(cls)} className="my-btn">Select</button>
                        </div>
                    </>
                }
            </div>
        </div>
    );
};

export default ClassCard;