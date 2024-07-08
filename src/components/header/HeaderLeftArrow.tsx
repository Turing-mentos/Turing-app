import {Pressable} from 'react-native';
import React from 'react';
import Icon from '../common/icons/SvgIcon';

export default function HeaderLeftArrow({navigation}) {
  return (
    <Pressable
      onPress={() => {
        navigation.goBack();
      }}>
      <Icon name="Arrow3Left" width={24} height={24} />
    </Pressable>
  );
}
