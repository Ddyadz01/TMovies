// Icons
import { MonitorPlay } from 'lucide-react'

// Store
import { useMovieStore } from '../../store/store.js'

// Components
import { Button } from '../Button/Button.jsx'

// Styles
import styles from './film-modal.module.scss'

export const ModalFilmInfo = ({ videoRef }) => {
  const { currentMovie, isFullMovie, updateIsFullMovie } = useMovieStore((state) => state)

  const handleFullMovie = () => {
    if (!videoRef.current) return

    videoRef.current.pause()

    if (isFullMovie) {
      videoRef.current.src = currentMovie.trailerUrl
      updateIsFullMovie(false)
    } else {
      updateIsFullMovie(true)
      videoRef.current.src = currentMovie.fullVideo
    }

    videoRef.current.play().catch(console.error)
  }

  return (
    <div className={styles['film--modal__info']}>
      <div className={styles['film--modal__title']}>
        <h1>{currentMovie.title}</h1>
      </div>
      <div className={styles['film--modal__more']}>
        <div className={styles['film--modal__ganres']}>
          {currentMovie.ganres?.map((ganre, idx) => (
            <p key={idx}>
              {ganre} {idx + 1 !== currentMovie.ganres.length && '∙'}
            </p>
          ))}
        </div>
        <div className={styles['film--modal__country']}>
          {currentMovie.country + ' ∙ ' + currentMovie.year + ' ∙ '}
          <div className={styles['film--modal__age']}>{currentMovie.minAge + ' +'}</div>
        </div>
        <Button clickFn={handleFullMovie}>
          <MonitorPlay />
          {isFullMovie ? 'Смотреть трейлер' : 'Смотреть фильм'}
        </Button>
        <div className={styles['film--modal__description']}>
          <h1>Описание</h1>
          {currentMovie.description}
        </div>
      </div>
    </div>
  )
}