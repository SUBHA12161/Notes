import { Outlet, Navigate } from 'react-router-dom';
import { useAuth } from './useAuth';

const PrivateRoutes = () => {
    const token = useAuth()
    return token ? <Outlet /> : <Navigate to='/Login' />
}

export default PrivateRoutes