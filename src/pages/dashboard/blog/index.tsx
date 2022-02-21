// @ts-nocheck
import * as React from 'react';
import { useNavigate } from 'react-router-dom';
import { ProtectedRoute } from '../../../components/ProtectedRoute';
import { Navbar } from '../../../components/Navbar';
import '../../../index.css';
import { LoadingContext, UserContext } from '../../../utils/context';
import { getBlogs } from '../../../utils/api';

export const DashboardViewBlogs = () => {
    const navigate = useNavigate();

    const [user, setUser] = React.useContext(UserContext);
    const [loading, setLoading] = React.useContext(LoadingContext);
    const [blogs, setBlogs] = React.useState(null);
    
    React.useEffect(() => {
        if (!user) {
            console.log('Not logged in');
            navigate('/login');   
        }
        if (!user.permissions.includes('OWNER')) {
            navigate('/dashboard'); 
        }
        getBlogs()
        .then((blogs) => {
            console.log(blogs.data);
            setBlogs(blogs.data);
        });
    }, []);

    function unixMsStringToDate(str: string) {
        let d = new Date(0);
        d.setUTCSeconds(Math.floor(parseInt(str)/1000));
        return formatDate(d);
    }

    function formatDate(d: Date) {
        const weekdays = ['Sunday', 'Monday','Tuesday','Wednesday','Thurday','Friday','Saturday'];
        const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July','August','September','October','November','December'];
        return `${d.getMonth() + 1}/${d.getDate()}/${d.getFullYear()} ${d.toLocaleTimeString()}`;
    }


    if (blogs && user && !loading) {
        console.log(user);
        return (
            <div>
                <Navbar />
                <div className="flex items-center justify-between gap-5 max-w-7xl px-8 py-16 mx-auto w-screen">
                    <div className="flex items-center h-full w-full">
                        <div className="mx-auto items-center gap-5 w-full">
                            <div className="flex items-center w-full">
                                <p className="w-full mt-1 font-semibold text-lg">
                                    {'View All Blog Posts'}
                                </p>
                                <button onClick={() => { navigate('/dashboard/blog/create'); }} className="ml-auto mr-5 h-12 shrink-0 my-3 px-6 border-2 border-primary rounded-md font-semibold group focus:ring-4 ring-primary ring-opacity-50 transition-all flex items-center hover:bg-primary hover:text-white hover:shadow-xl duration-100">
                                    <h1>Create Blog Post</h1>
                                </button>
                                <button onClick={() => { navigate('/dashboard'); }} className="h-12 shrink-0 my-3 px-6 border-2 border-primary rounded-md font-semibold group focus:ring-4 ring-primary ring-opacity-50 transition-all flex items-center hover:bg-primary hover:text-white hover:shadow-xl duration-100">
                                    <h1>Back to Dashboard</h1>
                                </button>
                            </div>
                            <div className="w-full">
                                <div className="w-full grid items-center h-8 grid-cols-10 px-2 border-2 border-transparent">
                                    <p className="font-semibold text-gray-600 col-span-4 text-ellipsis overflow-hidden">Title</p>
                                    <p className="font-semibold text-gray-600 col-span-1 text-ellipsis overflow-hidden">Author</p>
                                    <p className="font-semibold text-gray-600 col-span-2 text-ellipsis overflow-hidden">Date Created</p>
                                    <p className="font-semibold text-gray-600 col-span-1 text-ellipsis overflow-hidden">Views</p>
                                    <p className="font-semibold text-gray-600 col-span-2 text-ellipsis overflow-hidden">Publish Timestamp</p>
                                </div>
                                {blogs.map((blog: any, i: any) => {
                                    console.log(blog);
                                    return (
                                        <button onClick={() => { navigate(`/dashboard/blog/posts/${blog.postId}`) }} className="w-full grid items-center h-12 grid-cols-10 px-2 my-1 border-2 hover:border-primary rounded duration-100 focus:border-primary" key={i}>
                                            <p className="text-left font-semibold col-span-4 w-full text-ellipsis overflow-hidden whitespace-nowrap">{blog.postTitle}</p>
                                            <p className="text-left font-semibold col-span-1 w-full text-ellipsis overflow-hidden whitespace-nowrap">{blog.postAuthor}</p>
                                            <p className="text-left font-semibold col-span-2 w-full text-ellipsis overflow-hidden whitespace-nowrap">{unixMsStringToDate(blog.createdTimestamp)}</p>
                                            <p className="text-left font-semibold col-span-1 w-full text-ellipsis overflow-hidden whitespace-nowrap">{blog.hidden ? 'Hidden Post' : blog.postViews}</p>
                                            <p className="text-left font-semibold col-span-2 w-full mr-auto text-ellipsis overflow-hidden whitespace-nowrap">{blog.published ? unixMsStringToDate(blog.publishTimestamp) : 'Not Published'}</p>
                                            {/* <p className="font-semibold col-span-2">{unixMsStringToDate(blog.lastLogin)}</p> */}
                                        </button>
                                    );
                                })}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div>
            <ProtectedRoute />
        </div>
    )
}
