import styles from './film-modal.module.scss'
import { X } from 'lucide-react'

export const ModalHeader = ({ closeHandler }) => {
  return (
    <div className={styles['film--modal__header']}>
      <div className={styles['film--modal__header--close']} onClick={closeHandler}>
        <X />
      </div>
    </div>
  )
}
