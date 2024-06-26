import 'bootstrap/dist/css/bootstrap.min.css';
import { Link, useLocation } from 'react-router-dom';
import './footer.css';
import React, { useState, useEffect, useRef } from 'react';
import { BsHouse, BsListTask, BsInfo } from 'react-icons/bs';

const AppFooter = () => {
    const [activeIndex, setActiveIndex] = useState(0);
    const indicatorRef = useRef(null);
    const navItemsRef = useRef([]);
    const location = useLocation();

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
            window.removeEventListener('resize', () => handleIndicator(activeIndex));
        };
    }, [activeIndex]);


    return (
        <nav className="nav">
            {[{path: '', name: 'Home', icon: <BsHouse />}, {path:'register', name: 'Task', icon: <BsListTask />}, {path:'login', name: 'ICO', icon: <BsInfo />},].map((item, index) => (
            <Link 
            to={`/${item.path.toLowerCase()}`}
            key={index}
            className={`nav-item ${activeIndex === index ? 'is-active' : ''}`}
            onClick={() => setActiveIndex(index)}
            ref={el => navItemsRef.current[index] = el}
            >
            <i>{item.icon}</i>
            <span>{item.name}</span>
            </Link>
            ))}
            <div className="nav-indicator-wrapper" ref={indicatorRef.current}>
                <span className="nav-indicator"></span>
            </div>
        </nav>
    );
};

export default AppFooter;
