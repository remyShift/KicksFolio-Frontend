import { useStorageState } from '@/hooks/useStorageState';
import { createContext, useContext, type PropsWithChildren, useState } from 'react';
import { User, Collection, Sneaker } from '@/types/Models';

const AuthContext = createContext<{
    login: (email: string, password: string) => Promise<void>;
    signUp: (email: string, password: string, username: string, first_name: string, last_name: string, sneaker_size: number, gender: string) => Promise<void>;
    logout: () => void;
    sessionToken?: string | null;
    isLoading: boolean;
    user?: User | null;
    userCollection?: Collection | null;
    userSneakers?: Sneaker[] | null;
    userFriends?: User[] | null;
    getUser: () => Promise<void | undefined>;
    getUserCollection: () => Promise<void | undefined>;
    getUserSneakers: () => Promise<void | undefined>;
    getUserFriends: () => Promise<void | undefined>;
    }>({
        login: async () => {},
        signUp: async () => {},
        logout: () => {},
        sessionToken: null,
        isLoading: false,
        user: null,
        userCollection: null,
        userSneakers: null,
        userFriends: null,
        getUser: async () => {},
        getUserCollection: async () => {},
        getUserSneakers: async () => {},
        getUserFriends: async () => {}
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
    const [[isLoading, sessionToken], setSessionToken] = useStorageState('sessionToken');
    const [userCollection, setUserCollection] = useState<Collection | null>(null);
    const [userSneakers, setUserSneakers] = useState<Sneaker[] | null>(null);
    const [user, setUser] = useState<User | null>(null);
    const [userFriends, setUserFriends] = useState<User[] | null>(null);

    const login = async (email: string, password: string) => {
        return fetch(`${process.env.EXPO_PUBLIC_BASE_API_URL}/login`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ email, password }),
        })
        .then(response => {
            if (!response.ok) {
                throw new Error('Error when logging in');
            }
            return response.json();
        })
        .then(async data => {
            const { token } = data;
            setSessionToken(token);
            await getUser();
        })
        .catch(error => {
            throw new Error('Invalid email or password');
        });
    };

    const signUp = async (email: string, password: string, username: string, first_name: string, last_name: string, sneaker_size: number, gender: string): Promise<void> => {
        return fetch(`${process.env.EXPO_PUBLIC_BASE_API_URL}/users`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                user: {
                    email,
                    password,
                    username,
                    first_name,
                    last_name,
                    sneaker_size,
                    gender
                }
            })
        })
        .then(response => {
            if (!response.ok) {
                throw new Error('Error when creating account');
            }
        })
        .catch(error => {
            console.error(`Error when creating account: ${error}`);
        });
    };

    const logout = () => {
        setSessionToken(null);
        setUserCollection(null);
        setUserSneakers(null);
        setUserFriends(null);
        setUser(null);
    };

    const getUser = async () => {
        if (!sessionToken) return;

        const response = await fetch(`${process.env.EXPO_PUBLIC_BASE_API_URL}/users/me`, {
            headers: {
                'Authorization': `Bearer ${sessionToken}`
            }
        });

        if (!response.ok) {
            throw new Error('Error when getting user');
        }

        const data = await response.json();
        setUser(data.user);
        
        await Promise.all([
            getUserCollection(),
            getUserSneakers(),
            getUserFriends()
        ]);
    };

    const getUserCollection = async () => {
        console.log(user?.id);
        console.log(sessionToken);

        if (!user?.id || !sessionToken) return;
        
        return fetch(`${process.env.EXPO_PUBLIC_BASE_API_URL}/users/${user.id}/collection`, {
            headers: {
                'Authorization': `Bearer ${sessionToken}`
            }
        })
        .then(response => {
            if (!response.ok) return;
            return response.json();
        })
        .then(data => {
            if (data) {
                setUserCollection(data.collection);
            }
        });
    };

    const getUserSneakers = async () => {
        if (!user?.id || !sessionToken) return;
        
        return fetch(`${process.env.EXPO_PUBLIC_BASE_API_URL}/users/${user.id}/collection/sneakers`, {
            headers: {
                'Authorization': `Bearer ${sessionToken}`
            }
        })
        .then(response => {
            if (!response.ok) return;
            return response.json();
        })
        .then(data => {
            if (data) {
                setUserSneakers(data.sneakers);
            }
        });
    };

    const getUserFriends = async () => {
        if (!user?.id || !sessionToken) return;
        
        return fetch(`${process.env.EXPO_PUBLIC_BASE_API_URL}/users/${user.id}/collection/friends`, {
            headers: {
                'Authorization': `Bearer ${sessionToken}`
            }
        })
        .then(response => {
            if (!response.ok) return;
            return response.json();
        })
        .then(data => {
            if (data) {
                setUserFriends(data.friends);
            }
        });
    };

    return (
        <AuthContext.Provider
            value={{
                login,
                signUp,
                logout,
                sessionToken,
                isLoading,
                userCollection,
                userSneakers,
                userFriends,
                user,
                getUser,
                getUserCollection,
                getUserSneakers,
                getUserFriends
            }}>
            {children}
        </AuthContext.Provider>
    );
}
