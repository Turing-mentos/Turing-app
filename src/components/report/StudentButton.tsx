import React, {useState} from 'react';
import styled from '@emotion/native';

interface StudentButtonProps {
  selected?: boolean;
  onPress: (...args: any[]) => any;
  name: string;
  subject: string;
  currentSession: number;
  totalSession: number;
}

export default function StudentButton({
  selected = false,
  onPress,
  name,
  subject,
  currentSession,
  totalSession,
}: StudentButtonProps) {
  const [isPressed, setIsPressed] = useState(false);

  return (
    <StudentButtonContainer
      onPress={onPress}
      $pressed={isPressed}
      $selected={selected}
      onPressIn={() => setIsPressed(true)}
      onPressOut={() => setIsPressed(false)}>
      <StudentButtonHeader>{`${name} | ${subject}`}</StudentButtonHeader>

      <StudentButtonSession>
        {`${currentSession}회차`}
        <StudentButtonBaseSession>
          {' '}
          / {`${totalSession}회차`}
        </StudentButtonBaseSession>
      </StudentButtonSession>
    </StudentButtonContainer>
  );
}

const StudentButtonContainer = styled.Pressable<{
  $pressed: boolean;
  $selected: boolean;
}>`
  padding: 8px 27px;
  border-radius: 5px;
  justify-content: center;
  align-items: center;

  background-color: ${props => {
    if (props.$selected) {
      return props.theme.color.blue[200];
    }
    if (props.$pressed) {
      return props.theme.color.grey[200];
    }
    return props.theme.color.grey[150];
  }};
`;

const StudentButtonHeader = styled.Text`
  color: ${props => props.theme.color.BTN900};

  /* Text/SB14 */
  font-family: Pretendard;
  font-size: 14px;
  font-style: normal;
  font-weight: 600;
  line-height: 21px; /* 21px */
`;

const StudentButtonSession = styled.Text`
  color: ${props => props.theme.color.BTN900};

  /* Text/M14 */
  font-family: Pretendard;
  font-size: 14px;
  font-style: normal;
  font-weight: 500;
  line-height: 21px; /* 21px */
`;

const StudentButtonBaseSession = styled.Text`
  color: ${props => props.theme.color.grey[600]};
`;
