import MockAdapter from 'axios-mock-adapter';

import ResponseDTO from './responseDTO';
import {NotificationDTO, NotificationSettingDTO} from '../api/notification';

const exampleGetNotifications: NotificationDTO[] = [
  {
    id: 1,
    readStatus: true,
    title: '숙제알리미',
    body: '신이현 학생이 아직 숙제를 다하지 못했어요. 수업 전까지 숙제를 끝낼 수 있도록 독려해주세요.',
    category: 'HOMEWORK',
    createdAt: '2024-07-01T12:34:56.789+00:00',
    targetId: 0,
  },
  {
    id: 2,
    readStatus: false,
    title: '새로운 댓글',
    body: '신이현 학생이 댓글을 남겼어요',
    category: 'COMMENT',
    createdAt: '2024-07-01T12:35:56.789+00:00',
    targetId: 12,
  },
  {
    id: 3,
    readStatus: false,
    title: '새로운 질문',
    body: '신이현 학생이 [문풀] 질문을 남겼어요.',
    category: 'QUESTION',
    createdAt: '2024-07-01T12:36:56.789+00:00',
    targetId: 13,
  },
  {
    id: 4,
    readStatus: false,
    title: '리포트 작성하기',
    body: '박민영 학생의 기준 회차를 모두 끝냈어요. 리포트를 작성하고 학부모님께 전달해보세요.',
    category: 'REPORT',
    createdAt: '2024-07-01T12:37:56.789+00:00',
    targetId: 13,
  },
  {
    id: 5,
    readStatus: true,
    title: '수업 일정 변경 요청',
    body: '박민영 학생이 [5/24(금)] 수업을 옮기고 싶어해요.',
    category: 'SCHEDULE_CHANGE',
    createdAt: '2024-07-01T12:37:56.789+00:00',
    targetId: 13,
  },
  {
    id: 6,
    readStatus: true,
    title: '알림장 작성하기',
    body: '신이현 학생의 5회차 수업이 끝났어요. 새로운 알림장을 전달해보세요.',
    category: 'NOTEBOOK',
    createdAt: '2024-07-01T12:37:56.789+00:00',
    targetId: 13,
  },
  {
    id: 7,
    readStatus: true,
    title: '학생의 새로운 시험 일정',
    body: '박민영 학생이 시험 일정을 등록했어요.',
    category: 'NEW_SCHEDULE',
    createdAt: '2024-07-01T12:37:56.789+00:00',
    targetId: 13,
  },
];

const exampleGetNotificationSetting: NotificationSettingDTO[] = [
  {
    id: 1,
    enabled: true,
    category: 'NOTEBOOK',
  },
  {
    id: 2,
    enabled: true,
    category: 'HOMEWORK',
  },
  {
    id: 3,
    enabled: false,
    category: 'SCHEDULE_CHANGE',
  },
  {
    id: 4,
    enabled: false,
    category: 'NEW_SCHEDULE',
  },
  {
    id: 5,
    enabled: true,
    category: 'QUESTION',
  },
  {
    id: 6,
    enabled: true,
    category: 'COMMENT',
  },
  {
    id: 7,
    enabled: true,
    category: 'REPORT',
  },
];

export function setupNotificationInMocks(mock: MockAdapter) {
  // [알림] 전체 조회
  mock
    .onGet('/notification/all')
    .reply(
      200,
      ResponseDTO(true, 'COMMON200', '성공입니다.', exampleGetNotifications),
    );

  // [알림] 읽음 처리
  mock
    .onPatch(/\/notification\/\d+/)
    .reply(200, ResponseDTO(true, 'COMMON200', '성공입니다.', null));

  // [알림] 개수 조회
  mock
    .onGet('/notification/total')
    .reply(200, ResponseDTO(true, 'COMMON200', '성공입니다', {total: 3}));

  // [알림] 설정 조회
  mock
    .onGet('/notification/setting')
    .reply(
      200,
      ResponseDTO(
        true,
        'COMMON200',
        '성공입니다.',
        exampleGetNotificationSetting,
      ),
    );

  // [알림] 설정 변경
  mock
    .onPatch(/\/notification\/setting\/d+/)
    .reply(200, ResponseDTO(true, 'COMMON200', '성공입니다.', null));
}
