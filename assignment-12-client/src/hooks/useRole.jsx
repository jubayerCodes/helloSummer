import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import React, { useContext, useState } from 'react';
import { AuthContext } from '../providers/AuthProvider';
import useAxiosSecure from './useAxiosSecure';

const useRole = () => {

    const { user } = useContext(AuthContext)
    const { axiosSecure } = useAxiosSecure()

    const { data: role, refetch, isLoading } = useQuery({
        queryKey: ['role', user?.email],
        queryFn: async () => {
            if (user) {
                const res = await axiosSecure.get(`/users?email=${user?.email}`)
                return res?.data?.role || ''
            } else {
                return ''
            }
        }
    })

    return { role, refetch, isLoading }
};

export default useRole;