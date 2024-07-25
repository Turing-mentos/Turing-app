import React, {useState, useEffect, useCallback} from 'react';
import {useFocusEffect} from '@react-navigation/native';
import styled from '@emotion/native';
import {format} from 'date-fns';

import useUserStore from '../../store/useUserStore';
import NoStudyRoom from './NoStudyRoom';
import HomeInnerHeader from './HomeInnerHeader';
import {getStorage, setStorage} from '../../utils/storage';
import {NotificationAPI} from '../../api/notification';
import {SimpleSheet, useSimpleSheet} from 'react-native-simple-sheet';
import InitNotificationModalContent from './InitNotificationModalContent';
import {requestUserPermission} from '../../utils/permission';
import {HomeAPI, Schedule} from '../../api/home';
import {StudyRoomAPI} from '../../api/studyRoom';
import {groupSchedulesByDate} from '../../utils/time';

export default function HomePage() {
  const user = useUserStore(state => state.user);
  const sheet = useSimpleSheet();

  const [headerState, setHeaderState] = useState(0);
  const [schedules, setSchedules] = useState<Schedule[]>([]);
  const [studyRoomIds, setStudyRoomIds] = useState<number[]>([]);

  console.log('studyRoomIds:', studyRoomIds);
  const today = format(new Date(), 'yyyy-MM-dd');
  const dateSchedules = groupSchedulesByDate(schedules);

  console.log('dateSchedules:', dateSchedules);
  const todaySchedule = dateSchedules[today];

  console.log('todaySchedule:', todaySchedule);

  const handleInitNotificationSetting = async (enabled: boolean) => {
    try {
      await NotificationAPI.initNotificationSetting(enabled);
      await setStorage('visited', true);
    } catch (err) {
      console.log('handleInitNotificationSetting() err:', err);
    }
  };

  useEffect(() => {
    const initNotificationSetting = async () => {
      const visited = await getStorage('visited');

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
      <HomeInnerHeader state={0} />

      <Main>
        <NoStudyRoom />
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
`;
