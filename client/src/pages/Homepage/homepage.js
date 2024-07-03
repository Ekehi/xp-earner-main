import { useEffect, useState,  } from 'react';
import { Link, useLocation } from 'react-router-dom';
import axios from 'axios';
import "tailwindcss/tailwind.css"
import 'bootstrap/dist/css/bootstrap.min.css';
import { BottomNavigation, BottomNavigationAction } from '@mui/material';
import { BsHouse, BsListTask, BsInfo } from 'react-icons/bs';
import HomeIcon from '@mui/icons-material/Home';
import TaskIcon from '@mui/icons-material/Task';
import PresaleIcon from '@mui/icons-material/Web';

const { useNavigate } = require('react-router-dom');

const Tasks = () => {

    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const [value, setValue] = useState(0);
    const location = useLocation();

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


    // spinner while loading functionality

    if (loading) {
        return (
            <div className="flex flex-row  container w-screen h-screen mt-5 justify-items-center">
                <div className="relative flex self-center m-auto">
                <svg aria-hidden="true" class="inline  w-50 h-50 text-gray-200 animate-spin dark:text-gray-600 fill-yellow-400" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor" />
                        <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill" />
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
        <div className="mt-5 w-auto">

<nav className="nav">
            {[
                { path: '', name: 'Home', icon: <BsHouse /> },
                { path: 'register', name: 'Task', icon: <BsListTask /> },
                { path: 'login', name: 'ICO', icon: <BsInfo /> },
            ].map((item, index) => (
                <Link
                    to={`/${item.path.toLowerCase()}`}
                    key={index}
                    className={`nav-item ${
                        activeIndex === index ? 'is-active' : ''
                    }`}
                    onClick={() => setActiveIndex(index)}
                    ref={(el) => (navItemsRef.current[index] = el)}
                >
                    <i>{item.icon}</i>
                    <span>{item.name}</span>
                </Link>
            ))}
            <div className="nav-indicator-wrapper" ref={indicatorRef.current}>
                <span className="nav-indicator"></span>
            </div>
        </nav>
           
            <BottomNavigation
                sx={{ width: '100%', position: 'absolute', bottom: 0 }}
                value={value}
                onChange={(event, newValue) => {
                    setValue(newValue);
                }}
                showLabels
            >
                <BottomNavigationAction label="Home" icon={<HomeIcon />} />
                <BottomNavigationAction label="Task" icon={<TaskIcon />} />
                <BottomNavigationAction
                    label="Presale"
                    icon={<PresaleIcon />}
                />
            </BottomNavigation>
        </div>
    );
};

export default Tasks;
