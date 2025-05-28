import { Link, useLocation } from 'react-router-dom'
import styles from './sidebar.module.scss'
import { NAV } from '../../../constants.jsx'

export const Sidebar = () => {
  const { pathname } = useLocation()

  return (
    <div className={styles['sidebar']}>
      <div className={styles['sidebar--logo']}>
        <h1>TMovie</h1>
      </div>
      <div className={styles['sidebar--nav']}>
        <ul>
          {NAV.map((item) => (
            <li key={item.id} className={pathname == item.href && styles['active']}>
              <Link to={item.href}>
                <item.icon />
                <span>{item.title}</span>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}
