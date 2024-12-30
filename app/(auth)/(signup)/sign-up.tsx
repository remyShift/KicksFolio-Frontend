import { router } from 'expo-router';
import { View, TextInput, KeyboardAvoidingView, Text, Platform, ScrollView } from 'react-native';
import { useSignUpProps } from '@/context/signUpPropsContext';
import PageTitle from '@/components/text/PageTitle';
import MainButton from '@/components/buttons/MainButton';
import ErrorMsg from '@/components/text/ErrorMsg';
import { useState, useRef } from 'react';
import { handleInputChange, checkUsername, checkEmail, checkPassword, checkBeforeNext } from '@/scripts/formUtils';

export default function SignUp() {
    const { signUpProps, setSignUpProps } = useSignUpProps();
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

    const scrollToBottom = () => {
        scrollViewRef.current?.scrollToEnd({ animated: true });
    };

    const handleInputFocus = (inputType: 'username' | 'email' | 'password') => {
        if (inputType === 'username') {
            setIsUsernameFocused(true);
        } else if (inputType === 'email') {
            setIsEmailFocused(true);
        } else if (inputType === 'password') {
            setIsPasswordFocused(true);
        }
        setIsUsernameError(false);
        setIsEmailError(false);
        setIsPasswordError(false);
        setErrorMsg('');
        scrollToBottom();
    };

    const handleInputBlur = (inputType: 'username' | 'email' | 'password', value: string) => {
        if (inputType === 'username') {
            setIsUsernameFocused(false);
            checkUsername(value, setErrorMsg, setIsUsernameError);
        } else if (inputType === 'email') {
            setIsEmailFocused(false);
            checkEmail(value, false, setErrorMsg, setIsEmailError);
        } else if (inputType === 'password') {
            setIsPasswordFocused(false);
            checkPassword(value, setErrorMsg, setIsPasswordError);
        }
    };

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
                <View className="flex-1 items-center gap-12 p-4 pt-20">
                    <PageTitle content='Sign Up' />
                    <View className='flex justify-center items-center gap-8 w-full mt-32'>
                        <ErrorMsg content={errorMsg} display={errorMsg !== ''} />
                        
                        <View className='flex flex-col gap-2 w-full justify-center items-center'>
                            <Text className='font-spacemono-bold text-lg'>*Username</Text>
                            <TextInput
                                placeholder="johndoe42"
                                inputMode='text'
                                ref={usernameInputRef}
                                value={signUpProps.username}
                                autoComplete='username'
                                textContentType='username'
                                clearButtonMode='while-editing'
                                autoCorrect={false}
                                placeholderTextColor='gray'
                                returnKeyType='next'
                                enablesReturnKeyAutomatically={true}
                                onSubmitEditing={() => checkBeforeNext(signUpProps.username, 'username', false, setErrorMsg, setIsUsernameError, emailInputRef)}
                                onFocus={() => handleInputFocus('username')}
                                onBlur={() => handleInputBlur('username', signUpProps.username)}
                                onChangeText={(text) => {
                                    setSignUpProps({ ...signUpProps, username: text });
                                    handleInputChange(text, (t) => setSignUpProps({ ...signUpProps, username: t }), setErrorMsg);
                                }}
                                className={`bg-white rounded-md p-3 w-2/3 font-spacemono-bold ${
                                    isUsernameError ? 'border-2 border-red-500' : ''
                                } ${isUsernameFocused ? 'border-2 border-primary' : ''}`}
                            />
                        </View>

                        <View className='flex flex-col gap-2 w-full justify-center items-center'>
                            <Text className='font-spacemono-bold text-lg'>*Email</Text>
                            <TextInput
                                ref={emailInputRef}
                                placeholder="johndoe@gmail.com"
                                inputMode='email'
                                value={signUpProps.email}
                                autoComplete='email'
                                textContentType='emailAddress'
                                autoCorrect={false}
                                placeholderTextColor='gray'
                                clearButtonMode='while-editing'
                                returnKeyType='next'
                                enablesReturnKeyAutomatically={true}
                                onSubmitEditing={() => checkBeforeNext(signUpProps.email, 'email', false, setErrorMsg, setIsEmailError, passwordInputRef)}
                                onFocus={() => handleInputFocus('email')}
                                onBlur={() => handleInputBlur('email', signUpProps.email)}
                                onChangeText={(text) => {
                                    setSignUpProps({ ...signUpProps, email: text });
                                    handleInputChange(text, (t) => setSignUpProps({ ...signUpProps, email: t }), setErrorMsg);
                                }}
                                className={`bg-white rounded-md p-3 w-2/3 font-spacemono-bold ${
                                    isEmailError ? 'border-2 border-red-500' : ''
                                } ${isEmailFocused ? 'border-2 border-primary' : ''}`}
                            />
                        </View>

                        <View className='flex flex-col gap-2 w-full justify-center items-center'>
                            <Text className='font-spacemono-bold text-lg'>*Password</Text>
                            <Text className='font-spacemono-bold text-sm text-center px-6 text-gray-600'>
                                At least one uppercase letter and one number and be 8 characters long.
                            </Text>
                            <TextInput
                                ref={passwordInputRef}
                                value={signUpProps.password}
                                placeholder="********"
                                inputMode='text'
                                textContentType='newPassword'
                                passwordRules='{ "minLength": 8, "requiresUppercase": true, "requiresLowercase": true, "requiresNumeric": true }'
                                clearButtonMode='while-editing'
                                autoCorrect={false}
                                secureTextEntry={true}
                                placeholderTextColor='gray'
                                returnKeyType='done'
                                enablesReturnKeyAutomatically={true}
                                onSubmitEditing={handleNextSignUpPage}
                                onFocus={() => handleInputFocus('password')}
                                onBlur={() => handleInputBlur('password', signUpProps.password)}
                                onChangeText={(text) => {
                                    setSignUpProps({ ...signUpProps, password: text });
                                    handleInputChange(text, (t) => setSignUpProps({ ...signUpProps, password: t }), setErrorMsg);
                                }}
                                className={`bg-white rounded-md p-3 w-2/3 font-spacemono-bold ${
                                    isPasswordError ? 'border-2 border-red-500' : ''
                                } ${isPasswordFocused ? 'border-2 border-primary' : ''}`}
                            />
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
