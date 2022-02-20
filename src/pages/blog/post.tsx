// @ts-nocheck
import * as React from 'react';
import '../../index.css';
import { Navbar } from '../../components/Navbar';
import { Footer } from '../../components/Footer';
import { FaAngleLeft, } from 'react-icons/fa';
import { useNavigate, useParams } from 'react-router-dom';
import { LoadingContext, UserContext } from '../../utils/context';
import { ProtectedRoute } from '../../components/ProtectedRoute';
import { getBlogForGuest } from '../../utils/api';

export const BlogPost = (props: any) => {
    const navigate = useNavigate();

    const { postId } = useParams();
    const [user, setUser] = React.useContext(UserContext);
    const [loading, setLoading] = React.useContext(LoadingContext);
    const [blog, setBlog] = React.useState(null);

    React.useEffect(() => {
        getBlogForGuest(postId)
            .then((res: any) => {
                // // console.log('done');
                // // console.log(res.data);
                if (!res.data) {
                    navigate('/blog');
                }
                setBlog(res.data);
            })
            .catch((err) => {
                // // console.log(err);
                navigate('/blog');
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

    if (!loading && blog) {
        return(
            <div className="h-screen flex flex-col">
                <Navbar />
                <div className="grow bg-offwhite py-16">
                    <div className="bg-white h-full sm:max-w-3xl md:max-w-4xl lg:max-w-5xl flex flex-col shadow-xl pb-24 mx-auto">
                        <div>
                            <div className="text-base mx-auto max-w-prose h-24 flex items-center gap-10 justify-between">
                                <button onClick={() => { navigate(`/blog`); }} className="text-gray-500 text-md py-3 rounded-md font-semibold group transition-all flex items-center hover:brightness-120 hover:text-primary focus:text-primary w-auto">
                                    <FaAngleLeft className="text-xl group-hover:-translate-x-1 group-focus:-translate-x-1 duration-150 ease-out"></FaAngleLeft>
                                    <h1>Back</h1>
                                </button>
                                <button onClick={() => { navigate(`/dashboard/blog/posts/${blog.postId}`); }} className={`text-gray-500 text-md py-3 rounded-md font-semibold group transition-all flex items-center hover:brightness-120 hover:text-primary focus:text-primary w-auto ${user ? user.permissions.includes('OWNER') ? `` : `hidden` : `hidden`}`}>
                                    <h1>Edit Article</h1>
                                </button>
                            </div>
                            <div className="mx-auto w-full h-full prose prose-sm lg:prose-base prose-slate " dangerouslySetInnerHTML={{
                                __html: `                     
                                    <strong class="font-semibold text-gray-500">${blog.postAuthor} • ${blog.publishTimestamp ? unixMsStringToDate(blog.publishTimestamp.toString()) : unixMsStringToDate(specific.createdTimestamp.toString())}${blog.postViews ? ` • ${parseInt(blog.postViews) + 1} View${parseInt(blog.postViews) + 1 === 1 ? '' : 's'}` : ``}</strong>
                                    <h1>${blog.postTitle}</h1>
                                    ${blog.postContent.replaceAll('\\n', '<br>')}
                                    ` }}>
                            </div>
                        </div>
                    </div>
                </div>
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