// React
import { useState } from 'react'

// Icons
import { ChevronLeft, ChevronRight } from 'lucide-react'

// Constants
import { SLIDES } from '../../../constants.jsx'

// Hooks
import { useSlider } from '../../hooks/useSlider.jsx'

// Styles
import styles from './slider.module.scss'

export const Slider = () => {
  const { 
    prevSlide, 
    nextSlide, 
    activeId, 
    currentPosition, 
    slideWidth, 
    slideMargin,
    sliderRef,
    isDragging
  } = useSlider()

  const [loadingStates, setLoadingStates] = useState({})

  const handleImageLoad = (slideId) => {
    setLoadingStates(prev => ({
      ...prev,
      [slideId]: false
    }))
  }

  const handleImageError = (slideId) => {
    setLoadingStates(prev => ({
      ...prev,
      [slideId]: false
    }))
  }

  const handleImageStartLoad = (slideId) => {
    setLoadingStates(prev => ({
      ...prev,
      [slideId]: true
    }))
  }

  return (
    <div className={styles['slider']} ref={sliderRef}>
      <div className={styles['slider--btn_prev']} onClick={prevSlide}>
        <ChevronLeft />
      </div>
      <div className={styles['slider--track']}>
        <div
          className={styles['slider--content']}
          style={{ 
            transform: `translateX(${currentPosition}px)`,
            transition: isDragging ? 'none' : '0.5s ease-in-out'
          }}
        >
          {SLIDES.map((slide, index) => (
            <div
              className={`${styles['slide']} ${activeId === slide.id ? styles['active'] : ''} ${loadingStates[slide.id] ? styles['loading'] : ''}`}
              key={slide.id}
              style={{ 
                width: `${slideWidth}px`, 
                margin: `0 ${slideMargin}px` 
              }}
            >
              <img 
                src={slide.path} 
                alt={slide.title || `Slide ${index + 1}`}
                loading={index < 3 ? "eager" : "lazy"}
                decoding="async"
                onLoadStart={() => handleImageStartLoad(slide.id)}
                onLoad={() => handleImageLoad(slide.id)}
                onError={() => handleImageError(slide.id)}
              />
            </div>
          ))}
        </div>
      </div>
      <div className={styles['slider--btn_next']} onClick={nextSlide}>
        <ChevronRight />
      </div>
    </div>
  )
}
