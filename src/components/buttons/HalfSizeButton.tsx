import React from 'react';
import styled from '@emotion/native';
import {View, Text, TouchableOpacity, Button, ButtonProps} from 'react-native';

type ButtopProps = {
  // TODO: 타입 확정 필요
  type?: string;
  label: string;
  // TODO: 추후 작성
  // onPress: () => void;
};

const HalfSizeButton = ({type, label}: ButtonProps) => {
  return (
    <ButtonWrapper>
      {/* TODO: onPress 추가 */}
      <TouchableOpacity>
        <ButtonLabel>{label}</ButtonLabel>
      </TouchableOpacity>
    </ButtonWrapper>
  );
};

export default HalfSizeButton;

const ButtonWrapper = styled.View`
  display: flex;
  width: 169px;
  height: 66px;
  padding: 14px 118px;
  justify-content: center;
  align-items: center;
  gap: 10px;
  background-color: #192239;
  border-radius: 5px;
`;

const ButtonLabel = styled.Text`
  color: #fefefe;
  font-family: Pretendard;
  font-size: 18px;
  font-style: normal;
  font-weight: 600;
  line-height: 150%;
  align-items: center;
  justify-content: center;
  color: #fefefe;
`;
