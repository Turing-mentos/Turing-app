import MockAdapter from 'axios-mock-adapter';

export function setupStudyRoomInMocks(mock: MockAdapter) {
  // 진행중인 수업 조회
  mock.onGet('/study-rooms').reply(200, [
    {
      id: 0,
      opponentFirstName: '민영',
      opponentLastName: '박',
      subject: '국어',
      linkStatus: true,
    },
    {
      id: 1,
      opponentFirstName: '희재',
      opponentLastName: '이',
      subject: '수학',
      linkStatus: false,
    },
  ]);

  // 과외 정보 등록
  mock.onPost('/study-rooms').reply(200, null);

  // 진행중인 수업 상세 조회
  mock.onGet('/study-rooms/0').reply(200, {
    opponentFirstName: '민영',
    opponentLastName: '박',
    subject: '국어',
    studentSchool: '튜링고',
    studentYear: '고3',
    studyTimes: [
      {
        day: 0,
        startTime: {
          hour: 12,
          minute: 0,
          second: 0,
          nano: 0,
        },
        endTime: {
          hour: 14,
          minute: 0,
          second: 0,
          nano: 0,
        },
      },
      {
        day: 2,
        startTime: {
          hour: 12,
          minute: 0,
          second: 0,
          nano: 0,
        },
        endTime: {
          hour: 14,
          minute: 0,
          second: 0,
          nano: 0,
        },
      },
    ],
    baseSession: 8,
    firstSchedule: '2024-07-20',
    wage: 20000,
    curSession: 4,
    curBaseSession: 8,
    totalSession: 28,
    totalBaseSession: 32,
  });
  mock.onGet('/study-rooms/1').reply(200, {
    opponentFirstName: '희재',
    opponentLastName: '이',
    subject: '영어',
    studentSchool: '튜링고',
    studentYear: '고2',
    studyTimes: [
      {
        day: 3,
        startTime: {
          hour: 10,
          minute: 0,
          second: 0,
          nano: 0,
        },
        endTime: {
          hour: 14,
          minute: 0,
          second: 0,
          nano: 0,
        },
      },
    ],
    baseSession: 8,
    firstSchedule: '2024-07-20',
    wage: 20000,
    curSession: 4,
    curBaseSession: 8,
    totalSession: 28,
    totalBaseSession: 32,
  });

  // 과외 정보 수정
  mock.onPut('/study-rooms/0').reply(200, null);
  mock.onPut('/study-rooms/1').reply(200, null);

  // 과외 정보 삭제
  mock.onDelete('/study-rooms/0').reply(200, null);
  mock.onDelete('/study-rooms/1').reply(200, null);

  // 학생 연결 코드 조회(코드 생성)
  mock.onGet('/study-rooms/0/codes').reply(200, 123456);
  mock.onGet('/study-rooms/1/codes').reply(200, 654321);

  // 선생님-학생 연결 해제
  mock.onPatch('/study-rooms/0/disconnect').reply(200, null);

  // 선생님-학생 연결
  mock.onPatch('/study-rooms/connect?code=654321').reply(200, null);

  // 연결할 선생님 조회
  mock.onGet('/study-rooms/before-connect?code=654321').reply(200, {
    subject: '국어',
    teacherFirstName: '성우',
    teacherLastName: '조',
  });
}
