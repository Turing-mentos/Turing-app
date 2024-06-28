import React from 'react';
import styled from '@emotion/native';
import useSignIn from '../../hooks/useSignIn';

export default function KakaoLoginButton() {
  const {handleSignInKakao} = useSignIn();

  return (
    <LoginButton
      title="카카오 계정으로 로그인"
      onPress={() => handleSignInKakao()}
    />
  );
}

const LoginButton = styled.Button`
  margin-bottom: 50px;
`;
