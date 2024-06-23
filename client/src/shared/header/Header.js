import 'bootstrap/dist/css/bootstrap.min.css';
import { Navbar, Nav, Button } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser } from '@fortawesome/free-solid-svg-icons';
import axios from 'axios';
import { isLogged } from '../../services/context';
import toast from 'react-hot-toast';

const AppHeader = () => {
    const isUser = isLogged();
    const navigate = useNavigate();

    const handleLogout = () => {
        axios
            .get('https://xp-earner.onrender.com/api/v1/logout', {
                withCredentials: true,
                credentials: 'include',
            })
            .then((res) => {
                console.log(res);
                sessionStorage.removeItem('JWT');
                navigate('/');
                toast.success('Logged Out');
            })
            .catch((err) => {
                console.log(err);
                toast.error(err.response.data.message);
            });
    };

    return (
        <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
            <Navbar.Brand onClick={() => navigate('/')}>
                <img src="/logo.png" className="mr-2 sm:h-9" alt="Ekehi" />
            </Navbar.Brand>
            <Navbar.Toggle aria-controls="responsive-navbar-nav" />
            <Navbar.Collapse id="responsive-navbar-nav">
                <Nav className="mr-auto"></Nav>
                <Nav>
                    {!isUser && (
                        <>
                            <Link to="/login" className="nav-link">Login</Link>
                            <Link to="/register" className="nav-link">Sign Up</Link>
                        </>
                    )}
                    {isUser && (
                        <>
                            <Link to="/profile" className="nav-link">
                                <FontAwesomeIcon icon={faUser} style={{ marginRight: '5px' }} />
                                Profile
                            </Link>
                            <Button onClick={handleLogout} variant="danger">Logout</Button>
                        </>
                    )}
                </Nav>
            </Navbar.Collapse>
        </Navbar>
    );
};

export default AppHeader;
