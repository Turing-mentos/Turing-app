import React from 'react';

import styled from '@emotion/native';

interface InfoBoxProps {
  label: string;
  content?: string;
}

export default function InfoBox({label, content}: InfoBoxProps) {
  const exist = content !== undefined;

  return (
    <InputGroup>
      <InputLabel>{label}</InputLabel>
      <TextBox $exist={exist}>
        <TextContent $exist={exist}>{content || '미등록'}</TextContent>
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

const TextBox = styled.View<{$exist: boolean}>`
  width: 304px;
  padding: 12px 16px;

  border-radius: 5px;
  border: 1px solid ${props => props.theme.color.grey[200]};
  background-color: ${props =>
    props.$exist ? props.theme.color.grey[150] : props.theme.color.grey[100]};
`;

const TextContent = styled.Text<{$exist: boolean}>`
  color: ${props =>
    props.$exist ? props.theme.color.BTN900 : props.theme.color.grey[500]};

  /* Text/M14 */
  font-family: Pretendard;
  font-size: 14px;
  font-style: normal;
  font-weight: 500;
  line-height: 21px; /* 21px */
`;
