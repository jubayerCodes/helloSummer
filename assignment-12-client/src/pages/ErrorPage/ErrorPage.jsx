import React from 'react';
import bg from '../../assets/images/errorBg.jpg'
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';

const ErrorPage = () => {
    return (
        <>
            <Helmet>
                <title>404 - Hello Summer</title>
            </Helmet>
            <section className='w-full h-screen flex justify-center items-center bg-center bg-no-repeat bg-cover' style={{ backgroundImage: `url(${bg})` }}>
                <div className='mb-10 w-fit mx-auto'>

                    <div className="divider uppercase font-semibold text-base text-center text-[#9abe29]">Page Not Found</div>
                    <h2 className={`text-[200px] font-bold uppercase text-center`}>
                        404
                    </h2>
                    <Link to={'/'} className='block mx-auto w-fit'>
                        <button className="my-btn">Home</button>
                    </Link>
                </div>
            </section>
        </>
    );
};

export default ErrorPage;