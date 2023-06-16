import React from 'react';
import { NavLink } from "react-router-dom";

const ActiveLink = ({ children, to }) => {
    return (

        <NavLink
            to={to}
            className={({ isActive, isPending }) =>
                isPending ? "pending" : isActive ? "font-semibold text-[#ffffffbb]" : "text-white font-semibold hover:text-[#ffffffbb]"
            }
        >
            {children}
        </NavLink>
    );
};

export default ActiveLink;