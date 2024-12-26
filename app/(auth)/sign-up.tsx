import { router } from 'expo-router';
import { View, TextInput, Button, Text } from 'react-native';
import { useSession } from '@/context/authContext';

export default function Login() {
    const { signUp } = useSession();

    return (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
            <TextInput placeholder="Email" />
            <TextInput placeholder="Password" />
            <TextInput placeholder="Username" />
            <TextInput placeholder="First Name" />
            <TextInput placeholder="Last Name" />
            <TextInput placeholder="Sneaker Size" />
            <TextInput placeholder="Gender" />
            <Button title="Sign Up" onPress={() => {
                signUp(email, password, username, first_name, last_name, sneaker_size, gender);
                router.replace('/');
            }} />

            <Text onPress={() => {
                router.replace('/login');
            }}>
                or login
            </Text>
        </View>
    );
}
