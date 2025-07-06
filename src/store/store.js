import { create } from 'zustand'

// Загрузка данных из localStorage
const loadLastWatched = () => {
  try {
    const saved = localStorage.getItem('lastWatchedMovie')
    if (saved) {
      return JSON.parse(saved)
    }
  } catch (error) {
    console.error('Ошибка загрузки данных о последнем просмотренном фильме:', error)
  }
  return { movie: null, time: 0 }
}

const savedData = loadLastWatched()

export const useMovieStore = create((set, get) => ({
  currentMovie: {},
  isModalOpen: false,
  isFullMovie: false,
  lastWatchedMovie: savedData.movie, // Последний просмотренный фильм
  lastWatchedTime: savedData.time, // Время остановки в секундах
  
  updateCurrentMovie: (newMovie) => set(() => ({ currentMovie: newMovie })),
  openModal: () => set(() => ({ isModalOpen: true })),
  closeModal: () => set(() => ({ isModalOpen: false })),
  updateIsFullMovie: (boolean) => set(() => ({ isFullMovie: boolean })),
  
  // Сохранить время просмотра фильма (только для полного фильма)
  saveWatchedTime: (movie, currentTime) => {
    const { isFullMovie } = get()
    if (isFullMovie) {
      const data = { movie, time: currentTime }
      set(() => ({
        lastWatchedMovie: movie,
        lastWatchedTime: currentTime
      }))
      
      // Сохраняем в localStorage
      try {
        localStorage.setItem('lastWatchedMovie', JSON.stringify(data))
      } catch (error) {
        console.error('Ошибка сохранения данных о последнем просмотренном фильме:', error)
      }
    }
  },
  
  // Очистить данные о последнем просмотренном фильме
  clearLastWatched: () => {
    set(() => ({
      lastWatchedMovie: null,
      lastWatchedTime: 0
    }))
    
    // Удаляем из localStorage
    try {
      localStorage.removeItem('lastWatchedMovie')
    } catch (error) {
      console.error('Ошибка удаления данных о последнем просмотренном фильме:', error)
    }
  },
}))


