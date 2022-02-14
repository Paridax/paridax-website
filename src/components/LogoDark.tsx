import * as React from 'react';
import { useNavigate } from 'react-router-dom';
import logo from '../images/Pdx_Full_White_v2.svg';

export const Logo = (props: {redirect?: string}) => {
    const navigate = useNavigate();

    return (
        <button className="flex select-none items-center hover:text-gray-400 focus:text-gray-400 group outline-none hover:cursor-pointer duration-300 scale-100 transform" onClick={() => props.redirect ? navigate(props.redirect) : navigate('/')}>
            <img src={logo} alt="Paridax" className="duration-300 w-auto h-10 mr-2 text-gray-800"></img>
            
            {/* <h1 className="logo font-bold text-2xl transform -translate-y-0.5">convex</h1> */}
        </button>
    );
}