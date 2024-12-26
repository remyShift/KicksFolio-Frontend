import { router } from 'expo-router';
import { View, TextInput, Button, Text } from 'react-native';
import { useSession } from '@/context/authContext';
import { useState } from 'react';

export default function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const { login } = useSession();

    return (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
            <TextInput placeholder="Email" onChangeText={setEmail} />
            <TextInput placeholder="Password" onChangeText={setPassword} />
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
