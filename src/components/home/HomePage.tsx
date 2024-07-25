import React, {useState, useEffect, useCallback} from 'react';
import {useFocusEffect} from '@react-navigation/native';
import styled from '@emotion/native';
import {format} from 'date-fns';

import useUserStore from '../../store/useUserStore';
import NoStudyRoom from './NoStudyRoom';
import HomeInnerHeader from './HomeInnerHeader';
import HomeSchedule from './HomeSchedule';
import {getStorage, setStorage} from '../../utils/storage';
import {NotificationAPI} from '../../api/notification';
import {SimpleSheet, useSimpleSheet} from 'react-native-simple-sheet';
import InitNotificationModalContent from './InitNotificationModalContent';
import {requestUserPermission} from '../../utils/permission';
import {HomeAPI, Schedule} from '../../api/home';
import {StudyRoomAPI} from '../../api/studyRoom';
import {groupSchedulesByDate} from '../../utils/time';

const timeToMinutes = (time: string) => {
  const [hours, minutes] = time.split(':').map(Number);
  return hours * 60 + minutes;
};

export default function HomePage() {
  const user = useUserStore(state => state.user);
  const sheet = useSimpleSheet();

  const [schedules, setSchedules] = useState<Schedule[]>([]);
  const [studyRoomIds, setStudyRoomIds] = useState<number[]>([]);

  const today = format(new Date(), 'yyyy-MM-dd');
  const hasEnrolledStudyRoom = studyRoomIds.length > 0;
  const dateSchedules = groupSchedulesByDate(schedules);
  const todaySchedule = dateSchedules[today] || [];

  let headerState = 0;

  if (!hasEnrolledStudyRoom) {
    headerState = 0;
  } else if (todaySchedule.length === 0) {
    headerState = 3;
  } else {
    const nowSchedule = todaySchedule.filter(schedule => {
      const now = format(new Date(), 'HH:mm');
      const {startTime} = schedule;

      return timeToMinutes(startTime) > timeToMinutes(now);
    });

    if (nowSchedule.length > 0) {
      headerState = 1;
    } else {
      headerState = 2;
    }
  }

  const handleInitNotificationSetting = async (enabled: boolean) => {
    try {
      console.log('user id', user.id);
      if (user.id) {
        await setStorage(user.id + '', true);
      }
      await NotificationAPI.initNotificationSetting(enabled);
    } catch (err) {
      console.log('handleInitNotificationSetting() err:', err);
    }
  };

  useEffect(() => {
    const initNotificationSetting = async () => {
      const visited = await getStorage(user.id + '');

      if (!visited) {
        // 모달 오픈
        sheet.open(props => (
          <SimpleSheet {...props} dismissible={false}>
            <InitNotificationModalContent
              onConfirm={async () => {
                await handleInitNotificationSetting(true);
                await requestUserPermission();
                props.close();
              }}
              onCancel={async () => {
                await handleInitNotificationSetting(false);
                props.close();
              }}
            />
          </SimpleSheet>
        ));
      }
    };

    initNotificationSetting();
  }, [sheet]);

  useFocusEffect(
    useCallback(() => {
      const fetchSchedules = async () => {
        try {
          const {data: studyRooms} =
            await StudyRoomAPI.getStudyRoomsInProgress();

          if (!studyRooms) {
            throw new Error('studyRooms do not exist');
          }

          const fetchedStudyRoomIds = studyRooms.map(studyRoom => studyRoom.id);
          setStudyRoomIds(fetchedStudyRoomIds.sort((a, b) => a - b));
          const {data: fetchedSchedules} = await HomeAPI.getWeeklySchedule(
            today,
            fetchedStudyRoomIds,
          );

          if (!fetchedSchedules) {
            throw new Error('fetchedSchedules do not exist');
          }

          setSchedules(fetchedSchedules);
        } catch (err) {
          console.log('schedule fetch error:', err);
        }
      };

      fetchSchedules();
    }, []),
  );

  return (
    <Container>
      <HomeInnerHeader state={headerState} />

      <Main>
        {!hasEnrolledStudyRoom && <NoStudyRoom />}

        {hasEnrolledStudyRoom && (
          <HomeSchedule schedules={schedules} studyRoomIds={studyRoomIds} />
        )}
      </Main>
    </Container>
  );
}

const Container = styled.View`
  flex: 1;
  background-color: ${props => props.theme.color.BG100};
`;

const Main = styled.View`
  padding: 20px;
  gap: 12px;
`;
