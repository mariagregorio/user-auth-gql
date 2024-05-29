import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import { useAuth } from '../hooks/useAuth';

const ProtectedRoute = ({ children }: { children: any }) => {
    const { user } = useAuth();
    const navigate = useNavigate();

    useEffect(() => {
        if (!user) navigate('/login');
    }, [user]);

    return children;
};

export default ProtectedRoute;
