import React from 'react';
import styled from '@emotion/native';
import {View, Text, TouchableOpacity} from 'react-native';

type ButtonProps = {
  type: 'home' | 'confirm' | 'register';
  label: string;
  // TODO: 추후 작성
  // onPress: () => void;
};

const Button = ({label, type}: ButtonProps) => {
  return (
    <ButtonWrapper type={type}>
      {/* TODO: onPress 추가 */}
      <TouchableOpacity>
        <TextRow type={type}>
          <ButtonLabel>{label}</ButtonLabel>
          <ButtonLabel>zs</ButtonLabel>
        </TextRow>
      </TouchableOpacity>
    </ButtonWrapper>
  );
};

export default Button;

const ButtonWrapper = styled.View<{type: 'home' | 'confirm' | 'register'}>`
  display: flex;
  width: 100%;
  height: 56px;
  padding: 14px 118px;
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
  lien-height: 150%;
  align-items: center;
  justify-content: center;
`;

const TextRow = styled.View<{type: 'home' | 'confirm' | 'register'}>`
  display: flex;
  flex-direction: row;
  justify-content: ${({type}) => {
      switch (type) {
        case 'home':
          return 'center';
        case 'confirm':
          return 'flex-end';
        case 'register':
          return 'flex-start';
        default:
          return 'center';
      }
    }}
    center;
`;
