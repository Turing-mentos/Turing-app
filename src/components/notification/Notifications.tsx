import {ScrollView} from 'react-native';
import React, {useState, useEffect} from 'react';

import Notification from './Notification';
import {NotificationAPI, NotificationDTO} from '../../api/notification';
import PrevDivider from './PrevDivider';
import NotificationLimitInfo from './NotificationLimitInfo';

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

export default function Notifications() {
  const [notifications, setNotifications] = useState<NotificationDTO[]>([]);
  const {currentNotifications, prevNotifications} =
    divideNotifications(notifications);

  useEffect(() => {
    (async () => {
      const fetchedNotifications = await NotificationAPI.getNotifications();

      if (fetchedNotifications) {
        setNotifications(fetchedNotifications);
      }
    })();
  }, []);

  return (
    <ScrollView>
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
    </ScrollView>
  );
}
