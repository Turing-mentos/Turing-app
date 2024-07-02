import React from 'react';
import {Text, View} from 'react-native';
import styled from '@emotion/native';

// TODO: 색상 알고리즘 확정 이후 추가 필요
const StudentTag = () => {
  return (
    <Container>
      <Label>박민영 | 영어</Label>
    </Container>
  );
};

export default StudentTag;

const Container = styled.View`
  width: 88px;
  height: 25px;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 2px 8px;
  gap: 4px;
  background-color: #fbe8ff;
  border-radius: 5px;
`;

const Label = styled.Text`
  font-family: Pretendard;
  font-size: 14px;
  font-weight: 500;
  line-height: 150%;
  font-color: #192239;
`;
