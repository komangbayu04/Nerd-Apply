import { create } from 'zustand'

const useGalleryStore = create((set) => ({
  filterFormat: 'all',
  setFilterFormat: (format) => set({ filterFormat: format }),
  filterTheme: 'all',
  setFilterTheme: (theme) => set({ filterTheme: theme }),
  searchQuery: '',
  setSearchQuery: (q) => set({ searchQuery: q }),
}))

export default useGalleryStore
