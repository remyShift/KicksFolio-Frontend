import { createContext, useContext, type PropsWithChildren, useState } from 'react';

const SignUpPropsContext = createContext<{
    signUpProps: {
        email: string,
        password: string,
        username: string,
        first_name: string,
        last_name: string,
        sneaker_size: number,
    },
    setSignUpProps: (signUpProps: {
        email: string,
        password: string,
        username: string,
        first_name: string,
        last_name: string,
        sneaker_size: number,
    }) => void
}>({
    signUpProps: {
        email: '',
        password: '',
        username: '',
        first_name: '',
        last_name: '',
        sneaker_size: 0,
    },
    setSignUpProps: () => {},
});

export function useSignUpProps() {
    const value = useContext(SignUpPropsContext);
    if (process.env.NODE_ENV !== 'production') {
        if (!value) {
            throw new Error('useSignUpProps must be wrapped in a <SignUpPropsProvider />');
        }
    }
    return value;
}

export function SignUpPropsProvider({ children }: PropsWithChildren) {
    const [signUpProps, setSignUpProps] = useState<{
        email: string,
        password: string,
        username: string,
        first_name: string,
        last_name: string,
        sneaker_size: number,
    }>({
        email: '',
        password: '',
        username: '',
        first_name: '',
        last_name: '',
        sneaker_size: 0,
    });

    return (
        <SignUpPropsContext.Provider value={{ signUpProps, setSignUpProps }}>
            {children}
        </SignUpPropsContext.Provider>
    );
}