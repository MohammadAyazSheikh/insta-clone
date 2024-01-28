import React from 'react';
import { StatusBar } from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer, DefaultTheme } from '@react-navigation/native';
import colors from '../theme/colors';
import { fontFamily } from '../theme/fonts';
import DynamicForm from '../screens/dynamicForm/dynamicForm';
import PostList from '../screens/postListScreen/postListScreen';
import AddPost from '../screens/addPostScreen/addPost';


export type RootStackProps = {
  DynamicForm: undefined;
  PostList: undefined;
  AddPost: undefined;
};

const Stack = createStackNavigator<RootStackProps>();



const UserRoute = () => {
  return (
    <>
      <Stack.Screen
        name="DynamicForm"
        component={DynamicForm}
        options={{
          title: 'Dynamic Form',
          headerShown: true,
        }}
      />
      <Stack.Screen
        name="PostList"
        component={PostList}
        options={{
          title: 'Post List',
          headerShown: true,
        }}
      />
      <Stack.Screen
        name="AddPost"
        component={AddPost}
        options={{
          title: 'Add Post',
          headerShown: true,
        }}
      />
    </>
  );
};

function RootNav() {

  return (
    <NavigationContainer
      theme={{
        dark: true,
        colors: {
          ...DefaultTheme.colors,
          background: colors.grey1,
        },
      }}>
      <StatusBar
        backgroundColor={colors.primary1}
        // hidden={isPortrait ? false : true}
        animated
      />
      <Stack.Navigator
        screenOptions={{
          headerTintColor: colors.secondary2,
          headerStyle: {
            backgroundColor: colors.primary1,
            height: 45,
          },
          headerTitleStyle: {
            fontFamily: fontFamily.bold,
          },
          // animationEnabled: false
        }}>
        {UserRoute()}
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default RootNav;
