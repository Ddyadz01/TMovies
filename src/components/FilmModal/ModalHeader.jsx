// Icons
import { X } from 'lucide-react'

// Styles
import styles from './film-modal.module.scss'

export const ModalHeader = ({ closeHandler }) => {
  return (
    <div className={styles['modal-header']}>
      <button 
        className={styles['modal-close-btn']} 
        onClick={closeHandler}
        aria-label="Закрыть модальное окно"
      >
        <X size={24} />
      </button>
    </div>
  )
}
