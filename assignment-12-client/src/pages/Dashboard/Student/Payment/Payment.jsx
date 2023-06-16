import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import React, { useEffect, useState } from 'react';
import CheckoutForm from './CheckoutForm/CheckoutForm';
import SectionHeading from '../../../../components/SectionHeading/SectionHeading';
import { useParams } from 'react-router-dom';
import useAxiosSecure from '../../../../hooks/useAxiosSecure';
import { Helmet } from 'react-helmet-async';

const stripePromise = loadStripe(import.meta.env.VITE_PAYMENT_PK)

const Payment = () => {

    const [clientSecret, setClientSecret] = useState("");

    const { axiosSecure } = useAxiosSecure()

    const { id } = useParams()


    useEffect(() => {
        axiosSecure.get(`/classes/${id}`)
            .then(res => {

                const price = { price: res?.data?.price }

                axiosSecure.post('/createPaymentIntent', price)
                    .then(res => {
                        setClientSecret(res?.data?.clientSecret);
                    })
            })
    }, [id])

    return (

        <>
            <Helmet>
                <title>Payment - Hello Summer</title>
            </Helmet>
            <div className="hero min-h-screen bg-base-200">
                <div className="hero-content flex-col">
                    <SectionHeading subHeading={'payment'} heading={'enroll now'} />
                    <div className="card w-[600px] shadow-2xl bg-base-100">
                        <div className="card-body">

                            <Elements stripe={stripePromise}>
                                <CheckoutForm clientSecret={clientSecret} classId={id} />
                            </Elements>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Payment;