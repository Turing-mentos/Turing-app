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

async function getWeeklySchedule(startDate: string, studyRoomIds: number[]) {
  const params = new URLSearchParams();
  params.append('date', startDate);
  studyRoomIds.forEach(id => params.append('studyRoomIds', id.toString()));

  return await http.get<Schedule[]>(`/schedule/weekly?${params.toString()}`);
}

export const HomeAPI = {getWeeklySchedule};
