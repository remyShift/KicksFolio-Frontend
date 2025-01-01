import { useState } from 'react';
import { View, Text, Pressable, ScrollView, TextInput } from 'react-native';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import Animated, { 
    useAnimatedStyle, 
    withTiming, 
    useSharedValue,
    withSpring 
} from 'react-native-reanimated';

type DropdownInputProps = {
    value: string;
    onSelect: (value: string) => void;
    options: string[];
    placeholder: string;
    isError?: boolean;
    isFocused?: boolean;
    onOpen?: () => void;
    onBlur?: () => void;
    customInputRegex?: RegExp;
};

export default function DropdownInput({ 
    value, 
    onSelect, 
    options, 
    placeholder, 
    isError, 
    isFocused,
    onOpen,
    onBlur,
    customInputRegex
}: DropdownInputProps) {
    const [isOpen, setIsOpen] = useState(false);
    const [isCustomInput, setIsCustomInput] = useState(false);
    const [customValue, setCustomValue] = useState('');
    const dropdownHeight = useSharedValue(0);

    const handleOptionSelect = (option: string) => {
        if (option === 'Other') {
            setIsCustomInput(true);
            onSelect('');
        } else {
            setIsCustomInput(false);
            onSelect(option);
        }
        dropdownHeight.value = withTiming(0, { duration: 300 });
        setIsOpen(false);
        onBlur?.();
    };

    const handleCustomInputChange = (text: string) => {
        setCustomValue(text);
        if (customInputRegex && customInputRegex.test(text)) {
            onSelect(text);
        }
    };

    const toggleDropdown = () => {
        if (!isOpen) {
            onOpen?.();
            setIsOpen(true);
            dropdownHeight.value = withSpring(200, {
                damping: 15,
                stiffness: 100
            });
        } else {
            dropdownHeight.value = withTiming(0, { duration: 300 });
            setIsOpen(false);
        }
    };

    const animatedStyle = useAnimatedStyle(() => {
        return {
            maxHeight: dropdownHeight.value,
            opacity: dropdownHeight.value === 0 ? 0 : 1,
            overflow: 'hidden'
        };
    });

    const handleCustomInputFocus = () => {
        onOpen?.();
    };

    const handleCustomInputBlur = () => {
        onBlur?.();
    };

    return (
        <View className='w-3/5'>
            {!isCustomInput ? (
                <Pressable
                    className={`bg-white rounded-md p-2 font-spacemono-bold flex-row justify-between items-center
                        ${isError ? 'border-2 border-red-500' : ''}
                        ${isFocused ? 'border-2 border-primary' : ''}`}
                    onPress={toggleDropdown}
                >
                    <Text className="font-spacemono-bold-italic text-base">
                        {value || placeholder}
                    </Text>
                    <MaterialIcons 
                        name={isOpen ? "keyboard-arrow-up" : "keyboard-arrow-down"} 
                        size={24} 
                        color="black" 
                    />
                </Pressable>
            ) : (
                <View className="flex-row items-center gap-2">
                    <TextInput
                        value={customValue}
                        onChangeText={handleCustomInputChange}
                        placeholder="Enter a brand"
                        placeholderTextColor='gray'
                        onFocus={handleCustomInputFocus}
                        onBlur={handleCustomInputBlur}
                        className={`bg-white rounded-md p-2 w-[85%] font-spacemono-bold-italic ${
                            isError ? 'border-2 border-red-500' : ''
                        } ${isFocused ? 'border-2 border-primary' : ''}`}
                    />
                    <Pressable
                        onPress={() => {
                            setIsCustomInput(false);
                            onSelect('');
                        }}
                        className="rounded-md"
                    >
                        <MaterialIcons name="close" size={24} color="black" />
                    </Pressable>
                </View>
            )}

            <Animated.View 
                className="relative top-2 w-full bg-white rounded-md shadow-md z-50"
                style={animatedStyle}
            >
                <ScrollView 
                    nestedScrollEnabled={true}
                    className="max-h-48"
                >
                    {[...options, 'Other'].map((option) => (
                        <Pressable
                            key={option}
                            className="p-3 border-b border-gray-200"
                            onPress={() => handleOptionSelect(option)}
                        >
                            <Text className="font-spacemono-bold-italic">{option}</Text>
                        </Pressable>
                    ))}
                </ScrollView>
            </Animated.View>
        </View>
    );
}