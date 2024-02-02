import React, { useEffect } from 'react';
import { StatusBar, useColorScheme } from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer, DefaultTheme } from '@react-navigation/native';
import { fontFamily } from '../../theme/fonts';
import { useAppDispatch, useAppSelector } from '../../redux/hooks';
import { changeTheme } from '../../redux/features/theme/themeSlice';
import { ProtectedRoutes } from './protectedRoutes';
import { useAppThemeColors } from '../../utils/functions/responsiveUtils';



export type RootStackProps = {
  Login: undefined;
  Signup:undefined;
};

const Stack = createStackNavigator<RootStackProps>();



function RootNav() {

  const colors = useAppThemeColors();

  //change color scheme when mobile scheme changes
  const scheme = useColorScheme();
  const {theme} = useAppSelector(state => state.theme);
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(changeTheme({
      theme: scheme == "dark" ? "dark" : "light",
    }))
  }, [scheme]);

  return (
    <NavigationContainer
      theme={{
        dark: theme == "dark",
        colors: {
          ...DefaultTheme.colors,
          background:colors.primary1,
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
        {ProtectedRoutes()}
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default RootNav;
