import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';

const Register = () => {
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
        confirmPassword: '',
        image: null,
    });

    useEffect(() => {
        if (window.Telegram?.WebApp) {
            const initData = window.Telegram.WebApp.initDataUnsafe;

            if (initData && initData.user) {
                setFormData({
                    name: initData.user.username || '',
                    email: '',  // Telegram doesn't provide an email, so leave this empty for manual input
                    password: initData.user.id.toString() || '',
                    confirmPassword: initData.user.id.toString() || '',
                    image: initData.user.photo_url || null,
                });
            }
        }
    }, []);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        setFormData({ ...formData, image: file });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const formDataToSend = new FormData();
        formDataToSend.append('name', formData.name);
        formDataToSend.append('email', formData.email);
        formDataToSend.append('password', formData.password);
        formDataToSend.append('passwordConfirm', formData.confirmPassword);
        formDataToSend.append('image', formData.image);

        try {
            const response = await axios.post(
                'https://xp-earner.onrender.com/api/v1/signup',
                formDataToSend,
                {
                    withCredentials: true,
                    credentials: 'include',
                    headers: {
                        'Content-Type': 'multipart/form-data',
                    },
                },
            );
            console.log(response);
            navigate('/login');
            toast.success('User registered successfully');
        } catch (error) {
            console.error(error);
            toast.error(error.response?.data?.message || 'Registration failed');
        }
    };

    return (
        <div className="flex flex-col p-5 h-full w-full bg-black justify-center align-middle">
            <div className='wrapper relative mb-5 mx-auto shadow-md shadow-yellow-900'>
                <h2 className='text-yellow-500'>Sign Up</h2>
                <form onSubmit={handleSubmit} encType="multipart/form-data">
                    <div className="form-group">
                        <label htmlFor="name">Name</label>
                        <input
                            type="text"
                            className="form-control border-none outline-none"
                            id="name"
                            name="name"
                            value={formData.name}
                            onChange={handleChange}
                            required
                        />
                    </div>
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
                    <div className="form-group">
                        <label htmlFor="confirmPassword">Confirm Password</label>
                        <input
                            type="password"
                            className="form-control"
                            id="confirmPassword"
                            name="confirmPassword"
                            value={formData.confirmPassword}
                            onChange={handleChange}
                            required
                        />
                    </div>

                    {/* New image field */}
                    <div className="form-group hidden">
                        <label htmlFor="image">Profile Image</label>
                        <input
                            type="file"
                            className="form-control-file"
                            id="image"
                            name="image"
                            accept="image/*"
                            onChange={handleImageChange}
                        />
                    </div>

                    <button type="submit" className="btn btn-primary text-yellow-500 border bg-transparent rounded-md">
                        Submit
                    </button>
                </form>
            </div>
        </div>
    );
};

export default Register;