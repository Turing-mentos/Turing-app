import React, {useState} from 'react';
import styled from '@emotion/native';

import Checked from '../../../../assets/images/Notice/Homework-check.svg';
import NonChecked from '../../../../assets/images/Notice/Homework-nonCheck.svg';
import useUserStore from '../../../store/useUserStore';
import Icon from '../../../components/common/icons/SvgIcon';

interface CommonCheckBoxProps {
  label: string;
  disabled?: boolean;
  isDone: boolean;
  memo?: string;
  onPress: (...args: any[]) => any;
}

export default function Homework({
  label,
  disabled = false,
  isDone,
  memo,
  onPress,
}: CommonCheckBoxProps) {
  const {role} = useUserStore(state => state.user);
  const [isChecked, setIsChecked] = useState(isDone);
  const isStudent = role === 'student';

  const handlePress = () => {
    if (disabled) {
      return;
    }

    const newCheckedState = !isChecked;
    setIsChecked(newCheckedState);
    onPress(newCheckedState);
  };

  return (
    <ButtonContainer
      onPress={handlePress}
      $isStudent={isStudent}
      $disabled={disabled}>
      {isChecked ? <Checked /> : <NonChecked />}

      <TextGroup>
        <CheckBoxLabel $isStudent={isStudent} $isChecked={isChecked}>
          {label}
        </CheckBoxLabel>
        {memo && isStudent && (
          <MemoGroup>
            <Icon name="Memo" />
            <Memo>{memo}</Memo>
          </MemoGroup>
        )}
      </TextGroup>
    </ButtonContainer>
  );
}

const ButtonContainer = styled.TouchableOpacity<{
  $isStudent: boolean;
  $disabled: boolean;
}>`
  flex: 1;
  overflow: hidden;
  flex-direction: row;
  align-items: center;
  justify-content: flex-start;
  padding: ${props => props.$isStudent && '12px 16px'};
  background-color: ${props => props.$isStudent && props.theme.color.BG100};
  border-radius: 5px;
  gap: 8px;
`;

const TextGroup = styled.View``;

const CheckBoxLabel = styled.Text<{$isStudent: boolean; $isChecked: boolean}>`
  color: ${props =>
    props.$isChecked ? props.theme.color.grey[600] : '#192239'};
  text-decoration: ${props => (props.$isChecked ? 'line-through' : 'none')};
  text-decoration-color: ${props =>
    props.$isChecked ? props.theme.color.grey[600] : 'transparent'};
  font-family: Pretendard;
  font-size: 16px;
  font-style: normal;
  font-weight: 600;
  line-height: 27px;
`;

const MemoGroup = styled.View`
  flex-direction: row;
  gap: 4px;
`;

const Memo = styled.Text`
  color: ${props => props.theme.color.grey[700]};

  /* Text/M12 */
  font-family: Pretendard;
  font-size: 12px;
  font-style: normal;
  font-weight: 500;
  line-height: 18px; /* 18px */
`;
