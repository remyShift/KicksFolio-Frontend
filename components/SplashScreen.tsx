import LottieView from 'lottie-react-native';
import { View } from 'react-native';

export default function SplashScreen() {
  return (
    <View className="flex-1 items-center justify-center bg-primary">
      <LottieView source={require('../assets/animations/splash.json')} autoPlay loop />
    </View>
  );
}