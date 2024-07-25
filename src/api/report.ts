import http from '../utils/http';

export interface CreateReportRequest {
  studentId: number;
  name: string;
  subject: string;
  comment: string;
  attitude: string;
  request: string;
  pay: boolean;
}

export interface CreateReportResponse {
  reportId: number;
}

export interface UpdateReportRequest {
  reportId: number;
  paragraphNum: number;
  content: string;
}

export interface ReportDetail {
  reportId: number;
  opening: string;
  studyProgress: string;
  feedback: string;
  money: string;
  closing: string;
  createdAt: string;
  updatedAt: string;
}

export interface ReportSummary {
  session: number;
  studentId: number;
  reportId: number;
  name: string;
  subject: string;
  createdAt: string;
  updatedAt: string;
}

export interface StudentInfo {
  studentId: number;
  subject: string;
  firstName: string;
  lastName: string;
  currentSession: number;
  totalSession: number;
}

/**
 * 리포트 생성
 *
 * @param request
 * @returns
 */
async function createReport(request: CreateReportRequest) {
  const response = await http.post<CreateReportResponse>('/report', request);
  return response;
}

/**
 * 리포트 단락 수정
 *
 * @param request
 * @returns
 */
async function updateReport(request: UpdateReportRequest) {
  return await http.patch<null>('/report', request);
}

/**
 * 리포트 단일 조회
 *
 * @param reportId
 * @returns
 */
async function getReportDetail(reportId: number) {
  return await http.get<ReportDetail>(`/report/${reportId}`);
}

/**
 * 리포트 전체 조회
 *
 * @returns
 */
async function getReportSummaryAll() {
  return await http.get<ReportSummary[]>('/report/all');
}

/**
 * 리포트 최초 진입 시 과외 정보 여부 확인
 *
 * @returns
 */
async function checkExistStudyRoom() {
  return await http.get<boolean>('/report/check');
}

/**
 * 리포트 최초 진입 시 학생 정보 불러오기
 *
 * @returns
 */
async function getStudentsInfo() {
  return await http.get<StudentInfo[]>('/report/init');
}

export const ReportAPI = {
  createReport,
  updateReport,
  getReportDetail,
  getReportSummaryAll,
  checkExistStudyRoom,
  getStudentsInfo,
};
