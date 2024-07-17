import * as KakaoLogin from '@react-native-seoul/kakao-login';
import appleAuth from '@invertase/react-native-apple-authentication';
import {useNavigation, CommonActions} from '@react-navigation/native';

import http from '../utils/http';
import {setStorage} from '../utils/storage';

interface SignInResponseDTO {
  accessToken: string;
  refreshToken: string;
  email: string;
}

export default function useSignIn() {
  const navigation = useNavigation();

  function goToHome() {
    navigation.dispatch(
      CommonActions.reset({
        index: 0,
        routes: [{name: 'MainTab'}],
      }),
    );
  }

  async function handleSignInApple() {
    // performs login request
    const appleAuthRequestResponse = await appleAuth.performRequest({
      requestedOperation: appleAuth.Operation.LOGIN,
      // Note: it appears putting FULL_NAME first is important, see issue #293
      requestedScopes: [appleAuth.Scope.FULL_NAME, appleAuth.Scope.EMAIL],
    });
    // get current authentication state for user
    // /!\ This method must be tested on a real device. On the iOS simulator it always throws an error.
    const credentialState = await appleAuth.getCredentialStateForUser(
      appleAuthRequestResponse.user,
    );

    // use credentialState response to ensure the user is authenticated
    if (credentialState === appleAuth.State.AUTHORIZED) {
      // user is authenticated
    }
  }

  async function handleSignInKakao() {
    try {
      const kakaoResponse = await KakaoLogin.getProfile();
      const response = await http.post<SignInResponseDTO>('/auth/kakao/login', {
        email: kakaoResponse.email,
        kakaoNickname: kakaoResponse.nickname,
      });

      if (!response.data) {
        throw new Error('서버 응답 오류');
      }

      const {accessToken, refreshToken} = response.data;
      await setStorage('accessToken', accessToken);
      await setStorage('refreshToken', refreshToken);

      goToHome();
    } catch (err) {
      console.log('카카오 로그인 에러:', err);
    }
  }

  return {
    handleSignInKakao,
    handleSignInApple,
  };
}
