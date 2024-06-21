import { jwtDecode } from 'jwt-decode';
import Cookies from 'js-cookie';

export const tokenData = () => {
    const token = Cookies.get('JWT');
    console.log('Token:', token);

    if (token === 'loggedout') return false;

    if (!token) return false;
    try {
        const decodedToken = jwtDecode(token);
        console.log('Decoded Token:', decodedToken);

        const now = Date.now() / 1000;
        console.log('Current time:', now);
        console.log('Token expiry:', decodedToken.exp);

        if (decodedToken.exp < now) {
            console.log('Token has expired');
            return false;
        }

        console.log('Token is valid');
        return decodedToken;
    } catch (error) {
        console.log('Error decoding token:', error);
        return false;
    }
};
