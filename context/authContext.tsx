import { useStorageState } from '@/hooks/useStorageState';
import { createContext, useContext, type PropsWithChildren, useState, useEffect } from 'react';
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

    useEffect(() => {
        if (sessionToken) {
            getUser();
        } else {
            setUser(null);
            setUserCollection(null);
            setUserSneakers(null);
            setUserFriends(null);
        }
    }, [sessionToken]);

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
        .then(async response => {
            const data = await response.json();
            if (!response.ok) {
                throw new Error(data.message || 'Error when creating account');
            }
            return data;
        })
        .catch(error => {
            if (error instanceof SyntaxError) {
                throw new Error('Error when getting user');
            }
            throw error;
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

        return fetch(`${process.env.EXPO_PUBLIC_BASE_API_URL}/users/me`, {
            headers: {
                'Authorization': `Bearer ${sessionToken}`
            }
        })
        .then(response => {
            if (response.status === 401) {
                logout();
                return;
            }
            if (!response.ok) {
                throw new Error('Error when getting user');
            }
            return response.json();
        })
        .then(async data => {
            if (!data) return;
            setUser(data.user);
            await Promise.all([
                getUserCollection(),
                getUserSneakers(),
                getUserFriends()
            ]);
        })
        .catch(error => {
            console.error('Error when getting user:', error);
            logout();
        });
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
        })
        .catch(error => {
            console.error('Error when getting collection:', error);
            throw error;
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
        })
        .catch(error => {
            console.error('Error when getting sneakers:', error);
            throw error;
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
        })
        .catch(error => {
            console.error('Error when getting friends:', error);
            throw error;
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
