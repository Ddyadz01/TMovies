import { create } from 'zustand'


export const useCurrentFilm = create((set) => ({
  currentFilm: {},
  updateCurrentMovie: (newMovie) => set(() => ({ currentFilm: newMovie })),
}))


