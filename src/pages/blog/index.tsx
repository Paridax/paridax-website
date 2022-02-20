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
import { data } from 'autoprefixer';

export const BlogSelection = (props: any) => {
    const navigate = useNavigate();

    const [user, setUser] = React.useContext(UserContext);
    const [loading, setLoading] = React.useContext(LoadingContext);

    const [blogs, setBlogs] = React.useState(null);

    React.useEffect(() => {
        getBlogsForGuest()
            .then(({ data }: any) => {
                // // console.log(data);
                setBlogs(data);
            }).catch((err: Error) => {
                // // console.log(err);
                setLoading(false);
            });
    }, []);

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

    function BlogPost(blog: any, index: any) {
        return (
            <div className=" col-span-1 duration-150 border-t border-gray-300" key={index}>
                <div className="mt-8 mb-2">
                    <h1 className="text-sm font-semibold text-gray-400">{blog.postAuthor} • {unixMsStringToDate(blog.publishTimestamp)}</h1>
                    <h1 className="text-3xl font-semibold text-gray-800">{blog.postTitle}</h1>
                </div>
                <p className="text-sm text-gray-600 h-24">{blog.postDescription}</p>

                <button onClick={() => { navigate(`/blog/${blog.postId}`); }} className="text-md py-3 rounded-md font-semibold group transition-all flex items-center hover:brightness-120 hover:text-primary focus:text-primary w-auto">
                    <h1>View Blog Post</h1>
                    <FaAngleRight className="ml-2 text-xl group-hover:translate-x-1 group-focus:translate-x-1 duration-150 ease-out"></FaAngleRight>
                </button>
            </div>
        );
    }

    if (!loading && blogs) {
        return(
            <div>
                <Navbar />
                <section>
                    <div className="flex items-center justify-around gap-5 max-w-7xl px-16 py-32 mx-auto">
                        <div>
                            <h1 className="mx-auto w-3/4 text-center text-5xl font-bold tracking-tight">
                                Get the Latest News and Updates for Paridax.xyz
                            </h1>
                            <h1 className="mx-auto w-4/5 text-center text-md leading-tight my-6">
                                This page is where you can find any updates, blog posts, or important information regarding the website. I may post about any changes to the site, or just anything I'm currently working on. Feel free to explore, although there might not be many posts yet, or select "Read Latest" to view the latest update.<br></br>
                            </h1>
                            <div className="w-full flex items-center justify-around">
                                <div className="flex items-center gap-5">
                                    <button onClick={() => { if (blogs.length) navigate(`/blog/${blogs[0].postId}`); }} className="h-12 px-6 bg-primary rounded-md font-semibold group focus:ring-4 ring-primary ring-opacity-50 transition-all flex items-center text-white hover:bg-transparent hover:text-gray-800 border-2 border-primary hover:shadow-xl duration-100">
                                        <h1>Read Latest</h1>
                                        <FaAngleRight className="ml-2 text-xl group-hover:translate-x-1 group-focus:translate-x-1 duration-150 ease-out"></FaAngleRight>
                                    </button>
                                    <button onClick={() => { window.location.href.endsWith('#posts') ? window.location.href += '' : window.location.href += '#posts'; }} className="h-12 px-6 border-2 border-primary rounded-md font-semibold group focus:ring-4 ring-primary ring-opacity-50 transition-all flex items-center hover:bg-primary hover:text-white hover:shadow-xl duration-100">
                                        <h1>Explore Posts</h1>
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
                <section id="posts" className="py-5 bg-offwhite">
                    <div className="items-center justify-between gap-5 max-w-7xl px-16 mx-auto">
                        <h1 className="font-semibold my-2 text-primary">LATEST UPDATES</h1>
                        <div className="grid grid-cols-3 gap-8 my-4">
                            {blogs.map((blog: any, i: any) => {
                                return BlogPost(blog, i);
                            })}
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