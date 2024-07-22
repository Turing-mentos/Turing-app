import http from '../utils/http';
import {getStorage, setStorage} from '../utils/storage';
import {fetchFcmToken} from '../utils/fcm';

interface GetUserInfoResponse {
  role: 'TEACHER' | 'STUDENT';
  memberId: number;
  firstName: string;
  lastName: string;
  university: string;
  department: string;
  studentNumber: string;
}

interface SignInResponse {
  email: string;
  accessToken: string;
  refreshToken: string;
}

interface SignUpRequest {
  email: string;
  role: 'TEACHER' | 'STUDENT';
  firstName: string;
  lastName: string;
  provider: 'APPLE' | 'KAKAO';
}

interface SignUpResponse {
  id: number;
  role: 'TEACHER' | 'STUDENT';
  accessToken: string;
  refreshToken: string;
}

/**
 * 엑세스토큰으로 유저 정보 가져오기
 *
 * @returns
 */
async function getUserInfoFromAccessToken() {
  const accessToken = await getStorage('accessToken');
  const fcmToken = await fetchFcmToken();

  const response = await http.post<GetUserInfoResponse>('/auth/login', {
    accessToken,
    fcmToken,
  });
  return response;
}

/**
 * 리프레시토큰으로 엑세스토큰 재발급
 *
 * @returns
 */
async function reissueAccessToken() {
  const refreshToken = await getStorage('refreshToken');

  const response = await http.post<SignInResponse>('/auth/reissue', {
    refreshToken,
  });
  return response;
}

/**
 * 애플 로그인
 *
 * @param appleIdToken
 * @returns
 */
async function signInWithApple(appleIdToken: string) {
  const response = await http.post<SignInResponse>('/auth/verify/apple', {
    appleIdToken,
  });
  return response;
}

/**
 * 카카오 로그인
 *
 * @param kakaoEmail
 * @returns
 */
async function signInWithKakao(kakaoEmail: string) {
  const response = await http.post<SignInResponse>('/auth/verify/kakao', {
    email: kakaoEmail,
  });
  return response;
}

/**
 * 회원가입
 *
 * @param request
 * @returns
 */
async function signUp(request: SignUpRequest) {
  const response = await http.post<SignUpResponse>('/members/signup', request);
  return response;
}

export const AuthAPI = {
  getUserInfoFromAccessToken,
  reissueAccessToken,
  signInWithApple,
  signInWithKakao,
  signUp,
};
