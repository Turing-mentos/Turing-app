import React from 'react';
import styled from '@emotion/native';

import {formatNotificationTime} from '../../utils/time';
import {
  category as CATEGORY,
  NotificationAPI,
  NotificationDTO,
} from '../../api/notification';
import Icon, {IconTypes} from '../common/icons/SvgIcon';

type NotificationProps = NotificationDTO;

export default function Notification({
  id,
  readStatus,
  body,
  category,
  createdAt,
  targetId,
}: NotificationProps) {
  const iconName = {
    HOMEWORK: 'Homework',
    NOTEBOOK: 'Notebook',
    COMMENT: 'Comment',
    QUESTION: 'Question',
    SCHEDULE_CHANGE: 'ScheduleChange',
    NEW_SCHEDULE: 'NewSchedule',
    REPORT: 'Report',
  };

  async function handlePressNotification() {
    await NotificationAPI.markNotificationAsRead(id);

    /**
     *  @TODO 추후 알림에 해당하는 페이지로 이동 로직 작성 필요!
     */
    console.log('category: ' + category);
    console.log('target ID: ' + targetId);
  }

  return (
    <NotificationContainer
      $isRead={readStatus}
      onPress={handlePressNotification}>
      <IconContainer>
        <Icon name={iconName[category] as IconTypes} width={16} height={16} />
      </IconContainer>
      <TextContainer>
        <SubTextContainer>
          <SubText>{CATEGORY[category]}</SubText>
          <SubText>{formatNotificationTime(new Date(createdAt))}</SubText>
        </SubTextContainer>

        <ContentContainer>
          <Content>{body}</Content>
        </ContentContainer>
      </TextContainer>
    </NotificationContainer>
  );
}

const NotificationContainer = styled.TouchableOpacity<{$isRead: Boolean}>`
  padding: 16px 20px 16px 20px;
  flex-direction: row;
  background-color: ${props => (props.$isRead ? '#fefefe' : '#E6E8F0')};
  gap: 4px;
  border-bottom-width: ${props => (props.$isRead ? '1px' : '0')};
  border-bottom-color: #f4f6fb;
`;

const IconContainer = styled.View`
  width: 24px;
  height: 24px;
  justify-content: center;
  align-items: center;
`;

const TextContainer = styled.View`
  flex: 1;
`;

const SubTextContainer = styled.View`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`;

const SubText = styled.Text`
  font-size: 14px;
  color: #7b8297;
  line-height: 24px;
`;

const ContentContainer = styled.View``;

const Content = styled.Text`
  font-size: 16px;
  line-height: 24px;
`;
