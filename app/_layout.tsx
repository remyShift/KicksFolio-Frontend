import { Slot } from 'expo-router';
import { SessionProvider } from '@/context/authContext';
import { useFonts } from 'expo-font';
import "../global.css";
import SplashScreen from '@/components/SplashScreen';
import { useState } from 'react';
import { GestureHandlerRootView } from 'react-native-gesture-handler';

const FONTS = {
  'Actonia': require('../assets/fonts/Actonia.ttf'),
  'Spacemono': require('../assets/fonts/SpaceMono-Regular.ttf'),
  'Syne-ExtraBold': require('../assets/fonts/Syne-ExtraBold.ttf'),
  'Syne-SemiBold': require('../assets/fonts/Syne-SemiBold.ttf'),
  'SpaceMono-Bold': require('../assets/fonts/SpaceMono-Bold.ttf'),
} as const;

export default function RootLayout() {
  const [fontsLoaded] = useFonts(FONTS);

  const [isSplashScreenVisible, setIsSplashScreenVisible] = useState(true);
  
  if (!fontsLoaded) {
    return null;
  }

  if (isSplashScreenVisible) {
    return <SplashScreen handleAnimationFinish={() => setIsSplashScreenVisible(false)} />;
  }

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <SessionProvider>
        <Slot />
      </SessionProvider>
    </GestureHandlerRootView>
  );
}


