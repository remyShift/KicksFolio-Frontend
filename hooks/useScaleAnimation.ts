import { useEffect } from 'react';
import { useSharedValue } from 'react-native-reanimated';
import { withSpring, withSequence } from 'react-native-reanimated';

export const useUpScaleAnimation = (initialScale = 1) => {
    const scale = useSharedValue(initialScale);

    useEffect(() => {
        return () => {
            scale.value = initialScale;
        };
    }, []);

    const triggerAnimation = () => {
        scale.value = withSequence(
            withSpring(1.05),
            withSpring(1)
        );
    };

    return {
        scale,
        triggerAnimation
    };
};

export const useDownScaleAnimation = (initialScale = 1) => {
    const scale = useSharedValue(initialScale);

    const triggerAnimation = () => {
        scale.value = withSequence(
            withSpring(0.97),
            withSpring(1)
        );
    };

    return {
        scale,
        triggerAnimation
    };
};