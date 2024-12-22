import { View, Pressable, Text } from 'react-native';
import { useDownScaleAnimation } from '@/hooks';
import Animated, { useAnimatedStyle } from 'react-native-reanimated';

export default function BrowseButton() {
    const { scale, triggerAnimation } = useDownScaleAnimation();

    const animatedStyle = useAnimatedStyle(() => {
        return {
            transform: [{ scale: scale.value }]
        };
    });

    return (
        <View className="flex flex-row">
                <Pressable 
                    className="bg-primary p-3 px-6 rounded-md"
                    onPress={() => {
                        triggerAnimation();
                        alert('Search Now');
                    }}
                >
                <Animated.Text 
                    className="font-spacemono-bold text-lg text-center text-white"
                    style={animatedStyle}
                >
                    Search Now
                </Animated.Text>
            </Pressable>
        </View>
    );
}
