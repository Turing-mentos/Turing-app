import {Image} from 'react-native';
import React from 'react';
import StackScreenHeader from '../common/header/StackScreenHeader';
import {useNavigation} from '@react-navigation/native';

export default function NotificationHeader() {
  const navigation = useNavigation();

  const RightButton = (
    <Image source={require('../../../assets/images/setting.png')} />
  );

  return (
    <StackScreenHeader
      title="알림"
      rightButton={RightButton}
      onPressRightButton={() => navigation.navigate('NotificationSetting')}
    />
  );
}
