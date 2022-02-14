import * as React from 'react';
import { useNavigate } from 'react-router-dom';
import { Logo } from './Logo';

export const Navbar = () => {
    const navigate = useNavigate();

    function getWindowLocation(windowLoc: string, exact?: boolean) {
        let win;
        win = window.location.href;
        if (!win) win = '';
        if(exact) {
            if ((win.startsWith(`http://www.paridax.xyz`) || win.startsWith(`https://www.paridax.xyz`)) && win.endsWith(`www.paridax.xyz${windowLoc}`)) return true;
            return false;
        }
        if ((win.startsWith(`http://www.paridax.xyz`) || win.startsWith(`https://www.paridax.xyz`)) && win.includes(`www.paridax.xyz${windowLoc}`)) return true;
        return false;
    }

    function NavItem(props: {text: string, redirect: string, page: string, exact?: boolean}) {
        return(
            <button onClick={() => { navigate(props.redirect); }} className={`font-semibold duration-100 border-b-2 ${getWindowLocation(props.page, (props.exact !== true) ? false : true) ? `text-primary` : ``} border-white hover:border-primary focus:border-primary`}>{props.text}</button>
        );
    }

    console.log(getWindowLocation('/', true));

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
            </div>
        </nav>
    </section>
    );
};