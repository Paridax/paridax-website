// @ts-nocheck
import * as React from 'react';
import { useNavigate } from 'react-router-dom';
import { getUserData } from '../utils/api';
import { UserContext } from '../utils/context';
import { iso_url } from '../utils/urls';
import { Logo } from './Logo';
import { BiMenu } from 'react-icons/bi';

export const Navbar = (props: { user?: any }) => {
    const navigate = useNavigate();

    const [user, setUser] = React.useContext(UserContext);
    const [menu, toggleMenu] = React.useState(false);

    function getWindowLocation(windowLoc: string, exact?: boolean) {
        // let web_thing = window.location.protocol + '//' + window.location.host;
    
        let win;
        win = window.location.href;
        if (!win) win = '';
        if(exact) {
            if (window.location.pathname === windowLoc) return true;
            return false;
        }
        if (window.location.pathname.startsWith(`${windowLoc}`)) return true;
        return false;
    }

    const pageItems = [
        { text: "Home", redirect: "/", exact: true },
        { text: "Blog", redirect: "/blog", exact: false },
        { text: "Minecraft", redirect: "/mc-lockdown", exact: false },
        { text: "Advance Bot", redirect: "/advance-bot", exact: false }
    ]

    function NavItem(props: {text: string, redirect: string, page: string, exact?: boolean}) {
        return(
            <button onClick={() => { navigate(props.redirect); }} className={`text-lg 2md:text-base font-semibold duration-100 border-b-2 border-t-2 ${getWindowLocation(props.page, (props.exact !== true) ? false : true) ? `text-primary` : ``} border-white hover:border-b-primary focus:border-b-primary shrink`}>{props.text}</button>
        );
    }
    
    return (
        <section id="navbar" className="border-b border-gray-300 shrink-0">
            <div className={`max-w-7xl mx-auto px-10 duration-200 ease-out overflow-hidden ${menu ? `h-96 2md:h-24` : `h-24`}`}>
                <div className="flex justify-between h-24 items-center shrink-0 w-full">
                    <Logo />
                    <button onClick={(e) => {menu ? toggleMenu(false) : toggleMenu(true)}} className="text-4xl 2md:hidden"><BiMenu></BiMenu></button>
                    <div className="hidden items-center h-10 gap-5 2md:flex">
                        {pageItems.map((btn) => {
                            return (
                                <NavItem text={btn.text} redirect={btn.redirect} page={btn.redirect} exact={btn.exact} />
                            );
                        })}
                        {!user ?
                            <button onClick={() => { navigate('/login'); }} className="text-lg 2md:text-base h-10 2md:h-8 px-3 border-2 border-primary rounded-md font-semibold group focus:ring-4 ring-primary ring-opacity-50 transition-all flex items-center hover:bg-primary hover:text-white">
                                <h1>Login</h1>
                            </button>
                            :
                            <button onClick={() => { navigate('/dashboard'); }} className={`text-lg 2md:text-base h-10 2md:h-8 px-3 border-2 border-primary rounded-md font-semibold group focus:ring-4 ring-primary ring-opacity-50 transition-all flex items-center ` + (getWindowLocation('/dashboard') ? `text-white bg-primary hover:bg-transparent hover:text-gray-800` : `text-gray-800 hover:bg-primary hover:text-white`)}>
                                <h1>{user.username}</h1>
                            </button>
                        }
                    </div>
                </div>
                <div className="2-full h-72 shrink-0 flex flex-col">
                    {pageItems.map((btn) => {
                        return(
                            <div className="my-2 w-full flex items-center justify-end">
                                <NavItem text={btn.text} redirect={btn.redirect} page={btn.redirect} exact={btn.exact} />
                            </div>
                            );
                    })}
                    <div className="my-3 w-full flex items-center justify-end">
                        {!user ?
                            <button onClick={() => { navigate('/login'); }} className="text-lg 2md:text-base h-10 2md:h-8 px-3 border-2 border-primary rounded-md font-semibold group focus:ring-4 ring-primary ring-opacity-50 transition-all flex items-center hover:bg-primary hover:text-white">
                                <h1>Login</h1>
                            </button>
                            :
                            <button onClick={() => { navigate('/dashboard'); }} className={`text-lg 2md:text-base h-10 2md:h-8 px-3 border-2 border-primary rounded-md font-semibold group focus:ring-4 ring-primary ring-opacity-50 transition-all flex items-center ` + (getWindowLocation('/dashboard') ? `text-white bg-primary hover:bg-transparent hover:text-gray-800` : `text-gray-800 hover:bg-primary hover:text-white`)}>
                        <h1>{user.username}</h1>
                    </button>                           
                        }
                    </div>
                </div>
            </div>
        </section>
    );
}