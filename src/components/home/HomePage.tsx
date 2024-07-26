import React, {useState, useEffect, useCallback} from 'react';
import {ActivityIndicator} from 'react-native';
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
import HomeQuestion from './HomeQuestion';
import HomeNotice from './HomeNotice';
import Indicator from '../report/Indicator';

const timeToMinutes = (time: string) => {
  const [hours, minutes] = time.split(':').map(Number);
  return hours * 60 + minutes;
};

export default function HomePage() {
  const user = useUserStore(state => state.user);
  const sheet = useSimpleSheet();

  const [schedules, setSchedules] = useState<Schedule[]>([]);
  const [studyRoomIds, setStudyRoomIds] = useState<number[]>([]);
  const [needConnect, setNeedConnect] = useState(true);
  const [isLoading, setIsLoading] = useState(true);

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

  const handleInitNotificationSetting = useCallback(
    async (enabled: boolean) => {
      try {
        console.log('user id', user.id);
        if (user.id) {
          await setStorage(user.id + '', true);
        }
        await NotificationAPI.initNotificationSetting(enabled);
      } catch (err) {
        console.log('handleInitNotificationSetting() err:', err);
      }
    },
    [user.id],
  );

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
  }, [sheet, handleInitNotificationSetting, user.id]);

  useFocusEffect(
    useCallback(() => {
      const fetchSchedules = async () => {
        try {
          const {data: studyRooms} =
            await StudyRoomAPI.getStudyRoomsInProgress();

          if (!studyRooms) {
            throw new Error('studyRooms do not exist');
          }

          if (studyRooms.filter(v => v.linkStatus).length > 0) {
            setNeedConnect(false);
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
        } finally {
          setIsLoading(false);
        }
      };

      fetchSchedules();
    }, [today]),
  );

  return (
    <Container>
      {isLoading && (
        <IndicatorContainer>
          <Indicator />
        </IndicatorContainer>
      )}
      {!isLoading && (
        <>
          <HomeInnerHeader state={headerState} />
          <ScrollView>
            <Main>
              {!hasEnrolledStudyRoom && <NoStudyRoom />}

              {hasEnrolledStudyRoom && (
                <>
                  <HomeSchedule
                    schedules={schedules}
                    studyRoomIds={studyRoomIds}
                  />

                  <HomeQuestion needConnect={needConnect} />
                  <HomeNotice needConnect={false} studyRoomIds={studyRoomIds} />
                </>
              )}
            </Main>
          </ScrollView>
        </>
      )}
    </Container>
  );
}

const ScrollView = styled.ScrollView`
  flex: 1;
`;

const Container = styled.View`
  flex: 1;
  background-color: ${props => props.theme.color.BG100};
`;

const Main = styled.View`
  padding: 20px;
  gap: 12px;
`;

const IndicatorContainer = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
`;
