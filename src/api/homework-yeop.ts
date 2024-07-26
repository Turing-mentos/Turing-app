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

export const HomeworkAPI = {toggleCompleteHomework, createHomework};
