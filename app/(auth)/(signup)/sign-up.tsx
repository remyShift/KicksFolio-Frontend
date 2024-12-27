import { router } from 'expo-router';
import { View, TextInput, KeyboardAvoidingView, Text, Platform, ScrollView } from 'react-native';
import { useSignUpProps } from '@/context/signUpPropsContext';
import PageTitle from '@/components/text/PageTitle';
import MainButton from '@/components/buttons/MainButton';
import ErrorMsg from '@/components/text/ErrorMsg';
import { useState, useRef } from 'react';
import { getInputStyle, handleInputChange } from '@/scripts/formUtils';

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
        } else {
            setIsPasswordFocused(true);
        }
        setIsUsernameError(false);
        setIsEmailError(false);
        setIsPasswordError(false);
        setErrorMsg('');
        scrollToBottom();
    };

    const handleInputBlur = (inputType: 'username' | 'email' | 'password', value: string) => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        
        if (inputType === 'username') {
            setIsUsernameFocused(false);
            if (!value) {
                setErrorMsg('Please put your username.');
                setIsUsernameError(true);
            }
        } else if (inputType === 'email') {
            setIsEmailFocused(false);
            if (!value) {
                setErrorMsg('Please put your email.');
                setIsEmailError(true);
            } else if (!emailRegex.test(value)) {
                setErrorMsg('Please put a valid email.');
                setIsEmailError(true);
            }
        } else {
            setIsPasswordFocused(false);
            if (!value) {
                setErrorMsg('Please put your password.');
                setIsPasswordError(true);
            }
        }
    };

    const handleNext = () => {
        if (!signUpProps.username) {
            setErrorMsg('Please put your username.');
            setIsUsernameError(true);
            return;
        }

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!signUpProps.email || !emailRegex.test(signUpProps.email)) {
            setErrorMsg('Please put a valid email.');
            setIsEmailError(true);
            return;
        }

        if (!signUpProps.password) {
            setErrorMsg('Please put your password.');
            setIsPasswordError(true);
            return;
        }

        if (!signUpProps.password.match(/^(?=.*[A-Z])(?=.*\d).+$/) || signUpProps.password.length < 8) {
            setErrorMsg('Password must follow the rules.');
            setIsPasswordError(true);
            return;
        }

        setErrorMsg('');
        router.replace('/su-second');
    };

    const handleEmailSubmit = (email: string) => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!email || !emailRegex.test(email)) {
            setErrorMsg('Please put a valid email.');
            setIsEmailError(true);
            return false;
        }
        return true;
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
                                value={signUpProps.username}
                                autoComplete='username'
                                autoCorrect={false}
                                placeholderTextColor='gray'
                                returnKeyType='next'
                                enablesReturnKeyAutomatically={true}
                                onSubmitEditing={() => emailInputRef.current?.focus()}
                                onFocus={() => handleInputFocus('username')}
                                onBlur={() => handleInputBlur('username', signUpProps.username)}
                                onChangeText={(text) => {
                                    setSignUpProps({ ...signUpProps, username: text });
                                    handleInputChange(text, (t) => setSignUpProps({ ...signUpProps, username: t }), setErrorMsg);
                                }}
                                className={getInputStyle(isUsernameError, isUsernameFocused)}
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
                                autoCorrect={false}
                                placeholderTextColor='gray'
                                returnKeyType='next'
                                enablesReturnKeyAutomatically={true}
                                onSubmitEditing={() => {
                                    if (handleEmailSubmit(signUpProps.email)) {
                                        passwordInputRef.current?.focus();
                                    }
                                }}
                                onFocus={() => handleInputFocus('email')}
                                onBlur={() => handleInputBlur('email', signUpProps.email)}
                                onChangeText={(text) => {
                                    setSignUpProps({ ...signUpProps, email: text });
                                    handleInputChange(text, (t) => setSignUpProps({ ...signUpProps, email: t }), setErrorMsg);
                                }}
                                className={getInputStyle(isEmailError, isEmailFocused)}
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
                                autoComplete='password'
                                autoCorrect={false}
                                secureTextEntry={true}
                                placeholderTextColor='gray'
                                returnKeyType='done'
                                enablesReturnKeyAutomatically={true}
                                onSubmitEditing={handleNext}
                                onFocus={() => handleInputFocus('password')}
                                onBlur={() => handleInputBlur('password', signUpProps.password)}
                                onChangeText={(text) => {
                                    setSignUpProps({ ...signUpProps, password: text });
                                    handleInputChange(text, (t) => setSignUpProps({ ...signUpProps, password: t }), setErrorMsg);
                                }}
                                className={getInputStyle(isPasswordError, isPasswordFocused)}
                            />
                        </View>
                    </View>

                    <View className='flex gap-2 w-full justify-center items-center'>
                        <MainButton 
                            content='Next' 
                            backgroundColor='bg-primary' 
                            onPress={handleNext} 
                        />
                        <MainButton 
                            content='Login' 
                            backgroundColor='bg-gray-400' 
                            onPress={() => router.replace('/login')} 
                        />
                    </View>
                </View>
            </ScrollView>
        </KeyboardAvoidingView>
    );
}
