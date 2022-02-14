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
                    <FooterItem text="Terms & Conditions" redirect="" />
                    <FooterItem text="Privacy Policy" redirect="" />
                    <FooterItem text="Cookie Policy" redirect="" />
                </div>
            </nav>
        </section>
    );
}

const a = `
<div className="flex flex-col justify-around p-1 text-xl">
                    <div className="text-gray-400 mb-4 w-full flex justify-around">
                        {/* <h1 className="text-sm text-gray-500 p-1">A Paridax app.</h1> */}
                    </div>
                    <div className="flex justify-center text-center">
                        <a href="https://paridax.xyz/social/twitter" target="_blank" rel="noopener noreferrer" className="mx-1 text-gray-400 hover:text-gray-200 transition-all">
                            <FaTwitter className="w-10 h-10" />
                        </a>
                        <a href="https://paridax.xyz/social/instagram" target="_blank" rel="noopener noreferrer" className="mx-1 text-gray-400 hover:text-gray-200 transition-all">
                            <FaInstagram className="w-10 h-10" />
                        </a>
                        <a href="https://paridax.xyz/social/snapchat" target="_blank" rel="noopener noreferrer" className="mx-1 text-gray-400 hover:text-gray-200 transition-all">
                            <FaSnapchat className="w-10 h-10" />
                        </a>
                        <a href="https://paridax.xyz/social/discord/waffle-house/" target="_blank" rel="noopener noreferrer" className="mx-1 text-gray-400 hover:text-gray-200 transition-all">
                            <FaDiscord className="w-10 h-10" />
                        </a>
                        <a href="https://paridax.xyz/social/github" target="_blank" rel="noopener noreferrer" className="mx-1 text-gray-400 hover:text-gray-200 transition-all">
                            <FaGithub className="w-10 h-10" />
                        </a>
                    </div>
                    <div className="text-light justify-center flex m-1 text-base">
                        <div>
                            <div className>
                                <a href="https://paridax.xyz/contact" className="px-3 text-gray-400 hover:text-gray-300 whitespace-nowrap transition-all">Contact Us</a>
                                <a href="https://paridax.xyz/info/policies/terms" className="px-3 text-gray-400 hover:text-gray-300 whitespace-nowrap transition-all">Terms of Service</a>
                                <a href="https://paridax.xyz/info/policies/privacy" className="px-3 text-gray-400 hover:text-gray-300 whitespace-nowrap transition-all">Privacy Policy</a>
                                <a href="https://paridax.xyz/info/policies/cookies" className="px-3 text-gray-400 hover:text-gray-300 whitespace-nowrap transition-all">Cookie Policy</a>
                            </div>
                            <h1 className="text-normal text-gray-500 p-1 mx-auto">© Copyright 2021 Convex by Paridax. <span className="text-nowrap">All Rights Reserved.</span></h1>
                        </div>
                    </div>
                </div>
`;