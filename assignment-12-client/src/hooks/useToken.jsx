import axios from 'axios';
import React from 'react';

const useToken = () => {

    const setToken = (user) => {
        if (user) {
            axios.post('https://assignment-12-server-coral.vercel.app/jwt', { email: user?.email })
                .then(res => {
                    const token = res.data.token
                    localStorage.setItem('accessToken', token)
                })
        }
    }

    const removeToken = () => {
        const token = localStorage.getItem('accessToken')

        if (token) {
            localStorage.removeItem('accessToken')
        }
    }

    return { setToken, removeToken }

};

export default useToken;