import * as React from 'react';
import { useNavigate } from 'react-router-dom';
import { Navbar } from '../../components/Navbar';
import '../../index.css';
import './glitch.css';

export const NotFound = () => {
    const navigate = useNavigate();
    
    return (
        <div className="flex flex-col h-screen">
            <Navbar />
            <div className="grow">
                <div className="flex items-center h-full">
                    <div className="mx-auto flex items-center gap-5">
                        <div className="wrapper">
                            <h1 className="text-9xl text-gray-200 font-bold glitch select-none">404</h1>
                        </div>
                        <div>
                            <div className="my-1">
                                <h1 className="text-2xl font-extrabold">THAT'S AN ERROR</h1>
                                <p className="w-80 text-gray-600 mt-1">
                                    It looks like the page that you were looking for doesn't exist. If you think there is a problem, please let me know.
                                </p>
                            </div>
                            <div className="my-1">
                                <button onClick={() => { navigate('/'); }} className="hover:text-primary transition-all">RETURN HOME</button><br />
                                <button onClick={() => { window.open("https://twitter.com/paridaxx"); }} className="hover:text-primary transition-all">CONTACT ME</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}