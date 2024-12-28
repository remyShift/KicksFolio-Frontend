import { Slot } from 'expo-router';
import { SessionProvider } from '@/context/authContext';
import { useFonts } from 'expo-font';
import "../global.css";
import { useSplash } from '@/context/splashContext';
import SplashScreen from '@/components/SplashScreen';

export default function RootLayout() {
  const [fontsLoaded] = useFonts({
    'Actonia': require('../assets/fonts/Actonia.ttf'),
    'Spacemono': require('../assets/fonts/SpaceMono-Regular.ttf'),
    'Syne-ExtraBold': require('../assets/fonts/Syne-ExtraBold.ttf'),
    'Syne-SemiBold': require('../assets/fonts/Syne-SemiBold.ttf'),
    'SpaceMono-Bold': require('../assets/fonts/SpaceMono-Bold.ttf'),
  });

  const { isSplashScreenVisible } = useSplash();

  if (!fontsLoaded) {
    return null;
  }

  if (isSplashScreenVisible) {
    return <SplashScreen />;
  }

  return (
    <SessionProvider>
      <Slot />
    </SessionProvider>
  );
}

