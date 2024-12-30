import { router } from 'expo-router';
import { View, TextInput, Text, KeyboardAvoidingView, Platform, ScrollView } from 'react-native';
import { useAuthProps } from '@/context/AuthPropsContext';
import PageTitle from '@/components/text/PageTitle';
import MainButton from '@/components/buttons/MainButton';
import { useSession } from '@/context/authContext';
import ErrorMsg from '@/components/text/ErrorMsg';
import { useState, useRef } from 'react';
import { checkBeforeNext } from '@/scripts/validatesForms';
import CustomTextInput from '@/components/inputs/CustomTextInput';
        
export default function SUSecond() {
    const { signUpProps, setSignUpProps } = useAuthProps();
    const { signUp, login } = useSession();
    const [errorMsg, setErrorMsg] = useState('');
    
    const [isFirstNameFocused, setIsFirstNameFocused] = useState(false);
    const [isFirstNameError, setIsFirstNameError] = useState(false);
    const [isLastNameFocused, setIsLastNameFocused] = useState(false);
    const [isLastNameError, setIsLastNameError] = useState(false);
    const [isSizeFocused, setIsSizeFocused] = useState(false);
    const [isSizeError, setIsSizeError] = useState(false);
    const [isGenderFocused, setIsGenderFocused] = useState(false);
    const [isGenderError, setIsGenderError] = useState(false);

    const scrollViewRef = useRef<ScrollView>(null);
    const lastNameInputRef = useRef<TextInput>(null);
    const sizeInputRef = useRef<TextInput>(null);
    const genderInputRef = useRef<TextInput>(null);
    const firstNameInputRef = useRef<TextInput>(null);

    const handleSignUp = () => {
        if (!signUpProps.first_name) {
            setErrorMsg('Please put your first name.');
            setIsFirstNameError(true);
            return;
        }

        if (!signUpProps.last_name) {
            setErrorMsg('Please put your last name.');
            setIsLastNameError(true);
            return;
        }

        if (!signUpProps.sneaker_size || signUpProps.sneaker_size <= 0) {
            setErrorMsg('Please put a valid sneaker size.');
            setIsSizeError(true);
            return;
        }

        if (!signUpProps.gender || !['male', 'female', 'other'].includes(signUpProps.gender.toLowerCase())) {
            setErrorMsg('Please put a valid gender (Male/Female/Other).');
            setIsGenderError(true);
            return;
        }

        console.log(signUpProps);

        setErrorMsg('');
        signUp(
            signUpProps.email,
            signUpProps.password,
            signUpProps.username,
            signUpProps.first_name,
            signUpProps.last_name,
            signUpProps.sneaker_size,
            signUpProps.gender
        ).then(() => {
            login(signUpProps.email, signUpProps.password).then(() => {
                setSignUpProps({ ...signUpProps, email: '', password: '', username: '', first_name: '', last_name: '', sneaker_size: 0, gender: '' });
                router.replace('/collection');
            }).catch((error) => {
                setErrorMsg(`Something went wrong. Please try again 1. ${error}`);
            });
        }).catch((error) => {
            setErrorMsg(`Something went wrong. Please try again 2. ${error}`);
        });
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
                scrollEnabled={isFirstNameFocused || isLastNameFocused || isSizeFocused || isGenderFocused}>
                <View className="flex-1 items-center gap-12 p-4">
                    <PageTitle content='Sign Up' />
                    <View className='flex gap-6 justify-center items-center w-full mt-20'>
                        <ErrorMsg content={errorMsg} display={errorMsg !== ''} />
                        
                        <View className='flex flex-col gap-2 w-full justify-center items-center'>
                            <CustomTextInput
                                label="*First Name"
                                inputRef={firstNameInputRef}
                                placeholder="John"
                                textContentType='givenName'
                                clearButtonMode='while-editing'
                                value={signUpProps.first_name}
                                autoComplete={Platform.OS === 'ios' ? 'cc-name' : 'name-given'}
                                inputType='firstName'
                                setErrorMsg={setErrorMsg}
                                scrollToBottom={() => scrollViewRef.current?.scrollToEnd({ animated: true })}
                                onSubmitEditing={() => checkBeforeNext(signUpProps.first_name, 'firstName', false, setErrorMsg, setIsFirstNameError, lastNameInputRef)}
                                nextInputRef={lastNameInputRef}
                            />
                        </View>

                        <View className='flex flex-col gap-2 w-full justify-center items-center'>
                            <CustomTextInput
                                label="*Last Name"
                                inputRef={lastNameInputRef}
                                placeholder="Doe"
                                textContentType='familyName'
                                value={signUpProps.last_name}
                                autoComplete={Platform.OS === 'ios' ? 'cc-family-name' : 'name-family'}
                                clearButtonMode='while-editing'
                                inputType='lastName'
                                setErrorMsg={setErrorMsg}
                                nextInputRef={sizeInputRef}
                                scrollToBottom={() => scrollViewRef.current?.scrollToEnd({ animated: true })}
                                onSubmitEditing={() => checkBeforeNext(signUpProps.last_name, 'lastName', false, setErrorMsg, setIsLastNameError, sizeInputRef)}
                            />
                        </View>

                        <View className='flex flex-col gap-2 w-full justify-center items-center'>
                            <CustomTextInput
                                label="*Sneaker Size (US)"
                                inputRef={sizeInputRef}
                                placeholder="11"
                                value={signUpProps.sneaker_size ? String(signUpProps.sneaker_size) : ''}
                                autoComplete='off'
                                keyboardType='numeric'
                                clearButtonMode='while-editing'
                                inputType='size'
                                setErrorMsg={setErrorMsg}
                                nextInputRef={genderInputRef}
                                scrollToBottom={() => scrollViewRef.current?.scrollToEnd({ animated: true })}
                                onSubmitEditing={() => checkBeforeNext(String(signUpProps.sneaker_size), 'size', false, setErrorMsg, setIsSizeError, genderInputRef)}
                            />
                        </View>

                        <View className='flex flex-col gap-2 w-full justify-center items-center'>
                            <CustomTextInput
                                label="*Gender"
                                inputType='gender'
                                setErrorMsg={setErrorMsg}
                                scrollToBottom={() => scrollViewRef.current?.scrollToEnd({ animated: true })}
                                inputRef={genderInputRef}
                                placeholder="Male / Female / Other"
                                value={signUpProps.gender}
                                autoComplete='off'
                                clearButtonMode='while-editing'
                                returnKeyType='done'
                                onSubmitEditing={handleSignUp}
                            />
                        </View>             
                    </View>

                    <View className='flex gap-2 w-full justify-center items-center'>
                        <MainButton 
                            content='Sign Up' 
                            backgroundColor='bg-primary' 
                            onPressAction={() => {
                                setTimeout(() => {
                                    handleSignUp();
                                }, 300);
                            }}
                        />
                        <MainButton 
                            content='Back' 
                            backgroundColor='bg-gray-400' 
                            onPressAction={() => {
                                setTimeout(() => {
                                    router.replace('/sign-up');
                                }, 300);
                            }} 
                        />
                    </View>
                </View>
            </ScrollView>
        </KeyboardAvoidingView>
    );
}
