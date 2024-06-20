import AppFooter from './shared/footer/Footer';
import AppHeader from './shared/header/Header';
import { Outlet } from 'react-router-dom';
import { SDKProvider } from '@tma.js/sdk-react';

function App() {
    return (
        <div className="App d-flex flex-column" style={{ minHeight: '100vh' }}>
            <SDKProvider>
            <AppHeader />
            <div className="flex-grow-1">
                <Outlet />
            </div>
            <AppFooter />
            </SDKProvider>
        </div>
    );
}

export default App;
