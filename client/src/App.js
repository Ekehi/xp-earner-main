import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { Outlet, useLocation, useNavigate } from 'react-router-dom';
import { Toaster, toast } from 'react-hot-toast';
import { AuthProvider } from './services/authContext';
import { AppRoot } from '@telegram-apps/telegram-ui';
import Footer from './shared/footer/Footer';
import 'tailwindcss/tailwind.css';
import './Style.css';
import '@telegram-apps/telegram-ui/dist/styles.css';

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

                if (username && userId) {
                    handleAutoLogin(username, userId);
                } else {
                    toast.error('Failed to retrieve Telegram user data.');
                    navigate('/login'); // Redirect to login if no Telegram data is found
                }
            } else {
                toast.error('Telegram WebApp data not available.');
                navigate('/login'); // Redirect to login if WebApp data is not available
            }
        }
    }, [navigate]);

    const handleAutoLogin = (username, userId) => {
        setLoading(true);
        const password = String(userId);
        axios
            .post(
                'https://xp-earner.onrender.com/api/v1/login',
                {
                    name: username,
                    password: password,
                },
                {
                    withCredentials: true,
                    credentials: 'include',
                },
            )
            .then((res) => {
                const token = res.data.token;
                sessionStorage.setItem('JWT', token);
                console.log('Token set in sessionStorage:', sessionStorage.getItem('JWT'));
                toast.success('Login Successful');
                navigate('/');
            })
            .catch((err) => {
                console.log(err);
                toast.error(err.response?.data?.message || 'Login failed');
                navigate('/register');
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