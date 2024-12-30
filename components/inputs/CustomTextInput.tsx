import { TextInput, Text, View, TextInputProps } from 'react-native';
import { handleInputBlur, handleInputFocus } from '@/scripts/inputHandlers';
import { checkBeforeNext } from '@/scripts/validatesForms';
import { usePathname } from 'expo-router';
import { useState } from 'react';
type InputType = 'username' | 'email' | 'password' | 'firstName' | 'lastName' | 'size' | 'gender';

type CustomTextInputProps = TextInputProps & {
    label: string;
    inputRef?: React.RefObject<TextInput>;
    labelInfo?: string;
    inputType: InputType;
    value?: string;
    setErrorMsg: (msg: string) => void;
    scrollToBottom?: () => void;
    nextInputRef?: React.RefObject<TextInput>;
}

export default function CustomTextInput({
    label,
    inputRef,
    inputType,
    value,
    setErrorMsg,
    scrollToBottom,
    nextInputRef,
    ...props
}: CustomTextInputProps) {

    const isLoginPage = usePathname() === '/login';
    const [isError, setIsError] = useState(false);
    const [isFocused, setIsFocused] = useState(false);

    const defineInputMode = (label: string) => {
        switch (label) {
            case 'Email':
                return 'email';
            case 'Size (US)':
                return 'numeric';
            default:
                return 'text';
        }
    }

    const resetAllErrors = () => {
        setIsError(false);
        setErrorMsg('');
    };

    return (
        <View className='flex flex-col gap-2 w-full items-center'>
            <Text className='font-spacemono-bold'>{label}</Text>
            <TextInput
                ref={inputRef}
                placeholderTextColor='gray'
                clearButtonMode='while-editing'
                autoCorrect={false}
                inputMode={defineInputMode(label)}
                enablesReturnKeyAutomatically={true}
                secureTextEntry={label.toLowerCase().includes('password')}
                returnKeyType={nextInputRef ? 'next' : 'done'}
                className={`bg-white rounded-md p-3 w-2/3 font-spacemono-bold ${
                    isError ? 'border-2 border-red-500' : ''
                } ${isFocused ? 'border-2 border-primary' : ''}`}
                onFocus={() => handleInputFocus({
                    inputType,
                    setIsFocused,
                    setIsError,
                    setErrorMsg,
                    scrollToBottom,
                    resetAllErrors
                })}
                onBlur={() => handleInputBlur({
                    inputType,
                    value: value ?? '',
                    setIsFocused,
                    setIsError,
                    setErrorMsg
                })}
                onSubmitEditing={async () => {
                    const isValid = await checkBeforeNext(value ?? '', inputType, isLoginPage, setErrorMsg, setIsError, nextInputRef || null);
                    if (isValid && nextInputRef?.current) {
                        nextInputRef.current.focus();
                    }
                }}
                {...props}
            />
        </View>
    );
}