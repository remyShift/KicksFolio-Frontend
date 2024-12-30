import { checkBeforeNext } from '@/scripts/validatesForms';
import { ScrollView } from 'react-native';
import { RefObject } from 'react';

type InputType = 'username' | 'email' | 'password' | 'firstName' | 'lastName' | 'size' | 'gender';

type InputHandlerProps = {
    inputType: InputType;
    value?: string;
    setErrorMsg: (msg: string) => void;
    setIsFocused: (value: boolean) => void;
    setIsError: (value: boolean) => void;
    scrollToBottom?: () => void;
    resetAllErrors?: () => void;
}

export const scrollToBottom = (scrollViewRef: RefObject<ScrollView>) => {
    scrollViewRef.current?.scrollToEnd({ animated: true });
};

export const handleInputFocus = ({ 
    inputType, 
    setIsFocused, 
    setIsError, 
    setErrorMsg, 
    scrollToBottom,
    resetAllErrors 
}: Omit<InputHandlerProps, 'value'>) => {
    resetAllErrors?.();

    setIsError(false);
    setIsFocused(true);
    setErrorMsg('');
    
    
    scrollToBottom?.();
};

export const handleInputBlur = ({ 
    inputType, 
    value, 
    setIsFocused, 
    setIsError, 
    setErrorMsg 
}: InputHandlerProps) => {
    setIsFocused(false);

    if (!value) {
        setErrorMsg('This field is required');
        setIsError(true);
        return;
    }

    if (value && value.trim() !== '') {
        checkBeforeNext(value, inputType, false, setErrorMsg, setIsError, null);
    }
};