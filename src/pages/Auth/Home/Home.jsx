// Components
import { Slider } from '../../../components/Slider/Slider.jsx'
import { MovieCard } from '../../../components/MovieCard/MovieCard.jsx'

// Constants
import { FILMSLIST } from '../../../../constants.jsx'

// Styles
import styles from './home.module.scss'

export const Home = () => {
  // Получаем последние 6 фильмов для секции "Недавно добавленные"
  const recentMovies = FILMSLIST.slice(-6)

  // Получаем все фильмы для секции "Все фильмы"
  const allMovies = FILMSLIST

  return (
    <div className={styles['home']}>
      {/* Слайдер с избранными фильмами */}
      <section className={styles['hero-section']}>
        <Slider />
      </section>

      {/* Секция с недавно добавленными фильмами */}
      <section className={styles['recent-section']}>
        <h2 className={styles['section-title']}>Недавно добавленные</h2>
        <div className={styles['movies-grid']}>
          {recentMovies.map((movie) => (
            <MovieCard key={movie.id} movie={movie} />
          ))}
        </div>
      </section>

      {/* Секция со всеми фильмами */}
      <section className={styles['all-movies-section']}>
        <h2 className={styles['section-title']}>Все фильмы</h2>
        <div className={styles['movies-grid']}>
          {allMovies.map((movie) => (
            <MovieCard key={movie.id} movie={movie} />
          ))}
        </div>
      </section>
    </div>
  )
}
