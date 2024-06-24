import AppFooter from './shared/footer/Footer';
import AppHeader from './shared/header/Header';
import { Outlet } from 'react-router-dom';
import { SDKProvider } from '@tma.js/sdk-react';
import { Toaster } from 'react-hot-toast';
import { AuthContext } from './services/authContext';

function App() {
    return (
        <div className="App d-flex flex-column" style={{ minHeight: '100vh' }}>
            <SDKProvider>
            <AuthContext>
            <AppHeader />
            <div className="flex-grow-1">
                <Outlet />
                <Toaster />
            </div>
            <AppFooter />
            </AuthContext>
            </SDKProvider>
        </div>
    );
}

export default App;
