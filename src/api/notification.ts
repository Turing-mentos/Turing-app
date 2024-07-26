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

export const categoryStudent = {
  HOMEWORK: '숙제 콕 찌르기',
  NOTEBOOK: '알림장 업데이트',
  COMMENT: '질문 답변',
  SCHEDULE_CHANGE: '일정 변동 확정',
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
  noticeSettingId: number;
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
  return await http.get<NotificationDTO[]>('/notification/all');
}

/**
 * [알림] 읽음 처리
 * @param notificationId 알림 ID
 */
async function markNotificationAsRead(notificationId: number) {
  return await http.patch<null>(`/notification/${notificationId}`);
}

/**
 * [알림] 설정 조회
 * @returns NotificationSettingDTO[]
 */
async function getNotificationSetting() {
  return await http.get<NotificationSettingDTO[]>('/notification/setting');
}

/**
 * [알림] 설정 변경
 *
 * @param notificationSettingId 알림 설정 ID
 */
async function setNotificationSetting(notificationSettingId: number) {
  return await http.patch<boolean>(
    `/notification/setting/${notificationSettingId}`,
  );
}

/**
 * 알림 설정 생성
 *
 * @param enabled
 * @returns
 */
async function initNotificationSetting(enabled: boolean) {
  return await http.get<NotificationSettingDTO[]>(
    `/notification/setting/init?enabled=${enabled}`,
  );
}

/**
 * [알림] 개수 조회
 * @returns CountOfNotificationDTO
 */
async function getCountOfNotifications() {
  return await http.get<number>('/notification/total');
}

export const NotificationAPI = {
  getNotifications,
  markNotificationAsRead,
  getNotificationSetting,
  setNotificationSetting,
  getCountOfNotifications,
  initNotificationSetting,
};
