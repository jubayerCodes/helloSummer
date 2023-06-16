import React from 'react';
import { NavLink } from "react-router-dom";

const DashboardActiveLink = ({ children, to }) => {
    return (

        <NavLink
            to={to}
            className={({ isActive, isPending }) =>
                isPending ? "pending" : isActive ? "text-[#333539] bg-white hover:text-[#333539] hover:bg-white focus:text-[#333539] focus:bg-white" : "text-white bg-none hover:bg-white hover:text-[#333539]"
            }
        >
            {children}
        </NavLink>
    );
};

export default DashboardActiveLink;