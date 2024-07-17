import http from '../utils/http';

export interface Profile {
  lastName?: string;
  firstName?: string;
  university?: string;
  department?: string;
  studentNum?: string;
}

async function getStudentProfile() {
  try {
    const response = await http.get<Profile>('/student/profile');

    return response.result;
  } catch (err) {
    console.log('getProfileStudent() error:', err);
  }
}

async function getTeacherProfile() {
  try {
    const response = await http.get<Profile>('/teacher/profile');

    return response.result;
  } catch (err) {
    console.log('(): error', err);
  }
}

async function updateStudentProfile(studentProfile: Profile) {
  try {
    const response = await http.patch('/student/profile', studentProfile);

    return response.result;
  } catch (err) {
    console.log('(): error', err);
  }
}

async function updateTeacherProfile(teacherProfile: Profile) {
  try {
    const response = await http.patch('/teacher/profile', teacherProfile);

    return response.result;
  } catch (err) {
    console.log('(): error', err);
  }
}

export const ProfileAPI = {
  getStudentProfile,
  getTeacherProfile,
  updateStudentProfile,
  updateTeacherProfile,
};
