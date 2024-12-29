import { Text } from 'react-native';
import { Redirect, Stack } from 'expo-router';

import { useSessionToken } from '@/context/authContext';

export default function AppLayout() {
    const { sessionToken, isLoading } = useSessionToken();

  // You can keep the splash screen open, or render a loading screen like we do here.
    if (isLoading) {
      return <Text>Loading...</Text>;
    }

    if (!sessionToken) {
      return <Redirect href="/login" />;
    }

    return <Stack screenOptions={{ headerShown: false }} />;
}
