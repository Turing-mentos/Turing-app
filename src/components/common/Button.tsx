import React from 'react';
import styled from '@emotion/native';

interface CommonButtonProps {
  label: string;
  sub?: boolean;
  disabled?: boolean;
  onPress: (...args: any[]) => any;
}

export default function Button({
  label,
  sub = false,
  disabled = false,
  onPress,
}: CommonButtonProps) {
  const handlePress = () => {
    if (!disabled) {
      onPress();
    }
  };

  return (
    <ButtonContainer onPress={handlePress} $sub={sub} $disabled={disabled}>
      <ButtonLabel $sub={sub}>{label}</ButtonLabel>
    </ButtonContainer>
  );
}

const ButtonContainer = styled.TouchableOpacity<{
  $sub: boolean;
  $disabled: boolean;
}>`
  flex: 1;
  border-radius: 5px;
  padding: 14px;
  max-height: 56px;
  min-height: 56px;

  justify-content: center;
  align-items: center;

  background-color: ${props =>
    !props.$sub
      ? props.$disabled
        ? props.theme.color.grey[300]
        : props.theme.color.BTN900
      : props.theme.color.grey[200]};
`;

const ButtonLabel = styled.Text<{$sub: boolean}>`
  color: ${props =>
    !props.$sub ? props.theme.color.grey[100] : props.theme.color.grey[600]};

  /* Text/SB18 */
  font-family: Pretendard;
  font-size: 18px;
  font-style: normal;
  font-weight: 600;
  line-height: 27px; /* 27px */
`;
