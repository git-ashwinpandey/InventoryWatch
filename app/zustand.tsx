import {create} from 'zustand'
import { persist } from 'zustand/middleware'

interface GlobalState {
  isSidebarCollapsed: boolean
  setIsSidebarCollapsed: (isCollapsed: boolean) => void
}

export const useGlobalStore = create<GlobalState>()(
  persist(
    (set) => ({
      isSidebarCollapsed: false,
      setIsSidebarCollapsed: (isCollapsed) => set({ isSidebarCollapsed: isCollapsed }),
    }),
    {
      name: 'global-storage',
    }
  )
)