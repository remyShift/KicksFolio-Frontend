import { Pressable, Text } from 'react-native';
import { useDownScaleAnimation } from '@/hooks';
import Animated, { useAnimatedStyle } from 'react-native-reanimated';

export default function MainButton({content, onPressAction, backgroundColor}: {content: string, onPressAction: () => void, backgroundColor: string}) {
    const { scale, triggerAnimation } = useDownScaleAnimation();

    const animatedStyle = useAnimatedStyle(() => {
        return {
            transform: [{ scale: scale.value }]
        };
    });

    return (
        <Animated.View className="flex flex-row" style={ animatedStyle }>
                <Pressable 
                    className={`${backgroundColor} py-3 px-6 rounded-md w-2/3`}
                    onPress={() => {
                        triggerAnimation();
                        onPressAction();
                    }}
                >
                <Text className="font-spacemono-bold text-lg text-center text-white">
                    {content}
                </Text>
            </Pressable>
        </Animated.View>
    );
}
