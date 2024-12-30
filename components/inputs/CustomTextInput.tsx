import { TextInput, Text, View, TextInputProps } from 'react-native';
import { handleInputBlur, handleInputFocus } from '@/scripts/inputHandlers';
import { checkBeforeNext } from '@/scripts/validatesForms';
import { usePathname } from 'expo-router';

type InputType = 'username' | 'email' | 'password' | 'firstName' | 'lastName' | 'size' | 'gender';

type CustomTextInputProps = TextInputProps & {
    label: string;
    isError: boolean;
    isFocused: boolean;
    inputRef?: React.RefObject<TextInput>;
    labelInfo?: string;
    inputType: InputType;
    value?: string;
    setFocusedStates: { [key: string]: (value: boolean) => void };
    setErrorStates: { [key: string]: (value: boolean) => void };
    setErrorMsg: (msg: string) => void;
    scrollToBottom?: () => void;
    nextInputRef?: React.RefObject<TextInput>;
}

export default function CustomTextInput({
    label,
    isError,
    isFocused,
    inputRef,
    inputType,
    value,
    setFocusedStates,
    setErrorStates,
    setErrorMsg,
    scrollToBottom,
    nextInputRef,
    ...props
}: CustomTextInputProps) {

    const isLoginPage = usePathname() === '/login';

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
                    setFocusedStates,
                    setErrorStates,
                    setErrorMsg,
                    scrollToBottom
                })}
                onBlur={() => handleInputBlur({
                    inputType,
                    value: value ?? '',
                    setFocusedStates,
                    setErrorStates,
                    setErrorMsg
                })}
                onSubmitEditing={async () => {
                    const isValid = await checkBeforeNext(value ?? '', inputType, isLoginPage, setErrorMsg, setErrorStates[inputType], nextInputRef || null);
                    if (isValid && nextInputRef?.current) {
                        nextInputRef.current.focus();
                    }
                }}
                {...props}
            />
        </View>
    );
}