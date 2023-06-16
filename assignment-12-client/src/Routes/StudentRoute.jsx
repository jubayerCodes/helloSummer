import React from 'react';
import useRole from '../hooks/useRole';
import { FadeLoader } from 'react-spinners';
import { Link } from 'react-router-dom';

const StudentRoute = ({ children }) => {

    const { role, isLoading } = useRole()

    if (isLoading) {
        return (
            <div className='w-full h-screen flex items-center justify-center'>
                <FadeLoader color="#000" />
            </div>
        )
    }

    if (role !== 'student') {
        return (
            <div className='w-full h-screen flex flex-col gap-5 items-center justify-center'>
                <h2 className='text-2xl'>Only student can visit this page.</h2>
                <Link to={'/'}>
                    <button className="my-btn">
                        Home
                    </button>
                </Link>
            </div>
        )
    }

    return children
};

export default StudentRoute;