import React, { useEffect, useState, useContext } from 'react';
import { AppRoot, Avatar } from '@telegram-apps/telegram-ui';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './Style.css';
import Reward from '../Reward';
import { AuthContext } from '../../services/authContext';
import '@telegram-apps/telegram-ui/dist/styles.css';
import { BsTwitterX, BsTelegram, } from 'react-icons/bs';
import { TbWorldWww } from "react-icons/tb";
import Friends from "../Friends";

function Homepage() {
    const navigate = useNavigate();
    const [user, setUser] = useState({});
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(true);
    const { authState, login } = useContext(AuthContext);
    const [shouldRefetch, setShouldRefetch] = useState(false);  // State flag to trigger re-fetch

    useEffect(() => {
        // If not authenticated, perform auto-login
        if (!authState.token) {
            autoLogin();
        } else {
            // Fetch user data if already logged in
            fetchUserData(authState.token);
        }
    }, [authState.token, shouldRefetch]);


    const autoLogin = () => {
        if (window.Telegram?.WebApp) {
            window.Telegram.WebApp.expand();

            const initData = window.Telegram.WebApp.initDataUnsafe;
            if (initData && initData.user) {
                const username = initData.user.username || '';
                const userId = String(initData.user.id);
                console.log (userId);

                axios
                    .post(
                        'https://xp-earner.onrender.com/api/v1/login',
                        { name: username, password: userId },
                        { withCredentials: true, credentials: 'include' }
                    )
                    .then((res) => {
                        const token = res.data.token;
                        login(token);
                        sessionStorage.setItem('JWT', token);
                        fetchUserData(token);
                    })
                    .catch((err) => {
                        setError('Login failed: ' + (err.response?.data?.message || 'Unknown error'));
                        navigate('/register');
                    });
            } else {
                setError('Failed to retrieve Telegram user data.');
                setLoading(false);
            }
        }
    };

    const fetchUserData = (token) => {
        axios
            .get('https://xp-earner.onrender.com/api/v1/users/me', {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            })
            .then((res) => {
                const userData = res.data.data.data;
                setUser(userData);
                setLoading(false);

                sessionStorage.setItem('user', JSON.stringify(user));
                sessionStorage.setItem('userId', user.id || user._id);
            })
            .catch((err) => {
                setError(err.response?.data?.message || 'Failed to fetch user data');
                setLoading(false);
            });
    };



    useEffect(() => {
        const container = document.getElementById('animated-text-container');
        const text = document.getElementById('animated-text');

        if (container && text) {
            const isOverflowing = text.scrollWidth > container.clientWidth;

            if (isOverflowing) {
                text.classList.add('animate-marquee');
            } else {
                text.classList.remove('animate-marquee');
            }
        }
    }, [user.name]); // Re-run when user.name changes

    if (loading) {
        return (
            <div className="flex flex-row container w-screen h-screen m-auto justify-items-center">
                <div className="relative flex self-center m-auto w-full">
                    <svg
                        aria-hidden="true"
                        className="inline container m-auto w-10 h-10 text-grey-700 animate-spin dark:text-gray-600 fill-yellow-500"
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

    if (error) {
        return (
            <div className="container mt-5">
                <h2>{error}</h2>
            </div>
        );
    }




    return (
        <AppRoot>
            <div className="container bg-black flex flex-col h-fit items-center justify-center">
                <div className="relative flex items-center justify-center px-3 pt-3 w-full bg-transparent">
                    <div id="animated-text-container"
                        className="flex items-center overflow-hidden justify-around w-fit border-2 border-yellow-900 rounded-full px-4 py-[2px] bg-transparent max-w-64">
                        <p id="animated-text"
                            className="relative w-fit h-full m-auto whitespace-nowrap flex flex-row font-bold text-base text-yellow-700 animate-marquee">
                            {user.name}
                        </p>
                    </div>

                </div>

                <div className="relative w-fit h-fit top-[10px] mx-auto mb-1 flex flex-col align-middle justify-center">
                    <h1 className="text-3xl font-bold mb-4 text-white justify-center text-center">
                        {user.xp_points}
                    </h1>

                    <Avatar
                        size={130}
                        src="200.png"
                        className="circle-outer top-glow animate-pulse delay-[10000ms]"
                    />
                </div>

                <div className="flex-grow h-40 mt-10 w-full mx-2 bg-transparent rounded-md relative">
                    <div className="relative flex h-full w-full mx-auto bottom-0 px-3 bg-cover bg-transparent rounded-xl">
                        <div className="container my-auto p-4 flex justify-between gap-1 h-32 w-full rounded-xl bg-gradient-to-tr from-transparent via-transparent to-yellow-500 border-s-2 border-b-2 border-yellow-500">
                            <h1 className="text-xl w-full font-extrabold text-yellow-500 leading-none my-2  text-center">
                                10K USDT{' '}
                                <span className="text-white">GIVEAWAY</span>
                            </h1>
                            <ul className='text-sm font-mono text-white/80 leading-tight mb-2 list-disc '>
                                <li>Invite at least 5 Friends.</li>
                                <li className='mt-1'>Check in at least 5 consecutive days.</li>
                            </ul>
                            <div className='absolute w-full -mt-4 flex justify-end bottom-0 '>
                            <a className='relative  text-xs px-2 py-[13px] w-12 h-12 rounded-full text-center align-middle text-white font-bold  bg-yellow-500 shadow-inner shadow-black border-[4px] border-yellow-500  '>
                            Join
                           </a>
                            </div>
                          
                        </div>
                    </div>
                </div>

                <div className="container relative mt-4 mx-auto p-4 bottom-">
                    <Reward user={user} setShouldRefetch={setShouldRefetch} />
                </div>

                <div className="relative w-full h-fit top-[8px] mx-auto mb-1 flex flex-col align-middle justify-center">
                    <h1 className="text-2xl font-bold mb- text-yellow-500 justify-center text-center">
                        Connect With Us
                    </h1>
                    <p className='relative text-white/70 font-bold text-xs mb-4 text-center bg-slate-700/30 mx-20 py-1 rounded-xl'>Collaboration & Patnership</p>
                    <div className=' relative flex flex-row justify-between w-1/2 m-auto'>
                        <div className="relative flex w-10 h-10 rounded-[50%] border-aninmation">
                            <div className='relative flex m-auto w-[35px] h-[35px] bg-black rounded-[50%]'>
                                <a className='relative flex m-auto w-fit h-fit'
                                    href='https://x.com/EkehiOfficial'>
                                    <BsTwitterX className='text-white w-5 h-5  ' />
                                </a>
                            </div>
                        </div>

                        <div className="relative flex w-10 h-10 rounded-[50%] border-aninmation">
                            <div className='relative flex m-auto w-[35px] h-[35px] bg-black rounded-[50%]'>
                                <a className='relative flex m-auto w-fit h-fit'
                                    href='https://t.me/ekehiOfficial'>
                                    <BsTelegram className='text-white w-5 h-5  ' />
                                </a>
                            </div>
                        </div>

                        <div className="relative flex w-10 h-10 rounded-[50%] border-aninmation">
                            <div className='relative flex m-auto w-[35px] h-[35px] bg-black rounded-[50%]'>
                                <a className='relative flex m-auto w-fit h-fit'
                                    href='https://www.ekehi.network/'>
                                    <TbWorldWww className='text-white w-5 h-5  ' />
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>


            <section class="wrapper">
                <div id="stars"></div>
                <div id="stars2"></div>
                <div id="stars3"></div>
            </section>
        </AppRoot>
    );
}

export default Homepage;
