import * as React from 'react';
import { useNavigate } from 'react-router-dom';
import logo from '../images/Pdx_Logo.svg';

export const Logo = (props: { className: string, redirect?: string}) => {
    const navigate = useNavigate();

    return (
        <button className="flex select-none items-center hover:text-gray-400 focus:text-gray-400 group outline-none hover:cursor-pointer duration-300 scale-100 transform group" onClick={() => props.redirect ? navigate(props.redirect) : navigate('/')}>
            <img src={logo} alt="Paridax" className={`w-auto h-10 mr-2 text-gray-800 group-hover:brightness-110 ${props.className}`}></img>
            
            {/* <h1 className="logo font-bold text-2xl transform -translate-y-0.5">convex</h1> */}
        </button>
    );
}