import { create } from "zustand";
import { createJSONStorage, devtools, persist } from "zustand/middleware";
import { userSliceType } from "./slice/userSlice";
import createUserSlice from "./slice/userSlice";

const useBoundStore = create<userSliceType>()(
  devtools(
    persist(
      (...a) => ({
        ...createUserSlice(...a),
      }),
      { name: "boundStore", storage: createJSONStorage(() => sessionStorage) }
    )
  )
);
export default useBoundStore;
