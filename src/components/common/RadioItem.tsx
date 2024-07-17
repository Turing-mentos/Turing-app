import React from 'react';
import styled from '@emotion/native';
import Icon from './icons/SvgIcon';

interface RadioItemProps {
  label: string;
  onPress: (args: any) => any;
  selected?: boolean;
}

export default function RadioItem({label, onPress, selected}: RadioItemProps) {
  const circle = selected ? (
    <Circle
      source={require('../../../assets/images/myPage/circle-checked.png')}
    />
  ) : (
    <Circle
      source={require('../../../assets/images/myPage/circle-unchecked.png')}
    />
  );

  return (
    <Container onPress={onPress}>
      <Label>{label}</Label>
      {circle}
    </Container>
  );
}

const Container = styled.Pressable`
  padding: 8px 12px;
  width: 165px;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;

  border: 1px solid ${props => props.theme.color.grey[200]};
  border-radius: 5px;
`;

const Label = styled.Text`
  color: var(--Main-BTN900, #192239);
  color: ${props => props.theme.color.BTN900};

  /* Text/M16 */
  font-family: Pretendard;
  font-size: 16px;
  font-style: normal;
  font-weight: 500;
  line-height: 24px; /* 24px */
`;

const Circle = styled.Image`
  width: 24px;
  height: 24px;
`;
