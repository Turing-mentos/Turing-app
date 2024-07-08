import React from 'react';
import styled from '@emotion/native';

import {formatNotificationTime} from '../../utils/time';
import {
  category as CATEGORY,
  NotificationAPI,
  NotificationDTO,
} from '../../api/notification';
import NotificationIcon from './NotificationIcon';

type NotificationProps = NotificationDTO;

export default function Notification({
  id,
  readStatus,
  body,
  category,
  createdAt,
  targetId,
}: NotificationProps) {
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
        <NotificationIcon category={category} width={16} height={16} />
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
  background-color: ${props =>
    props.$isRead ? props.theme.color.grey[100] : props.theme.color.grey[200]};
  gap: 4px;
  border-bottom-width: ${props => (props.$isRead ? '1px' : '0')};
  border-bottom-color: ${props => props.theme.color.grey[150]};
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
  color: ${props => props.theme.color.grey[600]};

  font-family: Pretendard;
  font-size: 14px;
  font-style: normal;
  font-weight: 500;
  line-height: 21px;
`;

const ContentContainer = styled.View``;

const Content = styled.Text`
  color: ${props => props.theme.color.BTN900};

  /* Text/M16 */
  font-family: Pretendard;
  font-size: 16px;
  font-style: normal;
  font-weight: 500;
  line-height: 24px; /* 24px */
`;
