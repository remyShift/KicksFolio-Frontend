import { router } from 'expo-router';
import { View, TextInput, Button, Text } from 'react-native';
import { useSession } from '@/context/authContext';
import { useState } from 'react';

export default function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [username, setUsername] = useState('');
    const [first_name, setFirst_name] = useState('');
    const [last_name, setLast_name] = useState('');
    const [sneaker_size, setSneaker_size] = useState('');
    const [gender, setGender] = useState('');
    const { signUp } = useSession();

    return (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
            <TextInput placeholder="Email" onChangeText={setEmail} />
            <TextInput placeholder="Password" onChangeText={setPassword} />
            <TextInput placeholder="Username" onChangeText={setUsername} />
            <TextInput placeholder="First Name" onChangeText={setFirst_name} />
            <TextInput placeholder="Last Name" onChangeText={setLast_name} />
            <TextInput placeholder="Sneaker Size" onChangeText={setSneaker_size} />
            <TextInput placeholder="Gender" onChangeText={setGender} />
            <Button title="Sign Up" onPress={() => {
                signUp(email, password, username, first_name, last_name, Number(sneaker_size), gender);
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
