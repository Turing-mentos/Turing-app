import http from '../utils/http';

/**
 * 숙제 완료 토글
 *
 * @param homeworkId
 * @returns
 */
async function toggleCompleteHomework(homeworkId: number) {
  return await http.patch<number>('/homework', homeworkId);
}

export const HomeworkAPI = {toggleCompleteHomework};
