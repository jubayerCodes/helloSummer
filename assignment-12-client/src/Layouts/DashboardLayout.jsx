import React from 'react';
import { FaBook, FaCheckCircle, FaEdit, FaHome, FaShoppingCart, FaTasks, FaUser, FaUserFriends } from 'react-icons/fa';
import { Link, Outlet } from 'react-router-dom';
import DashboardActiveLink from '../components/DashboardActiveLink/DashboardActiveLink';
import useRole from '../hooks/useRole';

const DashboardLayout = () => {

    const { role } = useRole()

    const adminMenu = (
        <>
            <li>
                <DashboardActiveLink to={'/dashboard/admin/manageClasses'} className='text-white hover:bg-white hover:text-[#333539]'>
                    <FaTasks className='text-xl'></FaTasks>
                    Manage Classes
                </DashboardActiveLink>
            </li>
            <li>
                <DashboardActiveLink to={'/dashboard/admin/manageUsers'} className='text-white hover:bg-white hover:text-[#333539]'>
                    <FaUserFriends className='text-xl'></FaUserFriends>
                    Manage Users
                </DashboardActiveLink>
            </li>
        </>
    )
    const instructorMenu = (
        <>
            <li><DashboardActiveLink to={'/dashboard/instructor/myClasses'} className='text-white hover:bg-white hover:text-[#333539]'>
                <FaTasks className='text-xl'></FaTasks>
                My Classes
            </DashboardActiveLink></li>
            <li><DashboardActiveLink to={'/dashboard/instructor/addClass'} className='text-white hover:bg-white hover:text-[#333539]'>
                <FaEdit className='text-xl'></FaEdit>
                Add a class</DashboardActiveLink>
            </li>
        </>
    )
    const studentMenu = (
        <>
            <li><DashboardActiveLink to={'/dashboard/student/selectedClasses'} className='text-white hover:bg-white hover:text-[#333539]'>
                <FaShoppingCart className='text-xl'></FaShoppingCart>
                My selected classes
            </DashboardActiveLink></li>
            <li><DashboardActiveLink to={'/dashboard/student/enrolledClasses'} className='text-white hover:bg-white hover:text-[#333539]'>
                <FaCheckCircle className='text-xl'></FaCheckCircle>
                My enrolled classes
            </DashboardActiveLink></li>
            <li><DashboardActiveLink to={'/dashboard/student/paymentsHistory'} className='text-white hover:bg-white hover:text-[#333539]'>
                <FaBook className='text-xl'></FaBook>
                My Payment History
            </DashboardActiveLink></li>
        </>
    )
    const mainMenu = (
        <>
            <li><Link to={'/'} className='text-white hover:bg-white hover:text-[#333539]'>
                <FaHome className='text-xl'></FaHome>
                Home
            </Link></li>
            <li><Link to={'/instructors'} className='text-white hover:bg-white hover:text-[#333539]'>
                <FaUserFriends className='text-xl'></FaUserFriends>
                Instructors
            </Link></li>
            <li><Link to={'/classes'} className='text-white hover:bg-white hover:text-[#333539]'>
                <FaTasks className='text-xl'></FaTasks>
                Classes
            </Link></li>
        </>
    )

    return (
        <div className="drawer lg:drawer-open">
            <input id="my-drawer-2" type="checkbox" className="drawer-toggle" />
            <div className="drawer-content flex flex-col items-center justify-start">

                <Outlet></Outlet>

                <label htmlFor="my-drawer-2" className="btn btn-primary drawer-button lg:hidden">Open drawer</label>

            </div>
            <div className="drawer-side">
                <label htmlFor="my-drawer-2" className="drawer-overlay"></label>
                <ul className="menu p-4 w-80 h-full bg-[#333539] text-base-content gap-3">
                    {/* Sidebar content here */}

                    {
                        role === 'admin' ?
                            adminMenu
                            :
                            role === 'instructor' ?
                                instructorMenu
                                :
                                studentMenu
                    }

                    <div className="divider text-white">Main Menu</div>

                    {
                        mainMenu
                    }
                </ul>

            </div>
        </div>
    );
};

export default DashboardLayout;