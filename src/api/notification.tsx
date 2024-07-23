import http from '../utils/http';

export const category = {
  HOMEWORK: '숙제 알리미',
  NOTEBOOK: '알림장 작성하기',
  COMMENT: '새로운 댓글',
  QUESTION: '새로운 질문',
  SCHEDULE_CHANGE: '수업 일정 변경 요청',
  NEW_SCHEDULE: '학생의 새로운 시험 일정',
  REPORT: '리포트 작성하기',
  SESSION: '기준회차 추가',
} as const;

export interface NotificationDTO {
  id: number;
  readStatus: boolean;
  title: string;
  body: string;
  category: keyof typeof category;
  createdAt: string;
  targetId: number;
}

export interface NotificationSettingDTO {
  id: number;
  enabled: boolean;
  category: keyof typeof category;
}

export interface CountOfNotificationDTO {
  total: number;
}

/**
 * [알림] 해당 회원의 알림 전체 조회
 * @returns NotificationDTO[]
 */
async function getNotifications() {
  try {
    const response = await http.get<NotificationDTO[]>('/notification/all');

    return response.data;
  } catch (err) {
    console.log('getNotifications() error: ' + err);
  }
}

/**
 * [알림] 읽음 처리
 * @param notificationId 알림 ID
 */
async function markNotificationAsRead(notificationId: number) {
  try {
    await http.patch(`/notification/${notificationId}`);
  } catch (err) {
    console.log('markNotificationAsRead() error: ' + err);
  }
}

/**
 * [알림] 설정 조회
 * @returns NotificationSettingDTO[]
 */
async function getNotificationSetting() {
  try {
    const response = await http.get<NotificationSettingDTO[]>(
      '/notification/setting',
    );

    return response.data;
  } catch (err) {
    console.log('getNotificationSetting() error: ' + err);
  }
}

/**
 * [알림] 설정 변경
 * @param notificationSettingId 알림 설정 ID
 */
async function setNotificationSetting(notificationSettingId: number) {
  try {
    await http.patch(`/notification/setting/${notificationSettingId}`);
  } catch (err) {
    console.log('setNotificationSetting() error: ' + err);
  }
}

/**
 * [알림] 개수 조회
 * @returns CountOfNotificationDTO
 */
async function getCountOfNotifications() {
  try {
    const response = await http.get<CountOfNotificationDTO>(
      '/notification/total',
    );

    return response.data;
  } catch (err) {
    console.log('getCountOfNotifications() error: ' + err);
  }
}

export const NotificationAPI = {
  getNotifications,
  markNotificationAsRead,
  getNotificationSetting,
  setNotificationSetting,
  getCountOfNotifications,
};
