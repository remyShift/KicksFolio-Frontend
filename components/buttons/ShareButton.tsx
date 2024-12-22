import { Pressable } from 'react-native';
import Feather from '@expo/vector-icons/Feather';
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
                <Feather name="share" size={20} color="black" />
            </Animated.View>
        </Pressable>
    );
}