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

/**
 * 알림장 생성
 *
 * @param request
 * @returns
 */
async function createNotebook(request: CreateNotebookRequest) {
  return await http.post<CreateNotebookResponse>('/api/notebook', request);
}

export const NotebookAPI = {createNotebook};
