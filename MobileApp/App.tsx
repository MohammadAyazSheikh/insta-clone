

import React, { } from 'react';
import 'react-native-gesture-handler';
import RootNavigation from './src/routes/rootStack/rootNavigation';
import { Provider } from 'react-redux';
import store, { persistor } from './src/redux/store';
import Toast from 'react-native-toast-message';
import toastConfig from './src/theme/toastMessageTheme';
import { PersistGate } from 'redux-persist/integration/react';
import SplashScreen from 'react-native-splash-screen'
import { useEffect } from 'react';
import { MD3LightTheme as DefaultTheme, PaperProvider } from 'react-native-paper';
import colors from './src/theme/colors';



const theme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    primary: colors.primary1,
    secondary: colors.ternary1,
    ternary: colors.ternary1
  },
};

const App = () => {


  useEffect(() => {
    SplashScreen.hide();
  }, [])
  return (
    <PaperProvider theme={theme}>
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <RootNavigation />
          <Toast config={toastConfig} />
        </PersistGate>
      </Provider>
    </PaperProvider>
  )
}

export default App;