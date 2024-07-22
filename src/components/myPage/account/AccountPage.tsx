import React from 'react';
import styled from '@emotion/native';
import {useNavigation, CommonActions} from '@react-navigation/native';

import Button from '../../common/Button';
import {setStorage} from '../../../utils/storage';

export default function AccountPage() {
  const navigation = useNavigation();

  const handleSignOut = async () => {
    await setStorage('accessToken', '');
    await setStorage('refreshToken', '');
    navigation.dispatch(
      CommonActions.reset({
        index: 0,
        routes: [{name: 'SignIn'}],
      }),
    );
  };

  const handleExit = async () => {
    await handleSignOut();
  };

  return (
    <Container>
      <Buttons>
        <Button label="로그아웃" onPress={handleSignOut} sub />
        <Button label="회원 탈퇴" onPress={handleExit} sub />
      </Buttons>
    </Container>
  );
}

const Container = styled.View`
  flex: 1;
  padding: 20px;
  background-color: ${props => props.theme.color.grey[100]};
`;

const Buttons = styled.View`
  gap: 16px;
`;
