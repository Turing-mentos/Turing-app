import React from 'react';
import styled from '@emotion/native';
import {View, Text, TouchableOpacity} from 'react-native';
const Button = () => {
  return (
    <ButtonWrapper>
      <TouchableOpacity>
        <ButtonLabel>ddd</ButtonLabel>
      </TouchableOpacity>
    </ButtonWrapper>
  );
};

export default Button;

const ButtonWrapper = styled.View`
  display: flex;
  width: 350px;
  height: 56px;
  padding: 14px 118px;
  justify-content: center;
  gap: 10px;
  flex-shrink: 0;
  border-radius: 5px;
  background-color: #192239;
`;

const ButtonLabel = styled.Text`
  font-family: Pretendard;
  font-size: 18px;
  font-weight: 600;
  lien-height: 150%;
`;
