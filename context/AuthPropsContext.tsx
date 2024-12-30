import { createContext, useContext, type PropsWithChildren, useState } from 'react';

const AuthPropsContext = createContext<{
    signUpProps: {
        email: string,
        password: string,
        username: string,
        first_name: string,
        last_name: string,
        sneaker_size: number,
        gender: string
    },
    loginProps: {
        email: string,
        password: string
    },
    setSignUpProps: (signUpProps: {
        email: string,
        password: string,
        username: string,
        first_name: string,
        last_name: string,
        sneaker_size: number,
        gender: string
    }) => void,
    setLoginProps: (loginProps: {
        email: string,
        password: string
    }) => void
}>({
    signUpProps: {
        email: '',
        password: '',
        username: '',
        first_name: '',
        last_name: '',
        sneaker_size: 0,
        gender: '',
    },
    loginProps: {
        email: '',
        password: ''
    },
    setSignUpProps: () => {},
    setLoginProps: () => {}
});

export function useAuthProps() {
    const value = useContext(AuthPropsContext);
    if (process.env.NODE_ENV !== 'production') {
        if (!value) {
            throw new Error('useAuthProps must be wrapped in a <AuthPropsProvider />');
        }
    }
    return value;
}

export function AuthPropsProvider({ children }: PropsWithChildren) {
    const [signUpProps, setSignUpProps] = useState<{
        email: string,
        password: string,
        username: string,
        first_name: string,
        last_name: string,
        sneaker_size: number,
        gender: string
    }>({
        email: '',
        password: '',
        username: '',
        first_name: '',
        last_name: '',
        sneaker_size: 0,
        gender: '',
    });

    const [loginProps, setLoginProps] = useState<{
        email: string,
        password: string
    }>({
        email: '',
        password: ''
    });

    return (
        <AuthPropsContext.Provider value={{ signUpProps, loginProps, setSignUpProps, setLoginProps }}>
            {children}
        </AuthPropsContext.Provider>
    );
}