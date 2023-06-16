import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import React from 'react';

const useFeaturedClasses = () => {

    const { data: featuredClasses = [], refetch, isLoading: loading } = useQuery({
        queryKey: ['featuredClasses'],
        queryFn: async () => {
            const res = await axios.get(`https://assignment-12-server-coral.vercel.app/classes?status=approved`)
            const classes = res.data
            const sortedClasses = classes.sort((a, b) => b.students - a.students).slice(0, 6)
            return sortedClasses
        }
    })

    return { featuredClasses, refetch, loading };
};

export default useFeaturedClasses;