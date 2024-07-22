import React, {useState} from 'react';
import styled from '@emotion/native';
import {useNavigation} from '@react-navigation/native';

import TabScreenHeader from '../common/header/TabScreenHeader';
import theme from '../../styles/theme';
import Icon from '../common/icons/SvgIcon';
import {Pressable} from 'react-native';
import Kebab from '../common/header/Kebab';

export default function ReportHeader() {
  const navigation = useNavigation();
  const [kekabOpen, setKebabOpen] = useState(false);

  const handleToggleKebab = () => {
    setKebabOpen(prev => !prev);
  };

  const items = [
    {
      title: '이전 리포트 목록',
      onPress: () => navigation.navigate('PrevReport'),
    },
    {
      title: '리포트 도움말',
      onPress: () => navigation.navigate('ReportHelp'),
    },
  ];

  const RightButton = <Icon name="Kebab" />;

  return (
    <>
      <TabScreenHeader
        title="리포트"
        backgroundColor={theme.color.BG100}
        rightButton={RightButton}
        onPressRightButton={handleToggleKebab}
      />
      {kekabOpen && <Kebab items={items} />}
    </>
  );
}
