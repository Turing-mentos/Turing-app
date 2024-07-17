import MockAdapter from 'axios-mock-adapter';
import ResponseDTO from './responseDTO';

export function setupProfileInMocks(mock: MockAdapter) {
  // [회원] 프로필 조회 - 학생
  mock.onGet('/student/profile').reply(
    200,
    ResponseDTO(true, 'COMMON200', '성공입니다.', {
      lastName: '현',
      firstName: '승엽',
    }),
  );

  // [회원] 프로필 조회 - 선생님
  mock.onGet('/teacher/profile').reply(
    200,
    ResponseDTO(true, 'COMMON200', '성공입니다.', {
      lastName: '현',
      firstName: '승엽',
      university: '세종대학교',
      department: '컴퓨터공학과',
      studentNum: '19학번',
    }),
  );

  // [회원] 프로필 수정 - 학생
  mock
    .onPatch('/student/profile')
    .reply(200, ResponseDTO(true, 'COMMON200', '성공입니다.', null));

  // [회원] 프로필 수정 - 선생님
  mock
    .onPatch('/teacher/profile')
    .reply(200, ResponseDTO(true, 'COMMON200', '성공입니다.', null));
}
