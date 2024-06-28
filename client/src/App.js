// src/App.js
import AppFooter from './shared/footer/Footer';
import AppHeader from './shared/header/Header';
import { Outlet } from 'react-router-dom';
import { SDKProvider } from '@tma.js/sdk-react';
import { Toaster } from 'react-hot-toast';
import { AuthProvider } from './services/authContext';
import './Style.css';

function App() {
    return (
        <AuthProvider>
            <div className="App d-flex flex-column">
                <SDKProvider>
                    <AppHeader />
                    <div className="flex-grow-1" style={{ minHeight: "100vh" }}>
                        <Outlet />
                        <Toaster />
                    </div>
                    <AppFooter />
                </SDKProvider>
            </div>
        </AuthProvider>
    );
}

export default App;
