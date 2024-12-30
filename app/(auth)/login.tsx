import { router } from 'expo-router';
import { View, TextInput, KeyboardAvoidingView, Text, Platform, ScrollView } from 'react-native';
import { useSession } from '@/context/authContext';
import { useState, useRef } from 'react';
import PageTitle from '@/components/text/PageTitle';
import MainButton from '@/components/buttons/MainButton';
import ErrorMsg from '@/components/text/ErrorMsg';
import { handleInputChange, checkBeforeNext } from '@/scripts/formUtils';

export default function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [errorMsg, setErrorMsg] = useState('');
    const [isEmailFocused, setIsEmailFocused] = useState(false);
    const [isEmailError, setIsEmailError] = useState(false);
    const [isPasswordFocused, setIsPasswordFocused] = useState(false);
    const [isPasswordError, setIsPasswordError] = useState(false);

    const { login, userCollection } = useSession();

    const scrollViewRef = useRef<ScrollView>(null);
    const passwordInputRef = useRef<TextInput>(null);
    const emailInputRef = useRef<TextInput>(null);

    const scrollToBottom = () => {
        scrollViewRef.current?.scrollToEnd({ animated: true });
    };

    const handleInputFocus = (inputType: 'email' | 'password') => {
        if (inputType === 'email') {
            setIsEmailFocused(true);
        } else {
            setIsPasswordFocused(true);
        }
        setIsEmailError(false);
        setIsPasswordError(false);
        setErrorMsg('');
        scrollToBottom();
    };

    const handleInputBlur = (inputType: 'email' | 'password', value: string) => {
        const isEmail = inputType === 'email';
        const setFocused = isEmail ? setIsEmailFocused : setIsPasswordFocused;
        const setError = isEmail ? setIsEmailError : setIsPasswordError;
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        const errorMessage = isEmail ? 'Please put your email.' : 'Please put your password.';

        setFocused(false);
        if (!value) {
            setErrorMsg(errorMessage);
            setError(true);
        } else if (isEmail && !emailRegex.test(value)) {
            setErrorMsg('Please put a valid email.');
            setError(true);
        } else if (isEmail && emailRegex.test(value)) {
            setErrorMsg('');
            setError(false);
        }
    };

    const handleLogin = async () => {
        if (!email || !password) {
            setErrorMsg('Please put your email and password.');
            if (!email) setIsEmailError(true);
            if (!password) setIsPasswordError(true);
            return;
        }

        if (email && password) {
            await login(email, password).then(() => {
                setErrorMsg('');
                if (!userCollection?.name) {
                    router.replace('/collection');
                } else {
                    router.replace('/(app)/(tabs)');
                }
            }).catch((error) => {
                setErrorMsg('Invalid email or password.');
                setIsEmailError(true);
                setIsPasswordError(true);
            });
        }
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
                scrollEnabled={isEmailFocused || isPasswordFocused}>
                <View className="flex-1 items-center gap-12 p-4">
                    <PageTitle content='Login' />
                    <View className='flex justify-center items-center gap-8 w-full mt-48'>
                        <ErrorMsg content={errorMsg} display={errorMsg !== ''} />
                        <View className='flex flex-col gap-2 w-full justify-center items-center'>
                            <Text className='font-spacemono-bold text-lg'>Email</Text>
                            <TextInput
                                placeholder="john@doe.com"
                                ref={emailInputRef}
                                inputMode='email'
                                autoComplete='email'
                                textContentType='emailAddress'
                                clearButtonMode='while-editing'
                                onFocus={() => handleInputFocus('email')}
                                onBlur={() => handleInputBlur('email', email)}
                                returnKeyType='next'
                                enablesReturnKeyAutomatically={true}
                                onSubmitEditing={() => checkBeforeNext(email, 'email', true, setErrorMsg, setIsEmailError, passwordInputRef)}
                                autoCorrect={false}
                                placeholderTextColor='gray'
                                onChangeText={(text) => handleInputChange(text, setEmail, setErrorMsg)}
                                className={`bg-white rounded-md p-3 w-2/3 font-spacemono-bold ${
                                    isEmailError ? 'border-2 border-red-500' : ''
                                } ${isEmailFocused ? 'border-2 border-primary' : ''}`}
                            />
                        </View>

                        <View className='flex flex-col gap-2 w-full justify-center items-center'>
                            <Text className='font-spacemono-bold text-lg'>Password</Text>
                            <TextInput 
                                placeholder="********" 
                                ref={passwordInputRef}
                                inputMode='text'
                                textContentType='password'
                                autoComplete='current-password'
                                clearButtonMode='while-editing'
                                autoCorrect={false}
                                secureTextEntry={true}
                                onFocus={() => handleInputFocus('password')}
                                onBlur={() => handleInputBlur('password', password)}
                                returnKeyType='done'
                                enablesReturnKeyAutomatically={true}
                                onSubmitEditing={() => handleLogin()}
                                placeholderTextColor='gray'
                                onChangeText={(text) => handleInputChange(text, setPassword, setErrorMsg)}
                                className={`bg-white rounded-md p-3 w-2/3 font-spacemono-bold ${
                                    isPasswordError ? 'border-2 border-red-500' : ''
                                } ${isPasswordFocused ? 'border-2 border-primary' : ''}`}
                            />
                        </View>
                    </View>
                    <View className='flex gap-2 w-full justify-center items-center'>
                        <MainButton content='Login' backgroundColor='bg-primary' onPressAction={() => {
                            setTimeout(() => {
                                handleLogin();
                            }, 300);
                        }} />
                        <MainButton content='Sign Up' backgroundColor='bg-gray-400' onPressAction={() => {
                            setTimeout(() => {
                                router.replace('/sign-up');
                            }, 300);
                        }} />
                    </View>
                </View>
            </ScrollView>
        </KeyboardAvoidingView>
    );
}
