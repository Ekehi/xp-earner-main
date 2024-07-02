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
            <div className="App d-flex flex-row w-screen h-screen">
            <div className="App d-flex flex-column"  style={{ padding: '20px' }}>
                <SDKProvider>
                    <div className="flex-grow-1 h-screen w-screen">
                    <AppHeader />
                    <div className="flex-grow-1" style={{ maxHeight: "100vh" }}>
                        <Outlet />
                        <Toaster />
                    </div>
                </SDKProvider>
            </div>
        </AuthProvider>
    );
}

export default App;
