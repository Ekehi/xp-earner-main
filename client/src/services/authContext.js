// src/context/AuthContext.js
import React, { createContext, useState, useEffect } from 'react';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [authState, setAuthState] = useState({
        isAuthenticated: false,
        token: null,
        user: null,
    });

    useEffect(() => {
        const token = sessionStorage.getItem('JWT');
        if (token) {
            setAuthState({
                isAuthenticated: true,
                token,
                user: null,
            });
        }
    }, []);

    const login = (token) => {
        sessionStorage.setItem('JWT', token);
        setAuthState({
            isAuthenticated: true,
            token,
            user: null,
        });
    };

    const logout = () => {
        sessionStorage.removeItem('JWT');
        setAuthState({
            isAuthenticated: false,
            token: null,
            user: null,
        });
    };

    return (
        <AuthContext.Provider value={{ authState, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};
