import React from 'react';

import styled from '@emotion/native';
import InputText from './InputText';

interface InfoBoxProps {
  label: string;
  value: string;
  onChangeText: (value: any) => void;
  placeholder?: string;
}

export default function InputBox({
  label,
  value,
  onChangeText,
  placeholder,
}: InfoBoxProps) {
  return (
    <InputGroup>
      <InputLabel>{label}</InputLabel>
      <TextBox>
        <InputText
          value={value}
          onChangeText={onChangeText}
          placeholder={placeholder}
        />
      </TextBox>
    </InputGroup>
  );
}

const InputGroup = styled.View`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`;

const InputLabel = styled.Text`
  color: ${props => props.theme.color.grey[500]};

  /* Text/R14 */
  font-family: Pretendard;
  font-size: 14px;
  font-style: normal;
  font-weight: 400;
  line-height: 21px; /* 21px */
`;

const TextBox = styled.View`
  width: 304px;
`;

const TextContent = styled.Text`
  color: ${props => props.theme.color.grey[500]};

  /* Text/M14 */
  font-family: Pretendard;
  font-size: 14px;
  font-style: normal;
  font-weight: 500;
  line-height: 21px; /* 21px */
`;
