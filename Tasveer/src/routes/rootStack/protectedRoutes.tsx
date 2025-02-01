import React from 'react';
import { View, Text } from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';
import { RootStackProps } from './rootNavigation';
import RootTab from '../rootTab/rootTab';
import Conversation from '../../screens/conversationScreen/conversationScreen';
import Inbox from '../../screens/inboxScreen/inboxScreen';
import Explore from '../../screens/exploreScreen/exploreScreen';
import ReelsExplore from '../../screens/reelsScreen/reelsScreenExplore';
import Settings from '../../screens/menuScreen/settingScreen';
import EditProfile from '../../screens/editProfileScreen/editProfileScreen';
import Search from '../../screens/searchScreen/searchScreen';
import UserProfile from '../../screens/profileScreen/userProfileScreen';
import StarredMessages from '../../screens/conversationScreen/starredMessages';
import Notifications from '../../screens/notificationsScreen/norifications';


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
            <Stack.Screen
                name="Inbox"
                component={Inbox}
                options={{
                    headerShown: false,
                }}
            />
            <Stack.Screen
                name="Conversation"
                component={Conversation}
                options={{
                    headerShown: false,
                }}
            />
            <Stack.Screen
                name="StarredMessages"
                component={StarredMessages}
                options={{
                    headerShown: false,
                }}
            />
            <Stack.Screen
                name="ExplorePost"
                component={Explore}
                options={{
                    headerShown: false,
                }}
            />
            <Stack.Screen
                name="ExploreReel"
                component={ReelsExplore}
                options={{
                    headerShown: false,
                }}
            />
            <Stack.Screen
                name="Setting"
                component={Settings}
                options={{
                    headerShown: false,
                }}
            />
            <Stack.Screen
                name="EditProfile"
                component={EditProfile}
                options={{
                    headerShown: false,
                }}
            />
            <Stack.Screen
                name="Search"
                component={Search}
                options={{
                    headerShown: false,
                }}
            />
            <Stack.Screen
                name="UserProfile"
                component={UserProfile}
                options={{
                    headerShown: false,
                }}
            />
            <Stack.Screen
                name="Notifications"
                component={Notifications}
                options={{
                    headerShown: false,
                }}
            />
        </>
    );
};




