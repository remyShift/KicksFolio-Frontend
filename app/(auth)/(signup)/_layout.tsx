import { SignUpPropsProvider } from '@/context/signUpPropsContext';
import { Slot } from 'expo-router';

export default function RootLayout({ children }: { children: React.ReactNode }) {
    return (
        <SignUpPropsProvider>
            <Slot />
        </SignUpPropsProvider>
    );
}