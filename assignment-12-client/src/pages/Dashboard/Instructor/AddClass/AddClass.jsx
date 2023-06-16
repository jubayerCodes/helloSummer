import React, { useContext, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { AuthContext } from '../../../../providers/AuthProvider';
import useAxiosSecure from '../../../../hooks/useAxiosSecure';
import Swal from 'sweetalert2';
import SectionHeading from '../../../../components/SectionHeading/SectionHeading';
import axios from 'axios';
import { Helmet } from 'react-helmet-async';

const AddClass = () => {

    const { user } = useContext(AuthContext)
    const { axiosSecure } = useAxiosSecure()
    const imgHostingUrl = `https://api.imgbb.com/1/upload?key=${import.meta.env.VITE_image_hosting_key}`

    const { register, handleSubmit, formState: { errors }, reset, setValue } = useForm();

    const onSubmit = (data) => {
        const newClass = data

        newClass.status = 'pending'
        newClass.students = 0

        const formData = new FormData()

        formData.append('image', data?.image[0])

        axios.post(imgHostingUrl, formData)
            .then(res => {
                if (res?.data?.success) {
                    const imageUrl = res?.data?.data?.display_url
                    newClass.image = imageUrl

                    axiosSecure.post(`/classes?email=${user?.email}`, newClass)
                        .then(res => {
                            if (res.data.insertedId) {
                                Swal.fire(
                                    'Class Added',
                                    'Class Added Successfully',
                                    'success'
                                ).then(() => {
                                    reset()
                                })
                            }
                        })
                }
            })

    }

    useEffect(() => {
        setValue('instructor', user?.displayName)
        setValue('instructorEmail', user?.email)
    }, [user])

    return (
        <>
            <Helmet>
                <title>Add Class - Hello Summer</title>
            </Helmet>
            <section>
                <div className="my-container">
                    <div className="hero min-h-screen">
                        <div className="hero-content flex-col w-[600px]">

                            <SectionHeading subHeading={'add class'} heading={'Add a Class'} />

                            <div className="card w-full shadow-2xl bg-base-100">
                                <form className="card-body" onSubmit={handleSubmit(onSubmit)}>
                                    <div className="form-control">
                                        <label className="label">
                                            <span className="label-text">Name</span>
                                        </label>
                                        <input type="text" placeholder="Class Name" className="input input-bordered" {...register("name", { required: true })} />
                                    </div>
                                    <div className="form-control">
                                        <label className="label">
                                            <span className="label-text">Cover Image</span>
                                        </label>

                                        <input type="file" className="file-input file-input-bordered w-full" {...register("image", { required: true })} />
                                    </div>
                                    <div className="form-control">
                                        <label className="label">
                                            <span className="label-text">Available seats</span>
                                        </label>
                                        <input type="number" placeholder="Available Seats" className="input input-bordered" {...register("availableSeats", { required: true, min: 0 })} />
                                    </div>
                                    <div className="form-control">
                                        <label className="label">
                                            <span className="label-text">Price</span>
                                        </label>
                                        <input type="number" placeholder="Price" className="input input-bordered mb-2" {...register("price", { required: true, min: 0 })} />
                                    </div>
                                    <div className="form-control">
                                        <label className="label">
                                            <span className="label-text">Instructor</span>
                                        </label>
                                        <input readOnly type="text" className="input input-bordered mb-2" {...register("instructor")} />
                                    </div>
                                    <div className="form-control">
                                        <label className="label">
                                            <span className="label-text">Instructor Email</span>
                                        </label>
                                        <input readOnly type="text" className="input input-bordered mb-2" {...register("instructorEmail")} />
                                    </div>
                                    <div className="form-control mt-6">
                                        <button className="login-btn">Add Class</button>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
};

export default AddClass;