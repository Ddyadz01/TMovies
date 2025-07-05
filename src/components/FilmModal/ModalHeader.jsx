// Icons
import { X } from 'lucide-react'

// Styles
import styles from './film-modal.module.scss'

export const ModalHeader = ({ closeHandler }) => {
  return (
    <div className={styles['film--modal__header']}>
      <div className={styles['film--modal__header--close']} onClick={closeHandler}>
        <X />
      </div>
    </div>
  )
}
