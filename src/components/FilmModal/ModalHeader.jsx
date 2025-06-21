import styles from './film-modal.module.scss'
import { X } from 'lucide-react';
import { useCurrentFilm } from '../../store/store.js';

export const ModalHeader = ({ closeHandler}) => {
  const {currentFilm} = useCurrentFilm(state => state)
  return (
    <div className={styles['film--modal__header']}>
      <div className={styles['film--modal__header--btns']}>
        <h1>{currentFilm.title}</h1>
      </div>
      <div className={styles['film--modal__header--close']} onClick={closeHandler}>
        <X />
      </div>
    </div>
  )
}