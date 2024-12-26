import { router } from 'expo-router';
import { View, TextInput, Button, Text } from 'react-native';
import { useSession } from '@/context/authContext';
import { useState } from 'react';
import PageTitle from '@/components/text/PageTitle';
import MainButton from '@/components/buttons/MainButton';

export default function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const { login } = useSession();

    return (
        <View className="flex-1 items-center bg-background pt-20 gap-12 p-4">
            <PageTitle content='Login' />
            <View className='flex justify-center items-center gap-8 w-full mt-48'>
                <View className='flex flex-col gap-2 w-full justify-center items-center'>
                    <Text className='font-spacemono-bold text-lg'>Email</Text>
                    <TextInput
                        placeholder="john@doe.com"
                        inputMode='email'
                        autoComplete='email'
                        autoCorrect={false}
                        placeholderTextColor='gray'
                        onChangeText={setEmail} 
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
                        onChangeText={setPassword} 
                        className='bg-white rounded-md p-3 w-2/3 font-spacemono-bold'/>
                </View>
            </View>
            <View className='flex gap-2 w-full justify-center items-center'>
                <MainButton content='Login' backgroundColor='bg-primary' onPress={() => {
                    login(email, password);
                    router.replace('/');
                }} />
                <MainButton content='Sign Up' backgroundColor='bg-gray-400' onPress={() => {
                    router.replace('/sign-up');
                }} />
            </View>
        </View>
    );
}
