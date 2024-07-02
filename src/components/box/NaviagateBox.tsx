import React from 'react';
import styled from '@emotion/native';
import {TouchableOpacity} from 'react-native';

type LabelProps = {
  label: string;
  // TODO: Navigate
  onPress?: () => void;
};

const NavigateBox = ({label, onPress}: LabelProps) => {
  return (
    <Container>
      <TextWrapper>
        <Label>{label}</Label>
        <TouchableOpacity onPress={onPress}>
          <ArrowImage
            source={require('../../../assets/images/right_arrow.png')}
          />
        </TouchableOpacity>
      </TextWrapper>
    </Container>
  );
};

export default NavigateBox;

const Container = styled.View`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  background-color: #fefefe;
  padding: 20px 16px;
  gap: 12px;
`;

const TextWrapper = styled.View`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  width: 100%;
`;

const Label = styled.Text`
  font-family: Pretendard;
  font-size: 18px;
  font-weight: 600;
  line-height: 150%;
`;

const ArrowImage = styled.Image`
  width: 24px; // 화살표 이미지의 너비 조정
  height: 24px; // 화살표 이미지의 높이 조정
`;
