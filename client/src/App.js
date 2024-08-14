import React, { useEffect, useState } from 'react';
import { AppRoot } from '@telegram-apps/telegram-ui';
import axios from 'axios';
import 'tailwindcss/tailwind.css';
import { Outlet, useLocation, useNavigate } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import { AuthProvider } from './services/authContext';
import Footer from './shared/footer/Footer';
import './Style.css';
import '@telegram-apps/telegram-ui/dist/styles.css';
import toast from 'react-hot-toast';

function App() {
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    const location = useLocation();

    useEffect(() => {
        if (window.Telegram?.WebApp) {
            window.Telegram.WebApp.expand();

            const initData = window.Telegram.WebApp.initDataUnsafe;
            if (initData && initData.user) {
                const username = initData.user.username || '';
                const userId = initData.user.id || '';

                // Proceed to login automatically with the Telegram data
                if (username && userId) {
                    handleLogin(username, userId);
                }
            } else {
                // Handle the case where initData or user data is not available
                toast.error('Telegram user data not available');
                navigate('/register');
            }
        }
    }, [navigate]);

    const handleLogin = (name, password) => {
        setLoading(true);
        const formDataToSend = new FormData();
        formDataToSend.append('name', name);
        formDataToSend.append('password', password);

        axios
            .post(
                'https://xp-earner.onrender.com/api/v1/login',
                formDataToSend,
                {
                    withCredentials: true,
                    credentials: 'include',
                },
            )
            .then((res) => {
                const token = res.data.token;
                sessionStorage.setItem('JWT', token);
                console.log('Token set in sessionStorage:', sessionStorage.getItem('JWT'));
                console.log(res);
                toast.success('Login Successful');
                navigate('/');
            })
            .catch((err) => {
                console.log(err);
                navigate('/register');
                toast.error(err.response?.data?.message || 'Login failed');
            })
            .finally(() => {
                setLoading(false);
            });
    };

    if (loading) {
        return (
            <div className="flex flex-row container w-screen h-screen m-auto justify-items-center">
                <div className="relative flex self-center m-auto w-full h-full">
                    <h1 className="text-xl font-bold flex items-center text-white m-auto">L
                        <img
                            alt="o"
                            className="w-5 h-5 mx-[2px] animate-bounce"
                            src="50.png"
                        />ading</h1>
                </div>
            </div>
        );
    }

    const isAuthPage = location.pathname === '/login' || location.pathname === '/register';

    return (
        <AppRoot>
            <div className="bg-black flex flex-col h-fit items-center justify-center">
                <AuthProvider>
                    <div className="App d-flex flex-row w-fit bg-black">
                        <div className="h-screen flex-grow w-screen">
                            <Outlet />
                            <Toaster />
                            {!isAuthPage && <Footer />}
                        </div>
                    </div>
                </AuthProvider>
            </div>
        </AppRoot>
    );
}

export default App;
