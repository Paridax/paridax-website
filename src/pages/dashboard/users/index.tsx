// @ts-nocheck
import * as React from 'react';
import { useNavigate } from 'react-router-dom';
import { ProtectedRoute } from '../../../components/ProtectedRoute';
import { Navbar } from '../../../components/Navbar';
import '../../../index.css';
import { LoadingContext, UserContext } from '../../../utils/context';
import { getUsers } from '../../../utils/api';

export const DashboardViewUsers = () => {
    const navigate = useNavigate();

    const [user, setUser] = React.useContext(UserContext);
    const [loading, setLoading] = React.useContext(LoadingContext);
    const [users, setUsers] = React.useState(null);
    
    React.useEffect(() => {
        if (!user) {
            console.log('Not logged in');
            navigate('/login');   
        }
        if (!user.permissions.includes('OWNER')) {
            navigate('/dashboard'); 
        }
        getUsers()
        .then((users) => {
            console.log(users.data);
            setUsers(users.data);
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
        return `${d.getMonth()}/${d.getDate()}/${d.getFullYear()} ${d.toLocaleTimeString()}`;
    }


    if (users && user && !loading) {
        console.log(user);
        return (
            <div>
                <Navbar />
                <div className="flex items-center justify-between gap-5 max-w-7xl px-8 py-16 mx-auto w-screen">
                    <div className="flex items-center h-full w-full">
                        <div className="mx-auto items-center gap-5 w-full">
                            <div className="flex items-center w-full">
                                <p className="w-full mt-1 font-semibold text-lg">
                                    {'View All Users'}
                                </p>
                                <button onClick={() => { navigate('/dashboard'); }} className="h-12 shrink-0 my-3 px-6 border-2 border-primary rounded-md font-semibold group focus:ring-4 ring-primary ring-opacity-50 transition-all flex items-center hover:bg-primary hover:text-white hover:shadow-xl duration-100">
                                    <h1>Back to Dashboard</h1>
                                </button>
                            </div>
                            <div className="w-full">
                                <div className="w-full grid items-center h-8 grid-cols-11 border-2 px-2 border-transparent">
                                    <p className="font-semibold text-gray-600 col-span-1">ID</p>
                                    <p className="font-semibold text-gray-600 col-span-2">Username</p>
                                    <p className="font-semibold text-gray-600 col-span-2">Email</p>
                                    <p className="font-semibold text-gray-600 col-span-2">Date Created</p>
                                    <p className="font-semibold text-gray-600 col-span-2">Last Login</p>
                                    <p className="font-semibold text-gray-600 col-span-2">Permissions</p>
                                </div>
                                {users.map((usr: any, i: any) => {
                                    console.log(usr);
                                    return (
                                        <button onClick={() => { navigate(`/dashboard/users/${usr.userId}`) }} className="w-full grid items-center h-12 grid-cols-11 px-2 my-1 border-2 hover:border-primary rounded duration-100 focus:border-primary" key={i}>
                                            <p className="text-left font-semibold col-span-1 w-full mr-auto text-ellipsis overflow-hidden whitespace-nowrap">{i + 1}</p>
                                            <p className="text-left font-semibold col-span-2 w-full mr-auto text-ellipsis overflow-hidden whitespace-nowrap">{usr.username}</p>
                                            <p className="text-left font-semibold col-span-2 w-full mr-auto text-ellipsis overflow-hidden whitespace-nowrap">{usr.email}</p>
                                            <p className="text-left font-semibold col-span-2 w-full mr-auto text-ellipsis overflow-hidden whitespace-nowrap">{unixMsStringToDate(usr.createdTimestamp)}</p>
                                            <p className="text-left font-semibold col-span-2 w-full mr-auto text-ellipsis overflow-hidden whitespace-nowrap">{unixMsStringToDate(usr.lastLogin)}</p>
                                            <p className="text-left font-semibold col-span-2 w-full mr-auto text-ellipsis overflow-hidden whitespace-nowrap">{usr.permissions.join(', ')}</p>
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
