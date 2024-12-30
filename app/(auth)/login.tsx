import { router } from 'expo-router';
import { View, TextInput, KeyboardAvoidingView, Platform, ScrollView } from 'react-native';
import { useState, useRef, useEffect } from 'react';
import PageTitle from '@/components/text/PageTitle';
import MainButton from '@/components/buttons/MainButton';
import ErrorMsg from '@/components/text/ErrorMsg';
import CustomTextInput from '@/components/inputs/CustomTextInput';
import { handleLogin } from '@/scripts/handleSession';
import { useAuthProps } from '@/context/AuthPropsContext';
import { useSession } from '@/context/authContext';

export default function Login() {
    const { login, userCollection } = useSession();
    const { loginProps, setLoginProps } = useAuthProps();
    const [errorMsg, setErrorMsg] = useState('');
    const [isEmailFocused, setIsEmailFocused] = useState(false);
    const [isEmailError, setIsEmailError] = useState(false);
    const [isPasswordFocused, setIsPasswordFocused] = useState(false);
    const [isPasswordError, setIsPasswordError] = useState(false);

    const scrollViewRef = useRef<ScrollView>(null);
    const passwordInputRef = useRef<TextInput>(null);
    const emailInputRef = useRef<TextInput>(null);

    useEffect(() => {
        console.log("loginProps mis à jour :", loginProps);
    }, [loginProps]);

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
                            <CustomTextInput
                                label="Email"
                                isError={isEmailError}
                                isFocused={isEmailFocused}
                                inputRef={emailInputRef}
                                inputType="email"
                                value={loginProps.email}
                                placeholder="john@doe.com"
                                textContentType='emailAddress'
                                autoComplete='email'
                                setFocusedStates={{ email: setIsEmailFocused }}
                                setErrorStates={{ email: setIsEmailError }}
                                setErrorMsg={setErrorMsg}
                                scrollToBottom={() => scrollViewRef.current?.scrollToEnd({ animated: true })}
                                nextInputRef={passwordInputRef}
                                onChangeText={(text) => {
                                    setLoginProps({ ...loginProps, email: text });
                                    setErrorMsg('');
                                }}
                            />
                        </View>

                        <View className='flex flex-col gap-2 w-full justify-center items-center'>
                        <CustomTextInput
                            label="Password"
                            isError={isPasswordError}
                            isFocused={isPasswordFocused}
                            inputRef={passwordInputRef}
                            inputType="password"
                            value={loginProps.password}
                            placeholder="********" 
                            textContentType='password'
                            autoComplete='current-password'
                            setFocusedStates={{ password: setIsPasswordFocused }}
                            setErrorStates={{ password: setIsPasswordError }}
                            setErrorMsg={setErrorMsg}
                            scrollToBottom={() => scrollViewRef.current?.scrollToEnd({ animated: true })}
                            onSubmitEditing={() => handleLogin({
                                email: loginProps.email, 
                                password: loginProps.password, 
                                setErrorMsg, 
                                setIsEmailError, 
                                setIsPasswordError, 
                                login, 
                                userCollection 
                            })}
                            onChangeText={(text) => {
                                setLoginProps({ ...loginProps, password: text });
                                setErrorMsg('');
                            }}
                        />
                        </View>
                    </View>
                    <View className='flex gap-2 w-full justify-center items-center'>
                        <MainButton 
                            content='Login' 
                            backgroundColor='bg-primary'
                            onPressAction={async () => {
                                console.log("loginProps.email :", loginProps.email);
                                console.log("loginProps.password :", loginProps.password);
                                await handleLogin({
                                    email: loginProps.email, 
                                    password: loginProps.password, 
                                    setErrorMsg, 
                                    setIsEmailError, 
                                    setIsPasswordError,
                                    login,
                                    userCollection
                                });
                            }} 
                        />
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
