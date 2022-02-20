// @ts-nocheck
import * as React from 'react';
import { useNavigate } from 'react-router-dom';
import { ProtectedRoute } from '../../components/ProtectedRoute';
import { Navbar } from '../../components/Navbar';
import '../../index.css';
import { LoadingContext, UserContext } from '../../utils/context';

export const Dashboard = () => {
    const navigate = useNavigate();

    const [user, setUser] = React.useContext(UserContext);
    const [loading, setLoading] = React.useContext(LoadingContext);
    
    React.useEffect(() => {
        if (!user) {
            console.log('Not logged in');
            navigate('/login');   
        }
    }, []);

    function unixMsStringToDate(str: string) {
        let d = new Date(0);
        d.setUTCSeconds(Math.floor(parseInt(str)/1000));
        return formatDate(d);
    }

    function formatDate(d: Date) {
        const weekdays = ['Sunday', 'Monday','Tuesday','Wednesday','Thurday','Friday','Saturday'];
        const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July','August','September','October','November','December'];
        return `${weekdays[d.getDay()].slice(0, 3)} ${months[d.getMonth()].slice(0, 3)} ${d.getDate()}, ${d.getFullYear()} ${d.toLocaleTimeString()}`;
    }


    if (user && !loading) {
        console.log(user);
        return (
            <div className="flex flex-col h-screen">
                <Navbar />
                <div className="grow">
                    <div className="flex items-center h-full">
                        <div className="mx-auto items-center gap-5 w-96">
                            <p className="w-full mt-1 font-semibold text-primary">
                                {'Welcome, ' + user.username}
                            </p>
                            <p className="w-full text-gray-600 mt-1">
                                <span className="font-semibold">Email Address</span><br></br>
                                {user.email}
                            </p>
                            <p className="w-full text-gray-600 mt-1">
                                <span className="font-semibold">Permissions</span><br></br>
                                {user.permissions.join(', ')}
                            </p>
                            <p className="w-full text-gray-600 mt-1">
                                <span className="font-semibold">Account Created</span><br></br>
                                {unixMsStringToDate(user.createdTimestamp)}
                            </p>
                            <p className="w-full text-gray-600 mt-1">
                                <span className="font-semibold">Last Login</span><br></br>
                                {unixMsStringToDate(user.lastLogin)}
                            </p>
                            <div className="flex gap-3">
                                <button onClick={() => { navigate('/dashboard/blog'); }} className={`h-12 my-3 px-6 border-2 border-primary rounded-md font-semibold group focus:ring-4 ring-primary ring-opacity-50 transition-all flex items-center hover:bg-primary hover:text-white hover:shadow-xl duration-100 ${user.permissions.includes('OWNER') ? `` : `hidden`}`}><h1>Blog</h1></button>
                                <button onClick={() => { navigate('/dashboard/users'); }} className={`h-12 my-3 px-6 border-2 border-primary rounded-md font-semibold group focus:ring-4 ring-primary ring-opacity-50 transition-all flex items-center hover:bg-primary hover:text-white hover:shadow-xl duration-100 ${user.permissions.includes('OWNER') ? `` : `hidden`}`}><h1>Users</h1></button>
                                <button onClick={() => { navigate('/logout'); }} className="h-12 my-3 px-6 border-2 border-primary rounded-md font-semibold group focus:ring-4 ring-primary ring-opacity-50 transition-all flex items-center hover:bg-primary hover:text-white hover:shadow-xl duration-100">
                                    <h1>Logout</h1>
                                </button>
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