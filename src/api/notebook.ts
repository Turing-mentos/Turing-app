import http from '../utils/http';

interface CreateNotebookRequest {
  scheduleId: number;
  deadline: string;
}

interface CreateNotebookResponse {
  senderId: number;
  senderRole: 'TEACHER' | 'STUDENT';
  receiverId: number;
  receiverRole: 'TEACHER' | 'STUDENT';
  notebookId: number;
}

interface UpdateNotebookRequest {
  notebookId: number;
  deadline: string;
}

interface CheckLatestNotebookResponse {
  scheduleId: number;
  isExist: boolean;
}

/**
 * 알림장 생성
 *
 * @param request
 * @returns
 */
async function createNotebook(request: CreateNotebookRequest) {
  return await http.post<CreateNotebookResponse>('/notebook', request);
}

/**
 * 알림장 업데이트(데드라인)
 *
 * @param request
 * @returns
 */
async function updateNotebook(request: UpdateNotebookRequest) {
  return await http.patch<number>('/notebook', request);
}

async function getNotebookDetail() {}

async function deleteNotebook(notebookId: number) {
  return await http.delete(`/notebook/${notebookId}`);
}
async function checkLatestNotebook(studyRoomId: number) {
  const params = new URLSearchParams();
  params.append('studyRoomId', studyRoomId + '');

  return await http.get<CheckLatestNotebookResponse>(
    `/notebook/latest-notebook?${params.toString()}`,
  );
}

export const NotebookAPI = {
  createNotebook,
  updateNotebook,
  deleteNotebook,
  getNotebookDetail,
  checkLatestNotebook,
};
