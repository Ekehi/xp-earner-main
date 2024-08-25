import React, { useState, useEffect, useContext } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import { AuthProvider } from './services/authContext';
import { AppRoot } from '@telegram-apps/telegram-ui';
import Footer from './shared/footer/Footer';
import 'tailwindcss/tailwind.css';
import './Style.css';
import '@telegram-apps/telegram-ui/dist/styles.css';
import { loadFont } from 'react-font-loader';
import Typewriter from "typewriter-effect";


function App() {
    const [initialDisplay, setInitialDisplay] = useState(true);
    const [loading, setLoading] = useState(true);
    const location = useLocation();


    useEffect(() => {
        const initialTimer = setTimeout(() => {
            setInitialDisplay(false);
        }, 2000); // Display initial screen for 2 seconds

        const loadingTimer = setTimeout(() => {
            setLoading(false);
        }, 20000); // Display loading screen for 20 seconds

        return () => {
            clearTimeout(initialTimer);
            clearTimeout(loadingTimer);
        };
    }, []);

    if (initialDisplay) {
        return (
            <div className="flex flex-col container w-screen h-screen m-auto items-center justify-center justify-items-center">
                <img
                    className=" "
                    src="start.png"
                />

            </div>
        );
    }

    if (loading) {
        return (
            <div className="flex flex-col container w-screen h-screen m-auto items-center justify-center justify-items-center">
                <div className='relative flex w-full h-1/4 align-bottom justify-center mt-32'>
                    <p
                        className=' relative text-white text-2xl tracking-wider'
                        style={{ fontFamily: 'unibold' }}>EKEHI 
                        <span claassName=''>Network</span>
                    </p>

                </div>

                <div className="relative flex self-center m-auto w-full h-fit">
                    <h1 className="text-xl font-bold flex items-center text-white m-auto">L
                        <img
                            alt="o"
                            className="w-5 h-5 mx-[2px] animate-bounce"
                            src="50.png"
                        />ading</h1>
                </div>

                <div className='relative flex bottom-32 w-full h-1/4 align-middle justify-center mt-32'>
                    <div className="text-white font-mono text-xs leading-relaxed text-pretty text-center">
                        <Typewriter
                            onInit={(typewriter) => {
                                typewriter
                                    .typeString("Redefining financial possibilities.")
                                    .pauseFor(1500)
                                    .typeString("<br/>")
                                    .typeString("Discover a new world of financial freedom with Ekehi.")
                                    .pauseFor(1500)
                                    .typeString("<br/>")
                                    .typeString("Your journey, starts,")
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
                                cursor: ""
                            }}
                        />
                    </div>
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
