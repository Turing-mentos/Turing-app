import React from 'react';
import StackScreenHeader from '../../common/header/StackScreenHeader';
import {useNavigation} from '@react-navigation/native';
import Icon from '../../common/icons/SvgIcon';
import theme from '../../../styles/theme';

export default function TeacherConnectHeader() {
  const navigation = useNavigation();

  const RightButton = <Icon name="Close" />;

  return (
    <StackScreenHeader
      title="선생님 계정 연결"
      backgroundColor={theme.color.BG100}
      disableBack
      rightButton={RightButton}
      onPressRightButton={() =>
        navigation.navigate('MyPage', {key: Math.random()})
      }
    />
  );
}
