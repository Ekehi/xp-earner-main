// src/App.js
import { React, useEffect, useState, useRef } from 'react';
import { AppRoot, Avatar } from '@telegram-apps/telegram-ui';
import axios from 'axios';
import 'tailwindcss/tailwind.css';
import { Outlet } from 'react-router-dom';
import { SDKProvider } from '@tma.js/sdk-react';
import { Toaster } from 'react-hot-toast';
import { AuthProvider } from './services/authContext';
import Footer from './shared/footer/Footer';
import './Style.css';
import '@telegram-apps/telegram-ui/dist/styles.css';

function App() {
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);




    useEffect(() => {
        if (window.Telegram?.WebApp) {
            window.Telegram.WebApp.expand();
        }
    }, []);

    useEffect(() => {
        setLoading(true);
        axios
            .get('https://xp-earner.onrender.com/api/v1/tasks', {
                withCredentials: true,
                credentials: 'include',
            })
            .then((res) => {
                console.log('data', res);

                setLoading(false);
            })
            .catch((err) => {
                setLoading(false);
                setError(err.response.data.message);
                console.log(err);
            });
    }, []);

    // spinner while loading functionality

    if (loading) {
        return (
            <div className="flex flex-row  container w-screen h-screen m-auto justify-items-center">
                <div className="relative flex self-center m-auto w-full h-full">
                    <h1 class="text-xl font-bold flex items-center text-white m-auto">L
                        <img
                            alt="o"
                            className="w-5 h-5 mx-[2px] animate-bounce"
                            src="20.png"
                        /> ading</h1> <span class='h-1 w-1 bg-yellow-500 rounded-full animate-bounce [animation-delay:-0.3s]'>.</span>
                        <span class='h-1 w-1 bg-yellow-500 rounded-full animate-bounce [animation-delay:-0.15s]'>.</span>
                        <span class='h-1 w-1 bg-yellow-500 rounded-full animate-bounce'></span>
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
    return (
        <AppRoot>
            <div className=" bg-black flex flex-col h-fit items-center justify-center">
                <AuthProvider>
                    <div className="App d-flex flex-row w-fit bg-black">
                        <SDKProvider>
                            <div className="h-screen flex-grow w-screen">
                                <Outlet />
                                <Toaster />
                                <Footer />
                            </div>
                        </SDKProvider>
                    </div>
                </AuthProvider>
            </div>
        </AppRoot>
    );

};

export default App;
