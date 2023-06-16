import axios from 'axios';
import React, { useContext, useEffect } from 'react';
import { AuthContext } from '../providers/AuthProvider';
import { useOutlet } from 'react-router-dom';
import useToken from './useToken';

const useAxiosSecure = () => {

    const { logout } = useContext(AuthContext)
    const { removeToken } = useToken()
    const token = localStorage.getItem('accessToken')

    const axiosSecure = axios.create({
        baseURL: 'https://assignment-12-server-coral.vercel.app/'
    })

    useEffect(() => {
        axiosSecure.interceptors.request.use((config) => {

            if (token) {
                config.headers.authorization = `Bearer ${token}`
            }
            return config
        })

        axiosSecure.interceptors.response.use((response) => response, async (error) => {
            if (error.response && (error.response.status === 401 || error.response.status === 403)) {
                logout()
                removeToken()

            }

            return Promise.reject(error)
        })
    }, [axiosSecure, logout, token])

    return { axiosSecure }
};

export default useAxiosSecure;