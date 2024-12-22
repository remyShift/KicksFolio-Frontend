import { Pressable } from 'react-native';
import AntDesign from '@expo/vector-icons/AntDesign';
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
                <AntDesign name="back" size={24} color="black" />
            </Animated.View>
        </Pressable>
    );
}