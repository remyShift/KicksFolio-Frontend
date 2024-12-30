import { TextInput } from "react-native";
import { RefObject } from "react";

export const checkBeforeNext = async (
    value: string, 
    inputType: 'username' | 'email' | 'password' | 'firstName' | 'lastName' | 'size' | 'gender',
    isLoginPage: boolean,
    setErrorMsg: (msg: string) => void,
    setIsError: (isError: boolean) => void,
    nextRef: RefObject<TextInput> | null
) => {
    let isValid = false;
    console.log("value :", value);

    switch (inputType) {
        case 'username':
            isValid = await checkUsername(value, setErrorMsg, setIsError);
            break;
        case 'email':
            isValid = await checkEmail(value, isLoginPage, setErrorMsg, setIsError);
            break;
        case 'password':
            isValid = checkPassword(value, setErrorMsg, setIsError);
            break;
        case 'firstName':
        case 'lastName':
            isValid = checkName(value, setErrorMsg, setIsError);
            break;
        case 'size':
            isValid = checkSize(Number(value), setErrorMsg, setIsError);
            break;
        case 'gender':
            isValid = checkGender(value, setErrorMsg, setIsError);
            break;
    }

    return isValid;
};

export const checkPassword = (password: string, setErrorMsg: (msg: string) => void, setIsPasswordError: (isError: boolean) => void): boolean => {
    if (!password) {
        setErrorMsg('Please put your password.');
        setIsPasswordError(true);
        return false;
    } else if (password.length < 8) {
        setErrorMsg('Password must be at least 8 characters long.');
        setIsPasswordError(true);
        return false;
    } else if (!password.match(/^(?=.*[A-Z])(?=.*\d).+$/)) {
        setErrorMsg('Password must contain at least one uppercase letter and one number.');
        setIsPasswordError(true);
        return false;
    }
    setErrorMsg('');
    setIsPasswordError(false);
    return true;
};

export const checkUsername = async (
    username: string, 
    setErrorMsg: (msg: string) => void, 
    setIsUsernameError: (isError: boolean) => void
): Promise<boolean> => {
    if (!username) {
        setErrorMsg('Please put your username.');
        setIsUsernameError(true);
        return Promise.resolve(false);
    } else if (username.length < 4) {
        setErrorMsg('Username must be at least 4 characters long.');
        setIsUsernameError(true);
        return Promise.resolve(false);
    } else if (username.length > 16) {
        setErrorMsg('Username must be less than 16 characters.');
        setIsUsernameError(true);
        return Promise.resolve(false);
    } else if (username.match(/[^\w\s]/)) {
        setErrorMsg('Username must not contain special characters.');
        setIsUsernameError(true);
        return Promise.resolve(false);
    }

    if (await checkUsernameExists(username)) {
        setErrorMsg('This username is already taken.');
        setIsUsernameError(true);
        return Promise.resolve(false);
    }
    setErrorMsg('');
    setIsUsernameError(false);
    return Promise.resolve(true);
};

export const checkEmail = async (email: string, isLoginPage: boolean, setErrorMsg: (msg: string) => void, setIsEmailError: (isError: boolean) => void): Promise<boolean> => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email) {
        setErrorMsg('Please put your email.');
        setIsEmailError(true);
        return false;
    } else if (!emailRegex.test(email)) {
        setErrorMsg('Please put a valid email.');
        setIsEmailError(true);
        return false;
    } else if (await checkEmailExists(email) && !isLoginPage) {
        setErrorMsg('This email is already taken.');
        setIsEmailError(true);
        return false;
    }
    setErrorMsg('');
    setIsEmailError(false);
    return true;
};

export const checkSize = (size: number, setErrorMsg: (msg: string) => void, setIsSizeError: (isError: boolean) => void): boolean => {
    if (!size) {
        setErrorMsg('Please put your size.');
        setIsSizeError(true);
        return false;
    } else if (isNaN(size) || size < 1 || size > 15) {
        setErrorMsg('Please put a valid size between 1 and 15.');
        setIsSizeError(true);
        return false;
    }

    setErrorMsg('');
    setIsSizeError(false);
    return true;
};

export const checkGender = (gender: string, setErrorMsg: (msg: string) => void, setIsGenderError: (isError: boolean) => void): boolean => {
    if (!gender) {
        setErrorMsg('Please put your gender.');
        setIsGenderError(true);
        return false;
    } else if (gender !== 'male' && gender !== 'female' && gender !== 'other') {
        setErrorMsg('Please put a valid gender.');
        setIsGenderError(true);
        return false;
    }
    setErrorMsg('');
    setIsGenderError(false);
    return true;
};

export const checkName = (name: string, setErrorMsg: (msg: string) => void, setIsNameError: (isError: boolean) => void): boolean => {
    if (!name) {
        setErrorMsg('Please put your name.');
        setIsNameError(true);
        return false;
    } else if (name.length < 2) {
        setErrorMsg('Name must be at least 2 characters long.');
        setIsNameError(true);
        return false;
    } else if (name.match(/[^\w\s] /)) {
        setErrorMsg('Name must not contain special characters or numbers.');
        setIsNameError(true);
        return false;
    }
    setErrorMsg('');
    setIsNameError(false);
    return true;
};

export const checkUsernameExists = async (username: string): Promise<boolean> => {
    const response = await fetch(`${process.env.EXPO_PUBLIC_BASE_API_URL}/users`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
        },
    });
    
    if (!response.ok) return false;

    const data = await response.json();
    console.log(JSON.stringify(data.users, null, 2));
    return data.users.some((user: { username: string }) => user.username === username);
};

export const checkEmailExists = async (email: string): Promise<boolean> => {
    const response = await fetch(`${process.env.EXPO_PUBLIC_BASE_API_URL}/users`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
        },
    });

    if (!response.ok) return false;

    const data = await response.json();
    return data.users.some((user: { email: string }) => user.email === email);
};