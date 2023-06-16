import React, { useContext } from 'react';
import { AuthContext } from '../providers/AuthProvider';
import useAxiosSecure from './useAxiosSecure';
import { useQuery } from '@tanstack/react-query';

const useEnrolledClasses = () => {


    const { axiosSecure } = useAxiosSecure()
    const { user } = useContext(AuthContext)

    const { data: enrolledClasses = [], refetch, isLoading } = useQuery({
        queryKey: ['enrolledClasses', user?.email],
        queryFn: async () => {
            const res = await axiosSecure.get(`/enrolledClasses?studentEmail=${user?.email}`)
            return res.data
        },
    })

    return { enrolledClasses, refetch, isLoading }
};

export default useEnrolledClasses;