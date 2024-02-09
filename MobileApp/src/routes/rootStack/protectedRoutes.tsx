import React from 'react';
import { View,Text } from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';
import { RootStackProps } from './rootNavigation';
import RootTab from '../rootTab/rootTab';


const Stack = createStackNavigator<RootStackProps>();

const Screen = () =>
(
    <View style={{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    }}>
        <Text>
          Hello from dev 👋  👩‍💻
        </Text>
    </View>
)

export const protectedRoutes = () => {
    return (
        <>
            <Stack.Screen
                name="RootTab"
                component={RootTab}
                options={{
                    headerShown: false,
                }}
            />
        </>
    );
};




