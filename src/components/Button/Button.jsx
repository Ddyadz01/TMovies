// Styles
import styles from "./button.module.scss"

export const Button = ({ children, clickFn }) => {
  return <button onClick={clickFn} className={styles['button']}>{children}</button>
}