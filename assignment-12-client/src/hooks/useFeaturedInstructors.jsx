import React from 'react';
import useAxiosSecure from './useAxiosSecure';
import { useQuery } from '@tanstack/react-query';

const useFeaturedInstructors = () => {

    const { axiosSecure } = useAxiosSecure()

    const { data: featuredInstructors = [], refetch, isLoading } = useQuery({
        queryKey: ['featuredInstructors'],
        queryFn: async () => {
            const res = await axiosSecure.get('/instructors')
            const instructors = res.data

            const sortedInstructors = instructors.sort((a, b) => b.students - a.students).slice(0, 6)
            return sortedInstructors
        }
    })

    return { featuredInstructors, refetch, isLoading }
};

export default useFeaturedInstructors;