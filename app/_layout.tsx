import { AuthProvider } from '@/context/authContext';
import { useFonts } from 'expo-font';
import { Stack } from "expo-router";
import "../global.css";

export default function Layout() {
  const [fontsLoaded] = useFonts({
    'Actonia': require('../assets/fonts/Actonia.ttf'),
    'Spacemono': require('../assets/fonts/SpaceMono-Regular.ttf'),
    'Syne-ExtraBold': require('../assets/fonts/Syne-ExtraBold.ttf'),
    'Syne-SemiBold': require('../assets/fonts/Syne-SemiBold.ttf'),
    'SpaceMono-Bold': require('../assets/fonts/SpaceMono-Bold.ttf'),
  });

  if (!fontsLoaded) {
    return null;
  }

  return (
    <AuthProvider>
      <Stack screenOptions={{ headerShown: false }}>
        <Stack.Screen name="(tabs)"/>
      </Stack>
    </AuthProvider>
  );
}

