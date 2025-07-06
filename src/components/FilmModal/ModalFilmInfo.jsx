// Icons
import { MonitorPlay, Clock, Calendar, MapPin, Star, Play } from 'lucide-react'

// Store
import { useMovieStore } from '../../store/store.js'

// Styles
import styles from './film-modal.module.scss'

export const ModalFilmInfo = ({ videoRef }) => {
  const { currentMovie, isFullMovie, updateIsFullMovie, lastWatchedMovie, lastWatchedTime } = useMovieStore((state) => state)

  const handleFullMovie = () => {
    if (!videoRef.current) return

    videoRef.current.pause()

    if (isFullMovie) {
      videoRef.current.src = currentMovie.trailerUrl
      updateIsFullMovie(false)
    } else {
      updateIsFullMovie(true)
      videoRef.current.src = currentMovie.fullVideo
      
      // Устанавливаем сохраненное время, если это тот же фильм
      if (lastWatchedMovie && lastWatchedMovie.id === currentMovie.id && lastWatchedTime > 0) {
        videoRef.current.addEventListener('loadedmetadata', () => {
          videoRef.current.currentTime = lastWatchedTime
        }, { once: true })
      }
    }

    videoRef.current.play().catch(console.error)
  }

  return (
    <div className={styles['film--modal__info']}>
      {/* Заголовок */}
      <div className={styles['film--modal__title']}>
        <h1>{currentMovie.title}</h1>
      </div>
      
      {/* Мета информация */}
      <div className={styles['film--modal__meta']}>
        <div className={styles['meta-item']}>
          <Calendar size={16} />
          <span>{currentMovie.year}</span>
        </div>
        <div className={styles['meta-item']}>
          <Clock size={16} />
          <span>{currentMovie.duration}</span>
        </div>
        <div className={styles['meta-item']}>
          <MapPin size={16} />
          <span>{currentMovie.country}</span>
        </div>
        {currentMovie.rating && (
          <div className={styles['meta-item']}>
            <Star size={16} />
            <span>{currentMovie.rating}</span>
          </div>
        )}
        <div className={styles['age-rating']}>
          {currentMovie.minAge}+
        </div>
      </div>
      
      {/* Жанры */}
      <div className={styles['film--modal__genres']}>
        {currentMovie.ganres?.map((ganre, idx) => (
          <span key={idx} className={styles['genre-tag']}>
            {ganre}
          </span>
        ))}
      </div>
      
      {/* Описание */}
      <div className={styles['film--modal__description']}>
        <h2>Описание</h2>
        <p>{currentMovie.description}</p>
        
        {/* Продолжительность полного фильма */}
        {currentMovie.fullDuration && (
          <div className={styles['full-duration']}>
            <Clock size={16} />
            <span>Полная продолжительность: {currentMovie.fullDuration}</span>
          </div>
        )}
      </div>
      
      {/* Кнопки действий */}
      <div className={styles['film--modal__actions']}>
        <button 
          className={styles['primary']} 
          onClick={handleFullMovie}
        >
          {isFullMovie ? <MonitorPlay size={18} /> : <Play size={18} />}
          {isFullMovie ? 'Смотреть трейлер' : 'Смотреть фильм'}
        </button>
        
        <button className={styles['secondary']}>
          <Star size={18} />
          В избранное
        </button>
      </div>
    </div>
  )
}