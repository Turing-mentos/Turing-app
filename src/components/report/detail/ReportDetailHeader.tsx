import React from 'react';
import {useNavigation} from '@react-navigation/native';

import StackScreenHeader from '../../common/header/StackScreenHeader';
import Icon from '../../common/icons/SvgIcon';

export default function ReportDetailHeader() {
  const navigation = useNavigation();

  const RightButton = <Icon name="Close" />;

  return (
    <StackScreenHeader
      title="리포트"
      disableBack
      rightButton={RightButton}
      onPressRightButton={() => navigation.goBack()}
    />
  );
}
