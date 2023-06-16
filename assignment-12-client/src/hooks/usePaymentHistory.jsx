import React, { useContext } from 'react';
import useAxiosSecure from './useAxiosSecure';
import { AuthContext } from '../providers/AuthProvider';
import { useQuery } from '@tanstack/react-query';

const usePaymentHistory = () => {

    const { axiosSecure } = useAxiosSecure()
    const { user } = useContext(AuthContext)

    const { data: payments = [], refetch, isLoading } = useQuery({
        queryKey: ['payments', user?.email],
        queryFn: async () => {
            const res = await axiosSecure.get(`/payments?studentEmail=${user?.email}`)
            return res.data
        }
    })

    return { payments, refetch, isLoading }
};

export default usePaymentHistory;