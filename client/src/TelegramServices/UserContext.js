// src/contexts/UserContext.js
import React, { createContext, useState, useEffect } from 'react';
// Declare Telegram object to avoid ESLint error
/* global Telegram */

export const UserContext = createContext();

export const UserProvider = ({ children }) => {
    const [userData, setUserData] = useState(null);

    useEffect(() => {
        Telegram.WebApp.ready();
        const initDataUnsafe = Telegram.WebApp.initDataUnsafe;

        if (initDataUnsafe.user) {
            const userId = initDataUnsafe.user.id;
            const userName = initDataUnsafe.user.username;
            const userPhoto = initDataUnsafe.user.photo_url;

            const user = { userId, userName, userPhoto };
            setUserData(user);

            // Save user data to session storage
            sessionStorage.setItem('userId', userId);
            sessionStorage.setItem('userName', userName);
            sessionStorage.setItem('userPhoto', userPhoto);

            // Optionally send user data to your server
            fetch('http://localhost:3001/api/user', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(user)
            })
            .then(response => response.json())
            .then(data => console.log('User data saved:', data))
            .catch(error => console.error('Error saving user data:', error));
        } else {
            console.log('User data not available');
        }
    }, []);

    return (
        <UserContext.Provider value={userData}>
            {children}
        </UserContext.Provider>
    );
};
