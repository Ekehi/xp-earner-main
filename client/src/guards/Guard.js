// src/guards/Guard.js
import { useContext } from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { AuthContext } from '../services/authContext';

const AuthGuard = () => {
    const { authState } = useContext(AuthContext);

    return authState.isAuthenticated ? <Outlet /> : <Navigate to="/login" />;
};

export default AuthGuard;
