import { router } from 'expo-router';

type HandleLoginProps = {
    email: string,
    password: string,
    setErrorMsg: (msg: string) => void,
    setIsEmailError: (isError: boolean) => void,
    setIsPasswordError: (isError: boolean) => void,
    login: (email: string, password: string) => Promise<void>,
    userCollection: any
}
export const handleLogin = async ({ 
    email, 
    password, 
    setErrorMsg, 
    setIsEmailError, 
    setIsPasswordError,
    login,
    userCollection 
}: HandleLoginProps) => {
    if (!email || !password) {
        setErrorMsg('Please put your email and password.');
        if (!email) setIsEmailError(true);
        if (!password) setIsPasswordError(true);
        return;
    }

    await login(email, password);
    setErrorMsg('');
    if (!userCollection?.name) {
        router.replace('/collection');
    } else {
        router.replace('/(app)/(tabs)');
    }
};