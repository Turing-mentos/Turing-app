import React from 'react';
import {useNavigation} from '@react-navigation/native';
import styled from '@emotion/native';

import KakaoLoginButton from './KaKaoLoginButton';
import AppleLoginButton from './AppleLoginButton';

export default function SignIn() {
  const navigation = useNavigation();

  return (
    <Container>
      <ContentGroup>
        <MainContent>
          과외 수업을 위한 알리미, {'\n'}튜링에 오신 것을 환영합니다
        </MainContent>
        <SubContent>간편 로그인으로 바로 시작해보세요</SubContent>
      </ContentGroup>

      <IconGroup>
        <Icons>
          <Icon
            source={require('../../../assets/images/signin/signin-icons.png')}
          />
        </Icons>
      </IconGroup>

      <ButtonGroup>
        <KakaoLoginButton />
        <AppleLoginButton />
      </ButtonGroup>
    </Container>
  );
}

const Container = styled.View`
  padding: 0 20px;
`;

const ContentGroup = styled.View`
  margin-top: 88px;
  gap: 8px;
`;

const MainContent = styled.Text`
  color: ${props => props.theme.color.BTN900};

  /* Text/SB26 */
  font-family: Pretendard;
  font-size: 26px;
  font-style: normal;
  font-weight: 600;
  line-height: 39px; /* 39px */
`;

const SubContent = styled.Text`
  color: ${props => props.theme.color.BTN900};

  /* Text/R16 */
  font-family: Pretendard;
  font-size: 16px;
  font-style: normal;
  font-weight: 400;
  line-height: 24px; /* 24px */
`;

const IconGroup = styled.View`
  margin-top: 50px;
`;

const Icons = styled.View`
  width: 240px;
  height: 240px;
  margin: 0 auto;
`;

const Icon = styled.Image`
  width: 240px;
  height: 240px;
`;

const ButtonGroup = styled.View`
  margin-top: 102px;
  gap: 8px;
`;
