import * as KakaoLogin from '@react-native-seoul/kakao-login';
import appleAuth from '@invertase/react-native-apple-authentication';
import {useNavigation, CommonActions} from '@react-navigation/native';

import {setStorage} from '../utils/storage';
import {AuthAPI} from '../api/auth';
import useUserStore from '../store/useUserStore';
import {showToast} from '../components/common/Toast';

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

  async function saveUserTokens(accessToken: string, refreshToken: string) {
    await setStorage('accessToken', accessToken);
    await setStorage('refreshToken', refreshToken);
  }

  async function fetchUserInfoAndSave() {
    try {
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
      }
    } catch (err) {
      throw new Error('유저 정보 불러오기 실패:' + err);
    }
  }

  async function handleSignInApple() {
    try {
      const appleAuthRequestResponse = await appleAuth.performRequest({
        requestedOperation: appleAuth.Operation.LOGIN,
        requestedScopes: [appleAuth.Scope.FULL_NAME, appleAuth.Scope.EMAIL],
      });
      const credentialState = await appleAuth.getCredentialStateForUser(
        appleAuthRequestResponse.user,
      );

      if (credentialState === appleAuth.State.AUTHORIZED) {
        const {identityToken} = appleAuthRequestResponse;

        if (!identityToken) {
          throw new Error('identityToken이 없습니다.');
        }
        const response = await AuthAPI.signInWithApple(identityToken);
        const {accessToken, refreshToken} = response.data!;

        if (!accessToken) {
          navigation.navigate('SignUp', {email, provider: 'KAKAO'});
          return;
        }

        await saveUserTokens(accessToken, refreshToken);
        await fetchUserInfoAndSave();

        goToHome();
      }
    } catch (err) {
      showToast('로그인 도중 에러가 발생했습니다!');
      console.log('애플 로그인 에러:', err);
    }
  }

  async function handleSignInKakao() {
    try {
      // 카카오 API
      await KakaoLogin.login();
      const kakaoResponse = await KakaoLogin.getProfile();
      const {email} = kakaoResponse;

      // 서버 로그인 시도
      const response = await AuthAPI.signInWithKakao(email);
      const {accessToken, refreshToken} = response.data!;

      if (!accessToken) {
        navigation.navigate('SignUp', {email, provider: 'KAKAO'});
        return;
      }

      await saveUserTokens(accessToken, refreshToken);
      await fetchUserInfoAndSave();

      goToHome();
    } catch (err) {
      showToast('로그인 도중 에러가 발생했습니다!');
      console.log('카카오 로그인 에러:', err);
    }
  }

  return {
    saveUserTokens,
    handleSignInKakao,
    handleSignInApple,
    fetchUserInfoAndSave,
  };
}
