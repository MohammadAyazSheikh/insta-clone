import React from 'react';
import { View, Text } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import IconIon from 'react-native-vector-icons/Ionicons';
import IconMtc from 'react-native-vector-icons/MaterialCommunityIcons';
import IconFa5 from 'react-native-vector-icons/FontAwesome5';
import { useAppThemeColors } from '../../utils/functions/responsiveUtils';
import { AddContentButton } from './addContentButton';
import Home from '../../screens/homeScreen/homeScreen';
import Discover from '../../screens/discoverScreen/discoverScreen';


const Screen = () => {
    return (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
            <Text>Hello from dev 👋</Text>
        </View>
    );
};

export type RootTabProps = {
    Home: undefined;
    Discover: undefined;
    AddContent: undefined;
    Reels: undefined;
    Profile: undefined;
};

const Tab = createBottomTabNavigator<RootTabProps>();

const RootTab = () => {
    const colors = useAppThemeColors();
    return (
        <Tab.Navigator
            screenOptions={{
                tabBarActiveTintColor: colors.secondary1,
                tabBarInactiveTintColor: colors.grey1,
                tabBarShowLabel: false,
                tabBarStyle: {
                    backgroundColor: colors.primary1,
                },
                headerShown: false,
            }}>
            <Tab.Screen
                name="Home"
                component={Home}
                options={{
                    tabBarIcon: ({ color, size, focused }) => (
                        <IconMtc
                            name={focused ? "home-variant" : "home-variant-outline"}
                            color={color}
                            size={25}
                        />
                    )
                }}
            />
            <Tab.Screen
                name="Discover"
                component={Discover}
                options={{
                    tabBarIcon: ({ color, focused }) => (
                        <IconIon
                            name={focused ? 'search' : 'search-outline'}
                            color={color}
                            size={25}
                        />
                    ),
                }}
            />
            <Tab.Screen
                name="AddContent"
                component={Screen}
                options={{
                    tabBarButton: (props) => (
                        <AddContentButton />
                    ),
                }}
            />
            <Tab.Screen
                name="Reels"
                component={Screen}
                options={{
                    tabBarLabel: "Items",
                    tabBarIcon: ({ color, size, focused }) => (
                        <IconMtc
                            name={focused ? "movie-play" : "movie-play-outline"}
                            color={color}
                            size={25}
                        />
                    )
                }}
            />
            <Tab.Screen
                name="Profile"
                component={Screen}
                options={{
                    tabBarIcon: ({ color, size, focused }) => (
                        <IconFa5 name={!focused ? "user" : "user-alt"} color={color} size={20} />
                    ),
                }}
            />
        </Tab.Navigator>
    );
};

export default RootTab;
