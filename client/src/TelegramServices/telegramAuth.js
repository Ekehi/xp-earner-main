import React, { useEffect, useState } from 'react';

const TelegramAuth = () => {
    const [userData, setUserData] = useState(null);

    useEffect(() => {
        Telegram.WebApp.ready();
        const initDataUnsafe = Telegram.WebApp.initDataUnsafe;

        if (initDataUnsafe.user) {
            const userId = initDataUnsafe.user.id;
            const userName = initDataUnsafe.user.username;
            const userPhoto = initDataUnsafe.user.photo_url;

            setUserData({ userId, userName, userPhoto });

            // Save user data to session storage
            sessionStorage.setItem('userId', userId);
            sessionStorage.setItem('userName', userName);
            sessionStorage.setItem('userPhoto', userPhoto);

            // Optionally send user data to your server
            fetch('http://localhost:3001/api/user', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ userId, userName, userPhoto })
            })
            .then(response => response.json())
            .then(data => console.log('User data saved:', data))
            .catch(error => console.error('Error saving user data:', error));
        } else {
            console.log('User data not available');
        }
    }, []);

    if (!userData) {
        return <div>Loading...</div>;
    }

    return (
        <div>
            <h1>Welcome, {userData.userName}</h1>
            <img src={userData.userPhoto} alt="Profile Photo" />
        </div>
    );
};

export default TelegramAuth;
