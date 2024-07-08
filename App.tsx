import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import messaging from '@react-native-firebase/messaging';
import {ThemeProvider} from '@emotion/react';

import RootStack from './src/screens/RootStack';
import {requestUserPermission} from './src/utils/permission';
import theme from './src/styles/theme';

export default function App() {
  async function fetchToken() {
    const token = await messaging().getToken();

    console.log('fcm token:', token);
  }

  requestUserPermission();
  fetchToken();

  return (
    <ThemeProvider theme={theme}>
      <NavigationContainer>
        <RootStack />
      </NavigationContainer>
    </ThemeProvider>
  );
}
