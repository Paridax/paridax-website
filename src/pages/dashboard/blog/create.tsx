// @ts-nocheck
import * as React from 'react';
import { useNavigate } from 'react-router-dom';
import { ProtectedRoute } from '../../../components/ProtectedRoute';
import { Navbar } from '../../../components/Navbar';
import '../../../index.css';
import { LoadingContext, UserContext } from '../../../utils/context';
import { createBlogPost, getUsers } from '../../../utils/api';

export const DashboardCreateBlog = () => {
    const navigate = useNavigate();

    const [user, setUser] = React.useContext(UserContext);
    const [loading, setLoading] = React.useContext(LoadingContext);
    const [specific, setSpecific] = React.useState(null);
    const [confirmPopup, setPopup] = React.useState(false);
    const [saving, setSaving] = React.useState(false);

    React.useEffect(() => {
        if (!user) {
            // console.log('Not logged in');
            navigate('/login');
        }
        // console.log(user);
        if (!user.permissions.includes('OWNER')) {
            navigate('/dashboard');
        }
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

    const exampleDate = Date.now();
    const [title, setTitle] = React.useState('');
    const [desc, setDesc] = React.useState('');
    const [content, setContent] = React.useState('');

    async function saveBlog() {
        setSaving(true);
        const blogPost = await createBlogPost({postTitle: title, postContent: content, postDescription: desc});
        if (blogPost.data.blogId) {
            setSaving(false);
            navigate(`/dashboard/blog/posts/${blogPost.data.blogId}`);
        }
        setSaving(false);
    }

    if (user && !loading) {
        // console.log(specific);
        return (
            <div>
                <Navbar />
                <div className="flex items-center justify-between max-w-7xl px-8 py-16 mx-auto">
                    <div className="items-center h-full w-full">
                        <div className="w-full">
                            <div className="flex gap-3 w-full">
                                <button onClick={() => { if(!saving) saveBlog() }} className={`h-12 my-3 px-6 border-2 border-primary rounded-md font-semibold group focus:ring-4 ring-primary ring-opacity-50 transition-all flex items-center hover:bg-primary hover:text-white hover:shadow-xl duration-100`}><h1>{!saving ? 'Save' : 'Saving...'}</h1></button>
                                <button onClick={() => { navigate('/dashboard/blog'); }} className={`h-12 my-3 px-6 border-2 border-primary rounded-md font-semibold group focus:ring-4 ring-primary ring-opacity-50 transition-all flex items-center hover:bg-primary hover:text-white hover:shadow-xl duration-100`}><h1>Back</h1></button>
                            </div>
                            <div className="mx-auto items-center gap-5 w-full">
                                <p className="w-full text-gray-600 mt-1">
                                    <span className="font-semibold">Title</span><br></br>
                                    <input onChange={(e) => { setTitle(e.target.value) }} className="my-0.5 border-gray-400 hover:border-primary transform focus:border-primary shadow-inner border-2 rounded-md h-12 w-full ring-opacity-50 ring-primary transition-all focus:ring-4 p-2 duration-200 caret-primary"></input>
                                </p>
                                <p className="w-full text-gray-600 mt-1">
                                    <span className="font-semibold ">Description</span><br></br>
                                    <input onChange={(e) => { setDesc(e.target.value) }} maxLength={141} className="my-0.5 border-gray-400 hover:border-primary transform focus:border-primary shadow-inner border-2 rounded-md h-12 w-full ring-opacity-50 ring-primary transition-all focus:ring-4 p-2 duration-200 caret-primary"></input>
                                </p>
                                <p className="w-full text-gray-600 mt-1">
                                    <span className="font-semibold">Content</span><br></br>
                                    <textarea onChange={(e) => { setContent(e.target.value) }} className="mt-0.5 border-gray-400 hover:border-primary transform focus:border-primary shadow-inner border-2 rounded-md w-full ring-opacity-50 ring-primary transition-shadow focus:ring-4 p-2 caret-primary h-32"></textarea>
                                </p>
                            </div>
                        </div>
                        <div className="my-16 md:max-w-4xl lg:max-w-5xl flex flex-col shadow-2xl py-24 mx-auto">
                            <div className="">
                                <div className="mx-auto w-full h-full prose prose-sm lg:prose-base prose-slate" dangerouslySetInnerHTML={{
                                    __html: `
                                    <strong class="font-semibold text-gray-500">${user.username} • ${unixMsStringToDate(exampleDate.toString())}</strong>
                                    <h1>${title ? title : 'A Fancy Blog Post Title!'}</h1>
                                    ${content ? content.replaceAll('\\n', '<br>') : '<p class="lead">Start writing some content to see it show up here</p>'}
                                    ` }}>
                                </div>
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
