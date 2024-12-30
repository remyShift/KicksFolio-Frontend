import { checkBeforeNext } from '@/scripts/validatesForms';
import { ScrollView } from 'react-native';
import { RefObject } from 'react';

type InputType = 'username' | 'email' | 'password' | 'firstName' | 'lastName' | 'size' | 'gender';

type InputHandlerProps = {
    inputType: InputType;
    value?: string;
    setErrorMsg: (msg: string) => void;
    setFocusedStates: {[key: string]: (value: boolean) => void};
    setErrorStates: {[key: string]: (value: boolean) => void};
    scrollToBottom?: () => void;
}

export const scrollToBottom = (scrollViewRef: RefObject<ScrollView>) => {
    scrollViewRef.current?.scrollToEnd({ animated: true });
};

export const handleInputFocus = ({ 
    inputType, 
    setFocusedStates, 
    setErrorStates, 
    setErrorMsg, 
    scrollToBottom 
}: Omit<InputHandlerProps, 'value'>) => {
    Object.values(setErrorStates).forEach(setState => setState(false));
    
    Object.keys(setFocusedStates).forEach(key => {
        setFocusedStates[key](key === inputType);
    });
    
    setErrorMsg('');
    scrollToBottom?.();
};

export const handleInputBlur = ({ 
    inputType, 
    value, 
    setFocusedStates, 
    setErrorStates, 
    setErrorMsg 
}: InputHandlerProps) => {
    Object.keys(setFocusedStates).forEach(key => {
        setFocusedStates[key](false);
    });

    if (value && value.trim() !== '') {
        checkBeforeNext(value, inputType, false, setErrorMsg, setErrorStates[inputType], null);
    }
};