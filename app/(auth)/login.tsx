import { router } from 'expo-router';
import { View, TextInput, KeyboardAvoidingView, Text, Platform, ScrollView } from 'react-native';
import { useSession } from '@/context/authContext';
import { useState, useRef } from 'react';
import PageTitle from '@/components/text/PageTitle';
import MainButton from '@/components/buttons/MainButton';
import ErrorMsg from '@/components/text/ErrorMsg';
import { getInputStyle, handleInputChange, handleEmailSubmit } from '@/scripts/formUtils';

export default function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [errorMsg, setErrorMsg] = useState('');
    const [isEmailFocused, setIsEmailFocused] = useState(false);
    const [isEmailError, setIsEmailError] = useState(false);
    const [isPasswordFocused, setIsPasswordFocused] = useState(false);
    const [isPasswordError, setIsPasswordError] = useState(false);
    const { login } = useSession();
    const scrollViewRef = useRef<ScrollView>(null);
    const passwordInputRef = useRef<TextInput>(null);

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
        } else {
            setErrorMsg('');
            setError(false);
        }
    };

    const handleLogin = () => {
        if (!email || !password) {
            setErrorMsg('Please put your email and password.');
            if (!email) setIsEmailError(true);
            if (!password) setIsPasswordError(true);
            return;
        }

        if (email && password) {
            login(email, password).then(() => {
                router.replace('/(app)/(tabs)');
                setErrorMsg('');
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
                <View className="flex-1 items-center gap-12 p-4 pt-20">
                    <PageTitle content='Login' />
                    <View className='flex justify-center items-center gap-8 w-full mt-48'>
                        <ErrorMsg content={errorMsg} display={errorMsg !== ''} />
                        <View className='flex flex-col gap-2 w-full justify-center items-center'>
                            <Text className='font-spacemono-bold text-lg'>Email</Text>
                            <TextInput
                                placeholder="john@doe.com"
                                inputMode='email'
                                autoComplete='email'
                                onFocus={() => handleInputFocus('email')}
                                onBlur={() => handleInputBlur('email', email)}
                                returnKeyType='next'
                                enablesReturnKeyAutomatically={true}
                                onSubmitEditing={() => handleEmailSubmit(email, setErrorMsg, setIsEmailError, passwordInputRef)}
                                autoCorrect={false}
                                placeholderTextColor='gray'
                                onChangeText={(text) => handleInputChange(text, setEmail, setErrorMsg)}
                                className={getInputStyle(isEmailError, isEmailFocused)}
                            />
                        </View>

                        <View className='flex flex-col gap-2 w-full justify-center items-center'>
                            <Text className='font-spacemono-bold text-lg'>Password</Text>
                            <TextInput 
                                placeholder="********" 
                                inputMode='text'
                                autoComplete='password'
                                ref={passwordInputRef}
                                autoCorrect={false}
                                secureTextEntry={true}
                                onFocus={() => handleInputFocus('password')}
                                onBlur={() => handleInputBlur('password', password)}
                                returnKeyType='done'
                                enablesReturnKeyAutomatically={true}
                                onSubmitEditing={() => {handleLogin()}}
                                placeholderTextColor='gray'
                                onChangeText={(text) => handleInputChange(text, setPassword, setErrorMsg)}
                                className={getInputStyle(isPasswordError, isPasswordFocused)}
                            />
                        </View>
                    </View>
                    <View className='flex gap-2 w-full justify-center items-center'>
                        <MainButton content='Login' backgroundColor='bg-primary' onPress={handleLogin} />
                        <MainButton content='Sign Up' backgroundColor='bg-gray-400' onPress={() => {
                            router.replace('/sign-up');
                        }} />
                    </View>
                </View>
            </ScrollView>
        </KeyboardAvoidingView>
    );
}
