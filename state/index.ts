import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

interface SidebarState {
  isSidebarCollapsed: boolean;
  setIsSidebarCollapsed: (isCollapsed: boolean) => void;
}

export const useSidebarStore = create<SidebarState>()(
  persist(
    (set) => ({
      isSidebarCollapsed: false,

      // Function to update the isSidebarCollapsed state
      setIsSidebarCollapsed: (isCollapsed: boolean) =>
        set(() => ({ isSidebarCollapsed: isCollapsed })),
    }),
    {
      name: "sidebar-state", // Key for storing in localStorage
      //storage: createJSONStorage(() => localStorage), // Use localStorage to persist the state
    }
  )
);














// import { createSlice, PayloadAction } from "@reduxjs/toolkit";

// export interface InitialStateTypes {
//   isSidebarCollapsed: boolean;
// }

// const initialState: InitialStateTypes = {
//   isSidebarCollapsed: false,
// };

// export const globalSlice = createSlice({
//   name: "global",
//   initialState,
//   reducers: {
//     setIsSidebarCollapsed: (state, action: PayloadAction<boolean>) => {
//       state.isSidebarCollapsed = action.payload;
//     },
//   },
// });

// export const { setIsSidebarCollapsed } = globalSlice.actions;

// export default globalSlice.reducer;