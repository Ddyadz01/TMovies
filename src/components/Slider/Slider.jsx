import { ChevronLeft, ChevronRight } from 'lucide-react'
import styles from './slider.module.scss'

import { SLIDES } from '../../../constants.jsx'
import { useSlider } from '../../hooks/useSlider.jsx'
export const Slider = () => {
  const { prevSlide, nextSlide, activeId, currentPosition } = useSlider()

  return (
    <div className={styles['slider']}>
      <div className={styles['slider--btn_prev']} onClick={prevSlide}>
        <ChevronLeft />
      </div>
      <div className={styles['slider--track']}>
        <div
          className={styles['slider--content']}
          style={{ transform: `translateX(${currentPosition}px)` }}
        >
          {SLIDES.map((slide) => (
            <div
              className={
                activeId == slide.id ? styles['slide'] + ` ` + styles['active'] : styles['slide']
              }
              key={slide.id}
            >
              <img src={slide.path} alt="" />
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
