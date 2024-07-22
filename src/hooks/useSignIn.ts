import * as KakaoLogin from '@react-native-seoul/kakao-login';
import appleAuth from '@invertase/react-native-apple-authentication';
import {useNavigation, CommonActions} from '@react-navigation/native';

import {setStorage} from '../utils/storage';
import {AuthAPI} from '../api/auth';
import useUserStore from '../store/useUserStore';

export default function useSignIn() {
  const navigation = useNavigation();
  const setUser = useUserStore(state => state.setUser);

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
      await KakaoLogin.login();
      const kakaoResponse = await KakaoLogin.getProfile();
      const {email} = kakaoResponse;
      console.log('kakao email:', email);
      const response = await AuthAPI.signInWithKakao(email);
      console.log('handleSignInKakao response:', response);

      const {accessToken, refreshToken} = response.data!;

      if (!accessToken) {
        navigation.navigate('SignUp', {email, provider: 'KAKAO'});
        return;
      }

      await setStorage('accessToken', accessToken);
      await setStorage('refreshToken', refreshToken);

      const userInfoResponse = await AuthAPI.getUserInfoFromAccessToken();

      if (userInfoResponse.data) {
        const {
          memberId,
          role,
          firstName,
          lastName,
          university,
          department,
          studentNumber,
        } = userInfoResponse.data;
        const convertedRole = role === 'TEACHER' ? 'teacher' : 'student';

        setUser({
          id: memberId,
          role: convertedRole,
          firstName,
          lastName,
          university,
          department,
          studentNum: studentNumber,
        });

        goToHome();
      }
    } catch (err) {
      console.log('카카오 로그인 에러:', err);
    }
  }

  return {
    handleSignInKakao,
    handleSignInApple,
  };
}
