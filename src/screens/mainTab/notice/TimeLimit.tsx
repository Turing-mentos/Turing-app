import * as React from 'react';
import { Image, Text } from 'react-native';
import styled from '@emotion/native';
import TimeLimits from '../../../../assets/images/Notice/TimeLimit.svg';
import Triangle from '../../../../assets/images/Notice/Triangle.svg';
// Styled Components
const Container = styled.View`
  flex-direction: column;
  align-items: center;
`;

const IconContainer = styled.View`
  border-radius: 49px;
  background-color: #192239;
  padding: 2px 8px;
  flex-direction: row;
  align-items: center;
`;

const StyledIcon = styled.Image`
  width: 13px;
  height: 13px;
`;

const StyledText = styled.Text`
  color: #fefefe;
  font-weight: 600;
  font-family: Pretendard;
  font-size: 12px;
  line-height: 18px;
  text-align: center;
  margin-left: 2px;
`;

const TriangleIcon = styled.Image`
  width: 14px;
  height: 12px;
  margin-top: -5.5px;
`;
interface TimeLimitProps {
    deadline: String; // 0 to 100
}
// Component
export default function TimeLimit({deadline}:TimeLimitProps){
  return (
    <Container>
      <IconContainer>
        <TimeLimits></TimeLimits>
        <StyledText>{deadline}</StyledText>
      </IconContainer>
      <Triangle></Triangle>
    </Container>
  );
};

