import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { FaFacebook, FaInstagram, FaMapMarkerAlt, FaPhoneAlt, FaRegEnvelope, FaRegMap, FaTwitter } from 'react-icons/fa';
import footerImg from '../../../assets/images/bg_footer.jpg'
import useRole from '../../../hooks/useRole';
import { AuthContext } from '../../../providers/AuthProvider';

const Footer = () => {

    const menu = (
        <>
            <li className='inline-block'><Link className='text-white hover:text-[#a3a3a3]' to="/">Home</Link></li>
            <li className='inline-block'><Link className='text-white hover:text-[#a3a3a3]' to="/instructors">Instructors</Link></li>
            <li className='inline-block'><Link className='text-white hover:text-[#a3a3a3]' to="/classes">Classes</Link></li>
        </>
    )

    return (
        <footer>
            <div className='px-5 lg:px-0' style={{ backgroundImage: `url(${footerImg})` }}>
                <div className='my-container grid grid-cols-1 lg:grid-cols-4 gap-8 lg:gap-12 py-12 lg:py-32'>
                    <div>
                        <Link to="/">
                            <img className='w-[150px] mb-10 lg:mb-8' src="/logo.webp" alt="" />
                        </Link>
                        <p className="text-white">
                            Discover stunning summer camping destinations, expert guides, and essential tips for an unforgettable outdoor adventure on our website.
                        </p>
                    </div>
                    <div className=' lg:pl-8'>
                        <h4 className='text-xl font-semibold text-white mb-3 lg:mb-8'>
                            Quick Links
                        </h4>
                        <ul className='flex flex-col gap-2'>
                            {menu}
                        </ul>
                    </div>
                    <div>
                        <h4 className=' text-xl font-semibold text-white mb-3 lg:mb-8'>
                            Information
                        </h4>
                        <div className='flex flex-col gap-5'>
                            <div className='flex gap-5 items-center lg:items-start'>
                                <FaMapMarkerAlt className='text-2xl lg:text-3xl text-white'></FaMapMarkerAlt>
                                <p className="text-white">
                                    <b>Address:</b> 1800 Abbot Kinney Nebraska UK
                                </p>
                            </div>
                            <div className='flex gap-5 items-center lg:items-start'>
                                <FaRegEnvelope className='text-2xl lg:text-3xl text-white'></FaRegEnvelope>
                                <p className="text-white">
                                    <b>Email:</b> hello@example.com
                                </p>
                            </div>
                            <div className='flex gap-5 items-center lg:items-start'>
                                <FaPhoneAlt className='text-2xl lg:text-3xl text-white'></FaPhoneAlt>
                                <p className="text-white">
                                    <b>Phone:</b> (012) 345 6789
                                </p>
                            </div>
                        </div>
                    </div>
                    <div className='lg:pl-8'>
                        <h4 className=' text-xl font-semibold text-white mb-3 lg:mb-8'>
                            Social Links
                        </h4>
                        <div className='flex gap-5'>
                            <Link to="#">
                                <FaFacebook className='text-4xl duration-300 text-white hover:scale-125'></FaFacebook>
                            </Link>
                            <Link to="#">
                                <FaTwitter className='text-4xl duration-300 text-white hover:scale-125'></FaTwitter>
                            </Link>
                            <Link to="#">
                                <FaInstagram className='text-4xl duration-300 text-white hover:scale-125'></FaInstagram>
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
            <div className='bg-[#333539] text-lg py-8 px-5 w-full'>
                <h4 className=' text-center text-white'>
                    Copyright Hello Summer | Design & Developed By <span className='font-bold'>
                        Jubayer Hossain
                    </span>
                </h4>
            </div>
        </footer>
    );
};

export default Footer;