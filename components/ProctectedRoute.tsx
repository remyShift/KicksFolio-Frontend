import React from 'react';
import { Text, View } from 'react-native';
import { useRouter } from 'expo-router';
import { useSession } from '@/context/authContext';
import MainButton from './buttons/MainButton';

const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
    const { session } = useSession();
    const router = useRouter();

    if (!session) {
        return (
            <View>
                <Text>You are not authenticated, please login or sign up.</Text>
                <MainButton content="Login" backgroundColor="bg-primary" onPressAction={() => router.replace('/login')} />
                <MainButton content="Sign Up" backgroundColor="bg-gray-400" onPressAction={() => router.replace('/sign-up')} />
            </View>
        );
    }

    return children;
};

export default ProtectedRoute;