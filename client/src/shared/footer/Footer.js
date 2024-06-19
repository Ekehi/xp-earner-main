import 'bootstrap/dist/css/bootstrap.min.css';
import { Link } from 'react-router-dom';

const AppFooter = () => {
    return (
        <footer className="footer mt-auto py-3 bg-slate-900 text-white">
            <div className="container text-center">
                <span className="text-muted">
                    EKEHI &copy; {new Date().getFullYear()}
                </span>

                {/* owner website */}
                <span className="text-muted">
                    <Link to="https://ekehi.network" target="_blank">
                        {' '}
                        Ekehi Network
                    </Link>
                </span>
            </div>
        </footer>
    );
};

export default AppFooter;
