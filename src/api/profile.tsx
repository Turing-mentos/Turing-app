import http from '../utils/http';

export interface Profile {
  lastName?: string;
  firstName?: string;
  university?: string;
  department?: string;
  studentNumber?: string;
}

async function getStudentProfile() {
  try {
    const response = await http.get<Profile>('/student/profile');

    return response.data;
  } catch (err) {
    console.log('getProfileStudent() error:', err);
  }
}

async function getTeacherProfile() {
  try {
    const response = await http.get<Profile>('/teacher/profile');

    return response.data;
  } catch (err) {
    console.log('(): error', err);
  }
}

async function updateStudentProfile(studentProfile: Profile) {
  return await http.patch<boolean>('/members/profile', studentProfile);
}

async function updateTeacherProfile(teacherProfile: Profile) {
  return await http.patch<boolean>('/members/profile', teacherProfile);
}

export const ProfileAPI = {
  getStudentProfile,
  getTeacherProfile,
  updateStudentProfile,
  updateTeacherProfile,
};
