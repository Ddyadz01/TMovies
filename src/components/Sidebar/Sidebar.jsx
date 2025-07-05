// React
import { useState } from 'react'

// Routing
import { Link, useLocation } from 'react-router-dom'

// Icons
import { 
  HomeIcon, 
  TrendingUp, 
  Search, 
  Heart, 
  Clock, 
  Settings,
  Menu,
  X
} from 'lucide-react'

// Constants
import { NAV } from '../../../constants.jsx'

// Styles
import styles from './sidebar.module.scss'

export const Sidebar = () => {
  const { pathname } = useLocation()
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  // Основная навигация
  const mainNav = [
    {
      id: 1,
      title: "Главная",
      href: "/home",
      icon: HomeIcon,
    },
    {
      id: 2,
      title: "Популярное",
      href: "#",
      icon: TrendingUp,
    },
    {
      id: 3,
      title: "Поиск",
      href: "#",
      icon: Search,
    },
    {
      id: 4,
      title: "Избранное",
      href: "#",
      icon: Heart,
    },
    {
      id: 5,
      title: "Недавние",
      href: "#",
      icon: Clock,
    },
    {
      id: 6,
      title: "Настройки",
      href: "#",
      icon: Settings,
    },
  ]

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen)
  }

  return (
    <>
      {/* Мобильная кнопка меню */}
      <div className={styles['mobile-menu-btn']} onClick={toggleMobileMenu}>
        {isMobileMenuOpen ? <X /> : <Menu />}
      </div>

      {/* Основной сайдбар */}
      <div className={`${styles['sidebar']} ${isMobileMenuOpen ? styles['mobile-open'] : ''}`}>
        <div className={styles['sidebar--logo']}>
          <h1>TMovie</h1>
          <span className={styles['sidebar--subtitle']}>Кинотека</span>
        </div>
        
        <div className={styles['sidebar--nav']}>
          <div className={styles['nav-section']}>
            <h3 className={styles['nav-section--title']}>Навигация</h3>
            <ul>
              {mainNav.slice(0, 3).map((item) => (
                <li key={item.id} className={pathname === item.href ? styles['active'] : ''}>
                  {item.href === "#" ? (
                    <div className={styles['nav-item']}>
                      <item.icon />
                      <span>{item.title}</span>
                    </div>
                  ) : (
                    <Link to={item.href} onClick={() => setIsMobileMenuOpen(false)}>
                      <item.icon />
                      <span>{item.title}</span>
                    </Link>
                  )}
                </li>
              ))}
            </ul>
          </div>

          <div className={styles['nav-section']}>
            <h3 className={styles['nav-section--title']}>Библиотека</h3>
            <ul>
              {mainNav.slice(3, 6).map((item) => (
                <li key={item.id} className={pathname === item.href ? styles['active'] : ''}>
                  {item.href === "#" ? (
                    <div className={styles['nav-item']}>
                      <item.icon />
                      <span>{item.title}</span>
                    </div>
                  ) : (
                    <Link to={item.href} onClick={() => setIsMobileMenuOpen(false)}>
                      <item.icon />
                      <span>{item.title}</span>
                    </Link>
                  )}
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className={styles['sidebar--footer']}>
          <div className={styles['user-info']}>
            <div className={styles['user-avatar']}>
              <span>👤</span>
            </div>
            <div className={styles['user-details']}>
              <span className={styles['user-name']}>Гость</span>
              <span className={styles['user-status']}>Войти</span>
            </div>
          </div>
        </div>
      </div>

      {/* Оверлей для мобильного меню */}
      {isMobileMenuOpen && (
        <div className={styles['mobile-overlay']} onClick={toggleMobileMenu}></div>
      )}
    </>
  )
}
