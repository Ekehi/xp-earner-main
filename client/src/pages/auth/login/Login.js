import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import toast from 'react-hot-toast';
//import { useInitData } from '@tma.js/sdk-react';

const Login = () => {
    //const initData = useInitData();

    const viewPortHeight = window.Telegram.WebApp.viewportHeight;

    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        email: '',
        password: '',
    });

    // useEffect(() => {
    //     if (initData) {
    //         setFormData({
    //             email:'',
    //             password:initData.user?.id || '',
    //         });
    //     }
    // }, [initData]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        axios
            .post(
                'https://xp-earner.onrender.com/api/v1/login',
                {
                    email: formData.email,
                    password: formData.password,
                },
                {
                    withCredentials: true,
                    credentials: 'include',
                },
            )
            .then((res) => {
                const token = res.data.token;
                // Set the token in sessionStorage
                sessionStorage.setItem('JWT', token);
                window.Telegram.WebApp.expand();
                console.log('Token set in sessionStorage:', sessionStorage.getItem('JWT'));
                console.log(res);
                // redirect to home page
                navigate('/');
                window.Telegram.WebApp.close();
                toast.success('Login Successful');
            })
            .catch((err) => {
                console.log(err);
                toast.error(err.response.data.message);
            });
    };

    return (
        <div
            className="container mt-5"
            style={{ backgroundColor: '#f0f0f0', padding: '20px', height: viewPortHeight }}
        >
            <h2>Login</h2>
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label htmlFor="email">Email</label>
                    <input
                        type="email"
                        className="form-control"
                        id="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="password">Password</label>
                    <input
                        type="password"
                        className="form-control"
                        id="password"
                        name="password"
                        value={formData.password}
                        onChange={handleChange}
                        required
                    />
                </div>
                <button type="submit" className="btn btn-primary">
                    Login
                </button>
                <p className="mt-3">
                    Don't have an account? <a href="/register">Register</a>
                </p>
            </form>
        </div>
    );
};

export default Login;
