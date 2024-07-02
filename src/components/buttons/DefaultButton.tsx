import React from 'react';
import styled from '@emotion/native';
import {View, Text, TouchableOpacity} from 'react-native';

type ButtonProps = {
  type: 'normal' | 'disable' | 'etc';
  label: string;
  // TODO: 추후 작성
  // onPress: () => void;
};

const DefaultButton = ({label, type}: ButtonProps) => {
  return (
    <ButtonWrapper type={type}>
      {/* TODO: onPress 추가 */}
      <TouchableOpacity>
        <ButtonLabel type={type}>{label}</ButtonLabel>
      </TouchableOpacity>
    </ButtonWrapper>
  );
};

export default DefaultButton;

const ButtonWrapper = styled.View<{type: 'normal' | 'disable' | 'etc'}>`
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
  background-color: ${({type}) => {
    switch (type) {
      case 'normal':
        return '#192239';
      case 'disable':
        return '#D4D8E2';
      case 'etc':
        return '#FEFEFE';
    }
  }};
`;

const ButtonLabel = styled.Text<{type: 'normal' | 'disable' | 'etc'}>`
  color: ${({type}) => {
    switch (type) {
      case 'normal':
        return '#FEFEFE';
      case 'disable':
        return '#FEFEFE';
      case 'etc':
        return '#9EA3B4';
    }
  }};
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
  }};
`;
