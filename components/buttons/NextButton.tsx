import { Pressable, View } from 'react-native';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import Animated, { useAnimatedStyle } from 'react-native-reanimated';
import { useDownScaleAnimation } from '@/hooks';
import { Text } from 'react-native';

export default function NextButton({onPressAction, content, backgroundColor}: {onPressAction: () => void, content: string, backgroundColor: string}) {
    const { scale, triggerAnimation } = useDownScaleAnimation();

    const animatedStyle = useAnimatedStyle(() => {
        return {
            transform: [{ scale: scale.value }]
        };
    });

    return (
        <Pressable
            className={`${backgroundColor} py-3 px-4 rounded-md flex items-center justify-center`}
            onPress={() => {
                triggerAnimation();
                onPressAction();
            }}
        >
            <Animated.View style={animatedStyle} className="flex-row items-center justify-between gap-3">
                <Text className="font-spacemono-bold text-base text-center text-white">
                    {content}
                </Text>
                <Text className="font-bold text-base text-center text-white">
                    {`>>`}
                </Text>
            </Animated.View>
        </Pressable>
    );
}