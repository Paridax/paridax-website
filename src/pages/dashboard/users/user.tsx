// @ts-nocheck
import * as React from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { ProtectedRoute } from '../../../components/ProtectedRoute';
import { Navbar } from '../../../components/Navbar';
import '../../../index.css';
import { LoadingContext, UserContext } from '../../../utils/context';
import { getUser, updateUser, deleteUser } from '../../../utils/api';
import { useParams } from "react-router-dom";

export const DashboardViewUser = (props: any) => {
    const navigate = useNavigate();

    const { userId } = useParams();
    const [user, setUser] = React.useContext(UserContext);
    const [loading, setLoading] = React.useContext(LoadingContext);
    const [specific, setSpecific] = React.useState(null);
    const [confirmPopup, setPopup] = React.useState(false);

    React.useEffect(() => {
        if (!user) {
            console.log('Not logged in');
            navigate('/login');
        }
        console.log(user);
        if (!user.permissions.includes('OWNER')) {
            navigate('/dashboard');
        }
        getUser(userId)
        .then((res) => {
            console.log('done');
            console.log(res.data);
            if (!res.data) {
                navigate('/dashboard');
            }
            setSpecific(res.data)
        })
        .catch((err) => {
            console.log(err);
            navigate('/dashboard/users');
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
        return `${d.getMonth()}/${d.getDate()}/${d.getFullYear()} ${d.toLocaleTimeString()}`;
    }

    async function suspendUser() {
        const updated = await updateUser(specific.userId, { ...specific, permissions: [] });
        console.log(updated.data);
        setSpecific(updated.data);
    }

    async function removeUser() {
        const updated = await deleteUser(specific.userId);
        setSpecific(updated.data);
    }

    async function allowLogin() {
        const updated = await updateUser(specific.userId, { ...specific, permissions: ['LOGIN'] });
        console.log(updated.data);
        setSpecific(updated.data);  
    }


    if (specific && user && !loading) {
        if (!specific.deleted) {
            console.log(specific);
            return (
                <div>
                    <div className={`absolute w-screen h-screen flex items-center justify-around bg-gray-900 bg-opacity-25 ${confirmPopup ? `` : `hidden`}`}>
                        <div className="bg-white rounded-md h-72 w-96 opacity-100 py-10 px-5 flex items-center shadow-xl">
                            <div>
                                <h1 className="w-full font-semibold text-lg text-primary">DELETE THIS USER</h1>
                                <h1 className="w-full font-semibold text-gray-600">Are you sure you want to delete this user? Any of this user's information will be permanently deleted. This action cannot be undone.</h1>
                                <div className="flex items-center gap-3">
                                    <button onClick={() => { setPopup(false) }} className={`h-12 my-3 px-6 border-2 border-primary rounded-md font-semibold group focus:ring-4 ring-primary ring-opacity-50 transition-all flex items-center hover:bg-primary hover:text-white hover:shadow-xl duration-100`}><h1>Cancel</h1></button>
                                    <button onClick={() => { removeUser(specific.userId); setPopup(false); }} className={`h-12 my-3 px-6 border-2 border-primary rounded-md font-semibold group focus:ring-4 ring-primary ring-opacity-50 transition-all flex items-center text-white bg-primary hover:bg-transparent hover:text-gray-800 hover:shadow-xl duration-100 disabled:bg-primary disabled:ring-0 disabled:brightness-75 disabled:transform disabled:text-white disabled:shadow-none`} disabled={specific.permissions.includes('OWNER')}><h1>Delete User</h1></button>
                                </div>
                            </div>
                        </div>
                    </div>
                    <Navbar />
                    <div className="flex items-center justify-between gap-5 max-w-7xl px-8 py-16 mx-auto w-screen">
                        <div className="flex items-center h-full w-full">
                            <div className="mx-auto items-center gap-5 w-full">
                                <p className="w-full text-gray-600 mt-1">
                                    <span className="font-semibold">Username</span><br></br>
                                    {specific.username}
                                </p>
                                <p className="w-full text-gray-600 mt-1">
                                    <span className="font-semibold">User Identifier</span><br></br>
                                    {specific.userId}
                                </p>
                                <p className="w-full text-gray-600 mt-1">
                                    <span className="font-semibold">Email Address</span><br></br>
                                    {specific.email}
                                </p>
                                <p className="w-full text-gray-600 mt-1">
                                    <span className="font-semibold">Permissions</span><br></br>
                                    {specific.permissions.length ? specific.permissions.join(', ') : 'NONE'}
                                </p>
                                <p className="w-full text-gray-600 mt-1">
                                    <span className="font-semibold">Account Created</span><br></br>
                                    {unixMsStringToDate(specific.createdTimestamp)}
                                </p>
                                <p className="w-full text-gray-600 mt-1">
                                    <span className="font-semibold">Last Login</span><br></br>
                                    {unixMsStringToDate(specific.lastLogin)}
                                </p>
                                <div className="flex gap-3">
                                    <button onClick={() => { specific.permissions.length ? suspendUser() : allowLogin() }} className={`h-12 my-3 px-6 border-2 border-primary rounded-md font-semibold group focus:ring-4 ring-primary ring-opacity-50 transition-all flex items-center hover:bg-primary hover:text-white hover:shadow-xl duration-100 disabled:bg-transparent disabled:ring-0 disabled:brightness-75 disabled:transform disabled:text-gray-800 disabled:shadow-none`} disabled={specific.permissions.includes('OWNER')}><h1>{specific.permissions.length ? 'Suspend User' : 'Allow Login'}</h1></button>
                                    <button onClick={() => { setPopup(true) }} className={`h-12 my-3 px-6 border-2 border-primary rounded-md font-semibold group focus:ring-4 ring-primary ring-opacity-50 transition-all flex items-center text-white bg-primary hover:bg-transparent hover:text-gray-800 hover:shadow-xl duration-100 disabled:bg-primary disabled:ring-0 disabled:brightness-75 disabled:transform disabled:text-white disabled:shadow-none`} disabled={specific.permissions.includes('OWNER')}><h1>Delete User</h1></button>
                                    <button onClick={() => { navigate('/dashboard/users'); }} className={`h-12 my-3 px-6 border-2 border-primary rounded-md font-semibold group focus:ring-4 ring-primary ring-opacity-50 transition-all flex items-center hover:bg-primary hover:text-white hover:shadow-xl duration-100`}><h1>Back</h1></button>
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
                                <span className="font-semibold">User has been successfully deleted.</span><br></br>
                            </p>

                            <button onClick={() => { navigate('/dashboard/users'); }} className={`h-12 my-3 px-6 border-2 border-primary rounded-md font-semibold group focus:ring-4 ring-primary ring-opacity-50 transition-all flex items-center hover:bg-primary hover:text-white hover:shadow-xl duration-100`}><h1>Back to Dashboard</h1></button>
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
