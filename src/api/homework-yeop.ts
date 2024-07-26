import http from '../utils/http';

export interface Homework {
  homeworkId?: number;
  category: string;
  title: string;
  rangeType: string;
  rangeStart: number;
  rangeEnd: number;
  content: string;
  memo: string;
  notebookId?: number;
}

/**
 * 숙제 완료 토글
 *
 * @param homeworkId
 * @returns
 */
async function toggleCompleteHomework(homeworkId: number) {
  return await http.patch<number>('/homework', homeworkId);
}

/**
 * 숙제 생성
 *
 * @param homework
 * @returns
 */
async function createHomework(homework: Homework) {
  return await http.post<number>('/homework', homework);
}

/**
 * 숙제 수정
 *
 * @param homework
 * @returns
 */
async function updateHomework(homework: Homework) {
  return await http.put<number>('/homework', homework);
}

async function deleteHomework(homeworkId: number) {
  return await http.delete<null>(`/homework/${homeworkId}`);
}

export const HomeworkAPI = {
  toggleCompleteHomework,
  createHomework,
  updateHomework,
  deleteHomework,
};
