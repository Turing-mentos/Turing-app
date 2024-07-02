import React from 'react';
import styled from '@emotion/native';
import {View, Text, TouchableOpacity} from 'react-native';

type ButtonProps = {
  label: string;
  onPress?: () => void;
};

const HalfSizeButton = ({label, onPress}: ButtonProps) => {
  return (
    <ButtonWrapper>
      <TouchableOpacity onPress={onPress}>
        <ButtonLabel>{label}</ButtonLabel>
      </TouchableOpacity>
    </ButtonWrapper>
  );
};

export default HalfSizeButton;

const ButtonWrapper = styled.View`
  display: flex;
  width: 169px;
  height: 56px;
  padding: 14px;
  justify-content: center;
  align-items: center;
  flex-direction: row;
  gap: 10px;
  flex-shrink: 0;
  border-radius: 5px;
  background-color: #192239;
`;

const ButtonLabel = styled.Text`
  color: #fefefe;
  font-family: Pretendard;
  font-size: 18px;
  font-weight: 600;
  line-height: 150%;
  text-align: center;
`;
