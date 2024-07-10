import React from 'react';
import styled from '@emotion/native';

const titles = [
  '1분 컷 간단 알림장으로 빨라진 퇴근',
  '부담없는 학부모 연락의 시작',
  '복잡한 과외 스케줄을 간단하게',
  '효율적인 수업 준비는 질문게시판에서',
  '이 모든 걸 튜링이 도와드릴게요',
];

const subTexts = [
  '매번 작성하기 번거로웠던 알림장을 간단히 완성해보세요.\n학생의 숙제 현황도 실시간으로 확인할 수 있어요.',
  '간단한 키워드만 입력해주시면\nAI로 생성한 학생 리포트와 정산 요청서를 제공해드려요.',
  '모든 학생의 수업과 시험 일정을 한 번에 확인하세요.\n번거로운 일정 조율도 해결할 수 있어요.',
  '간편 질문 스티커로 학생의 질문에 답변해보세요.\n간단한 질문은 미리 해결하고 수업시간을 알차게 활용해요.',
  '튜링의 홈 화면 위젯에서\n모든 기능을 한 눈에 확인하고 관리해보세요.',
];

export default function OnboardingSlide({slide}: {slide: number}) {
  return (
    <Container>
      <Description>
        <Title>{titles[slide]}</Title>
        <SubText>{subTexts[slide]}</SubText>
      </Description>

      <ImageContainer>
        <OnboardingImage
          source={require('../../../assets/images/onboarding/onboarding0.png')}
        />
      </ImageContainer>
    </Container>
  );
}

const Container = styled.View`
  padding: 0 20px;
`;

const Description = styled.View`
  gap: 12px;
  justify-content: center;
  align-items: center;
`;

const Title = styled.Text`
  color: ${props => props.theme.color.BTN900};
  text-align: center;

  /* Text/SB20 */
  font-family: Pretendard;
  font-size: 20px;
  font-style: normal;
  font-weight: 600;
  line-height: 30px; /* 30px */
`;

const SubText = styled.Text`
  color: ${props => props.theme.color.grey[800]};
  text-align: center;

  /* Text/M14 */
  font-family: Pretendard;
  font-size: 14px;
  font-style: normal;
  font-weight: 500;
  line-height: 21px; /* 21px */
`;

const ImageContainer = styled.View`
  margin-top: 25px;
  width: 350px;
  height: 334px;
  flex-shrink: 0;

  border-radius: 5px;
  background: ${props => props.theme.color.blue[400]};
`;

const OnboardingImage = styled.Image`
  width: 240px;
`;
