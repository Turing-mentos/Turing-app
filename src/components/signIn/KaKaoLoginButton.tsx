import React from 'react';
import styled from '@emotion/native';

import useSignIn from '../../hooks/useSignIn';

export default function KakaoLoginButton() {
  const {handleSignInKakao} = useSignIn();

  return (
    <KakaoButton onPress={() => handleSignInKakao()}>
      <KakaoContent>
        <KakaoIcon
          source={require('../../../assets/images/signin/Kakao.png')}
        />
        <KakaoText>카카오 계정으로 로그인</KakaoText>
      </KakaoContent>
    </KakaoButton>
  );
}

const KakaoButton = styled.TouchableOpacity`
  border-radius: 5px;
  background-color: #fee500;
  padding: 13px 28px;
`;

const KakaoContent = styled.View`
  flex-direction: row;
  align-items: center;
  gap: 14px;
`;

const KakaoIcon = styled.Image`
  width: 18px;
  height: 18px;
`;

const KakaoText = styled.Text`
  color: #191600;

  /* Text/SB18 */
  font-family: Pretendard;
  font-size: 18px;
  font-style: normal;
  font-weight: 600;
  line-height: 27px; /* 27px */
`;
