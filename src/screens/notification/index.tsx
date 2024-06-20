import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

import NotificationMainScreen from './NotificationMainScreen';
import NotificationSettingScreen from './NotificationSettingScreen';

const Stack = createNativeStackNavigator();

export default function Notification() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="NotificationMain"
        component={NotificationMainScreen}
      />
      <Stack.Screen
        name="NotificationSetting"
        component={NotificationSettingScreen}
      />
    </Stack.Navigator>
  );
}
