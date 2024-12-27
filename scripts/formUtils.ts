import { TextInput } from "react-native";

export const getInputStyle = (isError: boolean, isFocused: boolean) => {
    return `bg-white rounded-md p-3 w-2/3 font-spacemono-bold ${
        isError ? 'border-2 border-red-500' : ''
    } ${isFocused ? 'border-2 border-primary' : ''}`;
};

export const handleInputChange = (
    text: string, 
    setter: (text: string) => void,
    setErrorMsg: (msg: string) => void
) => {
    setter(text);
    setErrorMsg('');
};

export const handleEmailSubmit = (
    email: string,
    setErrorMsg: (msg: string) => void,
    setIsEmailError: (isError: boolean) => void,
    passwordInputRef: React.RefObject<TextInput>
) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email || !emailRegex.test(email)) {
        setErrorMsg('Please put a valid email.');
        setIsEmailError(true);
        return;
    }
    passwordInputRef.current?.focus();
};