import {create} from 'zustand';

export type Role = 'teacher' | 'student' | undefined;

interface User {
  id: number | undefined;
  firstName: string;
  lastName: string;
  role: Role;

  university?: string;
  department?: string;
  studentNum?: string;
}

interface UserStore {
  user: User;
  setUser: (user: User) => void;
}

const useUserStore = create<UserStore>(set => ({
  user: {
    id: undefined,
    firstName: '',
    lastName: '',
    role: undefined,

    university: '',
    department: '',
    studentNum: '',
  },
  setUser: (newUser: User) => set(state => ({...state, user: newUser})),
}));

export default useUserStore;
