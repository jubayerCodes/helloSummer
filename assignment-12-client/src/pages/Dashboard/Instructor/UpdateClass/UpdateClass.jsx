import React, { useContext, useEffect, useRef, useState } from 'react';
import { useParams } from 'react-router-dom';
import useAxiosSecure from '../../../../hooks/useAxiosSecure';
import { AuthContext } from '../../../../providers/AuthProvider';
import Swal from 'sweetalert2';
import { useForm } from 'react-hook-form';
import SectionHeading from '../../../../components/SectionHeading/SectionHeading';
import axios from 'axios';
import { Helmet } from 'react-helmet-async';

const UpdateClass = () => {
    const { axiosSecure } = useAxiosSecure()
    const { user } = useContext(AuthContext)
    const { register, handleSubmit, formState: { errors }, reset, setValue } = useForm();
    const imgHostingUrl = `https://api.imgbb.com/1/upload?key=${import.meta.env.VITE_image_hosting_key}`

    const formRef = useRef()

    const [oldClass, setOldClass] = useState({})

    const { id } = useParams()

    useEffect(() => {
        axiosSecure.get(`/myClasses?email=${user?.email}&id=${id}`)
            .then(res => {
                setOldClass(res.data);
            })
    }, [user, id])




    useEffect(() => {
        setValue('name', oldClass?.name)
        setValue('image', oldClass?.image)
        setValue('availableSeats', oldClass?.availableSeats)
        setValue('price', oldClass?.price)
    }, [oldClass])


    const onSubmit = (data) => {

        const newClass = data

        const formData = new FormData()

        formData.append('image', data?.image[0])

        const type = typeof (data?.image)

        if (type === 'object') {
            axios.post(imgHostingUrl, formData)
                .then(res => {
                    if (res?.data?.success) {
                        const imageUrl = res?.data?.data?.display_url
                        newClass.image = imageUrl

                        axiosSecure.patch(`/classes?id=${id}`, newClass)
                            .then(res => {
                                if (res.data.modifiedCount > 0) {
                                    Swal.fire(
                                        'Class Updated',
                                        'Class Updated Successfully',
                                        'success'
                                    )
                                }
                            })
                    }
                })
        } else {
            axiosSecure.patch(`/classes?id=${id}`, newClass)
                .then(res => {
                    if (res.data.modifiedCount > 0) {
                        Swal.fire(
                            'Class Updated',
                            'Class Updated Successfully',
                            'success'
                        )
                    }
                })
        }

    }

    return (
        <>
            <Helmet>
                <title>Update Class - Hello Summer</title>
            </Helmet>
            <section>
                <div className="my-container">
                    <div className="hero min-h-screen">
                        <div className="hero-content flex-col w-[600px]">

                            <SectionHeading subHeading={'Update'} heading={'Update Class'} />

                            <div className="card w-full shadow-2xl bg-base-100">
                                <form className="card-body" onSubmit={handleSubmit(onSubmit)}>
                                    <div className="form-control">
                                        <label className="label">
                                            <span className="label-text">Name</span>
                                        </label>
                                        <input required type="text" placeholder="Class Name" className="input input-bordered" {...register("name")} />
                                    </div>
                                    <div className="form-control">
                                        <label className="label">
                                            <span className="label-text">Cover Image</span>
                                        </label>
                                        <input type="file" className="file-input file-input-bordered w-full" {...register("image")} />
                                    </div>
                                    <div className="form-control">
                                        <label className="label">
                                            <span className="label-text">Available seats</span>
                                        </label>
                                        <input type="number" placeholder="Available Seats" className="input input-bordered" {...register("availableSeats", { min: 0 })} />
                                    </div>
                                    <div className="form-control">
                                        <label className="label">
                                            <span className="label-text">Price</span>
                                        </label>
                                        <input type="number" placeholder="Price" className="input input-bordered mb-2" {...register("price", { min: 0 })} />
                                    </div>
                                    <div className="form-control mt-6">
                                        <button className="login-btn">Update Class</button>
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

export default UpdateClass;