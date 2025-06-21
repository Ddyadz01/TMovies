import styles from './film-modal.module.scss';
import { Button } from '../Button/Button.jsx';
import { MonitorPlay } from 'lucide-react';
import { useCurrentFilm } from '../../store/store.js';

export const ModalFilmInfo = () => {
  const {  currentFilm } = useCurrentFilm((state) => state)
  return (
    <div className={styles['film--modal__info']}>
      <div className={styles['film--modal__title']}>
        <h1>{currentFilm.title}</h1>
      </div>
      <div className={styles['film--modal__more']}>
        <div className={styles['film--modal__ganres']}>
          {currentFilm.ganres.map((ganre, idx) => (
            <p key = {idx}>
              {ganre} {idx + 1 != currentFilm.ganres.length && '∙'}
            </p>
          ))}
        </div>
        <div className={styles['film--modal__country']}>
          {currentFilm.country + ' ∙ ' + currentFilm.year + ' ∙ '}
          <div className={styles['film--modal__age']}>{currentFilm.minAge + ' +'}</div>
        </div>
        <Button>
          <MonitorPlay />
          Смотреть
        </Button>
        <div className={styles['film--modal__description']}>
          <h1>Описание</h1>
          {currentFilm.description}
        </div>
      </div>
    </div>
  )
}