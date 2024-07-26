import React, {useState, useCallback} from 'react';
import styled from '@emotion/native';
import {useFocusEffect} from '@react-navigation/native';

import SettingComponent from './SettingComponent';
import {NotificationAPI} from '../../../api/notification';
import useUserStore from '../../../store/useUserStore';

const initialSettingState = {
  NOTEBOOK: {
    enabled: false,
    noticeSettingId: -1,
  },
  HOMEWORK: {
    enabled: false,
    noticeSettingId: -1,
  },
  SCHEDULE_CHANGE: {
    enabled: false,
    noticeSettingId: -1,
  },
  NEW_SCHEDULE: {
    enabled: false,
    noticeSettingId: -1,
  },
  QUESTION: {
    enabled: false,
    noticeSettingId: -1,
  },
  COMMENT: {
    enabled: false,
    noticeSettingId: -1,
  },
  REPORT: {
    enabled: false,
    noticeSettingId: -1,
  },
  SESSION: {
    enabled: false,
    noticeSettingId: -1,
  },
};

export default function DetailNotificationSetting() {
  const [settingState, setSettingState] = useState({...initialSettingState});
  const {role} = useUserStore(state => state.user);

  const copiedSettingState = {...settingState};

  const fetchNotificationSetting = async () => {
    try {
      const response = await NotificationAPI.getNotificationSetting();
      console.log('response data:', response.data);

      if (response.data) {
        const settings = response.data;
        const transformedData = settings.reduce(
          (acc, {category, enabled, noticeSettingId}) => {
            acc[category].enabled = enabled;
            acc[category].noticeSettingId = noticeSettingId;
            return acc;
          },
          {...initialSettingState},
        );
        setSettingState(transformedData);
      }
    } catch (err) {
      console.log('fetchNotificationSetting() err:', err);
    }
  };

  useFocusEffect(
    useCallback(() => {
      fetchNotificationSetting();
    }, []),
  );

  return (
    <Container>
      <Title>세부 알림 설정</Title>

      <SettingGroupsContainer>
        <SettingGroup>
          <SettingTitle>알림장</SettingTitle>
          <SettingComponent
            state={copiedSettingState.NOTEBOOK.enabled}
            category="NOTEBOOK"
            noticeSettingId={copiedSettingState.NOTEBOOK.noticeSettingId}
            fetchNotificationSetting={fetchNotificationSetting}
          />
          <SettingComponent
            state={copiedSettingState.HOMEWORK.enabled}
            category="HOMEWORK"
            noticeSettingId={copiedSettingState.HOMEWORK.noticeSettingId}
            fetchNotificationSetting={fetchNotificationSetting}
          />
        </SettingGroup>

        <SettingGroup>
          <SettingTitle>스케줄</SettingTitle>
          <SettingComponent
            state={copiedSettingState.SCHEDULE_CHANGE.enabled}
            category="SCHEDULE_CHANGE"
            noticeSettingId={copiedSettingState.SCHEDULE_CHANGE.noticeSettingId}
            fetchNotificationSetting={fetchNotificationSetting}
          />
          {role === 'teacher' && (
            <SettingComponent
              state={copiedSettingState.SESSION.enabled}
              category="SESSION"
              noticeSettingId={copiedSettingState.SESSION.noticeSettingId}
              fetchNotificationSetting={fetchNotificationSetting}
            />
          )}
        </SettingGroup>

        <SettingGroup>
          <SettingTitle>질문 게시판</SettingTitle>
          {role === 'teacher' && (
            <SettingComponent
              state={copiedSettingState.QUESTION.enabled}
              category="QUESTION"
              noticeSettingId={copiedSettingState.QUESTION.noticeSettingId}
              fetchNotificationSetting={fetchNotificationSetting}
            />
          )}
          <SettingComponent
            state={copiedSettingState.COMMENT.enabled}
            category="COMMENT"
            noticeSettingId={copiedSettingState.COMMENT.noticeSettingId}
            fetchNotificationSetting={fetchNotificationSetting}
          />
        </SettingGroup>

        {role === 'teacher' && (
          <SettingGroup>
            <SettingTitle>리포트</SettingTitle>
            <SettingComponent
              state={copiedSettingState.REPORT.enabled}
              category="REPORT"
              noticeSettingId={copiedSettingState.REPORT.noticeSettingId}
              fetchNotificationSetting={fetchNotificationSetting}
            />
          </SettingGroup>
        )}
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
