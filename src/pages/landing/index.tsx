// @ts-nocheck
import * as React from 'react';
import '../../index.css';
import { Navbar } from '../../components/Navbar';
import { Footer } from '../../components/Footer';
import { FaAngleRight, FaDollarSign, FaServer } from 'react-icons/fa';
import { RiPagesLine, RiSoundModuleFill } from 'react-icons/ri';
import { IconType } from 'react-icons/lib';
import { useNavigate } from 'react-router-dom';
import { LoadingContext, UserContext } from '../../utils/context';
import { ProtectedRoute } from '../../components/ProtectedRoute';
import { getBlogsForGuest } from '../../utils/api';
import { Loader, LoaderSm } from '../../components/Loader';

export const Landing = (props: any) => {
    const navigate = useNavigate();

    const [user, setUser] = React.useContext(UserContext);
    const [loading, setLoading] = React.useContext(LoadingContext);

    const [blogs, setBlogs] = React.useState(null);

    function ProjectBullet(props: {Icon: IconType, title: string, description: string}) {
        return(
            <div className="col-span-1">
                <props.Icon className="ml-2 text-4xl group-hover:translate-x-1 group-focus:translate-x-1 duration-150 ease-out text-primary my-2"></props.Icon>
                <h1 className="font-semibold my-1">{props.title}</h1>
                <p className="text-sm">{props.description}</p>
            </div>
        );
    }

    React.useEffect(() => {
        getBlogsForGuest()
            .then(({ data }: any) => {
                console.log(data);
                setBlogs(data.slice(0, 3));
            }).catch((err: Error) => {
                // console.log(err);
                setLoading(false);
            });
    }, []);

    function BlogPost(blog: any, index: any) {
        return (
            <div className=" col-span-1 duration-150 border-t border-gray-300" key={index}>
                <div className="mt-8 mb-2 flex flex-col h-48">
                    <h1 className="text-sm font-semibold text-gray-400 shrink-0">{blog.postAuthor} • {unixMsStringToDate(blog.publishTimestamp)}</h1>
                    <h1 className="text-3xl font-semibold text-gray-800 shrink-0 line-clamp-3">{blog.postTitle}</h1>
                    <p className="text-sm w-full h-auto overflow-hidden line-clamp-3 text-gray-600">{blog.postDescription}</p>
                </div>

                <button onClick={() => { navigate(`/blog/${blog.postId}`); }} className="text-md py-2 rounded-md font-semibold group transition-all flex items-center hover:brightness-120 hover:text-primary focus:text-primary w-auto">
                    <h1>View Blog Post</h1>
                    <FaAngleRight className="ml-2 text-xl group-hover:translate-x-1 group-focus:translate-x-1 duration-150 ease-out"></FaAngleRight>
                </button>
            </div>
        );
    }

    function unixMsStringToDate(str: string) {
        let d = new Date(0);
        d.setUTCSeconds(Math.floor(parseInt(str) / 1000));
        return formatDate(d);
    }

    function formatDate(d: Date) {
        const weekdays = ['Monday', 'Tuesday', 'Wednesday', 'Thurday', 'Friday', 'Saturday', 'Sunday'];
        const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
        return `${months[d.getMonth()]} ${d.getDate()}, ${d.getFullYear()}`; // ${d.toLocaleTimeString()}
    }

    if (!loading) {
        return(
            <div>
                <Navbar />
                <section>
                    <div className="flex items-center justify-between gap-5 max-w-7xl px-16 py-32 mx-auto">
                        <div className="w-3/5">
                                <h1 className="w-3/4 text-5xl font-bold tracking-tight">
                                The new and improved homepage of Paridax
                            </h1>
                            <h1 className="w-3/4 text-md leading-tight mt-2">
                                This is my website. Everything here is managed, programmed, and maintained by me. Check out my blog or any of my other projects.<br></br>
                            </h1>
                            <div className="w-3/4 my-8 mx-5">
                                <div className="align-items-center flex my-2">
                                    <div className="rounded-full w-2 h-2 bg-primary my-auto mx-3 shrink-0"></div>
                                    <h1>New projects can be found on the projects page.</h1>
                                </div>

                                <div className="align-items-center flex my-2">
                                    <div className="rounded-full w-2 h-2 bg-primary my-auto mx-3 shrink-0"></div>
                                    <h1>Check out the blog for any updates on the site.</h1>
                                </div>

                                <div className="align-items-center flex my-2">
                                    <div className="rounded-full w-2 h-2 bg-primary my-auto mx-3 shrink-0"></div>
                                    <h1>Join my Minecraft server!</h1>
                                </div>

                                <div className="align-items-center flex my-2">
                                    <div className="rounded-full w-2 h-2 bg-primary my-auto mx-3 flex-wrap shrink-0"></div>
                                    <h1>I do not make any money from this website.</h1>
                                </div>
                            </div>
                            <div className="flex items-center gap-5">
                                <button onClick={() => { navigate('/projects'); }} className="h-12 px-6 bg-primary rounded-md font-semibold group focus:ring-4 ring-primary ring-opacity-50 transition-all flex items-center text-white hover:bg-transparent hover:text-gray-800 border-2 border-primary hover:shadow-xl duration-100">
                                    <h1>View Projects</h1>
                                    <FaAngleRight className="ml-2 text-xl group-hover:translate-x-1 group-focus:translate-x-1 duration-150 ease-out"></FaAngleRight>
                                </button>
                                <button onClick={() => { window.location.href.endsWith('#posts') ? window.location.href += '' : window.location.href += '#posts'; }} className="h-12 px-6 border-2 border-primary rounded-md font-semibold group focus:ring-4 ring-primary ring-opacity-50 transition-all flex items-center hover:bg-primary hover:text-white hover:shadow-xl duration-100">
                                    <h1>Read Blog</h1>
                                </button>
                            </div>
                        </div>
                        <div className="grow col-span-2 h-96 flex items-center">
                            <h1 className="mx-auto font-bold">placeholder</h1>
                        </div>
                    </div>
                </section>
                <section id="advance" className="bg-offwhite py-14">
                    <div className="justify-between gap-5 max-w-7xl px-16 pb-8 mx-auto">
                        <h1 className="font-semibold my-2 text-primary">PROJECT SHOWCASE - ADVANCE BOT</h1>
                        <div className=" items-center max-w-7xl mx-auto grid grid-cols-2 gap-5">
                            <div className=" col-span-1 pt-2 ">
                                <h1 className="text-4xl font-medium">Advance is the best way to kickstart and boost your Discord community.</h1>
                            </div>
                            <div className="col-span-1 justify-end flex pl-12">
                                <p>Advance is a shiny new Discord bot developed by Paridax, and can help boost your Discord server. Whether it's just a group of friends or a massive thriving community, Advance packs modules for everything you could need, and is totally free.</p>
                            </div>
                        </div>
                        <div className="grid grid-cols-4 mt-14 mb-5 gap-5">
                                <ProjectBullet Icon={FaServer} title="Low Latency" description="Advance uses Discord.js version 13 and Mongo Database, and is hosted on-location which means no delay between commands and data. Get what you need, when you need it."></ProjectBullet>
                                <ProjectBullet Icon={FaDollarSign} title="Always Free" description="Advance is totally free, and I plan to continue updating it. If you would like to support me, consider donating on Patreon."></ProjectBullet>
                                <ProjectBullet Icon={RiSoundModuleFill} title="Modular" description="With totally customizable options, Advance lets you only use what you need to. Advance has modules for music, moderation, entertainment and more!"></ProjectBullet>
                                <ProjectBullet Icon={RiPagesLine} title="Customizable Web Dashboard" description="Advance supports a responsive, multi-platform web dashboard. Manage your server with ease using the web dashboard."></ProjectBullet>
                        </div>
                        <button onClick={() => { navigate('/advance-bot'); }} className="text-md py-3 rounded-md font-semibold group transition-all flex items-center  hover:brightness-120 hover:text-primary focus:text-primary w-auto">
                            <h1>Learn More</h1>
                            <FaAngleRight className="ml-2 text-xl group-hover:translate-x-1 group-focus:translate-x-1 duration-150 ease-out"></FaAngleRight>
                        </button>
                    </div>
                </section>
                <section id="posts" className="py-5">
                    <div className="items-center justify-between gap-5 max-w-7xl px-16 mx-auto">
                        <h1 className="font-semibold my-2 text-primary">LATEST UPDATES</h1>
                        <div className="grid grid-cols-3 gap-8 my-4">
                            {blogs ? blogs.map((blog: any, i: any) => {
                                return BlogPost(blog, i);
                            }) : 
                            <div className="h-64 flex col-span-3 items-center justify-around w-full">
                                <Loader color="text-primary" />
                            </div>
                            }
                        </div>
                    </div>
                </section>
                <Footer />
            </div >
        );
    }

    return (
        <div>
            <ProtectedRoute />
        </div>
    )
}