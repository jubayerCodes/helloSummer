import React, { useContext, useState } from 'react';
import SocialLogin from '../Shared/SocialLogin/SocialLogin';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { AuthContext } from '../../providers/AuthProvider';
import axios from 'axios';
import Swal from 'sweetalert2';
import useToken from '../../hooks/useToken';
import SectionHeading from '../../components/SectionHeading/SectionHeading';
import { Helmet } from 'react-helmet-async';

const Register = () => {

    const { signUp, updateUser, update, setUpdate, setLoading } = useContext(AuthContext)

    const { setToken } = useToken()

    const navigate = useNavigate()

    const location = useLocation()

    const from = location?.state?.from || '/'

    const [confirm, setConfirm] = useState(false)

    const { register, handleSubmit, formState: { errors }, reset } = useForm();
    const onSubmit = data => {
        const password = data.password
        const confirmPassword = data.confirmPassword
        const email = data.email
        const name = data.name
        const photo = data.photo

        const newUser = { name, email, photo, role: 'student' }

        if (password !== confirmPassword) {
            setConfirm(true)
            return
        } else {
            setConfirm(false)
        }

        signUp(email, password)
            .then((res) => {
                setToken(res?.user)
                updateUser(res.user, name, photo)
                    .then(() => {
                        setUpdate(!update)

                        axios.post('https://assignment-12-server-coral.vercel.app/users', newUser)
                            .then(res => {
                                if (res?.data?.insertedId) {

                                    Swal.fire(
                                        'Signed Up!',
                                        'You are successfully Signed Up.',
                                        'success'
                                    ).then(() => {
                                        reset()
                                        navigate(from, { replace: true })
                                        setLoading(false)
                                    })
                                }
                            })

                    })
                    .catch(error => console.log(error))
            })
            .catch(error => {
                if (error?.message === 'Firebase: Error (auth/email-already-in-use).') {
                    Swal.fire(
                        'Error!',
                        'Email already used.',
                        'error'
                    )
                }
            })

    };

    return (
        <>
            <Helmet>
                <title>Register - Hello Summer</title>
            </Helmet>
            <section>
                <div className="my-container">
                    <div className="hero min-h-screen">
                        <div className="hero-content flex-col w-[600px]">
                            <SectionHeading heading={'register'} />
                            <div className="card w-full shadow-2xl bg-base-100">
                                <form className="card-body" onSubmit={handleSubmit(onSubmit)}>
                                    <div className="form-control">
                                        <label className="label">
                                            <span className="label-text">Name</span>
                                        </label>
                                        <input type="text" placeholder="Full Name" className="input input-bordered" {...register("name", { required: true })} />
                                    </div>
                                    <div className="form-control">
                                        <label className="label">
                                            <span className="label-text">Photo</span>
                                        </label>
                                        <input type="text" placeholder="Photo url" className="input input-bordered" {...register("photo", { required: true })} />
                                    </div>
                                    <div className="form-control">
                                        <label className="label">
                                            <span className="label-text">Email</span>
                                        </label>
                                        <input type="email" placeholder="email" className="input input-bordered" {...register("email", { required: true })} />
                                    </div>
                                    <div className="form-control">
                                        <label className="label">
                                            <span className="label-text">Password</span>
                                        </label>
                                        <input type="password" placeholder="password" className="input input-bordered mb-2" {...register("password", { required: true, minLength: 6, pattern: /(?=.*[A-Z])(?=.*[#$@!%&*?])/ })} />
                                        {errors?.password?.type === 'minLength' && <span className='text-red-700'>* Password should contain at least 6 characters</span>}
                                        {errors?.password?.type === 'pattern' && <span className='text-red-700'>* Use at least one uppercase letter and a special character.</span>}
                                    </div>
                                    <div className="form-control">
                                        <label className="label">
                                            <span className="label-text">Confirm Password</span>
                                        </label>
                                        <input type="password" placeholder="confirm password" className="input input-bordered" {...register("confirmPassword", { required: true })} />
                                        {confirm && <span className='text-red-700'>* Password does not matched</span>}
                                        <label className="label">
                                            <Link to={'/login'}>
                                                <span className="label-text-alt link link-hover">Already Registered? Login Now</span>
                                            </Link>
                                        </label>
                                    </div>
                                    <div className="form-control mt-6">
                                        <button className="login-btn">Register</button>
                                    </div>
                                    <div className="divider">OR</div>
                                    <SocialLogin></SocialLogin>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
};

export default Register;