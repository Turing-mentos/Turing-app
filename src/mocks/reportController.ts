import MockAdapter from 'axios-mock-adapter';

export function setupReportInMocks(mock: MockAdapter) {
  // 리포트 생성
  mock.onPost('/report').reply(200, {reportId: 0});

  // 리포트 단락 수정
  mock.onPatch('/report').reply(200, null);

  // 리포트 단일 조회
  mock.onGet('/report/0').reply(200, {
    reportId: 0,
    opening:
      '안녕하세요, 박민영 학생의 과외를 담당하고 있는 이희재 선생님입니다. 매번 믿고 맡겨주셔서 감사합니다.',
    studyProgress:
      '민영이가 점점 숙제를 잘 해오고 있어요. 숙제의 질도 점점 좋아지고 있고, 공부에 대한 열정이 보입니다. 지난 시간 동안 민영이가 꾸준히 노력하는 모습을 볼 수 있어서 참 기쁩니다.',
    feedback:
      '민영이는 매우 적극적이고 성실하며, 수업 시간 동안 집중력도 높아요. 전체적으로 평가를 하자면, 5점 만점에 4점을 주고 싶습니다. 앞으로 더 발전할 여지가 많아서 기대가 큽니다.',
    money: '이번 달 과외비는 30만원입니다. 다음 수업일까지 입금 부탁드립니다.',
    closing:
      '민영이가 계속해서 좋은 성과를 낼 수 있도록 많은 응원과 격려 부탁드립니다. 함께 힘을 합쳐 민영이의 성장을 돕겠습니다. 감사합니다. 이희재 드림.',
    createdAt: '2024-07-21T06:36:56.403Z',
    updatedAt: '2024-07-21T06:36:56.403Z',
  });

  // 리포트 전체 조회
  mock.onGet('/report/all').reply(200, [
    {
      session: 8,
      studentId: 0,
      reportId: 0,
      firstName: '민영',
      lastName: '박',
      subject: '영어',
      createdAt: '2024-07-21T06:38:13.761Z',
      updatedAt: '2024-07-21T06:38:13.761Z',
    },
    {
      session: 4,
      studentId: 1,
      reportId: 1,
      firstName: '희재',
      lastName: '이',
      subject: '국어',
      createdAt: '2024-06-21T06:38:13.761Z',
      updatedAt: '2024-06-21T06:38:13.761Z',
    },
  ]);

  // 리포트 최초 진입 시 과외 정보 여부 확인
  mock.onGet('/report/check').reply(200, true);

  // 리포트 최초 진입 시 학생들 정보 불러오기
  mock.onGet('/report/init').reply(200, [
    {
      studentId: 1,
      subject: '수학',
      firstName: '이현',
      lastName: '신',
      currentSession: 5,
      totalSession: 8,
    },
    {
      studentId: 2,
      subject: '과학',
      firstName: '범준',
      lastName: '김',
      currentSession: 10,
      totalSession: 10,
    },
  ]);
}
