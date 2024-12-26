import { View, Pressable } from 'react-native';
import { useDownScaleAnimation } from '@/hooks';
import Animated, { useAnimatedStyle } from 'react-native-reanimated';

export default function MainButton({content, onPress, backgroundColor}: {content: string, onPress: () => void, backgroundColor: string}) {
    const { scale, triggerAnimation } = useDownScaleAnimation();

    const animatedStyle = useAnimatedStyle(() => {
        return {
            transform: [{ scale: scale.value }]
        };
    });

    return (
        <View className="flex flex-row">
                <Pressable 
                    className={`${backgroundColor} py-3 px-6 rounded-md w-2/3`}
                    onPress={() => {
                        triggerAnimation();
                        onPress();
                    }}
                >
                <Animated.Text 
                    className="font-spacemono-bold text-lg text-center text-white"
                    style={animatedStyle}
                >
                    {content}
                </Animated.Text>
            </Pressable>
        </View>
    );
}
