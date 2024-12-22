import { useSharedValue } from 'react-native-reanimated';
import { withSpring, withSequence } from 'react-native-reanimated';

export const useScaleAnimation = (initialScale = 1) => {
    const scale = useSharedValue(initialScale);

    const triggerAnimation = () => {
        scale.value = withSequence(
            withSpring(1.2),
            withSpring(1)
        );
    };

    return {
        scale,
        triggerAnimation
    };
};