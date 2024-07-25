import React from 'react';
import styled from '@emotion/native';
import {useNavigation, CommonActions} from '@react-navigation/native';

import Button from '../../common/Button';
import {setStorage} from '../../../utils/storage';
import {AuthAPI} from '../../../api/auth';
import useUserStore from '../../../store/useUserStore';

export default function AccountPage() {
  const navigation = useNavigation();
  const {provider} = useUserStore(state => state.user);

  const convertedProvider =
    provider === 'APPLE' ? '애플 로그인' : '카카오 로그인';

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

  const handleWithdraw = async () => {
    try {
      await AuthAPI.withdraw();
      await handleSignOut();
    } catch (err) {
      console.log('회원 탈퇴 에러', err);
    }
  };

  return (
    <Container>
      <Provider>
        <ProviderTitle>로그인 방식</ProviderTitle>
        <ProviderBox>
          <ProviderText>{convertedProvider}</ProviderText>
        </ProviderBox>
      </Provider>

      <Line />

      <Buttons>
        <Button label="로그아웃" onPress={handleSignOut} sub />
        <Button label="회원 탈퇴" onPress={handleWithdraw} sub />
      </Buttons>
    </Container>
  );
}

const Container = styled.View`
  flex: 1;
  padding: 20px;
  background-color: ${props => props.theme.color.grey[100]};
  gap: 24px;
`;

const Line = styled.View`
  height: 4px;
  background-color: ${props => props.theme.color.grey[150]};
`;

const Buttons = styled.View`
  gap: 16px;
`;

const Provider = styled.View`
  gap: 8px;
`;

const ProviderTitle = styled.Text`
  color: ${props => props.theme.color.grey[700]};

  /* Text/M14 */
  font-family: Pretendard;
  font-size: 14px;
  font-style: normal;
  font-weight: 500;
  line-height: 21px; /* 21px */
`;

const ProviderBox = styled.View`
  padding: 12px 16px;
  border-radius: 5px;
  border: 1px solid ${props => props.theme.color.grey[200]};
  background-color: ${props => props.theme.color.grey[150]};
`;

const ProviderText = styled.Text`
  color: ${props => props.theme.color.BTN900};

  /* Text/M14 */
  font-family: Pretendard;
  font-size: 14px;
  font-style: normal;
  font-weight: 500;
  line-height: 21px; /* 21px */
`;
