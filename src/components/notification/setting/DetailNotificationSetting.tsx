import React, {useState, useEffect} from 'react';
import styled from '@emotion/native';

import SettingComponent from './SettingComponent';
import {NotificationAPI} from '../../../api/notification';

export default function DetailNotificationSetting() {
  const [settingState, setSettingState] = useState({
    NOTEBOOK: false,
    HOMEWORK: false,
    SCHEDULE_CHANGE: false,
    NEW_SCHEDULE: false,
    QUESTION: false,
    COMMENT: false,
    REPORT: false,
  });

  useEffect(() => {
    (async function () {
      const settings = await NotificationAPI.getNotificationSetting();

      const nextSettingState = settings.map(setting => ({}));
    })();
  }, []);

  return (
    <Container>
      <Title>세부 알림 설정</Title>

      <SettingGroupsContainer>
        <SettingGroup>
          <SettingTitle>알림장</SettingTitle>
          <SettingComponent category="NOTEBOOK" />
          <SettingComponent category="HOMEWORK" />
        </SettingGroup>

        <SettingGroup>
          <SettingTitle>스케줄</SettingTitle>
          <SettingComponent category="SCHEDULE_CHANGE" />
          <SettingComponent category="NEW_SCHEDULE" />
        </SettingGroup>

        <SettingGroup>
          <SettingTitle>질문 게시판</SettingTitle>
          <SettingComponent category="QUESTION" />
          <SettingComponent category="COMMENT" />
        </SettingGroup>

        <SettingGroup>
          <SettingTitle>리포트</SettingTitle>
          <SettingComponent category="REPORT" />
        </SettingGroup>
      </SettingGroupsContainer>
    </Container>
  );
}

const Container = styled.View`
  background-color: ${props => props.theme.color.grey[100]};
  padding: 24px 20px 80px 24px;
`;

const Title = styled.Text`
  margin-bottom: 8px;

  color: ${props => props.theme.color.BTN900};

  /* Text/M18 */
  font-family: Pretendard;
  font-size: 18px;
  font-style: normal;
  font-weight: 500;
  line-height: 27px; /* 27px */
`;

const SettingGroupsContainer = styled.View`
  gap: 8px;
`;

const SettingTitle = styled.Text`
  color: ${props => props.theme.color.grey[600]};

  /* Text/R14 */
  font-family: Pretendard;
  font-size: 14px;
  font-style: normal;
  font-weight: 400;
  line-height: 21px; /* 21px */
`;

const SettingGroup = styled.View`
  gap: 8px;
`;
