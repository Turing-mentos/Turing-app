import {create} from 'zustand';

export type Role = 'teacher' | 'student' | undefined;

interface User {
  id: number | undefined;
  firstName: string;
  lastName: string;
  role: Role;
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
  },
  setUser: (newUser: User) => set(state => ({...state, user: newUser})),
}));

export default useUserStore;
