import 'bootstrap/dist/css/bootstrap.min.css';
import { Link, useLocation } from 'react-router-dom';
import './footer.css';
import React, { useState, useEffect, useRef } from 'react';
import { BsHouse, BsListTask, BsRocket } from 'react-icons/bs';

const AppFooter = () => {
    const [activeIndex, setActiveIndex] = useState(0);
    const indicatorRef = useRef(null);
    const navItemsRef = useRef([]);
    const location = useLocation();

    useEffect(() => {
        const paths = ['/', '/Tasks', '/Boost'];
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
            window.removeEventListener('resize', () => handleIndicator(activeIndex));
        };
    }, [activeIndex]);

    return (
        <nav className="absolute  justify-around pb-2 border-1 border-t-2 border-yellow-950  bottom-0.5 flex bg-black  rounded-xl h-fit w-screen ">
            {[
                {
                    path: '',
                    name: 'Home',
                    icon: <BsHouse />
                },
                {
                    path: 'tasks',
                    name: 'Tasks',
                    icon: <BsListTask />,
                },
                {
                    path: 'Boost',
                    name: 'Boost',
                    icon: <BsRocket />
                },
            ].map((item, index) => (
                <Link
                    to={`/${item.path.toLowerCase()}`}
                    key={index}
                    className={`relative flex flex-col no-underline  text-yellow-500 justify-center h-1  items-center active:no-underline focus:text-yellow-500 focus:no-underline active:text-yellow-500 target:no-underline target:text-yellow-500  p-4 transition  ${activeIndex === index ? 'text-yellow-500 focus:text-yellow-500 focus active:text-yellow-500 motion-safe:scale-125' : 'text-yellow-950'
                        }`}
                    onClick={() => setActiveIndex(index)}
                    ref={(el) => (navItemsRef.current[index] = el)}
                >
                    <i>{item.icon}</i>
                    <span className='font-mono text-xs '>{item.name}</span>
                </Link>
            ))}

        </nav>
    );
};

export default AppFooter;
