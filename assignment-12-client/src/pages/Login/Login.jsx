import React, { useContext, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import SocialLogin from '../Shared/SocialLogin/SocialLogin';
import { AuthContext } from '../../providers/AuthProvider';
import { useForm } from 'react-hook-form';
import Swal from 'sweetalert2';
import useToken from '../../hooks/useToken';
import SectionHeading from '../../components/SectionHeading/SectionHeading';
import axios from 'axios';
import { Helmet } from 'react-helmet-async';

const Login = () => {

    const location = useLocation()
    const navigate = useNavigate()

    const from = location?.state?.from?.pathname || '/'

    const { signIn } = useContext(AuthContext)

    const { setToken } = useToken()

    const [seePassword, setSeePassword] = useState(false)

    const { register, handleSubmit, formState: { errors }, reset } = useForm();

    const onSubmit = data => {

        const email = data.email
        const password = data.password

        signIn(email, password)
            .then((res) => {
                if (res) {
                    setToken(res?.user)

                    const user = res?.user

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
                                        reset()
                                        navigate(from, { replace: true })
                                    })
                            }
                        })
                }
            })
            .catch(error => {
                if (error?.message === 'Firebase: Error (auth/wrong-password).') {
                    Swal.fire(
                        'Wrong password!',
                        'Please provide right password.',
                        'error'
                    )
                } else if (error?.message === 'Firebase: Error (auth/user-not-found).') {
                    Swal.fire(
                        'Wrong email!',
                        'Please provide right email.',
                        'error'
                    )
                }
            })
    }

    const handleSeePassword = (e) => {
        setSeePassword(e.target.checked);
    }

    return (
        <>
            <Helmet>
                <title>Login - Hello Summer</title>
            </Helmet>
            <section>
                <div className="my-container">
                    <div className="hero min-h-screen">
                        <div className="hero-content flex-col w-[600px]">
                            <SectionHeading heading={'Login'}></SectionHeading>
                            <div className="card w-full shadow-2xl bg-base-100">
                                <form className="card-body" onSubmit={handleSubmit(onSubmit)}>
                                    <div className="form-control">
                                        <label className="label">
                                            <span className="label-text">Email</span>
                                        </label>
                                        <input type="email" placeholder="email" className="input input-bordered" {...register('email', { required: true })} />
                                    </div>
                                    <div className="form-control">
                                        <label className="label">
                                            <span className="label-text">Password</span>
                                        </label>
                                        <input type={`${seePassword ? 'text' : 'password'}`} placeholder="password" className="input input-bordered" {...register('password', { required: true })} />
                                        <label className='flex gap-2 mt-2 items-center cursor-pointer'>
                                            <input type="checkbox" name="seePassword" id="seePassword" onChange={handleSeePassword} />
                                            See password
                                        </label>
                                        <label className="label">
                                            <Link to={'/register'} state={{ from: from }}>
                                                <span className="label-text-alt link link-hover">New to Hello Summer? Register Now</span>
                                            </Link>
                                        </label>
                                    </div>
                                    <div className="form-control mt-6">
                                        <button className="login-btn">Login</button>
                                    </div>
                                    <div className="divider">OR</div>
                                    <SocialLogin from={from}></SocialLogin>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
};

export default Login;