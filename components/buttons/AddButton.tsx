import { Pressable } from 'react-native';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import Animated, { useAnimatedStyle } from 'react-native-reanimated';
import { useScaleAnimation } from '@/hooks/useScaleAnimation';

export default function AddButton() {
    const { scale, triggerAnimation } = useScaleAnimation();

    const animatedStyle = useAnimatedStyle(() => {
        return {
            transform: [{ scale: scale.value }]
        };
    });

    return (
        <Pressable 
            className="bg-primary w-16 h-16 rounded-full flex items-center justify-center"
            onPress={() => {
                triggerAnimation();
                alert('Add');
            }}
        >
            <Animated.View style={animatedStyle}>
                <FontAwesome name="plus" size={28} color="white" />
            </Animated.View>
        </Pressable>
    );
}
