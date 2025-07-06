// React
import { useState } from 'react'

// Store
import { useMovieStore } from '../../store/store.js'

// Icons
import { Play, Film, Star, Clock, Eye } from 'lucide-react'

// Styles
import styles from './movie-card.module.scss'

export const MovieCard = ({ movie }) => {
  const [imageLoaded, setImageLoaded] = useState(false)
  const [imageError, setImageError] = useState(false)
  const [isHovered, setIsHovered] = useState(false)

  const { updateCurrentMovie, openModal, updateIsFullMovie } = useMovieStore()

  const handleImageLoad = () => {
    setImageLoaded(true)
  }

  const handleImageError = () => {
    setImageError(true)
    setImageLoaded(true)
  }

  const handleTrailerClick = (e) => {
    e.stopPropagation()
    updateCurrentMovie(movie)
    updateIsFullMovie(false)
    openModal()
  }

  const handleWatchClick = (e) => {
    e.stopPropagation()
    updateCurrentMovie(movie)
    updateIsFullMovie(true)
    openModal()
  }

  const handleCardClick = () => {
    updateCurrentMovie(movie)
    updateIsFullMovie(false)
    openModal()
  }

  return (
    <div 
      className={styles['movie-card']} 
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={handleCardClick}
    >
      <div className={styles['poster-container']}>
        {!imageLoaded && (
          <div className={styles['loading-placeholder']}>
            <div className={styles['loading-spinner']}></div>
          </div>
        )}
        
        {imageError ? (
          <div className={styles['error-placeholder']}>
            <Film size={32} />
            <span>Нет изображения</span>
          </div>
        ) : (
          <img
            src={movie.posterUrl}
            alt={movie.title}
            className={`${styles['poster']} ${imageLoaded ? styles['loaded'] : ''}`}
            onLoad={handleImageLoad}
            onError={handleImageError}
            loading="lazy"
          />
        )}
        
        {/* Возрастной рейтинг */}
        <div className={styles['age-rating']}>
          {movie.minAge}+
        </div>

        {/* Оверлей с кнопками */}
        <div className={`${styles['overlay']} ${isHovered ? styles['visible'] : ''}`}>
          <div className={styles['overlay-content']}>
            <div className={styles['action-buttons']}>
              <button 
                className={`${styles['action-btn']} ${styles['trailer-btn']}`}
                onClick={handleTrailerClick}
                title="Смотреть трейлер"
              >
                <Play size={16} />
                <span>Трейлер</span>
              </button>
              
              <button 
                className={`${styles['action-btn']} ${styles['watch-btn']}`}
                onClick={handleWatchClick}
                title="Смотреть фильм"
              >
                <Eye size={16} />
                <span>Смотреть</span>
              </button>
            </div>
          </div>
        </div>

        {/* Градиент для лучшей читаемости текста */}
        <div className={styles['gradient-overlay']}></div>
      </div>
      
      <div className={styles['info']}>
        <h3 className={styles['title']} title={movie.title}>
          {movie.title}
        </h3>
        
        <div className={styles['meta']}>
          <div className={styles['meta-item']}>
            <Clock size={12} />
            <span>{movie.year}</span>
          </div>
          <div className={styles['meta-item']}>
            <Star size={12} />
            <span>{movie.country}</span>
          </div>
        </div>
        
        <div className={styles['genres']}>
          {movie.ganres.slice(0, 2).map((genre, index) => (
            <span key={index} className={styles['genre-tag']}>
              {genre}
            </span>
          ))}
          {movie.ganres.length > 2 && (
            <span className={styles['more-genres']}>
              +{movie.ganres.length - 2}
            </span>
          )}
        </div>
      </div>
    </div>
  )
} 