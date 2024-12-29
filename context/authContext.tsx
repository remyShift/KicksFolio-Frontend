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
    getUser: () => Promise<void>;
    getUserCollection: () => Promise<void>;
    getUserSneakers: () => Promise<void>;
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
        getUserSneakers: async () => {}
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
        }
    }, [sessionToken]);

    useEffect(() => {
        if (user) {
            getUserCollection();
            getUserSneakers();
            console.log(userCollection);
        }
    }, [user]);

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
        .then(data => {
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
        setUser(null);
    };

    const getUser = async () => {
        return fetch(`${process.env.EXPO_PUBLIC_BASE_API_URL}/users/me`, {
            headers: {
                'Authorization': `Bearer ${sessionToken}`
            }
        })
        .then(response => {
            if (!response.ok) {
                throw new Error('Error when getting user');
            }
            return response.json();
        })
        .then((data) => {
            setUser(data.user);
            getUserCollection();
            getUserSneakers();
        })
        .catch(error => {
            console.error(`Error when getting user: ${error}`);
        });
    };

    const getUserCollection = async () => {
        return fetch(`${process.env.EXPO_PUBLIC_BASE_API_URL}/users/${user?.id}/collection`, {
            headers: {
                'Authorization': `Bearer ${sessionToken}`
            }
        })
        .then(response => {
            if (!response.ok) {
                throw new Error('Error when getting user collection');
            }
            return response.json();
        })
        .then(data => {
            setUserCollection(data.collection);
        })
        .catch(error => {
            console.error(`Error when getting user collection: ${error}`);
        });
    };

    const getUserSneakers = async () => {
        return fetch(`${process.env.EXPO_PUBLIC_BASE_API_URL}/users/${user?.id}/collection/sneakers`, {
            headers: {
                'Authorization': `Bearer ${sessionToken}`
            }
        })
        .then(response => {
            if (!response.ok) {
                throw new Error('Error when getting user sneakers');
            }
            return response.json();
        })
        .then(data => {
            setUserSneakers(data.sneakers);
        })
        .catch(error => {
            console.error(`Error when getting user sneakers: ${error}`);
        });
    };

    const getUserFriends = async () => {
        return fetch(`${process.env.EXPO_PUBLIC_BASE_API_URL}/users/${user?.id}/collection/friends`, {
            headers: {
                'Authorization': `Bearer ${sessionToken}`
            }
        })
        .then(response => {
            if (!response.ok) {
                throw new Error('Error when getting user friends');
            }
            return response.json();
        })
        .then(data => {
            setUserFriends(data.friends);
        })
        .catch(error => {
            console.error(`Error when getting user friends: ${error}`);
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
                user,
                getUser,
                getUserCollection,
                getUserSneakers
            }}>
            {children}
        </AuthContext.Provider>
    );
}
