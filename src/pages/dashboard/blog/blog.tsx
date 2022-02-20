// @ts-nocheck
import * as React from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { ProtectedRoute } from '../../../components/ProtectedRoute';
import { Navbar } from '../../../components/Navbar';
import '../../../index.css';
import { LoadingContext, UserContext } from '../../../utils/context';
import { getUser, updateUser, deleteUser, getBlog, updateBlogPost, publishBlogPost, deleteBlogPost, hideBlogPost } from '../../../utils/api';
import { useParams } from "react-router-dom";

export const DashboardViewBlog = (props: any) => {
    const navigate = useNavigate();

    const { postId } = useParams();
    const [user, setUser] = React.useContext(UserContext);
    const [loading, setLoading] = React.useContext(LoadingContext);
    const [specific, setSpecific] = React.useState(null);
    const [confirmPopup, setPopup] = React.useState(false);

    const [title, setTitle] = React.useState('');
    const [desc, setDesc] = React.useState('');
    const [content, setContent] = React.useState('');
    const [saving, setSaving] = React.useState(false);
    const [publishing, setPublishing] = React.useState(false);

    React.useEffect(() => {
        if (!user) {
            // console.log('Not logged in');
            navigate('/login');
        }
        // console.log(user);
        if (!user.permissions.includes('OWNER')) {
            navigate('/dashboard');
        }
        getBlog(postId)
        .then((res) => {
            // console.log('done');
            // console.log(res.data);
            if (!res.data) {
                navigate('/dashboard');
            }
            setSpecific(res.data);
            setTitle(res.data.postTitle);
            setDesc(res.data.postDescription);
            setContent(res.data.postContent);
        })
        .catch((err) => {
            // console.log(err);
            navigate('/dashboard/blog');
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
        return `${months[d.getMonth()]} ${d.getDate()}, ${d.getFullYear()}`;
    }

    async function showBlog() {
        await saveBlog();
        const blogPost = await publishBlogPost(postId);
        setSpecific({ ...specific, hidden: blogPost.data.hidden, published: blogPost.data.published, publishTimestamp: blogPost.data.publishTimestamp});
    }

    async function hideBlog() {
        await saveBlog();
        const blogPost = await hideBlogPost(postId);
        setSpecific({ ...specific, hidden: blogPost.data.hidden });
    }

    async function saveBlog() {
        setSaving(true);
        const blogPost = await updateBlogPost(postId, { postTitle: title, postContent: content, postDescription: desc });
        setSaving(false);
    }

    async function removeBlogPost() {
        const blogPost = await deleteBlogPost(postId);
        setSpecific(blogPost.data);
    }

    if (specific && user && !loading) {
        if (!specific.deleted) {
            return (
                <div>
                    <div className={`fixed w-screen h-screen flex items-center justify-around bg-gray-900 bg-opacity-25 ${confirmPopup ? `` : `hidden`}`}>
                        <div className="bg-white rounded-md h-72 w-96 opacity-100 py-10 px-5 flex items-center shadow-xl">
                            <div>
                                <h1 className="w-full font-semibold text-lg text-primary">DELETE THIS BLOG POST</h1>
                                <h1 className="w-full font-semibold text-gray-600">Are you sure you want to delete this blog post? Any of this post's information will be permanently deleted. This action cannot be undone.</h1>
                                <div className="flex items-center gap-3">
                                    <button onClick={() => { setPopup(false) }} className={`h-12 my-3 px-6 border-2 border-primary rounded-md font-semibold group focus:ring-4 ring-primary ring-opacity-50 transition-all flex items-center hover:bg-primary hover:text-white hover:shadow-xl duration-100`}><h1>Cancel</h1></button>
                                    <button onClick={() => { removeBlogPost(specific.postId); setPopup(false); }} className={`h-12 my-3 px-6 border-2 border-primary rounded-md font-semibold group focus:ring-4 ring-primary ring-opacity-50 transition-all flex items-center text-white bg-primary hover:bg-transparent hover:text-gray-800 hover:shadow-xl duration-100 disabled:bg-primary disabled:ring-0 disabled:brightness-75 disabled:transform disabled:text-white disabled:shadow-none`}><h1>Delete Post</h1></button>
                                </div>
                            </div>
                        </div>
                    </div>
                    <Navbar />
                    <div className="flex items-center justify-between max-w-7xl px-8 py-16 mx-auto">
                        <div className="items-center h-full w-full">
                            <div className="w-full">
                                <div className="flex gap-3 w-full">
                                    <button onClick={() => { specific.hidden ? showBlog() : hideBlog() }} className={`h-12 my-3 px-6 border-2 border-primary rounded-md font-semibold group focus:ring-4 ring-primary ring-opacity-50 transition-all flex items-center hover:bg-primary hover:text-white hover:shadow-xl duration-100 disabled:bg-transparent disabled:ring-0 disabled:brightness-75 disabled:transform disabled:text-gray-800 disabled:shadow-none`}><h1>{specific.hidden && !specific.published ? 'Publish' : specific.hidden ? 'Show Post' : 'Hide Post'}</h1></button>
                                    
                                    <button onClick={() => { if (!specific.hidden && specific.published) navigate(`/blog/${specific.postId}`); }} className={`h-12 my-3 px-6 border-2 border-primary rounded-md font-semibold group focus:ring-4 ring-primary ring-opacity-50 transition-all flex items-center hover:bg-primary hover:text-white hover:shadow-xl duration-100 disabled:bg-transparent disabled:ring-0 disabled:brightness-75 disabled:transform disabled:text-gray-800 disabled:shadow-none ${!specific.hidden && specific.published ? `` : `hidden`}`}><h1>View Post on Site</h1></button>
                                    
                                    <button onClick={() => { if (!saving) saveBlog() }} className={`h-12 my-3 px-6 border-2 border-primary rounded-md font-semibold group focus:ring-4 ring-primary ring-opacity-50 transition-all flex items-center hover:bg-primary hover:text-white hover:shadow-xl duration-100`}><h1>{!saving ? 'Save' : 'Saving...'}</h1></button>
                                    
                                    <button onClick={() => { setPopup(true) }} className={`h-12 my-3 px-6 border-2 border-primary rounded-md font-semibold group focus:ring-4 ring-primary ring-opacity-50 transition-all flex items-center hover:bg-primary hover:text-white hover:shadow-xl duration-100`}><h1>Delete</h1></button>
                                    
                                    <button onClick={() => { navigate('/dashboard/blog'); }} className={`h-12 my-3 px-6 border-2 border-primary rounded-md font-semibold group focus:ring-4 ring-primary ring-opacity-50 transition-all flex items-center hover:bg-primary hover:text-white hover:shadow-xl duration-100`}><h1>Back</h1></button>
                                </div>
                                <div className="mx-auto items-center gap-5 w-full">
                                    <p className="w-full text-gray-600 mt-1">
                                        <span className="font-semibold">Title</span><br></br>
                                        <input onChange={(e) => { setTitle(e.target.value) }} className={`my-0.5 border-gray-400 hover:border-primary transform focus:border-primary shadow-inner border-2 rounded-md h-12 w-full ring-opacity-50 ring-primary transition-all focus:ring-4 p-2 duration-200 caret-primary ${confirmPopup ? `hidden` : ``}`} defaultValue={title}></input>
                                    </p>
                                    <p className="w-full text-gray-600 mt-1">
                                        <span className="font-semibold">Description</span><br></br>
                                        <input onChange={(e) => { setDesc(e.target.value) }} maxLength={140} className={`my-0.5 border-gray-400 hover:border-primary transform focus:border-primary shadow-inner border-2 rounded-md h-12 w-full ring-opacity-50 ring-primary transition-all focus:ring-4 p-2 duration-200 caret-primary ${confirmPopup ? `hidden` : ``}`} defaultValue={desc}></input>
                                    </p>
                                    <p className="w-full text-gray-600 mt-1">
                                        <span className="font-semibold">Content</span><br></br>
                                        <textarea onChange={(e) => { setContent(e.target.value) }} className={`mt-0.5 border-gray-400 hover:border-primary transform focus:border-primary shadow-inner border-2 rounded-md w-full ring-opacity-50 ring-primary transition-shadow focus:ring-4 p-2 caret-primary h-32 ${confirmPopup ? `hidden` : ``}`} defaultValue={content}></textarea>
                                    </p>
                                </div>
                            </div>
                            <div className="my-16 md:max-w-4xl lg:max-w-5xl flex flex-col shadow-2xl py-24 mx-auto">
                                <div className="">
                                    <div className="mx-auto w-full h-full prose prose-sm lg:prose-base prose-slate" dangerouslySetInnerHTML={{
                                        __html: `
                                    <strong class="font-semibold text-gray-500">${specific.postAuthor} • ${unixMsStringToDate(specific.published && specific.publishTimestamp ? specific.publishTimestamp.toString() : specific.createdTimestamp.toString())}</strong>
                                    <h1>${title}</h1>
                                    ${content.replaceAll('\\n', '<br>')}
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
                <Navbar />
                <div className="flex items-center justify-between gap-5 max-w-7xl px-8 py-16 mx-auto w-screen">
                    <div className="flex items-center h-full w-full">
                        <div className="mx-auto items-center gap-5 w-full">
                            <p className="w-full text-gray-600 mt-1">
                                <span className="font-semibold">Post has been successfully deleted.</span><br></br>
                            </p>

                            <button onClick={() => { navigate('/dashboard/blog'); }} className={`h-12 my-3 px-6 border-2 border-primary rounded-md font-semibold group focus:ring-4 ring-primary ring-opacity-50 transition-all flex items-center hover:bg-primary hover:text-white hover:shadow-xl duration-100`}><h1>Back to Dashboard</h1></button>
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
