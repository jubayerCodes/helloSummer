import React, { useEffect, useState } from 'react';
import useAxiosSecure from './useAxiosSecure';
import { useQuery } from '@tanstack/react-query';

const useUsers = () => {

    const [admins, setAdmins] = useState([])
    const [instructors, setInstructors] = useState([])
    const [students, setStudents] = useState([])

    const { axiosSecure } = useAxiosSecure()

    const { data: users = [], refetch, isLoading } = useQuery({
        queryKey: ['users'],
        queryFn: async () => {
            const res = await axiosSecure.get('/users')

            const adminUsers = res?.data?.filter(user => user.role === 'admin')
            const InstructorUsers = res?.data?.filter(user => user.role === 'instructor')
            const studentUsers = res?.data?.filter(user => user.role === 'student')

            setAdmins(adminUsers)
            setInstructors(InstructorUsers)
            setStudents(studentUsers)

            return res.data
        }
    })

    return { users, admins, instructors, students, refetch, isLoading }
};

export default useUsers;