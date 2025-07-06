// React
import { useState } from 'react'

// Routing
import { Link, useLocation } from 'react-router-dom'

// Icons
import { HomeIcon, TrendingUp, Search, Heart, Clock, Settings, Menu, X, Play } from 'lucide-react'

// Store
import { useMovieStore } from '../../store/store.js'

// Utils
import { FormatSeconds } from '../../utils/SecondsFormat.jsx'

// Constants
import { NAV } from '../../../constants.jsx'

// Styles
import styles from './sidebar.module.scss'

export const Sidebar = () => {
  const { pathname } = useLocation()
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const { lastWatchedMovie, lastWatchedTime, openModal, updateCurrentMovie, clearLastWatched } = useMovieStore()

  // Основная навигация
  const mainNav = [
    {
      id: 1,
      title: 'Главная',
      href: '/',
      icon: HomeIcon,
    },
    {
      id: 2,
      title: 'Популярное',
      href: '#',
      icon: TrendingUp,
    },
    {
      id: 3,
      title: 'Поиск',
      href: '#',
      icon: Search,
    },
    {
      id: 4,
      title: 'Избранное',
      href: '#',
      icon: Heart,
    },
    {
      id: 5,
      title: 'Недавние',
      href: '#',
      icon: Clock,
    },
    {
      id: 6,
      title: 'Настройки',
      href: '#',
      icon: Settings,
    },
  ]

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen)
  }

  const continueWatching = () => {
    if (lastWatchedMovie) {
      updateCurrentMovie(lastWatchedMovie)
      openModal()
    }
  }

  const handleClearHistory = () => {
    clearLastWatched()
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
                  {item.href === '#' ? (
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
                  {item.href === '#' ? (
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

          {/* Секция "Продолжить просмотр" */}
          {lastWatchedMovie && (
            <div className={styles['nav-section']}>
              <div className={styles['nav-section--header']}>
                <h3 className={styles['nav-section--title']}>Продолжить просмотр</h3>
                <button 
                  className={styles['clear-history-btn']} 
                  onClick={handleClearHistory}
                  title="Очистить историю"
                >
                  ×
                </button>
              </div>
              <div className={styles['continue-watching']} onClick={continueWatching}>
                <div className={styles['continue-watching--poster']}>
                  <img src={lastWatchedMovie.posterUrl} alt={lastWatchedMovie.title} />
                  <div className={styles['continue-watching--play-overlay']}>
                    <Play size={20} />
                  </div>
                </div>
                <div className={styles['continue-watching--info']}>
                  <h4>{lastWatchedMovie.title}</h4>
                  <p>Остановились на {FormatSeconds(lastWatchedTime)}</p>
                </div>
              </div>
            </div>
          )}
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
