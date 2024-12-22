import { Pressable } from 'react-native';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import Animated, { useAnimatedStyle } from 'react-native-reanimated';
import { useDownScaleAnimation } from '@/hooks';

export default function ShareButton() {
    const { scale, triggerAnimation } = useDownScaleAnimation();

    const animatedStyle = useAnimatedStyle(() => {
        return {
            transform: [{ scale: scale.value }]
        };
    });

    const handlePress = () => {
        triggerAnimation();
    };

    return (
        <Pressable
            className="bg-white w-16 h-16 rounded-md flex items-center justify-center"
            onPress={handlePress}
        >
            <Animated.View style={animatedStyle}>
                <MaterialIcons name="arrow-back-ios-new" size={20} color="black" />
            </Animated.View>
        </Pressable>
    );
}