// src/services/authContext.js
import React, { createContext, useState, useEffect } from 'react';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [authState, setAuthState] = useState({
        isAuthenticated: false,
        token: null,
    });

    useEffect(() => {
        const token = sessionStorage.getItem('JWT');
        if (token) {
            setAuthState({ isAuthenticated: true, token });
        }
    }, []);

    const login = (token) => {
        sessionStorage.setItem('JWT', token);
        setAuthState({ isAuthenticated: true, token });
    };

    const logout = () => {
        sessionStorage.removeItem('JWT');
        setAuthState({ isAuthenticated: false, token: null });
    };

    return (
        <AuthContext.Provider value={{ authState, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};
