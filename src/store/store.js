import { create } from 'zustand'

export const useMovieStore = create((set) => ({
  currentMovie: {},
  isModalOpen: false,
  isFullMovie: false,
  updateCurrentMovie: (newMovie) => set(() => ({ currentMovie: newMovie })),
  openModal: () => set(() => ({ isModalOpen: true })),
  closeModal: () => set(() => ({ isModalOpen: false })),
  updateIsFullMovie: (boolean) => set(() => ({ isFullMovie: boolean })),
}))


