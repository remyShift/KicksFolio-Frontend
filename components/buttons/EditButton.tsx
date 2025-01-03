import { Pressable } from 'react-native';
import Feather from '@expo/vector-icons/Feather';
import Animated, { useAnimatedStyle } from 'react-native-reanimated';
import { useDownScaleAnimation } from '@/hooks';

export default function EditButton({ onPressAction }: { onPressAction: () => void }) {
    const { scale, triggerAnimation } = useDownScaleAnimation();

    const animatedStyle = useAnimatedStyle(() => {
        return {
            transform: [{ scale: scale.value }]
        };
    });

    const handlePress = () => {
        triggerAnimation();
        onPressAction();
    };

    return (
        <Pressable 
            className="bg-white p-3 rounded-md flex items-center justify-center"
            onPress={handlePress}
        >
            <Animated.View style={animatedStyle}>
                <Feather name="edit" size={20} color="black" />
            </Animated.View>
        </Pressable>
    );
}