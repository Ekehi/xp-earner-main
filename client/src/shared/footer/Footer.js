import 'bootstrap/dist/css/bootstrap.min.css';
import { Link, useLocation } from 'react-router-dom';
import './footer.css';
import React, { useState, useEffect, useRef } from 'react';
import { BsHouse, BsListTask, BsRocket, BsPersonAdd } from 'react-icons/bs';

const AppFooter = () => {
    const [activeIndex, setActiveIndex] = useState(0);
    const indicatorRef = useRef(null);
    const navItemsRef = useRef([]);
    const location = useLocation();

 useEffect(() => {
        const getActiveIndex = (path) => {
            if (path === '/') return 0;
            if (path.startsWith('/task') || path === '/tasks') return 1;
            if (path === '/friends') return 2;
            if (path === '/boost') return 3;
            return 0; // Default to home if no match
        };

        setActiveIndex(getActiveIndex(location.pathname.toLowerCase()));
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
            window.removeEventListener('resize', () => handleIndicator(activeIndex));
        };
    }, [activeIndex]);

     return (
        <nav className="absolute justify-around pb-2  bottom-0.5 flex bg-black rounded-xl h-fit w-screen">
            {[
                {
                    path: '/',
                    name: 'Home',
                    icon: <BsHouse />
                },
                {
                    path: '/tasks',
                    name: 'Tasks',
                    icon: <BsListTask />
                },
                {
                    path: '/friends',
                    name: 'Invite',
                    icon: <BsPersonAdd />
                },
                {
                    path: '/boost',
                    name: 'Boost',
                    icon: <BsRocket />
                },
            ].map((item, index) => (
                <Link
                    to={item.path}
                    key={index}
                    className={`relative flex flex-col text-yellow-500 justify-center no-underline active:no-underline active:text-yellow-500 target:text-yellow-500 focus:text-yellow-500  focus:no-underline  target:no-underline h-1 items-center py-4 px-2 transition ${activeIndex === index ? 'text-yellow-500 bg-black  no-underline border-yellow-500  motion-safe:scale-125 active:no-underline  focus:no-underline  target:no-underline' : 'text-yellow-950'
                        }`}
                    ref={(el) => (navItemsRef.current[index] = el)}
                >
                    <i className='text-xs'>{item.icon}</i>
                    <span className='font-mono text-[10px]'>{item.name}</span>
                </Link>
            ))}
        </nav>
    );
};

export default AppFooter;
