import {View, Text, TextInputProps} from 'react-native';
import React from 'react';
import styled from '@emotion/native';
import theme from '../../styles/theme';

export default function InputBox({...rest}: TextInputProps) {
  return <Input placeholderTextColor={theme.color.grey[500]} {...rest} />;
}

const Input = styled.TextInput`
  padding: 16px;
  border-radius: 5px;
  background-color: ${props => props.theme.color.grey[150]};
  font-size: 16px;
  line-height: 24px;
  font-weight: 400;
  font-family: Pretendard;
  color: ${props => props.theme.color.BTN900};
`;
