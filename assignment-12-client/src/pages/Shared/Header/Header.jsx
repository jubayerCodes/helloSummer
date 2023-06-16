import React, { useContext, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import ActiveLink from '../../../components/ActiveLink/ActiveLink';
import { AuthContext } from '../../../providers/AuthProvider';
import Swal from 'sweetalert2';
import useToken from '../../../hooks/useToken';
import useRole from '../../../hooks/useRole';
import DarkModeToggle from "react-dark-mode-toggle";
import './Header.css'

const Header = () => {
    const [isDarkMode, setIsDarkMode] = useState(false)

    useEffect(() => {
        if (isDarkMode) {
            document.querySelector('body').setAttribute('data-theme', 'dark')
        } else {
            document.querySelector('body').setAttribute('data-theme', 'light')
        }
    }, [isDarkMode])

    const { role } = useRole()

    const { user, logout } = useContext(AuthContext)
    const { removeToken } = useToken()

    const menu = (
        <>
            <li><ActiveLink to={'/'}>Home</ActiveLink></li>
            <li><ActiveLink to={'/instructors'}>Instructors</ActiveLink></li>
            <li><ActiveLink to={'/classes'}>Classes</ActiveLink></li>
            {
                user && <li><ActiveLink to={`/dashboard/${role === 'admin' ? 'admin/manageClasses' : role === 'instructor' ? 'instructor/myClasses' : 'student/selectedClasses'}`}>Dashboard</ActiveLink></li>
            }
            <li>
                <DarkModeToggle
                    onChange={setIsDarkMode}
                    checked={isDarkMode}
                    size={70}
                /></li>
        </>
    )

    const handleLogout = () => {
        Swal.fire({
            title: 'Are you sure?',
            text: "You won't be able to revert this!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, Logout!'
        }).then((result) => {
            if (result.isConfirmed) {
                logout()
                    .then(() => {
                        Swal.fire(
                            'Logged Out!',
                            'You are successfully logged out.',
                            'success'
                        ).then(() => {
                            removeToken()
                        })
                    })
                    .catch(error => console.log(error))
            }

        })
    }

    return (
        <>
            <header className='bg-black bg-opacity-80 py-2 xl:py-5 z-50 absolute w-full px-5'>
                <div className="header-container my-container">
                    <div className="navbar bg-transparent p-0">
                        <div className="navbar-start justify-between w-full xl:w-1/2">
                            <Link to='/'>
                                <img className='w-[120px] xl:w-[150px]' src="/logo.webp" alt="" />
                            </Link>
                            <div className='xl:hidden flex items-center w-[150px] justify-end'>
                                <DarkModeToggle
                                    onChange={setIsDarkMode}
                                    checked={isDarkMode}
                                    size={50}
                                />
                            </div>
                            <div className="dropdown dropdown-end custom-dropdown">
                                <label tabIndex={0} className="btn btn-ghost text-white lg:hidden p-0">
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" /></svg>
                                </label>
                                <ul tabIndex={0} className="menu menu-sm dropdown-content mt-5 p-2 shadow bg-base-100 rounded-box">
                                    <li><ActiveLink to={'/'}>Home</ActiveLink></li>
                                    <li><ActiveLink to={'/instructors'}>Instructors</ActiveLink></li>
                                    <li><ActiveLink to={'/classes'}>Classes</ActiveLink></li>
                                    {
                                        user && <li><ActiveLink to={`/dashboard/${role === 'admin' ? 'admin/manageClasses' : role === 'instructor' ? 'instructor/myClasses' : 'student/selectedClasses'}`}>Dashboard</ActiveLink></li>
                                    }
                                    <li><ActiveLink to={'/login'}>Login</ActiveLink></li>
                                </ul>
                            </div>
                        </div>
                        <div className="navbar-center hidden lg:flex">
                            <ul className="menu menu-horizontal px-1">
                                {menu}
                            </ul>
                        </div>
                        <div className="navbar-end hidden xl:flex">
                            {
                                user ?
                                    <div className='flex gap-5 items-center justify-end'>
                                        <img src={user?.photoURL} alt="" className='w-[50px] h-[50px] rounded-full' />
                                        <button onClick={handleLogout} className="btn btn-outline border-white text-white rounded-sm btn-md px-10 hover:bg-white hover:text-black">Log Out</button>
                                    </div>
                                    :
                                    <Link to={'/login'}>
                                        <button className="btn btn-outline border-white text-white rounded-sm btn-md px-10 hover:bg-white hover:text-black">Login</button>
                                    </Link>
                            }
                        </div>
                    </div>
                </div>
            </header>
        </>
    );
};

export default Header;