import { Text } from 'react-native';
import { Redirect, Stack } from 'expo-router';

import { useSession } from '@/context/authContext';

export default function AppLayout() {
    const { session, isLoading } = useSession();

  // You can keep the splash screen open, or render a loading screen like we do here.
    if (isLoading) {
      return <Text>Loading...</Text>;
    }

    if (!session) {
      return <Redirect href="/login" />;
    }

    return <Stack screenOptions={{ headerShown: false }} />;
}
