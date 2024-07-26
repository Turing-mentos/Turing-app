import React from 'react';
import styled from '@emotion/native';

import useUserStore from '../../../store/useUserStore';
import Icon from '../../../components/common/icons/SvgIcon';

export default function NoNotebook() {
  const {role} = useUserStore(state => state.user);

  const comment =
    role === 'teacher'
      ? '오른쪽 아래 [+알림장쓰기]를 클릭하여\n학생에게 손쉽게 알림장을 전달해보세요!'
      : '선생님이 작성해주시는 알림장을\n숙제 체크리스트로 활용하세요!';

  return (
    <Container>
      <Title>아직 새로운 알림장이 없어요</Title>
      <Body>{comment}</Body>
      <Image
        source={require('../../../../assets/images/Notice/notice-student-sample.png')}
      />
      <Sample>
        <Icon name="InformationBlack" />
        <SampleText>
          {role === 'teacher' && '학생에게 보이는 '}예시 화면이에요
        </SampleText>
      </Sample>
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
