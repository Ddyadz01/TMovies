import styles from "./button.module.scss"

export const Button = ({children}) => {
  return <button className={styles['button']} disabled>{children}</button>
}