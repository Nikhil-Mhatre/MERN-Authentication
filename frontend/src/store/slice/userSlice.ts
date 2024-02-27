import { StateCreator } from "zustand";

interface userType {
  id: string;
  username: string;
  email: string;
}

interface userSliceType extends userType {
  addUser: (userInfo: userType) => void;
  removeUser: () => void;
}

const createUserSlice: StateCreator<userSliceType> = (set) => ({
  id: " ",
  username: " ",
  email: " ",
  addUser: (userInfo) =>
    set(() => ({
      id: userInfo.id,
      username: userInfo.username,
      email: userInfo.email,
    })),
  removeUser: () =>
    set(() => ({
      id: "",
      username: "",
      email: "",
    })),
});

export default createUserSlice;
export type { userSliceType };
