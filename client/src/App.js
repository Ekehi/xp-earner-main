import { React, useEffect, useState } from 'react';
import { AppRoot } from '@telegram-apps/telegram-ui';
import axios from 'axios';
import 'tailwindcss/tailwind.css';
import { Outlet, useLocation, useNavigate } from 'react-router-dom';
import { SDKProvider } from '@tma.js/sdk-react';
import { Toaster } from 'react-hot-toast';
import { AuthProvider } from './services/authContext';
import Footer from './shared/footer/Footer';
import './Style.css';
import '@telegram-apps/telegram-ui/dist/styles.css';
import toast from 'react-hot-toast';

//import { useInitData } from '@tma.js/sdk-react';

function App() {
    const navigate = useNavigate();
    const [initData, setInitData] = useState(null);
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const location = useLocation();
    const [formData, setFormData] = useState({
        name: '',
        password: '',
    });

    useEffect(() => {
        if (window.Telegram?.WebApp) {
            const telegramInitData = window.Telegram.WebApp.initData;
            setInitData(telegramInitData);
            window.Telegram.WebApp.expand();
        }
    }, []);

    useEffect(() => {
        if (initData) {
            setFormData({
                name:initData.user?.username || '',
                password:initData.user?.id || '',
            });
        }
    }, [initData]);

    useEffect(() => {
        setLoading(true);
        const formDataToSend = new FormData();
        formDataToSend.append('name', formData.name);
        formDataToSend.append('password', formData.password);
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
            login(token);
            console.log('Token set in sessionStorage:', sessionStorage.getItem('JWT'));
            console.log(res);
            navigate('/');
            toast.success('Login Successful');
        })
        .catch((err) => {
            console.log(err);
            navigate('/register');
            toast.error(err.response.data.message);
        });
    }, []);

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

    // error handling functionality

    if (error) {
        return (
            <div className="container mt-5">
                <h2>{error}</h2>
            </div>
        );
    }

    // Determine if the current path is sign-in or registration
    const isAuthPage = location.pathname === '/login' || location.pathname === '/register';

    return (
        <AppRoot>
            <div className="bg-black flex flex-col h-fit items-center justify-center">
                <AuthProvider>
                    <div className="App d-flex flex-row w-fit bg-black">
                        <SDKProvider>
                            <div className="h-screen flex-grow w-screen">
                                <Outlet />
                                <Toaster />
                                {!isAuthPage && <Footer />} {/* Conditionally render the footer */}
                            </div>
                        </SDKProvider>
                    </div>
                </AuthProvider>
            </div>
        </AppRoot>
    );
}

export default App;
