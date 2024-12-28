import { View } from 'react-native';
import { useSplash } from '@/context/splashContext';
import Animated, { FadeIn } from 'react-native-reanimated';

export default function SplashScreen() {
  const { setIsSplashScreenVisible } = useSplash();
  const letters = 'KicksFolio'.split('');

  return (
    <View className="flex-1 items-center justify-center bg-primary">
      <View className="flex-row">
        {letters.map((letter, index) => (
          <Animated.Text
            key={index}
            entering={FadeIn.duration(500).delay(index * 150)}
            className="text-white text-6xl font-bold font-actonia px-2.5"
            style={{ marginRight: index < letters.length - 1 ? -12 : 0 }}
          >
            {letter}
          </Animated.Text>
        ))}
      </View>
    </View>
  );
}




      {/* <LottieView 
        source={require('../assets/animations/splash.json')} 
        autoPlay 
        loop={false}
        onAnimationFinish={() => {
          setIsSplashScreenVisible(false);
        }}
        style={{ width: '100%', height: '100%' }}
      /> */}