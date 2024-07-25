import React from 'react';
import styled from '@emotion/native';
import {useNavigation} from '@react-navigation/native';

import Icon from '../common/icons/SvgIcon';

export default function NoStudyRoom() {
  const navigation = useNavigation();

  return (
    <Section>
      <StartTitle>아직 등록된 과외 정보가 없어요!</StartTitle>
      <StartBody>
        수업 일정을 등록하고 학생을 연결하여{'\n'}
        튜링에서 손쉬운 과외 수업을 경험해보세요.
      </StartBody>

      <EnrollmentButton onPress={() => navigation.navigate('NewLesson')}>
        <EnrollmentText>과외 정보 등록하러 가기</EnrollmentText>
        <Icon name="ArrowRightWhite" />
      </EnrollmentButton>
    </Section>
  );
}

const Section = styled.View`
  background-color: ${props => props.theme.color.grey[100]};
  border-radius: 5px;
  padding: 28px 16px;
  gap: 16px;
  align-items: center;
`;

const StartTitle = styled.Text`
  color: ${props => props.theme.color.BTN900};

  /* Text/SB20 */
  font-family: Pretendard;
  font-size: 20px;
  font-style: normal;
  font-weight: 600;
  line-height: 30px; /* 30px */
`;

const StartBody = styled.Text`
  color: ${props => props.theme.color.BTN900};
  text-align: center;

  /* Text/R16 */
  font-family: Pretendard;
  font-size: 16px;
  font-style: normal;
  font-weight: 400;
  line-height: 24px; /* 24px */
`;

const EnrollmentButton = styled.TouchableOpacity`
  width: 100%;
  border-radius: 5px;
  background-color: ${props => props.theme.color.BTN900};
  padding: 12px 20px;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`;

const EnrollmentText = styled.Text`
  color: ${props => props.theme.color.grey[100]};

  /* Text/SB16 */
  font-family: Pretendard;
  font-size: 16px;
  font-style: normal;
  font-weight: 600;
  line-height: 24px; /* 24px */
`;
