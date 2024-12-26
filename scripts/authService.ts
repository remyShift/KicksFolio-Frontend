import AsyncStorage from '@react-native-async-storage/async-storage';

const API_URL = 'https://www.kicksfolio.app/api/v1/';

export const register = async (email: string, password: string, username: string, firstName: string, lastName: string, sneaker_size: number, gender: string) => {
    const response = await fetch(`${API_URL}/users/`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password, username, firstName, lastName, sneaker_size, gender }),
    });

    if (!response.ok) {
        throw new Error('Erreur de connexion');
    }

    const data = await response.json();
    const { token } = data;
    await AsyncStorage.setItem('jwtToken', token);
    return true;
};

export const login = async (email: string, password: string) => {
    const response = await fetch(`${API_URL}/login`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
    });

    if (!response.ok) {
        throw new Error('Erreur de connexion');
    }

    const data = await response.json();
    const { token } = data;
    await AsyncStorage.setItem('jwtToken', token);
    return true;
};

export const logout = async () => {
    await AsyncStorage.removeItem('jwtToken');
};

export const isAuthenticated = async () => {
    const token = await AsyncStorage.getItem('jwtToken');
    return !!token;
};