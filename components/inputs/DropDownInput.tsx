import { useState } from 'react';
import { View, Text, Pressable, ScrollView, TextInput } from 'react-native';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';

type DropdownInputProps = {
    value: string;
    onSelect: (value: string) => void;
    options: string[];
    placeholder: string;
    isError?: boolean;
    isFocused?: boolean;
};

export default function DropdownInput({ value, onSelect, options, placeholder, isError, isFocused }: DropdownInputProps) {
    const [isOpen, setIsOpen] = useState(false);
    const [isCustomInput, setIsCustomInput] = useState(false);

    const handleOptionSelect = (option: string) => {
        if (option === 'Other') {
            setIsCustomInput(true);
            onSelect('');
        } else {
            setIsCustomInput(false);
            onSelect(option);
        }
        setIsOpen(false);
    };

    return (
        <View className="w-2/3">
            {!isCustomInput ? (
                <Pressable
                    className={`bg-white rounded-md p-3 font-spacemono-bold flex-row justify-between items-center
                        ${isError ? 'border-2 border-red-500' : ''}
                        ${isFocused ? 'border-2 border-primary' : ''}`}
                    onPress={() => setIsOpen(!isOpen)}
                >
                    <Text className="font-spacemono-bold text-base">
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
                        value={value}
                        onChangeText={onSelect}
                        placeholder="Enter custom value"
                        className={`flex-1 bg-white rounded-md p-3 font-spacemono-bold
                            ${isError ? 'border-2 border-red-500' : ''}
                            ${isFocused ? 'border-2 border-primary' : ''}`}
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

            {isOpen && (
                <View className="absolute top-14 w-full bg-white rounded-md shadow-lg z-50 max-h-48">
                    <ScrollView>
                        {[...options, 'Other'].map((option) => (
                            <Pressable
                                key={option}
                                className="p-3 border-b border-gray-200"
                                onPress={() => handleOptionSelect(option)}
                            >
                                <Text className="font-spacemono">{option}</Text>
                            </Pressable>
                        ))}
                    </ScrollView>
                </View>
            )}
        </View>
    );
}