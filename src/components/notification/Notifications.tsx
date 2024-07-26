import {ScrollView} from 'react-native';
import React, {useState, useEffect} from 'react';
import styled from '@emotion/native';

import Notification from './Notification';
import {NotificationAPI, NotificationDTO} from '../../api/notification';
import PrevDivider from './PrevDivider';
import NotificationLimitInfo from './NotificationLimitInfo';
import Icon from '../common/icons/SvgIcon';
import useUserStore from '../../store/useUserStore';

function divideNotifications(notifications: NotificationDTO[]) {
  const currentNotifications: NotificationDTO[] = [];
  const prevNotifications: NotificationDTO[] = [];
  const sortedNotifications = notifications.sort(
    (a, b) => +b.createdAt - +a.createdAt,
  );
  const now = new Date();

  sortedNotifications.forEach(notification => {
    const diff = (+now - +notification.createdAt) / 1000;
    if (diff < 60 * 60 * 24 * 3) {
      currentNotifications.push(notification);
    } else {
      prevNotifications.push(notification);
    }
  });

  return {currentNotifications, prevNotifications};
}

const NoContent = () => {
  const {firstName, role} = useUserStore(state => state.user);
  const comment =
    role === 'teacher'
      ? `${firstName} 선생님이 할 일을 잊지 않도록\n튜링이 알림을 보내드릴게요.`
      : `${firstName} 학생의 과외 수업을 위해\n튜링이 알림을 보내드릴게요.`;

  return (
    <NoContentContainer>
      <Icon name="HelpQuestionGrey" />
      <NoContentTitle>아직 새로운 알림이 없어요</NoContentTitle>
      <NoContentBody>{comment}</NoContentBody>
    </NoContentContainer>
  );
};

export default function Notifications() {
  const [notifications, setNotifications] = useState<NotificationDTO[]>([]);
  const {currentNotifications, prevNotifications} =
    divideNotifications(notifications);

  useEffect(() => {
    (async () => {
      const response = await NotificationAPI.getNotifications();

      if (response.data) {
        setNotifications(response.data);
      }
    })();
  }, []);

  return (
    <ScrollView>
      {notifications.length === 0 && <NoContent />}
      {notifications.length > 0 && (
        <>
          {currentNotifications
            .sort((a, b) => +b.createdAt - +a.createdAt)
            .map(notification => (
              <Notification key={notification.id} {...notification} />
            ))}
          <PrevDivider />
          {prevNotifications
            .sort((a, b) => +b.createdAt - +a.createdAt)
            .map(notification => (
              <Notification key={notification.id} {...notification} />
            ))}
          <NotificationLimitInfo />
        </>
      )}
    </ScrollView>
  );
}

const NoContentContainer = styled.View`
  margin-top: 148px;
  align-items: center;
`;

const NoContentTitle = styled.Text`
  margin-top: 16px;
  color: ${props => props.theme.color.grey[700]};
  text-align: center;

  /* Text/SB20 */
  font-family: Pretendard;
  font-size: 20px;
  font-style: normal;
  font-weight: 600;
  line-height: 30px; /* 30px */
`;

const NoContentBody = styled.Text`
  margin-top: 8px;
  text-align: center;

  /* Text/R16 */
  font-family: Pretendard;
  font-size: 16px;
  font-style: normal;
  font-weight: 400;
  line-height: 24px; /* 24px */
`;
