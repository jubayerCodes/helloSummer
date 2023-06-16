import { useQueries, useQuery } from '@tanstack/react-query';
import axios, { all } from 'axios';
import React, { useContext } from 'react';
import { AuthContext } from '../providers/AuthProvider';
import useRole from './useRole';

const useClasses = (status) => {

    const { data: classes = [], refetch, isLoading: loading } = useQuery({
        queryKey: ['classes', status],
        queryFn: async () => {
            if (!status) {
                const res = await axios.get(`https://assignment-12-server-coral.vercel.app/classes`)
                return res.data
            } else {
                const res = await axios.get(`https://assignment-12-server-coral.vercel.app/classes?status=${status}`)
                return res.data
            }
        }
    })

    return { classes, refetch, loading };
};

export default useClasses;