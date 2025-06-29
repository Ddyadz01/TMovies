import { create } from 'zustand'


export const useMovieStore = create((set) => ({
  currentMovie: {},
  isFullMovie: false,
  updateCurrentMovie: (newMovie) => set(() => ({ currentMovie: newMovie })),
  updateIsFullMovie: (boolean) => set(() => ({ isFullMovie: boolean })),
}))


