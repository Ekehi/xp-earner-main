import jwtDecode from 'jwt-decode';

export const isLogged = () => {
    const token = sessionStorage.getItem('JWT');
    console.log('Token retrieved:', token);

    if (!token || token === 'loggedout') return false;

    try {
        const decodedToken = jwtDecode(token);
        const now = Date.now() / 1000;

        return decodedToken.exp > now;
    } catch (error) {
        console.log('Error decoding token:', error);
        return false;
    }
};

export const tokenData = () => {
    const token = sessionStorage.getItem('JWT');
    console.log('Token retrieved:', token);

    if (!token || token === 'loggedout') return false;

    try {
        const decodedToken = jwtDecode(token);
        const now = Date.now() / 1000;

        if (decodedToken.exp < now) return false;

        return decodedToken;
    } catch (error) {
        console.log('Error decoding token:', error);
        return false;
    }
};
