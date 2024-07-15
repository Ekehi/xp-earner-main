// src/App.js
import { React, useEffect, useState, useRef } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { AppRoot, Avatar, Placeholder } from '@telegram-apps/telegram-ui';
import axios from 'axios';
import 'tailwindcss/tailwind.css';
import { BsHouse, BsListTask, BsRocket } from 'react-icons/bs';
import AppHeader from './shared/header/Header';
import { Outlet } from 'react-router-dom';
import { SDKProvider } from '@tma.js/sdk-react';
import { Toaster } from 'react-hot-toast';
import { AuthProvider } from './services/authContext';
import Countdown from './pages/coutdown';
import './Style.css';
import '@telegram-apps/telegram-ui/dist/styles.css';
import CircularCount from "./pages/CircularCount";

const { useNavigate } = require('react-router-dom');
function App() {
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const [value, setValue] = useState(0);
    const location = useLocation();
    const [activeIndex, setActiveIndex] = useState(0);
    const indicatorRef = useRef(null);
    const navItemsRef = useRef([]);

    const [balance, setBalance] = useState(0);
    const minClaim = 5; // Minimum claimable value
    const maxClaim = 10; // Maximum claimable value

    const handlePointClaim = (claimAmount) => {
        setBalance(balance + claimAmount);
    };

    const [balance2, setBalance2] = useState(0);

    const handleClaimPoints = (points) => {
        // Update user balance
        setBalance2(balance2 + points);
    };


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

    useEffect(() => {
        const paths = ['/', '/register', '/login'];
        const currentPathIndex = paths.indexOf(location.pathname);
        setActiveIndex(currentPathIndex !== -1 ? currentPathIndex : 0);
    }, [location.pathname]);

    useEffect(() => {
        const handleIndicator = (index) => {
            const item = navItemsRef.current[index];
            const indicator = indicatorRef.current;
            if (item && indicator) {
                indicator.style.width = `${item.offsetWidth}px`;
                indicator.style.left = `${item.offsetLeft}px`;
            }
        };

        handleIndicator(activeIndex);

        window.addEventListener('resize', () => handleIndicator(activeIndex));
        return () => {
            window.removeEventListener('resize', () =>
                handleIndicator(activeIndex),
            );
        };
    }, [activeIndex]);

    // spinner while loading functionality

    if (loading) {
        return (
            <div className="flex flex-row  container w-screen h-screen m-auto justify-items-center">
                <div className="relative flex self-center m-auto w-full">
                    <svg
                        aria-hidden="true"
                        class="inline container m-auto w-20 h-20  text-grey-700 animate-spin dark:text-gray-600 fill-yellow-500"
                        viewBox="0 0 100 101"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                    >
                        <path
                            d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                            fill="currentColor"
                        />
                        <path
                            d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                            fill="currentFill"
                        />
                    </svg>
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
                {/* <AuthProvider>
                <div className="App d-flex flex-row w-fit bg-black">
                    <SDKProvider>
                        <div className="h-screen flex-grow w-screen">
                            <Outlet />
                            <Toaster />
                        </div>
                    </SDKProvider>
                </div>
            </AuthProvider> */}

                <div className="relative flex items-center justify-center px-3 pt-3 w-full bg-transparent">

                    <div className="flex items-center justify-around w-fit border-2  border-purple-900 rounded-full px-4 py-[2px] bg-transparent max-w-64">
                        <p className="w-fit h-full px-4 m-auto flex flex-row font-thin text-xs text-white">
                            User_Name
                        </p>
                    </div>
                    <img
                        alt="Telegram sticker"
                        className="w-8 h-8 -ml-7 bg-black rounded-full"
                        src="https://xelene.me/telegram.gif"
                    />
                </div>

                <div className="relative w-fit h-fit top-[7px] mx-auto mb-3 flex flex-col align-middle justify-center">
                    <h1 className="text-3xl font-bold mb-2  text-white justify-center text-center"> {balance} </h1>
                    <div className='w-80 h-80 p-4 rounded-full circle-outer'>
                        <Avatar

                            className='rounded-full circle-inner'
                            size={130}
                            src="https://xelene.me/telegram.gif"
                        />
                    </div>

                </div>

                <div className="flex-grow h-7 mt-7 w-full bg-transparent rounded-t-[48px] relative top-glow z-0">
                    <div className="absolute top-[2px] h-60 left-0 right-0 bottom-0 bg-transparent rounded-t-[46px]">
                        <div className="px-4 mt-6 flex justify-between gap-2">
            
                        </div>
                    </div>
                </div>

                <div className="container absolute mx-auto p-4 bottom-6">
                    {/* <header className="App-header">
                        <h1 className="text-3xl font-bold mb-4 bg-yellow-500 text-black">Balance: {balance} points</h1>
                    </header> */}
                    <Countdown
                        onPointClaim={handlePointClaim} minClaim={minClaim} maxClaim={maxClaim} />
                </div>


                <nav className="absolute  justify-around pb-2 border-1 border-t-2 border-slate-900  bottom-0.5 flex bg-gradient-to-b from-transparent to-slate-900  rounded-md h-fit w-screen ">
                    {[
                        { path: '', name: 'Home', icon: <BsHouse /> },
                        {
                            path: 'register',
                            name: 'Task',
                            icon: <BsListTask />,
                        },
                        { path: 'login', name: 'Boost', icon: <BsRocket /> },
                    ].map((item, index) => (
                        <Link
                            to={`/${item.path.toLowerCase()}`}
                            key={index}
                            className={`relative flex flex-col no-underline  text-purple-500 justify-center h-1  items-center active:no-underline focus:text-purple-500 focus:no-underline active:text-purple-500 target:no-underline target:text-purple-500  p-4 transition  ${activeIndex === index ? 'text-purple-500 focus:text-purple-500 focus active:text-purple-500 motion-safe:scale-125 ' : 'text-purple-950'
                                }`}
                            onClick={() => setActiveIndex(index)}
                            ref={(el) => (navItemsRef.current[index] = el)}
                        >
                            <i>{item.icon}</i>
                            <span className='font-mono text-xs '>{item.name}</span>
                        </Link>
                    ))}
                    {/* <div
                        className="nav-indicator-wrapper"
                        ref={indicatorRef.current}
                    >
                    </div> */}
                </nav>
            </div>
        </AppRoot>
    );

};

export default App;
