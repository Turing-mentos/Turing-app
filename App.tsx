import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import messaging from '@react-native-firebase/messaging';

import RootStack from './src/screens/RootStack';
import {requestUserPermission} from './src/utils/permission';

export default function App() {
  async function fetchToken() {
    const token = await messaging().getToken();

    console.log('fcm token:', token);
  }

  requestUserPermission();
  fetchToken();

  return (
    <NavigationContainer>
      <RootStack />
    </NavigationContainer>
  );
}
