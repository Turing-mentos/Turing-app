import React from 'react';

import styled from '@emotion/native';
import InputSelect from './InputSelect';

interface InfoBoxProps {
  label: string;
  value: string;
  title: string;
  onSelect: (arg: any) => void;
  selectOptions: any[];
  placeholder?: string;
}

export default function SelectBox({
  label,
  title,
  value,
  onSelect,
  placeholder,
  selectOptions,
}: InfoBoxProps) {
  return (
    <InputGroup>
      <InputLabel>{label}</InputLabel>
      <TextBox>
        <InputSelect
          title={title}
          value={value}
          placeholder={placeholder}
          onSelect={onSelect}
          selectOptions={selectOptions}
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
