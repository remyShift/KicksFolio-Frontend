import { router } from 'expo-router';
import { View, TextInput, Text } from 'react-native';
import { useSignUpProps } from '@/context/signUpPropsContext';
import PageTitle from '@/components/text/PageTitle';
import MainButton from '@/components/buttons/MainButton';

export default function Login() {
    const { signUpProps, setSignUpProps } = useSignUpProps();

    return (
        <View className="flex-1 items-center bg-background pt-20 gap-12 p-4">
            <PageTitle content='Sign Up' />
            <View className='flex gap-6 justify-center items-center w-full mt-32'>
                <View className='flex flex-col gap-2 w-full justify-center items-center'>
                    <Text className='font-spacemono-bold text-lg'>Username</Text>
                    <TextInput
                        placeholder="johndoe42"
                        inputMode='text'
                        autoComplete='username'
                        autoCorrect={false}
                        placeholderTextColor='gray'
                        onChangeText={(text) => setSignUpProps({ ...signUpProps, username: text })} 
                        className='bg-white rounded-md p-3 w-2/3 font-spacemono-bold'/>
                </View>              

                <View className='flex flex-col gap-2 w-full justify-center items-center'>
                    <Text className='font-spacemono-bold text-lg'>Email</Text>
                    <TextInput
                        placeholder="johndoe@gmail.com"
                        inputMode='email'
                        autoComplete='email'
                        autoCorrect={false}
                        placeholderTextColor='gray'
                        onChangeText={(text) => setSignUpProps({ ...signUpProps, email: text })} 
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
                        onChangeText={(text) => setSignUpProps({ ...signUpProps, password: text })} 
                        className='bg-white rounded-md p-3 w-2/3 font-spacemono-bold'/>
                </View>

            </View>

            <View className='flex gap-2 w-full justify-center items-center'>
                <MainButton content='Next' backgroundColor='bg-primary' onPress={() => {
                    router.replace('/su-second');
                }} />

                <MainButton content='Login' backgroundColor='bg-gray-400' onPress={() => {
                    router.replace('/login');
                }} />
            </View>
        </View>
    );
}
