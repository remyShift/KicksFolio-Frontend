import { router } from 'expo-router';
import { View, TextInput, Text } from 'react-native';
import { useSignUpProps } from '@/context/signUpPropsContext';
import PageTitle from '@/components/text/PageTitle';
import MainButton from '@/components/buttons/MainButton';
import ErrorMsg from '@/components/text/ErrorMsg';
import { useState } from 'react';

export default function Login() {
    const { signUpProps, setSignUpProps } = useSignUpProps();
    const [errorMsg, setErrorMsg] = useState('');

    return (
        <View className="flex-1 items-center bg-background pt-20 gap-12 p-4">
            <PageTitle content='Sign Up' />
            <View className='flex gap-6 justify-center items-center w-full mt-32'>
                <ErrorMsg content={errorMsg} display={errorMsg !== ''} />
                <View className='flex flex-col gap-2 w-full justify-center items-center'>
                    <Text className='font-spacemono-bold text-lg'>*Username</Text>
                    <TextInput
                        placeholder="johndoe42"
                        inputMode='text'
                        autoComplete='username'
                        autoCorrect={false}
                        placeholderTextColor='gray'
                        onChangeText={(text) => {setSignUpProps({ ...signUpProps, username: text }); setErrorMsg('')}} 
                        className='bg-white rounded-md p-3 w-2/3 font-spacemono-bold'/>
                </View>              

                <View className='flex flex-col gap-2 w-full justify-center items-center'>
                    <Text className='font-spacemono-bold text-lg'>*Email</Text>
                    <TextInput
                        placeholder="johndoe@gmail.com"
                        inputMode='email'
                        autoComplete='email'
                        autoCorrect={false}
                        placeholderTextColor='gray'
                        onChangeText={(text) => {setSignUpProps({ ...signUpProps, email: text }); setErrorMsg('')}} 
                        className='bg-white rounded-md p-3 w-2/3 font-spacemono-bold'/>
                </View>

                <View className='flex flex-col gap-2 w-full justify-center items-center'>
                    <Text className='font-spacemono-bold text-lg'>*Password</Text>
                    <Text className='font-spacemono-bold text-sm text-center px-6 text-gray-600'>At least one uppercase letter and one number and be 8 characters long.</Text>
                    <TextInput
                        placeholder="********"
                        inputMode='text'
                        autoComplete='password'
                        autoCorrect={false}
                        secureTextEntry={true}
                        placeholderTextColor='gray'
                        onChangeText={(text) => {setSignUpProps({ ...signUpProps, password: text }); setErrorMsg('')}} 
                        className='bg-white rounded-md p-3 w-2/3 font-spacemono-bold'/>
                </View>

            </View>

            <View className='flex gap-2 w-full justify-center items-center'>
                <MainButton content='Next' backgroundColor='bg-primary' onPress={() => {
                    if (signUpProps.email && signUpProps.password && signUpProps.username) {
                        if (!signUpProps.password.match(/^(?=.*[A-Z])(?=.*\d).+$/) || signUpProps.password.length < 8) {
                            setErrorMsg('Password must follow the rules.');
                        } else {
                            setErrorMsg('');
                            router.replace('/su-second');
                        }
                    } else {
                        setErrorMsg('Please put your email, password and username.');
                    }
                }} />

                <MainButton content='Login' backgroundColor='bg-gray-400' onPress={() => {
                    router.replace('/login');
                }} />
            </View>
        </View>
    );
}
