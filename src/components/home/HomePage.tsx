import React, {useState, useEffect} from 'react';
import styled from '@emotion/native';

import useUserStore from '../../store/useUserStore';
import NoStudyRoom from './NoStudyRoom';
import HomeInnerHeader from './HomeInnerHeader';
import {getStorage, setStorage} from '../../utils/storage';
import {NotificationAPI} from '../../api/notification';
import {SimpleSheet, useSimpleSheet} from 'react-native-simple-sheet';
import InitNotificationModalContent from './InitNotificationModalContent';

export default function HomePage() {
  const user = useUserStore(state => state.user);
  const sheet = useSimpleSheet();

  const [headerState, setHeaderState] = useState(0);

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
  }, []);

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
