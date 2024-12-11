import { create } from 'zustand'
import { persist } from 'zustand/middleware'

interface GlobalState {
  sidebarOpen: boolean
  setSidebarOpen: (open: boolean) => void
  searchQuery: string
  setSearchQuery: (query: string) => void
  lastRefresh: Date
  refreshData: () => void
}

export const useGlobalStore = create<GlobalState>()(
  persist(
    (set) => ({
      sidebarOpen: true,
      setSidebarOpen: (open) => set({ sidebarOpen: open }),
      searchQuery: '',
      setSearchQuery: (query) => set({ searchQuery: query }),
      lastRefresh: new Date(),
      refreshData: () => set({ lastRefresh: new Date() }),
    }),
    {
      name: 'global-store',
    }
  )
)
