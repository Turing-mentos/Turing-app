import React from 'react';
import styled from '@emotion/native';
import {useNavigation} from '@react-navigation/native';

import TabScreenHeader from '../common/header/TabScreenHeader';
import theme from '../../styles/theme';
import Icon from '../common/icons/SvgIcon';
import {Pressable} from 'react-native';

export default function ReportHeader() {
  const navigation = useNavigation();

  return <TabScreenHeader title="리포트" backgroundColor={theme.color.BG100} />;
}
