import * as React from 'react';
import { FaDiscord, FaGithub, FaInstagram, FaSnapchat, FaTwitter } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import logo from '../Convex Icon.svg';
import pdx from '../Paridax Logo.svg';
import { Logo } from './LogoOnly';

export const Footer = () => {
    const navigate = useNavigate();

    function FooterItem(props: { text: string, redirect: string, newTab?: boolean}) {
        return (
            <button onClick={() => { if(props.redirect.length < 1) return; props.newTab ? window.open(props.redirect) : navigate(props.redirect); }} className="whitespace-nowrap font-semibold duration-100 text-gray-600 hover:text-primary focus:border-primary text-sm focus:text-primary">{props.text}</button>
        );
    }

    return (
        <section className="border-t border-gray-300 shrink-0">
            <nav className="flex flex-col xl:flex-row max-w-7xl xl:h-24 items-center px-10 xl:py-0 justify-center sm:justify-between mx-auto">
                <div className="flex items-center my-6 xl:my-0 ">
                    <Logo className="scale-75 transform" />
                    <h1 className="text-gray-600 font-semibold text-sm mr-3 whitespace-nowrap">© {new Date().getFullYear()} Paridax</h1>
                </div>
                <div className="flex items-center justify-center xl:justify-end flex-wrap gap-5 mb-8 xl:mb-0">
                    <FooterItem text="Home" redirect="/" />
                    <FooterItem text="Projects" redirect="/projects" />
                    <FooterItem text="Contact" redirect="/contact" />
                    <FooterItem text="Twitter" redirect="https://twitter.com/paridaxx" newTab />
                    <FooterItem text="Discord" redirect="https://discord.gg/TuFVPdKUE6" newTab />
                    <FooterItem text="GitHub" redirect="https://github.com/paridax" newTab />
                    <FooterItem text="Terms of Service" redirect="" />
                    <FooterItem text="Privacy Policy" redirect="" />
                </div>
            </nav>
        </section>
    );
}