import { Pressable } from 'react-native';
import AntDesign from '@expo/vector-icons/AntDesign';
import { useState } from 'react';
import Animated, { useAnimatedStyle } from 'react-native-reanimated';
import { useUpScaleAnimation } from '@/hooks';

export default function LoveButton() {
    const primary = '#F27329';
    const [color, setColor] = useState('black');
    const { scale, triggerAnimation } = useUpScaleAnimation();

    const animatedStyle = useAnimatedStyle(() => {
        return {
            transform: [{ scale: scale.value }]
        };
    });

    const handlePress = () => {
        triggerAnimation();
        setColor(color === primary ? 'black' : primary);
    };

    return (
        <Pressable 
            className="bg-white p-3 rounded-md flex items-center justify-center"
            onPress={handlePress}
        >
            <Animated.View style={animatedStyle}>
                {color === primary ? 
                    <AntDesign name="heart" size={20} color={color} /> : 
                    <AntDesign name="hearto" size={20} color={color} />
                }
            </Animated.View>
        </Pressable>
    );
}