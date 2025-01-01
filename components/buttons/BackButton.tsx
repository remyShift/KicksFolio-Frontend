import { Pressable } from 'react-native';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import Animated, { useAnimatedStyle } from 'react-native-reanimated';
import { useDownScaleAnimation } from '@/hooks';

export default function BackButton({onPressAction}: {onPressAction: () => void}) {
    const { scale, triggerAnimation } = useDownScaleAnimation();

    const animatedStyle = useAnimatedStyle(() => {
        return {
            transform: [{ scale: scale.value }]
        };
    });

    return (
        <Pressable
            className="bg-white p-3 rounded-md flex items-center justify-center"
            onPress={() => {
                triggerAnimation();
                onPressAction();
            }}
        >
            <Animated.View style={animatedStyle}>
                <MaterialIcons name="arrow-back-ios-new" size={20} color="black" />
            </Animated.View>
        </Pressable>
    );
}