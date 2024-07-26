import http from '../utils/http';

export interface Schedule {
  scheduleId: number;
  date: string;
  studentName: string;
  subject: String;
  session: number;
  startTime: string;
  endTime: string;
  studyRoomId: number;
  baseSession: number;
}

export interface Homework {
  homeworkId: number;
  category: string;
  title: string;
  rangeType: string;
  rangeStart: number;
  rangeEnd: number;
  content: string;
  memo: string;
  isDone: boolean;
}

export interface Notebook {
  notebookId: number;
  studentName: string;
  subject: string;
  deadline: string;
  isDone: boolean;
  homeworkDtoList: Homework[];
}

/**
 * 열흘 간의 스케줄 조회
 *
 * @param startDate
 * @param studyRoomIds
 * @returns
 */
async function getWeeklySchedule(startDate: string, studyRoomIds: number[]) {
  const params = new URLSearchParams();
  params.append('date', startDate);
  studyRoomIds.forEach(id => params.append('studyRoomIds', id.toString()));

  return await http.get<Schedule[]>(`/schedule/weekly?${params.toString()}`);
}

/**
 * 이번주 숙제 현황 조회
 *
 * @param studyRoomIds
 * @returns
 */
async function getWeeklyNotebooks(studyRoomIds: number[]) {
  const params = new URLSearchParams();
  studyRoomIds.forEach(id => params.append('studyRoomIds', id.toString()));

  return await http.get<Notebook[]>(`/notebook?${params.toString()}`);
}

export const HomeAPI = {getWeeklySchedule, getWeeklyNotebooks};
