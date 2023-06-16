import { CardElement, useElements, useStripe } from '@stripe/react-stripe-js';
import React, { useContext, useState } from 'react';
import './CheckoutForm.css'
import Swal from 'sweetalert2';
import { AuthContext } from '../../../../../providers/AuthProvider';
import useAxiosSecure from '../../../../../hooks/useAxiosSecure';
import { useNavigate } from 'react-router-dom';

const CheckoutForm = ({ clientSecret, classId }) => {

    const { user } = useContext(AuthContext)
    const { axiosSecure } = useAxiosSecure()
    const [processing, setProcessing] = useState(false)
    const navigate = useNavigate()

    const stripe = useStripe()
    const elements = useElements()

    const handleSubmit = async (e) => {
        e.preventDefault()

        if (!stripe || !elements) {
            return
        }

        const card = elements.getElement(CardElement)

        if (card === null) {
            return
        }

        const { error, paymentMethod } = await stripe.createPaymentMethod({
            type: 'card', card
        })

        if (error) {

            Swal.fire({
                title: 'Oops!',
                text: error.message,
                icon: 'error',
                confirmButtonText: 'Got it'
            })

            return

        }

        setProcessing(true)

        const { paymentIntent, error: confirmError } = await stripe.confirmCardPayment(
            clientSecret,
            {
                payment_method: {
                    card: card,
                    billing_details: {
                        name: user?.displayName || 'anonymous',
                        email: user?.email || 'unknown'
                    },
                },
            },
        );

        if (confirmError) {
            Swal.fire({
                title: 'Oops!',
                text: confirmError.message,
                icon: 'error',
                confirmButtonText: 'Got it'
            })

            setProcessing(false)

            return
        }

        if (paymentIntent.status === 'succeeded') {

            const payment = {
                transactionId: paymentIntent?.id,
                classId: classId,
                student: user?.displayName,
                studentEmail: user?.email,
                amount: (paymentIntent.amount) / 100,
                date: paymentIntent.created
            }

            axiosSecure.post('/payments', payment)
                .then(res => {
                    if (res.data.exist) {
                        Swal.fire({
                            title: 'Already Enrolled!',
                            text: 'Item Already Enrolled!',
                            icon: 'error',
                            confirmButtonText: 'Got It'
                        })
                    } else if (res.data.modifiedCount > 0) {
                        Swal.fire({
                            title: 'Yay!',
                            text: 'Enrolled Successfully',
                            icon: 'success',
                            confirmButtonText: 'Cool'
                        }).then(() => {
                            setProcessing(false)
                            navigate('/dashboard/student/selectedClasses')
                        })
                    }

                    setProcessing(false)
                })

        }
    }


    return (
        <form onSubmit={handleSubmit} className='checkout-form'>
            <CardElement
                options={{
                    style: {
                        base: {
                            fontSize: '16px',
                            color: '#424770',
                            '::placeholder': {
                                color: '#aab7c4',
                            },
                        },
                        invalid: {
                            color: '#9e2146',
                        },
                    },
                }}
            />
            <button type="submit" className='my-btn mx-auto mt-5' disabled={!stripe || !clientSecret || processing}>
                Pay
            </button>
        </form>
    );
};

export default CheckoutForm;