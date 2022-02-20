import * as React from 'react';
import { useNavigate } from 'react-router-dom';
import { getUserData } from '../utils/api';
import { UserContext } from '../utils/context';
import { Logo } from './Logo';

export const Navbar = (props: { user?: any }) => {
    const navigate = useNavigate();

    const [user, setUser] = React.useContext(UserContext);


    function getWindowLocation(windowLoc: string, exact?: boolean) {
        let web_thing = `paridax.xyz`;

        let win;
        win = window.location.href;
        if (!win) win = '';
        if(exact) {
            if ((win.startsWith(`http://${web_thing}`) || win.startsWith(`https://${web_thing}`)) && win.endsWith(`${web_thing}${windowLoc}`)) return true;
            return false;
        }
        if ((win.startsWith(`http://${web_thing}`) || win.startsWith(`https://${web_thing}`)) && win.includes(`${web_thing}${windowLoc}`)) return true;
        return false;
    }

    function NavItem(props: {text: string, redirect: string, page: string, exact?: boolean}) {
        return(
            <button onClick={() => { navigate(props.redirect); }} className={`font-semibold duration-100 border-b-2 border-t-2 ${getWindowLocation(props.page, (props.exact !== true) ? false : true) ? `text-primary` : ``} border-white hover:border-b-primary focus:border-b-primary`}>{props.text}</button>
        );
    }

    return (
    <section id="navbar" className="border-b border-gray-300 shrink-0">
        <nav className="flex max-w-7xl h-24 items-center px-10 mx-auto justify-between">
            <Logo />
            <div className="flex items-center justify-end gap-5">
                <NavItem text="Home" redirect="/" page="/" exact={true} />
                <NavItem text="Projects" redirect="/projects" page="/projects" />
                <NavItem text="Blog" redirect="/blog" page="/blog" />
                <NavItem text="Minecraft" redirect="/mc-lockdown" page="/mc-lockdown" />
                <NavItem text="Advance Bot" redirect="/advance-bot" page="/advance-bot" />
                <div className="">
                    {!user ?
                            <button onClick={() => { navigate('/login'); }} className="h-8 px-3 border-2 border-primary rounded-md font-semibold group focus:ring-4 ring-primary ring-opacity-50 transition-all flex items-center hover:bg-primary hover:text-white">
                                <h1>Login</h1>
                            </button>
                            :
                            <button onClick={() => { navigate('/dashboard'); }} className={`h-8 px-3 border-2 border-primary rounded-md font-semibold group focus:ring-4 ring-primary ring-opacity-50 transition-all flex items-center ` + (getWindowLocation('/dashboard') ? `text-white bg-primary hover:bg-transparent hover:text-gray-800` : `text-gray-800 hover:bg-primary hover:text-white`)}>
                                <h1>{user.username}</h1>
                            </button>                           
                    }
                </div>
            </div>
        </nav>
    </section>
    );
};