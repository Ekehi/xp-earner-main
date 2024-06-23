import AppFooter from './shared/footer/Footer';
import AppHeader from './shared/header/Header';
import { Outlet } from 'react-router-dom';
import { SDKProvider } from '@tma.js/sdk-react';
import { Toaster } from 'react-hot-toast';

function App() {
    return (
        <div className="App d-flex flex-column" style={{ minHeight: '100vh' }}>
            <SDKProvider>
            <AppHeader />
            <div className="flex-grow-1">
                <Outlet />
                <Toaster />
            </div>
            <AppFooter />
            </SDKProvider>
        </div>
    );
}

export default App;
