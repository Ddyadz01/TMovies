import styles from './film-modal.module.scss';
import { Button } from '../Button/Button.jsx';
import { MonitorPlay } from 'lucide-react';
import { useCurrentFilm } from '../../store/store.js';

export const ModalFilmInfo = ({videoRef}) => {
  const {  currentMovie,  isFullMovie, updateIsFullMovie } = useCurrentFilm((state) => state)


  const handleFullMovie = () => {
    // if(videoRef.current.src === 'http://localhost:5173' + currentMovie.fullVideo) return
    // console.log(!isFullMovie)
    if(isFullMovie) {
      videoRef.current.pause()
      videoRef.current.src = currentMovie.trailerUrl
      videoRef.current.play()
      updateIsFullMovie(false)
    } else {
      updateIsFullMovie(true)
      videoRef.current.pause()
      videoRef.current.src = currentMovie.fullVideo
      videoRef.current.play()
    }

  }
  return (
    <div className={styles['film--modal__info']}>
      <div className={styles['film--modal__title']}>
        <h1>{currentMovie.title}</h1>
      </div>
      <div className={styles['film--modal__more']}>
        <div className={styles['film--modal__ganres']}>
          {currentMovie.ganres.map((ganre, idx) => (
            <p key = {idx}>
              {ganre} {idx + 1 != currentMovie.ganres.length && '∙'}
            </p>
          ))}
        </div>
        <div className={styles['film--modal__country']}>
          {currentMovie.country + ' ∙ ' + currentMovie.year + ' ∙ '}
          <div className={styles['film--modal__age']}>{currentMovie.minAge + ' +'}</div>
        </div>
        <Button clickFn= {handleFullMovie}>
          <MonitorPlay />
          {isFullMovie ?  'Смотреть трейлер' : 'Смотреть фильм'}
        </Button>
        <div className={styles['film--modal__description']}>
          <h1>Описание</h1>
          {currentMovie.description}
        </div>
      </div>
    </div>
  )
}