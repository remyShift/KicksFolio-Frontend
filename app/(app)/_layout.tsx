import { Text } from 'react-native';
import { Redirect, Stack } from 'expo-router';

import { useSession } from '@/context/authContext';
import { useEffect } from 'react';

export default function AppLayout() {
    const { sessionToken, isLoading, user, userCollection, getUser, logout } = useSession();
    
    useEffect(() => {
        const checkToken = async () => {
            if (sessionToken) {
                try {
                    await getUser();
                } catch (error) {
                  logout();
                }
            }
        };
        
        checkToken();
    }, []);

    if (isLoading) {
        return <Text>Loading...</Text>;
    }

    if (!sessionToken || !user) {
        return <Redirect href="/login" />;
    }

    if (!userCollection) {
        return <Redirect href="/collection" />;
    }

    return <Stack screenOptions={{ headerShown: false }} />;
}
