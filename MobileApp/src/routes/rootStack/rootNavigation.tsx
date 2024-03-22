import React, { useEffect } from 'react';
import { StatusBar, useColorScheme } from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer, DefaultTheme } from '@react-navigation/native';
import { fontFamily } from '../../theme/fonts';
import { useAppDispatch, useAppSelector } from '../../redux/hooks';
import { changeTheme } from '../../redux/features/theme/themeSlice';
import { authRoutes } from './authRoutes';
import { useAppThemeColors } from '../../utils/functions/responsiveUtils';
import { protectedRoutes } from './protectedRoutes';




export type RootStackProps = {
  RootTab: undefined;
  Login: undefined;
  Signup: undefined;
  Conversation: {
    messageId?: string | number
  };
};

const Stack = createStackNavigator<RootStackProps>();



function RootNav() {

  const { user } = useAppSelector(state => state.user);

  const colors = useAppThemeColors();

  //change theme when ever mobile scheme changes
  const scheme = useColorScheme();
  const { theme, isDefault } = useAppSelector(state => state.theme);
  const dispatch = useAppDispatch();

  useEffect(() => {
    isDefault && dispatch(changeTheme({
      theme: scheme == "dark" ? "dark" : "light",
    }))
  }, [scheme]);

  return (
    <NavigationContainer
      theme={{
        dark: theme == "dark",
        colors: {
          ...DefaultTheme.colors,
          background: colors.primary1,
        },
      }}>
      <StatusBar
        backgroundColor={colors.primary1}
        // hidden
        animated
      />
      <Stack.Navigator
        screenOptions={{
          headerTintColor: colors.secondary1,
          headerStyle: {
            backgroundColor: colors.primary1,
            height: 45,
          },
          headerTitleStyle: {
            fontFamily: fontFamily.bold,
          },
          // animationEnabled: false
        }}>
        {
          // user ?
          //   protectedRoutes()
          //   :
          //   authRoutes()
          protectedRoutes()
        }
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default RootNav;
