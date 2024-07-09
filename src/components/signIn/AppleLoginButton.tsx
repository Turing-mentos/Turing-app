import React from 'react';
import styled from '@emotion/native';

import useSignIn from '../../hooks/useSignIn';

export default function AppleLoginButton() {
  const {handleSignInApple} = useSignIn();

  return (
    <AppleButton onPress={() => handleSignInApple()}>
      <AppleContent>
        <AppleIcon
          source={require('../../../assets/images/signin/Apple.png')}
        />
        <AppleText>Apple 계정으로 로그인</AppleText>
      </AppleContent>
    </AppleButton>
  );
}

const AppleButton = styled.TouchableOpacity`
  border-radius: 5px;
  background-color: #000;
  padding: 13px 28px;
`;

const AppleContent = styled.View`
  flex-direction: row;
  align-items: center;
  gap: 14px;
`;

const AppleIcon = styled.Image`
  width: 18px;
  height: 18px;
`;

const AppleText = styled.Text`
  color: #fff;

  /* Text/SB18 */
  font-family: Pretendard;
  font-size: 18px;
  font-style: normal;
  font-weight: 600;
  line-height: 27px; /* 27px */
`;
