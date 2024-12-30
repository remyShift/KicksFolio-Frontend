import { AuthPropsProvider } from '@/context/AuthPropsContext';
import { Slot } from 'expo-router';

export default function RootLayout({ children }: { children: React.ReactNode }) {
    return (
        <AuthPropsProvider>
            <Slot />
        </AuthPropsProvider>
    );
}