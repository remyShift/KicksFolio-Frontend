import { View } from 'react-native';
import Animated, { FadeIn, useSharedValue, useAnimatedStyle, withTiming } from 'react-native-reanimated';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import { useState, useEffect } from 'react';

type SplashScreenProps = {
  handleAnimationFinish: () => void;
}

export default function SplashScreen({ handleAnimationFinish }: SplashScreenProps) {
  const [textAnimationFinished, setTextAnimationFinished] = useState(false);
  const letters = 'KicksFolio'.split('');
  const AnimatedShoeIcon = Animated.createAnimatedComponent(MaterialCommunityIcons);

  const rotation = useSharedValue(0);

  const animatedStyle = useAnimatedStyle(() => {
    return {
      transform: [{ rotate: `${rotation.value}deg` }],
    };
  });

  useEffect(() => {
    if (textAnimationFinished) {
      setTimeout(() => {
        handleAnimationFinish();
      }, 2500);
    }
  }, [textAnimationFinished]);

  useEffect(() => {
    const halfwayIndex = Math.floor(letters.length / 2);
    const delay = halfwayIndex * 150 + 250;
    setTimeout(() => {
      rotation.value = withTiming(360, { duration: 1000 });
    }, delay);
  }, []);

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
        style={animatedStyle}
      />
    </View>
  );
}
