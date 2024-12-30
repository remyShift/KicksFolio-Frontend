import { router } from 'expo-router';
import { View, TextInput, KeyboardAvoidingView, Text, Platform, ScrollView } from 'react-native';
import { useAuthProps } from '@/context/AuthPropsContext';
import PageTitle from '@/components/text/PageTitle';
import MainButton from '@/components/buttons/MainButton';
import ErrorMsg from '@/components/text/ErrorMsg';
import { useState, useRef } from 'react';
import { checkUsername, checkEmail, checkPassword, checkBeforeNext } from '@/scripts/validatesForms';
import CustomTextInput from '@/components/inputs/CustomTextInput';


export default function SignUp() {
    const { signUpProps, setSignUpProps } = useAuthProps();
    const [errorMsg, setErrorMsg] = useState('');
    const [isUsernameFocused, setIsUsernameFocused] = useState(false);
    const [isUsernameError, setIsUsernameError] = useState(false);
    const [isEmailFocused, setIsEmailFocused] = useState(false);
    const [isEmailError, setIsEmailError] = useState(false);
    const [isPasswordFocused, setIsPasswordFocused] = useState(false);
    const [isPasswordError, setIsPasswordError] = useState(false);
    
    const scrollViewRef = useRef<ScrollView>(null);
    const usernameInputRef = useRef<TextInput>(null);
    const emailInputRef = useRef<TextInput>(null);
    const passwordInputRef = useRef<TextInput>(null);

    const handleNextSignUpPage = async () => {
        const isUsernameValid = await checkUsername(signUpProps.username, setErrorMsg, setIsUsernameError);
        const isEmailValid = await checkEmail(signUpProps.email, false, setErrorMsg, setIsEmailError);
        const isPasswordValid = checkPassword(signUpProps.password, setErrorMsg, setIsPasswordError);

        if (!isUsernameValid || !isEmailValid || !isPasswordValid) {
            setErrorMsg('Please correct your inputs before continuing');
            setIsUsernameError(true);
            setIsEmailError(true);
            setIsPasswordError(true);
            return;
        }

        setErrorMsg('');
        router.replace('/su-second');
    };

    return (
        <KeyboardAvoidingView 
            className="flex-1 bg-background" 
            behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
            keyboardVerticalOffset={Platform.OS === 'ios' ? 0 : 20}>
            <ScrollView 
                ref={scrollViewRef}
                className='flex-1'
                keyboardShouldPersistTaps="handled"
                scrollEnabled={isUsernameFocused || isEmailFocused || isPasswordFocused}>
                <View className="flex-1 items-center gap-12 p-4">
                    <PageTitle content='Sign Up' />
                    <View className='flex justify-center items-center gap-8 w-full mt-32'>
                        <ErrorMsg content={errorMsg} display={errorMsg !== ''} />
                        
                        <View className='flex flex-col gap-2 w-full justify-center items-center'>
                            <CustomTextInput
                                label="*Username"
                                isError={isUsernameError}
                                isFocused={isUsernameFocused}
                                inputRef={usernameInputRef}
                                placeholder="johndoe42"
                                value={signUpProps.username}
                                nextInputRef={emailInputRef}
                                autoComplete='username'
                                textContentType='username'
                                inputType='username'
                                setFocusedStates={{ username: setIsUsernameFocused }}
                                setErrorStates={{ username: setIsUsernameError }}
                                setErrorMsg={setErrorMsg}
                                scrollToBottom={() => scrollViewRef.current?.scrollToEnd({ animated: true })}
                                onSubmitEditing={() => checkBeforeNext(signUpProps.username, 'username', false, setErrorMsg, setIsUsernameError, emailInputRef)}
                            />
                        </View>

                        <View className='flex flex-col gap-2 w-full justify-center items-center'>
                            <CustomTextInput
                                label="*Email"
                                isError={isEmailError}
                                isFocused={isEmailFocused}
                                inputRef={emailInputRef}
                                placeholder="johndoe@gmail.com"
                                value={signUpProps.email}
                                autoComplete='email'
                                nextInputRef={passwordInputRef}
                                textContentType='emailAddress'
                                inputType='email'
                                setFocusedStates={{ email: setIsEmailFocused }}
                                setErrorStates={{ email: setIsEmailError }}
                                setErrorMsg={setErrorMsg}
                                scrollToBottom={() => scrollViewRef.current?.scrollToEnd({ animated: true })}
                                onSubmitEditing={() => checkBeforeNext(signUpProps.email, 'email', false, setErrorMsg, setIsEmailError, passwordInputRef)}
                            />
                        </View>

                        <View className='flex flex-col gap-2 w-full justify-center items-center'>
                            <CustomTextInput
                                label="*Password"
                                isError={isPasswordError}
                                isFocused={isPasswordFocused}
                                inputRef={passwordInputRef}
                                inputType='password'
                                value={signUpProps.password}
                                placeholder="********"
                                textContentType='newPassword'
                                passwordRules='{ "minLength": 8, "requiresUppercase": true, "requiresLowercase": true, "requiresNumeric": true }'
                                setFocusedStates={{ password: setIsPasswordFocused }}
                                setErrorStates={{ password: setIsPasswordError }}
                                setErrorMsg={setErrorMsg}
                                scrollToBottom={() => scrollViewRef.current?.scrollToEnd({ animated: true })}
                                onSubmitEditing={() => handleNextSignUpPage()}
                            />
                            <Text className='font-spacemono-bold text-sm text-center px-6 text-gray-600'>
                                At least 8 characters long with one uppercase letter and one number.
                            </Text>
                        </View>
                    </View>

                    <View className='flex gap-2 w-full justify-center items-center'>
                        <MainButton 
                            content='Next' 
                            backgroundColor='bg-primary' 
                            onPressAction={() => {
                                setTimeout(() => {
                                    handleNextSignUpPage();
                                }, 300);
                            }} 
                        />
                        <MainButton 
                            content='Login' 
                            backgroundColor='bg-gray-400' 
                            onPressAction={() => {
                                setTimeout(() => {
                                    router.replace('/login');
                                }, 300);
                            }} 
                        />
                    </View>
                </View>
            </ScrollView>
        </KeyboardAvoidingView>
    );
}
