import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {ThemeProvider} from '@emotion/react';
import {GestureHandlerRootView} from 'react-native-gesture-handler';
import {SimpleSheetProvider} from 'react-native-simple-sheet';

import Toast from './src/components/common/Toast';
import RootStack from './src/screens/RootStack';
import theme from './src/styles/theme';

export default function App() {
  return (
    <GestureHandlerRootView style={{flex: 1}}>
      <ThemeProvider theme={theme}>
        <SimpleSheetProvider>
          <NavigationContainer>
            <RootStack />
          </NavigationContainer>
        </SimpleSheetProvider>
        <Toast />
      </ThemeProvider>
    </GestureHandlerRootView>
  );
}
