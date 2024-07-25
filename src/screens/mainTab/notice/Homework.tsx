import React, { useState } from 'react';
import styled from '@emotion/native';
import Checked from '../../../../assets/images/Notice/Homework-check.svg';
import NonChecked from '../../../../assets/images/Notice/Homework-nonCheck.svg';

interface CommonCheckBoxProps {
  label: string;
  sub?: boolean;
  disabled?: boolean;
  onPress: (...args: any[]) => any;
}

export default function Homework({
  label,
  sub = false,
  disabled = false,
  // isDone,
  onPress,
}: CommonCheckBoxProps) {
  const [isChecked, setIsChecked] = useState(false);

  const handlePress = () => {
    if (!disabled) {
      const newCheckedState = !isChecked;
      setIsChecked(newCheckedState);
      onPress(newCheckedState);
    }
  };

  return (
    <ButtonContainer onPress={handlePress} $sub={sub} $disabled={disabled}>
      {isChecked ? <Checked /> : <NonChecked />}
      <CheckBoxLabel $sub={sub} $isChecked={isChecked}>
        {label}
      </CheckBoxLabel>
    </ButtonContainer>
  );
}

const ButtonContainer = styled.TouchableOpacity<{
  $sub: boolean;
  $disabled: boolean;
}>`
  flex: 1;
  flex-direction: row;
  align-items: center;
  justify-content: flex-start;
`;

const CheckBoxLabel = styled.Text<{$sub: boolean; $isChecked: boolean}>`
  color: ${props => (props.$isChecked ? props.theme.color.grey[600] : '#192239')};
  text-decoration: ${props => (props.$isChecked ? 'line-through' : 'none')};
  text-decoration-color: ${props => 
    props.$isChecked ? props.theme.color.grey[600] : 'transparent'};
  font-family: Pretendard;
  font-size: 16px;
  font-style: normal;
  font-weight: 600;
  line-height: 27px;
  margin-left: 8px; /* Add some space between the icon and label */
`;
