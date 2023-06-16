import React from 'react';
import Header from '../pages/Shared/Header/Header';
import { Outlet, useLocation } from 'react-router-dom';
import Footer from '../pages/Shared/Footer/Footer';

const Main = () => {


    const location = useLocation()


    const noHeaderFooter = (location?.pathname === '/login') || (location?.pathname === '/register')

    return (
        <>
            {
                noHeaderFooter || <Header></Header>
            }
            <Outlet></Outlet>
            {
                noHeaderFooter || <Footer></Footer>
            }
        </>
    );
};

export default Main;