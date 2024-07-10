import React from 'react';
import styled from '@emotion/native';

interface SliderStateProps {
  maxLength: number;
  current: number;
}

export default function SliderState({maxLength, current}: SliderStateProps) {
  return (
    <Container>
      {Array.from({length: maxLength}).map((_, index) => (
        <Circle key={index} $selected={index === current} />
      ))}
    </Container>
  );
}

const Container = styled.View`
  flex-direction: row;
  gap: 8px;
`;

const Circle = styled.View<{$selected?: boolean}>`
  background-color: ${props =>
    props.$selected ? props.theme.color.BTN900 : props.theme.color.grey[200]};

  width: 8px;
  height: 8px;
  border-radius: 4px;
`;
