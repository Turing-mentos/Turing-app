import React from 'react';
import styled from '@emotion/native';

const Content = styled.Text`
  color: ${props => props.theme.color.grey[800]};

  /* Text/R14 */
  font-family: Pretendard;
  font-size: 14px;
  font-style: normal;
  font-weight: 400;
  line-height: 21px; /* 21px */
`;

const Span = styled.Text`
  color: ${props => props.theme.color.grey[800]};

  /* Text/R14 */
  font-family: Pretendard;
  font-size: 14px;
  font-style: normal;
  font-weight: 700;
  line-height: 21px; /* 21px */
`;

export const OnContent = () => (
  <Content>
    현재 튜링 알림 수신을 동의하신 상태예요. 알림 수신 거부는 [기기 설정 &gt;
    알림 &gt; 튜링] 에서 가능합니다.
  </Content>
);

export const OffContent = () => (
  <Content>
    현재 튜링 알림 수신이 켜져 있지 않아요. 튜링은 희재 선생님의 편리한 과외
    생활을 위해 알림을 보내드려요. <Span>[기기 설정 &gt; 알림 &gt; 튜링]</Span>
    에서 시스템 설정을 변경해보세요.
  </Content>
);
