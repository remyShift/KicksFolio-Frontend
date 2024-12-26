import { router } from 'expo-router';
import { View, TextInput, Button, Text, Alert } from 'react-native';
import { useSession } from '@/context/authContext';
import { useState } from 'react';
import PageTitle from '@/components/text/PageTitle';
import MainButton from '@/components/buttons/MainButton';
import ErrorMsg from '@/components/text/ErrorMsg';

export default function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [errorMsg, setErrorMsg] = useState('');
    const { login } = useSession();

    return (
        <View className="flex-1 items-center bg-background pt-20 gap-12 p-4">
            <PageTitle content='Login' />
            <View className='flex justify-center items-center gap-8 w-full mt-48'>
                <ErrorMsg content={errorMsg} display={errorMsg !== ''} />
                <View className='flex flex-col gap-2 w-full justify-center items-center'>
                    <Text className='font-spacemono-bold text-lg'>Email</Text>
                    <TextInput
                        placeholder="john@doe.com"
                        inputMode='email'
                        autoComplete='email'
                        autoCorrect={false}
                        placeholderTextColor='gray'
                        onChangeText={(text) => {setEmail(text); setErrorMsg('')}} 
                        className='bg-white rounded-md p-3 w-2/3 font-spacemono-bold'/>
                </View>

                <View className='flex flex-col gap-2 w-full justify-center items-center'>
                    <Text className='font-spacemono-bold text-lg'>Password</Text>
                    <TextInput 
                        placeholder="********" 
                        inputMode='text'
                        autoComplete='password'
                        autoCorrect={false}
                        secureTextEntry={true}
                        placeholderTextColor='gray'
                        onChangeText={(text) => {setPassword(text); setErrorMsg('')}} 
                        className='bg-white rounded-md p-3 w-2/3 font-spacemono-bold'/>
                </View>
            </View>
            <View className='flex gap-2 w-full justify-center items-center'>
                <MainButton content='Login' backgroundColor='bg-primary' onPress={() => {
                    if (email && password) {
                        login(email, password).then(() => {
                            router.replace('/(app)/(tabs)');
                            setErrorMsg('');
                        }).catch((error) => {
                            setErrorMsg('Invalid email or password.');
                        });
                    } else {
                        setErrorMsg('Please put your email and password.');
                    }
                }} />
                <MainButton content='Sign Up' backgroundColor='bg-gray-400' onPress={() => {
                    router.replace('/sign-up');
                }} />
            </View>
        </View>
    );
}
