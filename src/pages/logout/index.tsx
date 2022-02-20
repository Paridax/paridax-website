import * as React from 'react';
import '../../index.css';
import { useNavigate } from 'react-router-dom';
import { getUserData, logoutUser } from '../../utils/api';
import { ProtectedRoute } from '../../components/ProtectedRoute';
import { LoadingContext, UserContext } from '../../utils/context';

export const Logout = () => {

    const navigate = useNavigate();

    const [user, setUser] = React.useContext(UserContext);
    const [loading, setLoading] = React.useContext(LoadingContext);

    React.useEffect(() => {
        if (user) {
            logoutUser();
            setUser(null);
            navigate('/');
        } else {
            // console.log('Not logged in');
            navigate('/');
        }

    }, []);

    return (
        <div>
            <ProtectedRoute />
        </div>
    );
}