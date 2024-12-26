import React, { useContext } from 'react';
import { Text } from 'react-native';
import { AuthContext } from '../context/authContext';

const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
    const { isAuth } = useContext(AuthContext);

    console.log(isAuth);

    if (!isAuth) {
        return <Text>You are not authenticated, please login</Text>;
    }

    return children;
};

export default ProtectedRoute;