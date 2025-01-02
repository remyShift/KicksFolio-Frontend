import { Pressable, Dimensions } from 'react-native';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import Animated, { useAnimatedStyle, useSharedValue, runOnJS } from 'react-native-reanimated';
import { useUpScaleAnimation } from '@/hooks';
import { Gesture, GestureDetector } from 'react-native-gesture-handler';

export default function AddButton({ onPress }: { onPress: () => void }) {
    const { scale, triggerAnimation } = useUpScaleAnimation();
    const translateX = useSharedValue(0);
    const translateY = useSharedValue(0);
    const isDragging = useSharedValue(false);
    const startX = useSharedValue(0);
    const startY = useSharedValue(0);

    const screenHeight = Dimensions.get('window').height;
    const screenWidth = Dimensions.get('window').width;
    const buttonSize = 64;

    const AnimatedPressable = Animated.createAnimatedComponent(Pressable);

    const panGesture = Gesture.Pan()
        .onBegin(() => {
            isDragging.value = true;
            startX.value = translateX.value;
            startY.value = translateY.value;
        })
        .onUpdate((event) => {
            if (isDragging.value) {
                const newX = startX.value + event.translationX;
                const newY = startY.value + event.translationY;

                translateX.value = Math.min(Math.max(newX, -screenWidth + buttonSize), 0);
                translateY.value = Math.min(Math.max(newY, -screenHeight + buttonSize), 0);
            }
        })
        .onFinalize(() => {
            if (!isDragging.value || (Math.abs(translateX.value - startX.value) < 5 && Math.abs(translateY.value - startY.value) < 5)) {
                runOnJS(triggerAnimation)();
                runOnJS(onPress)();
            }
            isDragging.value = false;
        });

    const animatedStyle = useAnimatedStyle(() => {
        return {
            transform: [
                { translateX: translateX.value },
                { translateY: translateY.value },
                { scale: scale.value }
            ],
            position: 'absolute',
            bottom: 20,
            right: 20,
        };
    });

    return (
        <GestureDetector gesture={panGesture}>
            <AnimatedPressable style={animatedStyle}
                className="bg-primary w-16 h-16 rounded-full flex items-center justify-center shadow-sm"
            >
                <FontAwesome name="plus" size={28} color="white" />
            </AnimatedPressable>
        </GestureDetector>
    );
}
