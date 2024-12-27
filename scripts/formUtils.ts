import { TextInput } from "react-native";

export const handleInputChange = (
    text: string, 
    setter: (text: string) => void,
    setErrorMsg: (msg: string) => void
) => {
    setter(text);
    setErrorMsg('');
};

export const checkBeforeNext = (
    inputValue: string,
    inputType: string,
    setErrorMsg: (msg: string) => void,
    setIsInputError: (isError: boolean) => void,
    inputRef: React.RefObject<TextInput>,
    nextInputRef?: React.RefObject<TextInput>
) => {
    if (!inputValue) {
        setErrorMsg('Please put a valid input.');
        setIsInputError(true);
        return;
    }

    switch (inputType) {
        case 'email':
            if (!checkEmail(inputValue, setErrorMsg, setIsInputError)) {
                inputRef.current?.focus();
            } else {
                nextInputRef?.current?.focus();
            }
            break;
        case 'password':
            if (!checkPassword(inputValue, setErrorMsg, setIsInputError)) {
                inputRef.current?.focus();
            } else {
                nextInputRef?.current?.focus();
            }
            break;
        case 'username':
            if (!checkUsername(inputValue, setErrorMsg, setIsInputError)) {
                inputRef.current?.focus();
            } else {
                nextInputRef?.current?.focus();
            }
            break;
        case 'size':
            if (!checkSize(Number(inputValue), setErrorMsg, setIsInputError)) {
                inputRef.current?.focus();
            } else {
                nextInputRef?.current?.focus();
            }
            break;
        case 'gender':
            if (!checkGender(inputValue, setErrorMsg, setIsInputError)) {
                inputRef.current?.focus();
            } else {
                nextInputRef?.current?.focus();
            }
            break;
        case 'firstName':
        case 'lastName':
            if (!checkName(inputValue, setErrorMsg, setIsInputError)) {
                inputRef.current?.focus();
            } else {
                nextInputRef?.current?.focus();
            }
            break;
        default:
            break;
    }
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
        setErrorMsg('Veuillez entrer un nom d\'utilisateur.');
        setIsUsernameError(true);
        return Promise.resolve(false);
    } else if (username.length < 4) {
        setErrorMsg('Le nom d\'utilisateur doit contenir au moins 4 caractères.');
        setIsUsernameError(true);
        return Promise.resolve(false);
    } else if (username.length > 16) {
        setErrorMsg('Le nom d\'utilisateur doit contenir moins de 16 caractères.');
        setIsUsernameError(true);
        return Promise.resolve(false);
    } else if (username.match(/[^\w\s]/)) {
        setErrorMsg('Le nom d\'utilisateur ne doit pas contenir de caractères spéciaux.');
        setIsUsernameError(true);
        return Promise.resolve(false);
    }

    return checkUsernameExists(username)
        .then(isUsernameTaken => {
            if (isUsernameTaken) {
                setErrorMsg('Ce nom d\'utilisateur est déjà pris.');
                setIsUsernameError(true);
                return false;
            }
            setErrorMsg('');
            setIsUsernameError(false);
            return true;
        })
        .catch(() => {
            setErrorMsg('Erreur lors de la vérification du nom d\'utilisateur.');
            setIsUsernameError(true);
            return false;
        });
};

export const checkEmail = (email: string, setErrorMsg: (msg: string) => void, setIsEmailError: (isError: boolean) => void): boolean => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email) {
        setErrorMsg('Please put your email.');
        setIsEmailError(true);
        return false;
    } else if (!emailRegex.test(email)) {
        setErrorMsg('Please put a valid email.');
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
    const response = await fetch(`${process.env.BASE_API_URL}/users`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
        },
    });
    const data = await response.json();
    if (data.includes(username)) {
        return true;
    }
    return false;
};

console.log(process.env.BASE_API_URL);
console.log(checkUsernameExists('test'));