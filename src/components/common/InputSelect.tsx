import {Image} from 'react-native';
import React from 'react';
import styled from '@emotion/native';

interface InputSelectProps {
  onPress: (args: any) => any;
  placeholder?: string;
  value?: string;
}

export default function InputSelect({
  onPress,
  placeholder,
  value,
}: InputSelectProps) {
  const content = value ? (
    <Value>{value}</Value>
  ) : (
    <Placeholder>{placeholder}</Placeholder>
  );

  return (
    <Container onPress={onPress}>
      {content}

      <Image source={require('../../../assets/images/arrow_downward.png')} />
    </Container>
  );
}

const Container = styled.Pressable`
  padding: 12px 16px;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;

  border: 1px solid ${props => props.theme.color.grey[300]};
  border-radius: 5px;
`;

const Placeholder = styled.Text`
  color: var(--Greyscale-600, #7b8297);
  color: ${props => props.theme.color.grey[600]};

  /* Text/R16 */
  font-family: Pretendard;
  font-size: 16px;
  font-style: normal;
  font-weight: 400;
  line-height: 24px; /* 24px */
`;

const Value = styled.Text`
  color: var(--Main-BTN900, #192239);
  color: ${props => props.theme.color.BTN900};

  /* Text/R16 */
  font-family: Pretendard;
  font-size: 16px;
  font-style: normal;
  font-weight: 400;
  line-height: 24px; /* 24px */
`;
