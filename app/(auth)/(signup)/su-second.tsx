import { router } from 'expo-router';
import { View, TextInput, Text } from 'react-native';
import { useSignUpProps } from '@/context/signUpPropsContext';
import PageTitle from '@/components/text/PageTitle';
import MainButton from '@/components/buttons/MainButton';
import { useSession } from '@/context/authContext';

export default function SUSecond() {
    const { signUpProps, setSignUpProps } = useSignUpProps();
    const { signUp } = useSession();

    return (
        <View className="flex-1 items-center bg-background pt-20 gap-12 p-4">
            <PageTitle content='Sign Up' />
            <View className='flex gap-6 justify-center items-center w-full mt-24'>
                <View className='flex flex-col gap-2 w-full justify-center items-center'>
                    <Text className='font-spacemono-bold text-lg'>First Name</Text>
                    <TextInput
                        placeholder="John"
                        inputMode='text'
                        autoComplete='given-name'
                        autoCorrect={false}
                        placeholderTextColor='gray'
                        onChangeText={(text) => setSignUpProps({ ...signUpProps, first_name: text })} 
                        className='bg-white rounded-md p-3 w-2/3 font-spacemono-bold'/>
                </View>

                <View className='flex flex-col gap-2 w-full justify-center items-center'>
                    <Text className='font-spacemono-bold text-lg'>Last Name</Text>
                    <TextInput
                        placeholder="Doe"
                        inputMode='text'
                        autoComplete='family-name'
                        autoCorrect={false}
                        placeholderTextColor='gray'
                        onChangeText={(text) => setSignUpProps({ ...signUpProps, last_name: text })} 
                        className='bg-white rounded-md p-3 w-2/3 font-spacemono-bold'/>
                </View>

                <View className='flex flex-col gap-2 w-full justify-center items-center'>
                    <Text className='font-spacemono-bold text-lg'>Sneaker Size (US)</Text>
                    <TextInput
                        placeholder="42"
                        inputMode='numeric'
                        autoComplete='off'
                        autoCorrect={false}
                        keyboardType='numeric'
                        placeholderTextColor='gray'
                        onChangeText={(text) => setSignUpProps({ ...signUpProps, sneaker_size: Number(text) })} 
                        className='bg-white rounded-md p-3 w-2/3 font-spacemono-bold'/>
                </View>

                <View className='flex flex-col gap-2 w-full justify-center items-center'>
                    <Text className='font-spacemono-bold text-lg'>Gender</Text>
                    <TextInput
                        placeholder="Male / Female / Other"
                        inputMode='text'
                        autoComplete='off'
                        autoCorrect={false}
                        placeholderTextColor='gray'
                        onChangeText={(text) => setSignUpProps({ ...signUpProps, gender: text })} 
                        className='bg-white rounded-md p-3 w-2/3 font-spacemono-bold'/>
                </View>             
            </View>

            <View className='flex gap-2 w-full justify-center items-center'>
                <MainButton content='Sign Up' backgroundColor='bg-primary' onPress={() => {
                    signUp(
                        signUpProps.email,
                        signUpProps.password,
                        signUpProps.username,
                        signUpProps.first_name,
                        signUpProps.last_name,
                        signUpProps.sneaker_size,
                        signUpProps.gender
                    );
                    router.replace('/');
                }} />

                <MainButton content='Back' backgroundColor='bg-gray-400' onPress={() => {
                    router.replace('/sign-up');
                }} />
            </View>
        </View>
    );
}
