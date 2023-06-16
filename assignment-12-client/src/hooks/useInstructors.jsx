import React from 'react';
import useAxiosSecure from './useAxiosSecure';
import { useQuery } from '@tanstack/react-query';

const useInstructors = () => {

    const {axiosSecure} = useAxiosSecure()

    const {data: instructors = [], refetch, isLoading} = useQuery({
        queryKey: ['instructors'],
        queryFn: async()=>{
            const res = await axiosSecure.get('/instructors')
            return res.data
        }
    })

    return {instructors, refetch, isLoading}
};

export default useInstructors;