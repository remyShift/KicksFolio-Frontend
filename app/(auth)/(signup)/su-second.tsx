import { router } from 'expo-router';
import { View, TextInput, Text, KeyboardAvoidingView, Platform, ScrollView } from 'react-native';
import { useSignUpProps } from '@/context/signUpPropsContext';
import PageTitle from '@/components/text/PageTitle';
import MainButton from '@/components/buttons/MainButton';
import { useSession } from '@/context/authContext';
import ErrorMsg from '@/components/text/ErrorMsg';
import { useState, useRef } from 'react';
import { handleInputChange, checkBeforeNext, checkName, checkSize, checkGender } from '@/scripts/formUtils';

export default function SUSecond() {
    const { signUpProps, setSignUpProps } = useSignUpProps();
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

    const scrollToBottom = () => {
        scrollViewRef.current?.scrollToEnd({ animated: true });
    };

    const handleInputFocus = (inputType: 'firstName' | 'lastName' | 'size' | 'gender') => {
        if (inputType === 'firstName') setIsFirstNameFocused(true);
        else if (inputType === 'lastName') setIsLastNameFocused(true);
        else if (inputType === 'size') setIsSizeFocused(true);
        else setIsGenderFocused(true);

        setIsFirstNameError(false);
        setIsLastNameError(false);
        setIsSizeError(false);
        setIsGenderError(false);
        setErrorMsg('');
        scrollToBottom();
    };

    const handleInputBlur = (inputType: 'firstName' | 'lastName' | 'size' | 'gender', value: string) => {
        if (inputType === 'firstName') {
            setIsFirstNameFocused(false);
            if (!value) {
                setErrorMsg('Please put your first name.');
                setIsFirstNameError(true);
            } else if (!checkName(value, setErrorMsg, setIsFirstNameError)) {
                return;
            }
        } else if (inputType === 'lastName') {
            setIsLastNameFocused(false);
            if (!value) {
                setErrorMsg('Please put your last name.');
                setIsLastNameError(true);
            } else if (!checkName(value, setErrorMsg, setIsLastNameError)) {
                return;
            }
        } else if (inputType === 'size') {
            setIsSizeFocused(false);
            if (!value || isNaN(Number(value)) || Number(value) <= 0) {
                setErrorMsg('Please put a valid sneaker size.');
                setIsSizeError(true);
            } else if (!checkSize(Number(value), setErrorMsg, setIsSizeError)) {
                return;
            }
        } else {
            setIsGenderFocused(false);
            if (!value || !['male', 'female', 'other'].includes(value.toLowerCase())) {
                setErrorMsg('Please put a valid gender (Male/Female/Other).');
                setIsGenderError(true);
            } else if (!checkGender(value, setErrorMsg, setIsGenderError)) {
                return;
            }
        }
    };

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
                        <View className="absolute w-full flex items-center" style={{ top: -50 }}>
                            <ErrorMsg content={errorMsg} display={errorMsg !== ''} />
                        </View>
                        
                        <View className='flex flex-col gap-2 w-full justify-center items-center'>
                            <Text className='font-spacemono-bold text-lg'>*First Name</Text>
                            <TextInput
                                placeholder="John"
                                inputMode='text'
                                textContentType='givenName'
                                clearButtonMode='while-editing'
                                ref={firstNameInputRef}
                                value={signUpProps.first_name}
                                autoComplete={Platform.OS === 'ios' ? 'cc-name' : 'name-given'}
                                autoCorrect={false}
                                placeholderTextColor='gray'
                                returnKeyType='next'
                                enablesReturnKeyAutomatically={true}
                                onSubmitEditing={() => checkBeforeNext(signUpProps.first_name, 'firstName', false, setErrorMsg, setIsFirstNameError, lastNameInputRef)}
                                onFocus={() => handleInputFocus('firstName')}
                                onBlur={() => handleInputBlur('firstName', signUpProps.first_name)}
                                onChangeText={(text) => {
                                    setSignUpProps({ ...signUpProps, first_name: text });
                                    handleInputChange(text, (t) => setSignUpProps({ ...signUpProps, first_name: t }), setErrorMsg);
                                }}
                                className={`bg-white rounded-md p-3 w-2/3 font-spacemono-bold ${
                                    isFirstNameError ? 'border-2 border-red-500' : ''
                                } ${isFirstNameFocused ? 'border-2 border-primary' : ''}`}
                            />
                        </View>

                        <View className='flex flex-col gap-2 w-full justify-center items-center'>
                            <Text className='font-spacemono-bold text-lg'>*Last Name</Text>
                            <TextInput
                                placeholder="Doe"
                                inputMode='text'
                                textContentType='familyName'
                                ref={lastNameInputRef}
                                value={signUpProps.last_name}
                                autoComplete={Platform.OS === 'ios' ? 'cc-family-name' : 'name-family'}
                                autoCorrect={false}
                                placeholderTextColor='gray'
                                clearButtonMode='while-editing'
                                returnKeyType='next'
                                enablesReturnKeyAutomatically={true}
                                onSubmitEditing={() => checkBeforeNext(signUpProps.last_name, 'lastName', false, setErrorMsg, setIsLastNameError, sizeInputRef)}
                                onFocus={() => handleInputFocus('lastName')}
                                onBlur={() => handleInputBlur('lastName', signUpProps.last_name)}
                                onChangeText={(text) => {
                                    setSignUpProps({ ...signUpProps, last_name: text });
                                    handleInputChange(text, (t) => setSignUpProps({ ...signUpProps, last_name: t }), setErrorMsg);
                                }}
                                className={`bg-white rounded-md p-3 w-2/3 font-spacemono-bold ${
                                    isLastNameError ? 'border-2 border-red-500' : ''
                                } ${isLastNameFocused ? 'border-2 border-primary' : ''}`}
                            />
                        </View>

                        <View className='flex flex-col gap-2 w-full justify-center items-center'>
                            <Text className='font-spacemono-bold text-lg'>*Sneaker Size (US)</Text>
                            <TextInput
                                ref={sizeInputRef}
                                placeholder="11"
                                inputMode='numeric'
                                value={signUpProps.sneaker_size ? String(signUpProps.sneaker_size) : ''}
                                autoComplete='off'
                                autoCorrect={false}
                                keyboardType='numeric'
                                placeholderTextColor='gray'
                                clearButtonMode='while-editing'
                                returnKeyType='next'
                                enablesReturnKeyAutomatically={true}
                                onSubmitEditing={() => checkBeforeNext(String(signUpProps.sneaker_size), 'size', false, setErrorMsg, setIsSizeError, genderInputRef)}
                                onFocus={() => handleInputFocus('size')}
                                onBlur={() => handleInputBlur('size', String(signUpProps.sneaker_size))}
                                onChangeText={(text) => {
                                    setSignUpProps({ ...signUpProps, sneaker_size: Number(text) });
                                    handleInputChange(text, (t) => setSignUpProps({ ...signUpProps, sneaker_size: Number(t) }), setErrorMsg);
                                }}
                                className={`bg-white rounded-md p-3 w-2/3 font-spacemono-bold ${
                                    isSizeError ? 'border-2 border-red-500' : ''
                                } ${isSizeFocused ? 'border-2 border-primary' : ''}`}
                            />
                        </View>

                        <View className='flex flex-col gap-2 w-full justify-center items-center'>
                            <Text className='font-spacemono-bold text-lg'>*Gender</Text>
                            <TextInput
                                ref={genderInputRef}
                                placeholder="Male / Female / Other"
                                inputMode='text'
                                value={signUpProps.gender}
                                autoComplete='off'
                                autoCorrect={false}
                                placeholderTextColor='gray'
                                clearButtonMode='while-editing'
                                returnKeyType='done'
                                enablesReturnKeyAutomatically={true}
                                onSubmitEditing={handleSignUp}
                                onFocus={() => handleInputFocus('gender')}
                                onBlur={() => handleInputBlur('gender', signUpProps.gender)}
                                onChangeText={(text) => {
                                    setSignUpProps({ ...signUpProps, gender: text.toLowerCase() });
                                    handleInputChange(text, (t) => setSignUpProps({ ...signUpProps, gender: t.toLowerCase() }), setErrorMsg);
                                }}
                                className={`bg-white rounded-md p-3 w-2/3 font-spacemono-bold ${
                                    isGenderError ? 'border-2 border-red-500' : ''
                                } ${isGenderFocused ? 'border-2 border-primary' : ''}`}
                            />
                        </View>             
                    </View>

                    <View className='flex-row gap-2 w-full justify-center items-center'>
                        <MainButton 
                            content='Back' 
                            backgroundColor='bg-gray-400' 
                            onPressAction={() => {
                                setTimeout(() => {
                                    router.replace('/sign-up');
                                }, 300);
                            }} 
                        />
                        <MainButton 
                            content='Sign Up' 
                            backgroundColor='bg-primary' 
                            onPressAction={() => {
                                setTimeout(() => {
                                    handleSignUp();
                                }, 300);
                            }}
                        />
                    </View>
                </View>
            </ScrollView>
        </KeyboardAvoidingView>
    );
}
