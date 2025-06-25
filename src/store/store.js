import { create } from 'zustand'


export const useCurrentFilm = create((set) => ({
  currentMovie: {},
  isFullMovie: false,
  updateCurrentMovie: (newMovie) => set(() => ({ currentMovie: newMovie })),
  updateIsFullMovie: (boolean) => set(() => ({ isFullMovie: boolean })),
}))


