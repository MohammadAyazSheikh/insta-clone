

import React, { useState } from 'react';
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
import { useAppExit } from './src/hooks/backHandlerHooks';
import { RenderConfirmAlert } from './src/components/general/alerts/confirmAlert';
import { RenderDismissAlert } from './src/components/general/alerts/dismissAlert';
import Recorder from './src/components/sound/recorder';
import { View } from 'react-native';
import Slider from './src/components/sound/player';
import { GestureHandlerRootView } from 'react-native-gesture-handler';




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

  //exit listener
  useAppExit();

  //hiding native splash
  useEffect(() => {
    SplashScreen.hide();
  }, []);

  return (
    // <PaperProvider theme={theme}>
    //   <Provider store={store}>
    //     <PersistGate loading={null} persistor={persistor}>
    //       <RootNavigation />
    //       <Toast config={toastConfig} />
    //       {/* alerts */}
    //       <RenderConfirmAlert/>
    //       <RenderDismissAlert/>
    //     </PersistGate>
    //   </Provider>
    // </PaperProvider>
    <GestureHandlerRootView style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        {/*  Recorder */}
        {/* <Recorder/> */}

        {/* player */}

        <Slider/>

    </GestureHandlerRootView>
  )
}

export default App;


