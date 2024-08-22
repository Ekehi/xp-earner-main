import React, { useState, useEffect, useContext } from 'react';
//import axios from 'axios';
import { Outlet, useLocation } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import { AuthProvider } from './services/authContext';
import { AppRoot } from '@telegram-apps/telegram-ui';
import Footer from './shared/footer/Footer';
import 'tailwindcss/tailwind.css';
import './Style.css';
import '@telegram-apps/telegram-ui/dist/styles.css';
import Typewriter from "typewriter-effect";

function App() {
    const [loading, setLoading] = useState(true);
    const location = useLocation();

    /*  useEffect(() => {
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
                     navigate('/login');
                }
             } else {
                toast.error('Telegram WebApp data not available.');
                navigate('/login');
            }
       }
     }, [navigate]); */

    const sentences = [
        "Ekehi: Redefining financial possibilities.",
        " Discover a new world of financial freedom with Ekehi.",
        " Your journey starts here."
    ];

    /*  const handleAutoLogin = (username, userId) => {
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
     }; */

    useEffect(() => {
        const timer = setTimeout(() => {
            setLoading(false);
        }, 20000);

        return () => clearTimeout(timer);
    }, []);

    if (loading) {
        return (
            <div className="flex flex-col container w-screen h-screen m-auto items-center justify-center justify-items-center">
                <div className="relative flex self-center  m-auto w-full h-fit">
                    <h1 className="text-xl font-bold flex items-center text-white m-auto">L
                        <img
                            alt="o"
                            className="w-5 h-5 mx-[2px] animate-bounce"
                            src="50.png"
                        />ading</h1>
                </div>

                <div className='relative flex bottom-60 w-full h-1/4 align-middle justify-center  mt-32'>
                    <div className="text-yellow-500 font-mono text-xs leading-relaxed text-pretty text-center">
                        <Typewriter
                            onInit={(typewriter) => {
                                typewriter
                                    .typeString("<strong style='color:white'>E</strong>")
                                    .pauseFor(75)
                                    .typeString("<br/>")
                                    .typeString("<strong style='color:white'>K</strong>")
                                    .pauseFor(75)
                                    .typeString("<br/>")
                                    .typeString("<strong style='color:white;'>E</strong>")
                                    .pauseFor(75)
                                    .typeString("<br/>")
                                    .typeString("<strong style='color:white'>H</strong>")
                                    .pauseFor(75)
                                    .typeString("<br/>")
                                    .typeString("<strong style='color:white'>I</strong>")
                                    .pauseFor(500)
                                    .typeString("<br/>")
                                    .typeString("<br/>")
                                    .typeString("<br/>")
                                    .typeString("Redefining financial possibilities.")
                                    .pauseFor(1500)
                                    .typeString("<br/>")
                                    .typeString("<br/>")  // Move to the next line
                                    .typeString("Discover a new world of financial freedom with Ekehi.")
                                    .pauseFor(1500)
                                    .typeString("<br/>")
                                    .typeString("<br/>")  // Move to the next line
                                    .typeString("Your journey,")
                                    .pauseFor(1500)
                                    .typeString(" STARTS,")
                                    .typeString("<br/>")
                                    .typeString("<br/>")
                                    .pauseFor(2000)
                                    .typeString("<strong style='color:white'>HERE!!!</strong>")
                                    .start();
                            }}
                            options={{
                                autoStart: true,
                                loop: false,
                                delay: 20,
                                cursor:""
                            }}
                        />
                    </div>
                </div>

            </div >
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