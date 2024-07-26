import {View, Text} from 'react-native';
import React from 'react';
import styled from '@emotion/native';
import {useNavigation} from '@react-navigation/native';

import Icon from '../../../components/common/icons/SvgIcon';

export default function NoStudyRoom() {
  const navigation = useNavigation();

  return (
    <Container>
      <Title>아직 연결된 학생이 없어요</Title>
      <Body>
        학생 계정을 연결하면 수업 전에{'\n'}학생의 숙제 현황을 실시간으로 확인핤
        수 있어요.
      </Body>
      <Image
        source={require('../../../../assets/images/Notice/notice-sample.png')}
      />
      <Sample>
        <Icon name="InformationBlack" />
        <SampleText>예시 화면이에요</SampleText>
      </Sample>

      <EnrollmentButton onPress={() => navigation.navigate('NewLesson')}>
        <EnrollmentText>과외 정보 등록하러 가기</EnrollmentText>
        <Icon name="ArrowRightWhite" />
      </EnrollmentButton>
    </Container>
  );
}

const Container = styled.View`
  padding: 28px 16px;
  border-radius: 5px;
  background-color: ${props => props.theme.color.grey[100]};
  align-items: center;
`;

const Title = styled.Text`
  color: ${props => props.theme.color.BTN900};

  /* Text/SB20 */
  font-family: Pretendard;
  font-size: 20px;
  font-style: normal;
  font-weight: 600;
  line-height: 30px; /* 30px */
`;

const Body = styled.Text`
  margin-top: 8px;
  color: ${props => props.theme.color.BTN900};
  text-align: center;

  /* Text/R16 */
  font-family: Pretendard;
  font-size: 16px;
  font-style: normal;
  font-weight: 400;
  line-height: 24px; /* 24px */
`;

const Image = styled.Image``;

const Sample = styled.View`
  flex-direction: row;
  gap: 4px;
  align-items: center;
`;

const SampleText = styled.Text`
  color: ${props => props.theme.color.BTN900};

  /* Text/M10 */
  font-family: Pretendard;
  font-size: 10px;
  font-style: normal;
  font-weight: 500;
  line-height: 15px; /* 15px */
`;

const EnrollmentButton = styled.TouchableOpacity`
  margin-top: 16px;
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
