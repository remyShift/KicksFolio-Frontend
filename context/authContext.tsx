import { createContext, useEffect, useState } from 'react';
import { isAuthenticated } from '../scripts/authService';

export const AuthContext = createContext({
    isAuth: false,
    setIsAuth: (value: boolean) => {}
});

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
    const [isAuth, setIsAuth] = useState(false);

    useEffect(() => {
    const checkAuth = async () => {
        const authStatus = await isAuthenticated();
        setIsAuth(authStatus);
    };
    checkAuth();
    }, []);

    return (
        <AuthContext.Provider value={{ isAuth, setIsAuth }}>
            {children}
        </AuthContext.Provider>
    );
};