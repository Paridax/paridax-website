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
            <button onClick={() => { if(props.redirect.length < 1) return; props.newTab ? window.open(props.redirect) : navigate(props.redirect); }} className="font-semibold duration-100 text-gray-600 hover:text-primary focus:border-primary text-sm focus:text-primary">{props.text}</button>
        );
    }

    return (
        <section className="border-t border-gray-300 shrink-0">
            <nav className="flex max-w-7xl h-24 items-center px-10 justify-between mx-auto">
                <div className="flex items-center">
                    <Logo className="scale-75 transform" />
                    <h1 className="text-gray-600 font-semibold text-sm mr-3">{`© ${new Date().getFullYear()} Paridax. All Rights Reserved.`}</h1>
                </div>
                <div className="flex items-center justify-end gap-5">
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