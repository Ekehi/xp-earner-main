// src/App.js

import AppHeader from './shared/header/Header';
import { Outlet } from 'react-router-dom';
import { SDKProvider } from '@tma.js/sdk-react';
import { Toaster } from 'react-hot-toast';
import { AuthProvider } from './services/authContext';
import './Style.css';

function App() {
    return (
        <AuthProvider>
            <div className="App d-flex flex-row w-fit bg-black">
                <SDKProvider>
                    <div className="h-screen flex-grow w-screen">
                        <Outlet />
                        <Toaster />
                    </div>
                </SDKProvider>
            </div>
        </AuthProvider>
    );
}

export default App;
