import * as React from 'react';
import '../../index.css';
import { useNavigate } from 'react-router-dom';
import { FaAngleRight, FaTimes } from 'react-icons/fa';
import { Logo } from '../../components/Logo';
import { getUserData, loginUser } from '../../utils/api';
import { ProtectedRoute } from '../../components/ProtectedRoute';
import { LoadingContext, UserContext } from '../../utils/context';

export const Login = () => {
    const navigate = useNavigate();
    
    const [username, setUsername] = React.useState('');
    const [password, setPassword] = React.useState('');
    const [loggingIn, setLoggingIn] = React.useState(false);
    const [error, toggleError] = React.useState(false);
    const [errorMessage, setErrorMessage] = React.useState("");
    
    const [user, setUser] = React.useContext(UserContext);
    const [loading, setLoading] = React.useContext(LoadingContext);

    React.useEffect(() => {
        if (user) {
            navigate('/dashboard');
        } else {
            // console.log('Not logged in');
        }
    }, [user]);


    let submitObject = {
        username: "",
        password: ""
    }

    React.useCallback(
        (e) => {
            // console.log(username, password);
        },
        [username, password]
    )

    function Input(props: {placeholder: string, password?: boolean}) {
        return (
            <div className="w-full">
                <h1 className="font-semibold mt-1 text-gray-600 text-sm">{props.placeholder}</h1>
                <input type={props.password ? "password" : "text"} name="user" className="my-0.5 border-gray-800 hover:border-primary transform focus:border-primary bg-offwhite shadow-inner border-2 rounded-md h-12 w-full ring-opacity-50 ring-primary transition-all focus:ring-4 p-2 duration-200 caret-primary rounded-r-md" onChange={(e) => {
                    props.password ? setPassword(e.target.value) : setUsername(e.target.value)
                }}/>
            </div>
        );
    }

    async function submitLogin(event: React.MouseEvent<HTMLButtonElement, MouseEvent>) {
        event.preventDefault();
        submitObject = { username: username, password: password };
        toggleError(false);
        setLoggingIn(true);

        try {
            const result = await loginUser(submitObject);

            if (result.data.redirect) {
                getUserData()
                .then((res) => {
                    setUser(res.data);
                    // console.log(user);
                    setLoggingIn(false);
                    navigate('/dashboard');
                });
            }
            setErrorMessage(result.data.message);
            toggleError(true);
            setLoggingIn(false);
        } catch(err) {
            setLoggingIn(false);
            setErrorMessage('Connection error');
            toggleError(true);
        }
    }

    if (!loading) {
        return (
            <div className="flex flex-col h-screen">
                <div className="grow">
                    <div className="flex items-center h-full">
                        <div className="mx-auto my-3">
                            <div className="w-full flex flex-col items-center">
                                <Logo />
                                <h1 className="font-semibold mt-2 text-lg">Log in to Paridax.xyz</h1>
                            </div>
                            <form className="flex flex-col w-72 mb-2">
                                <div className="w-full">
                                    <h1 className="font-semibold mt-1 text-gray-600 text-sm">Username or Email</h1>
                                    <input type="text" name="user" className="my-0.5 border-gray-800 hover:border-primary transform focus:border-primary bg-offwhite shadow-inner border-2 rounded-md h-12 w-full ring-opacity-50 ring-primary transition-all focus:ring-4 p-2 duration-200 caret-primary" onChange={(e) => {
                                        setUsername(e.target.value);
                                    }} />
                                </div>
                                <div className="w-full">
                                    <h1 className="font-semibold mt-1 text-gray-600 text-sm">Password</h1>
                                    <input type="password" name="user" className="my-0.5 border-gray-800 hover:border-primary transform focus:border-primary bg-offwhite shadow-inner border-2 rounded-md h-12 w-full ring-opacity-50 ring-primary transition-all focus:ring-4 p-2 duration-200 caret-primary" onChange={(e) => {
                                        setPassword(e.target.value);
                                    }} />
                                </div>
                            </form>
                            <div className={` w-72 rounded-md bg-primary flex items-center justify-between pl-2 ${!error ? `hidden` : ``}`}>
                                <p className="my-1 shrink-0 text-white w-4/5 text-sm overflow-ellipsis">{errorMessage}</p>
                                <button className="transform group w-8 h-8 shrink-0 flex items-center justify-around focus:ring-4 ring-primary ring-opacity-50 rounded-tr-md rounded-br-md transition-all" onClick={() => toggleError(false)}>
                                    <FaTimes className="text-white group-hover:brightness-75" />
                                </button>
                            </div>
                            <button onClick={(event) => { submitLogin(event); }} className={`mt-2 h-12 w-full bg-primary rounded-md group focus:ring-4 ring-primary ring-opacity-50 transition-all flex items-center justify-around text-white hover:bg-transparent hover:text-gray-800 border-2 border-primary hover:shadow-xl duration-100 disabled:bg-primary disabled:ring-0 disabled:brightness-75 disabled:transform disabled:text-white disabled:shadow-none`} disabled={!(username.length && password.length) || loggingIn} >
                                <div className="font-semibold flex items-center">
                                    <h1>{loggingIn ? 'Logging in...' : 'Log In'}</h1>
                                    <FaAngleRight className="ml-2 text-xl group-hover:translate-x-1 group-focus:translate-x-1 group-disabled:translate-x-0 duration-150 ease-out"></FaAngleRight>
                                </div>
                            </button>
                            <div className="flex my-2 mx-auto gap-2">
                                <p className="text-sm">No account?</p>
                                <button onClick={() => { navigate('/register'); }} className="font-semibold duration-100 text-gray-600 hover:text-primary focus:border-primary text-sm focus:text-primary">Sign Up</button>
                            </div>

                            <div className="flex gap-5 justify-center">
                                <button onClick={() => { /* navigate('/register'); */ }} className="font-semibold duration-100 text-gray-400 hover:text-primary focus:border-primary text-sm focus:text-primary">Terms of Service</button>
                                <button onClick={() => { /* navigate('/register'); */ }} className="font-semibold duration-100 text-gray-400 hover:text-primary focus:border-primary text-sm focus:text-primary">Privacy Policy</button>
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
    );
}