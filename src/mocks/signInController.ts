import MockAdapter from 'axios-mock-adapter';

export function setupSignInMocks(mock: MockAdapter) {
  // 카카오 로그인
  mock.onPost('/auth/verify/kakao').reply(200, {
    email: 'yeop3415@naver.com',
    accessToken: null,
    refreshToken: null,
  });

  // 애플 로그인
  mock.onPost('/auth/verify/apple').reply(200, {
    email: 'yeop3415@icloud.com',
    accessToken: null,
    refreshToken: null,
  });

  // 유저 정보 가져오기
  mock.onPost('/auth/login').reply(200, {
    role: 'TEACHER',
    memberId: 0,
    firstName: '승엽',
    lastName: '현',
    university: '세종대학교',
    department: '컴퓨터공학과',
    studentNumber: '19011453',
  });
}
