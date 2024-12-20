import { Stack } from "expo-router";
import "../global.css";
import { useFonts } from 'expo-font';


export default function Layout() {
  const [fontsLoaded] = useFonts({
    'Actonia': require('../assets/fonts/Actonia.ttf'),
    'Spacemono': require('../assets/fonts/SpaceMono-Regular.ttf'),
  });

  if (!fontsLoaded) {
    return null;
  }

  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen name="(tabs)"/>
    </Stack>
  );
}

