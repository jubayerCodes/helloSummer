import { useQueries, useQuery } from '@tanstack/react-query';
import React, { useContext } from 'react';
import useAxiosSecure from './useAxiosSecure';
import { AuthContext } from '../providers/AuthProvider';

const useSelectedClasses = () => {

    const { user } = useContext(AuthContext)
    const { axiosSecure } = useAxiosSecure()

    const { data: selectedClasses = [], refetch, isLoading } = useQuery({
        queryKey: ['selectedClasses', user?.email],
        queryFn: async () => {
            const res = await axiosSecure.get(`/selectedClasses?studentEmail=${user?.email}`)
            return res.data
        }
    })

    return { selectedClasses, refetch, isLoading }
};

export default useSelectedClasses;