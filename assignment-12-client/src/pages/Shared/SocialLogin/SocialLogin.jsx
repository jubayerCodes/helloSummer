import React, { useContext } from 'react';
import { FaGoogle } from 'react-icons/fa';
import { AuthContext } from '../../../providers/AuthProvider';
import Swal from 'sweetalert2';
import { useNavigate } from 'react-router-dom';
import useToken from '../../../hooks/useToken';
import axios from 'axios';

const SocialLogin = ({ from }) => {

    const navigate = useNavigate()

    const { setToken } = useToken()

    const { googleSignIn } = useContext(AuthContext)

    const handleGoogleSignIn = () => {
        googleSignIn()
            .then(res => {
                const user = res.user
                setToken(user)

                const newUser = { name: user?.displayName, email: user?.email, photo: user?.photoURL, role: 'student' }
                axios.post('https://assignment-12-server-coral.vercel.app/users', newUser)
                    .then(res => {
                        if (res?.data?.insertedId) {
                            Swal.fire({
                                title: 'Logged In',
                                text: 'Logged in successfully.',
                                icon: 'success',
                                confirmButtonText: 'Cool'
                            })
                                .then(() => {
                                    navigate(from, { replace: true })
                                })
                        }
                    })
            })
            .catch(err => console.log(err))
    }

    return (
        <div className="join gap-5 justify-center">
            <button type='button' className="btn btn-circle rounded-full btn-outline hover:bg-[#FC5640] hover:border-[#FC5640]" onClick={handleGoogleSignIn}>
                <FaGoogle></FaGoogle>
            </button>
        </div>
    );
};

export default SocialLogin;