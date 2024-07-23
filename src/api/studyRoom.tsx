import http from '../utils/http';

export interface StudyRoomSummary {
  id: number;
  opponentFirstName: string;
  opponentLastName: string;
  subject: string;
  linkStatus: boolean;
}

interface Time {
  hour: number;
  minute: number;
  second: number;
  nano: number;
}

interface StudyTime {
  day: number;
  startTime: Time;
  endTime: Time;
}

interface StudyRoom {
  studentFirstName: string;
  studentLastName: string;
  studentSchool: string;
  studentYear: string;
  subject: string;
  baseSession: number;
  wage: number;
  studyTimes: StudyTime[];
  startDate: string;
}

export interface StudyRoomDetail {
  opponentFirstName: string;
  opponentLastName: string;
  subject: string;
  studentSchool: string;
  studentYear: string;
  studyTimes: StudyTime[];
  baseSession: number;
  firstSchedule: string;
  wage: number;
  curSession: number;
  curBaseSession: number;
  totalSession: number;
  totalBaseSession: number;
}

interface UpdateStudyRoomRequest {
  subject: string;
  studyTimes: StudyTime[];
  baseSession: number;
  wage: number;
}

interface TeacherInfo {
  subject: string;
  teacherFirstName: string;
  teacherLastName: string;
}

const decodeTime = (localTime: string) => {
  const [hour, minute] = localTime.split(':').map(Number);

  return {
    hour,
    minute,
    nano: 0,
    second: 0,
  };
};

const convertTime = ({
  hour,
  minute,
  second,
  nano,
}: {
  hour: number;
  minute: number;
  second: number;
  nano: number;
}) => {
  return `${hour < 10 ? '0' + hour : hour}:${
    minute < 10 ? '0' + minute : minute
  }`;
};

/**
 * 진행중인 수업 조회(+연결 여부)
 * x
 * @returns
 */
async function getStudyRoomsInProgress() {
  const response = await http.get<StudyRoomSummary[]>('/study-rooms');
  return response;
}

/**
 * 과외 정보 등록
 *
 * @param studyRoom
 * @returns
 */
async function addStudyRoom(studyRoom: StudyRoom) {
  const {studyTimes} = studyRoom;
  const newStudyTimes = studyTimes.map(v => ({
    ...v,
    startTime: convertTime(v.startTime),
    endTime: convertTime(v.endTime),
  }));
  const request = {
    ...studyRoom,
    studyTimes: newStudyTimes,
  };
  const response = await http.post<null>('/study-rooms', request);
  return response;
}

/**
 * 진행중인 수업 상세 조회
 *
 * @param studyRoomId
 * @returns
 */
async function getStudyRoomDetail(studyRoomId: number) {
  const response = await http.get<StudyRoomDetail>(
    `/study-rooms/${studyRoomId}`,
  );
  const {studyTimes} = response.data;
  const newStudyTimes = studyTimes.map(v => ({
    ...v,
    startTime: decodeTime(v.startTime),
    endTime: decodeTime(v.endTime),
  }));

  return {
    ...response,
    data: {
      ...response.data,
      studyTimes: newStudyTimes,
    },
  };
}

/**
 * 과외 정보 수정
 *
 * @param studyRoomId
 * @param request
 * @returns
 */
async function updateStudyRoom(
  studyRoomId: number,
  request: UpdateStudyRoomRequest,
) {
  const {studyTimes} = request;
  const newStudyTimes = studyTimes.map(v => ({
    ...v,
    startTime: convertTime(v.startTime),
    endTime: convertTime(v.endTime),
  }));
  const newRequest = {
    ...request,
    studyTimes: newStudyTimes,
  };
  const response = await http.put<null>(
    `/study-rooms/${studyRoomId}`,
    newRequest,
  );
  return response;
}

/**
 * 과외 정보 삭제
 * @param studyRoomId
 * @returns
 */
async function deleteStudyRoom(studyRoomId: number) {
  const response = await http.delete<null>(`/study-rooms/${studyRoomId}`);
  return response;
}

/**
 * 학생 연결 코드 조회(코드 생성)
 * @param studyRoomId
 * @returns
 */
async function generateStudyRoomCode(studyRoomId: number) {
  const response = await http.get<number>(`/study-rooms/${studyRoomId}/codes`);
  return response;
}

/**
 * 선생님-학생 연결 해제
 * @param studyRoomId
 * @returns
 */
async function disconnectStudyRoom(studyRoomId: number) {
  const response = await http.patch<null>(
    `/study-rooms/${studyRoomId}/disconnect`,
  );
  return response;
}

/**
 * 선생님-학생 연결
 * @param code
 * @returns
 */
async function connectStudyRoom(code: number) {
  const response = await http.patch<null>(`/study-rooms/connect?code=${code}`);
  return response;
}

/**
 * 연결할 선생님 조회
 * @param code
 * @returns
 */
async function getTeacherInfo(code: number) {
  const response = await http.get<TeacherInfo>(
    `/study-rooms/before-connect?code=${code}`,
  );
  return response;
}

export const StudyRoomAPI = {
  getStudyRoomsInProgress,
  addStudyRoom,
  getStudyRoomDetail,
  updateStudyRoom,
  deleteStudyRoom,
  generateStudyRoomCode,
  disconnectStudyRoom,
  connectStudyRoom,
  getTeacherInfo,
};
