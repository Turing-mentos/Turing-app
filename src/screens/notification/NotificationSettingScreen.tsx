import {View, Text} from 'react-native';
import React from 'react';

import SystemNotificationSetting from '../../components/notification/setting/SystemNotificationSetting';
import DetailNotificationSetting from '../../components/notification/setting/DetailNotificationSetting';

export default function NotificationSettingScreen() {
  return (
    <View>
      <SystemNotificationSetting />
      <DetailNotificationSetting />
    </View>
  );
}
