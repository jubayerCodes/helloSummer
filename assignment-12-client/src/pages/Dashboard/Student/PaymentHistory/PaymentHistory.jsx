import React from 'react';
import usePaymentHistory from '../../../../hooks/usePaymentHistory';
import SectionHeading from '../../../../components/SectionHeading/SectionHeading';
import SinglePaymentHistory from './SinglePaymentHistory/SinglePaymentHistory';
import FadeLoader from "react-spinners/FadeLoader";
import { Helmet } from 'react-helmet-async';

const PaymentHistory = () => {

    const { payments, isLoading, refetch } = usePaymentHistory()


    if (isLoading) {
        return (
            <div className='w-full h-screen flex items-center justify-center'>
                <FadeLoader color="#000" />
            </div>
        )
    }

    return (
        <>
            <Helmet>
                <title>Payment History - Hello Summer</title>
            </Helmet>
            <section className='py-24 w-full px-24'>
                <SectionHeading subHeading={'payments'} heading={'successfull payments'} />

                <div className="overflow-x-auto mt-16">
                    <table className="table">
                        <thead>
                            <tr>
                                <th></th>
                                <th>Name</th>
                                <th>Amount</th>
                                <th>Instructor</th>
                                <th>Transaction ID</th>
                                <th>Date</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                payments.map(cls => <tr key={cls._id}><SinglePaymentHistory cls={cls} refetch={refetch} /></tr>)
                            }
                        </tbody>

                    </table>
                </div>
            </section>
        </>
    );
};

export default PaymentHistory;