import { useStorageState } from '@/hooks/useStorageState';
import { createContext, useContext, type PropsWithChildren } from 'react';

const API_URL = 'http://www.kicksfolio.app/api/v1/';

const AuthContext = createContext<{
    login: (email: string, password: string) => Promise<void>;
    signUp: (email: string, password: string, username: string, first_name: string, last_name: string, sneaker_size: number, gender: string) => Promise<void>;
    logout: () => void;
    session?: string | null;
    isLoading: boolean;
    }>({
        login: async () => {},
        signUp: async () => {},
        logout: () => {},
        session: null,
        isLoading: false,
});

export function useSession() {
    const value = useContext(AuthContext);
    if (process.env.NODE_ENV !== 'production') {
        if (!value) {
            throw new Error('useSession must be wrapped in a <SessionProvider />');
        }
    }

    return value;
}

export function SessionProvider({ children }: PropsWithChildren) {
    const [[isLoading, session], setSession] = useStorageState('session');

    const login = async (email: string, password: string) => {
        return fetch(`${API_URL}/login`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ email, password }),
        })
        .then(response => {
            if (!response.ok) {
                throw new Error('Erreur de connexion');
            }
            return response.json();
        })
        .then(data => {
            const { token } = data;
            setSession(token);
        })
        .catch(error => {
            console.error('Erreur lors de la connexion:', error);
        });
    };

    const signUp = (email: string, password: string, username: string, first_name: string, last_name: string, sneaker_size: number, gender: string): Promise<void> => {
        return fetch(`${API_URL}/users`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ email, password, username, first_name, last_name, sneaker_size, gender })
        })
        .then(response => {
            if (!response.ok) {
                throw new Error('Erreur lors de la création de compte');
            }
        })
        .catch(error => {
            console.error('Erreur lors de la création de compte:', error);
        });
    };

    const logout = () => {
        setSession(null);
    };

    return (
        <AuthContext.Provider
            value={{
                login,
                signUp,
                logout,
                session,
                isLoading,
            }}>
            {children}
        </AuthContext.Provider>
    );
}
