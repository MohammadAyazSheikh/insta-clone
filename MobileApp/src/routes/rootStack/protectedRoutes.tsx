import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import Login from '../../screens/loginScreen/loginScreen';
import { RootStackProps } from './rootNavigation';

const Stack = createStackNavigator<RootStackProps>();



export const ProtectedRoutes = () => {
    return (
        <>
            <Stack.Screen
                name="Login"
                component={Login}
                options={{
                    headerShown: false,
                }}
            />

        </>
    );
};




