import { router } from 'expo-router';
import { View, TextInput, Button, Text } from 'react-native';
import { useSession } from '@/context/authContext';

export default function Login() {
    const { login } = useSession();

    return (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
            <TextInput placeholder="Email" />
            <TextInput placeholder="Password" />
            <Button title="Login" onPress={() => {
                login(email, password);
                router.replace('/');
            }} />

            <Text onPress={() => {
                router.replace('/sign-up');
            }}>
                or sign up
            </Text>
        </View>
    );
}
