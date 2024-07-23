import React from 'react';
import styled from '@emotion/native';

import Toggle from '../../common/Toggle';
import NotificationIcon from '../NotificationIcon';
import {category as CATEGORY} from '../../../api/notification';

interface SettingComponentProps {
  category: keyof typeof CATEGORY;
}

const comment = {
  NOTEBOOK:
    '학생의 수업이 끝나기 10분 전 알림장을 작성할 수 있도록 알려드려요.',
  HOMEWORK: '학생이 수업 하루 전까지 숙제를 모두 끝내지 못했을 때 알려드려요.',
  SCHEDULE_CHANGE: '학생이 수업 일정 조율을 요청했을 때 알려드려요.',
  NEW_SCHEDULE: '학생이 새로운 시험 일정을 등록했을 때 알려드려요.',
  QUESTION: '질문 게시판에 새로운 질문이 올라왔을 때 알려드려요.',
  COMMENT: '질문 게시판에 새로운 댓글이 달렸을 때 알려드려요.',
  SESSION:
    '기존 수업이 모두 완료되어 새로운 기준 회차 등록이 필요할 때 알려드려요.',
  REPORT:
    '학생의 기준 회차 수업이 끝났을 때 리포트를 작성할 수 있도록 알려드려요.',
};

export default function SettingComponent({category}: SettingComponentProps) {
  return (
    <SettingContainer>
      <Row>
        <IconContainer>
          <NotificationIcon category={category} width={24} height={24} />
        </IconContainer>
        <SettingTitle>{CATEGORY[category]}</SettingTitle>
        <Toggle />
      </Row>

      <Comment>{comment[category]}</Comment>
    </SettingContainer>
  );
}

const SettingContainer = styled.View`
  padding: 12px 16px;
  flex-direction: column;
  justify-content: center;
  gap: 4px;

  border-radius: 5px;
  background-color: ${props => props.theme.color.BG100};
`;

const Row = styled.View`
  flex-direction: row;
  align-items: center;
  gap: 8px;
`;

const SettingTitle = styled.Text`
  flex: 1;
  color: ${props => props.theme.color.BTN900};

  /* Text/SB16 */
  font-family: Pretendard;
  font-size: 16px;
  font-style: normal;
  font-weight: 600;
  line-height: 24px; /* 24px */
`;

const IconContainer = styled.View`
  padding: 6px;
`;

const Comment = styled.Text`
  color: ${props => props.theme.color.BTN900};

  /* Text/R14 */
  font-family: Pretendard;
  font-size: 14px;
  font-style: normal;
  font-weight: 400;
  line-height: 21px; /* 21px */
`;
