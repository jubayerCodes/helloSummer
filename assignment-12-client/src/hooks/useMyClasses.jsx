import React, { useContext } from 'react';
import { AuthContext } from '../providers/AuthProvider';
import axios from 'axios';
import useAxiosSecure from './useAxiosSecure';
import { useQuery } from '@tanstack/react-query';

const useMyClasses = () => {

    const { axiosSecure } = useAxiosSecure()

    const { user } = useContext(AuthContext)

    const { data: myClasses = [], refetch, isLoading: loading } = useQuery({
        queryKey: ['myClasses', user?.email],
        queryFn: async () => {
            const res = await axiosSecure.get(`/myClasses?email=${user?.email}`)
            return res.data
        }
    })

    return { myClasses, refetch, loading };
};

export default useMyClasses;