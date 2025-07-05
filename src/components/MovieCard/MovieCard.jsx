// React
import { useState } from 'react'

// Store
import { useMovieStore } from '../../store/store.js'

// Styles
import styles from './movie-card.module.scss'

export const MovieCard = ({ movie }) => {
  const [imageLoaded, setImageLoaded] = useState(false)
  const [imageError, setImageError] = useState(false)

  const { updateCurrentMovie, openModal } = useMovieStore()

  const handleImageLoad = () => {
    setImageLoaded(true)
  }

  const handleImageError = () => {
    setImageError(true)
    setImageLoaded(true)
  }

  const handleCardClick = () => {
    console.log('MovieCard clicked:', movie.title)
    updateCurrentMovie(movie)
    openModal()
    console.log('Modal should be open now')
  }

  return (
    <div className={styles['movie-card']} onClick={handleCardClick}>
      <div className={styles['poster-container']}>
        {!imageLoaded && (
          <div className={styles['loading-placeholder']}>
            <div className={styles['loading-spinner']}></div>
          </div>
        )}
        
        {imageError ? (
          <div className={styles['error-placeholder']}>
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
        
        <div className={styles['overlay']}>
          <div className={styles['age-rating']}>
            {movie.minAge}+
          </div>
          <div className={styles['play-button']}>
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
              <path d="M8 5v14l11-7z" fill="currentColor"/>
            </svg>
          </div>
        </div>
      </div>
      
      <div className={styles['info']}>
        <h3 className={styles['title']}>{movie.title}</h3>
        <div className={styles['meta']}>
          <span className={styles['year']}>{movie.year}</span>
          <span className={styles['country']}>{movie.country}</span>
        </div>
        <div className={styles['genres']}>
          {movie.ganres.slice(0, 2).join(', ')}
        </div>
      </div>
    </div>
  )
} 