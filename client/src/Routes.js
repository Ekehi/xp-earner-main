// src/routes.js
import { createBrowserRouter, Navigate } from 'react-router-dom';
import App from './App';
import Login from './pages/auth/login/Login';
import Register from './pages/auth/register/Register';
import Profile from './pages/profile/Profile';
import Task from './pages/task/Task';
import Tasks from './pages/tasks/Tasks';
import AuthGuard from './guards/Guard';
import Homepage from './pages/Homepage/homepage';
import Boost from './pages/Boost/Boost';

export const routes = createBrowserRouter([
    {
        path: '/',
        element: <App />,
        children: [
            {
                path: '/',
                element: <Homepage />,
            },
            {
                path: '/tasks',
                element: <Tasks />,
            },
            {
                path: '/Boost',
                element: <Boost />,
            },
            {
                element: <AuthGuard />,
                children: [
                    {
                        path: '/profile',
                        element: <Profile />,
                    },
                    {
                        path: '/task/:taskSlug',
                        element: <Task />,
                    },
                    /* {
                        path: '/tasks',
                        element: <Tasks />,
                    }, */
                ],
            },
            {
                path: '*',
                element: <Navigate to="/" />,
            },
        ],
    },
]);
