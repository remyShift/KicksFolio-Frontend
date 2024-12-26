import React, { useContext } from 'react';
import { Text, View, Button } from 'react-native';
import { useRouter } from 'expo-router';
import { useSession } from '@/context/authContext';

const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
    const { session } = useSession();
    const router = useRouter();

    if (!session) {
        return (
            <View>
                <Text>You are not authenticated, please login or sign up.</Text>
                <Button title="Login" onPress={() => router.push('/sign-in')} />
                <Button title="Sign Up" onPress={() => router.push('/sign-up')} />
            </View>
        );
    }

    return children;
};

export default ProtectedRoute;