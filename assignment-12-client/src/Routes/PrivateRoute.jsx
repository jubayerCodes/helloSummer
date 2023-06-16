import React, { useContext } from 'react';
import { AuthContext } from '../providers/AuthProvider';
import FadeLoader from "react-spinners/FadeLoader";
import { Navigate, useLocation } from 'react-router-dom';

const PrivateRoute = ({ children }) => {

    const { user, loading } = useContext(AuthContext)
    const location = useLocation()

    if (loading) {
        return (
            <div className='w-screen h-screen flex items-center justify-center'>
                <FadeLoader color="#000" />
            </div>
        )
    }

    if (!user) {
        return <Navigate to={'/login'} state={{ from: location }} replace={true}></Navigate>
    }


    return children
};

export default PrivateRoute;