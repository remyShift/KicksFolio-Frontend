import { View } from 'react-native';
import Animated, { FadeIn, withTiming, useSharedValue, useAnimatedStyle, runOnJS } from 'react-native-reanimated';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import { useState } from 'react';

type SplashScreenProps = {
  handleAnimationFinish: () => void;
}

const AnimatedShoeIcon = Animated.createAnimatedComponent(MaterialCommunityIcons);

export default function SplashScreen({ handleAnimationFinish }: SplashScreenProps) {
  const [textAnimationFinished, setTextAnimationFinished] = useState(false);
  const letters = 'KicksFolio'.split('');
  const rotation = useSharedValue(0);


  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ rotate: `${rotation.value}deg` }],
  }));

  const startRotation = () => {
    rotation.value = withTiming(360, { duration: 1000 });
  };

  if (textAnimationFinished) {
    setTimeout(() => {
      startRotation();
    }, 1000);
  }

  return (
    <View className="flex-1 items-center justify-center bg-primary">
      <View className="flex-row">
        {letters.map((letter, index) => (
          <Animated.Text
            key={index}
            entering={FadeIn.duration(500).delay(index * 150)}
            className="text-white text-6xl font-bold font-actonia px-2.5"
            style={{ marginRight: index < letters.length - 1 ? -12 : 0 }}
            onLayout={index === letters.length - 1 ? () => setTextAnimationFinished(true) : undefined}
          >
            {letter}
          </Animated.Text>
        ))}
      </View>
      <AnimatedShoeIcon
        name="shoe-sneaker"
        size={50}
        color="white"
        entering={FadeIn.duration(500).delay(500)}
        onLayout={() => handleAnimationFinish()}
        style={animatedStyle}
      />
    </View>
  );
}




      /* <LottieView 
        source={require('../assets/animations/splash.json')} 
        autoPlay 
        loop={false}
        onAnimationFinish={() => {
          setIsSplashScreenVisible(false);
        }}
        style={{ width: '100%', height: '100%' }}
      /> */