import { useEffect, useState, useRef } from 'react'
import { SLIDES } from '../../constants'

export const useSlider = () => {
  const [currentPosition, setCurrentPossition] = useState(0)
  const [activeId, setActiveId] = useState(2)
  const [slideWidth, setSlideWidth] = useState(1380)
  const [slideMargin, setSlideMargin] = useState(20)
  const [isDragging, setIsDragging] = useState(false)
  const [startX, setStartX] = useState(0)
  const [currentX, setCurrentX] = useState(0)
  
  const sliderRef = useRef(null)

  // Определяем размеры слайдов в зависимости от ширины экрана
  const getSlideDimensions = () => {
    const width = window.innerWidth
    const height = window.innerHeight
    const isLandscape = width > height
    
    if (width <= 480) {
      // Мобильные устройства
      if (isLandscape) {
        return { width: width - 20, margin: 5 }
      }
      return { width: width - 30, margin: 8 }
    } else if (width <= 768) {
      // Планшеты
      if (isLandscape) {
        return { width: width - 40, margin: 10 }
      }
      return { width: width - 60, margin: 12 }
    } else if (width <= 1024) {
      // Маленькие десктопы
      return { width: Math.min(width - 100, 800), margin: 15 }
    } else if (width <= 1440) {
      // Средние десктопы
      return { width: Math.min(width - 120, 1100), margin: 20 }
    } else {
      // Большие десктопы
      return { width: Math.min(width - 140, 1380), margin: 20 }
    }
  }

  // Обновляем размеры при изменении размера окна
  useEffect(() => {
    const updateDimensions = () => {
      const { width, margin } = getSlideDimensions()
      setSlideWidth(width)
      setSlideMargin(margin)
      
      // Пересчитываем позицию при изменении размеров
      const newPosition = -(width + margin * 2) * (activeId - 1)
      setCurrentPossition(newPosition)
    }

    updateDimensions()
    
    // Добавляем debounce для resize события
    let timeoutId
    const handleResize = () => {
      clearTimeout(timeoutId)
      timeoutId = setTimeout(updateDimensions, 100)
    }
    
    window.addEventListener('resize', handleResize)
    
    return () => {
      window.removeEventListener('resize', handleResize)
      clearTimeout(timeoutId)
    }
  }, [activeId])

  const prevSlide = () => {
    if (activeId === 1) {
      setCurrentPossition(0)
      setActiveId(SLIDES.length)
    } else {
      const newPosition = currentPosition + (slideWidth + slideMargin * 2)
      setCurrentPossition(newPosition)
      setActiveId(activeId - 1)
    }
  }

  const nextSlide = () => {
    if (activeId === SLIDES.length) {
      setCurrentPossition(0)
      setActiveId(1)
    } else {
      const newPosition = currentPosition - (slideWidth + slideMargin * 2)
      setCurrentPossition(newPosition)
      setActiveId(activeId + 1)
    }
  }

  // Обработчики для свайпов
  const handleTouchStart = (e) => {
    setIsDragging(true)
    setStartX(e.touches[0].clientX)
    setCurrentX(e.touches[0].clientX)
  }

  const handleTouchMove = (e) => {
    if (!isDragging) return
    setCurrentX(e.touches[0].clientX)
  }

  const handleTouchEnd = () => {
    if (!isDragging) return
    
    const diff = startX - currentX
    const threshold = 50 // Минимальное расстояние для свайпа
    
    if (Math.abs(diff) > threshold) {
      if (diff > 0) {
        nextSlide()
      } else {
        prevSlide()
      }
    }
    
    setIsDragging(false)
  }

  // Добавляем обработчики событий для слайдера
  useEffect(() => {
    const slider = sliderRef.current
    if (!slider) return

    slider.addEventListener('touchstart', handleTouchStart, { passive: true })
    slider.addEventListener('touchmove', handleTouchMove, { passive: true })
    slider.addEventListener('touchend', handleTouchEnd, { passive: true })

    return () => {
      slider.removeEventListener('touchstart', handleTouchStart)
      slider.removeEventListener('touchmove', handleTouchMove)
      slider.removeEventListener('touchend', handleTouchEnd)
    }
  }, [isDragging, startX, currentX])

  useEffect(() => {
    const interval = setInterval(() => {
      if (!isDragging) {
        nextSlide()
      }
    }, 3000)

    return () => clearInterval(interval)
  }, [currentPosition, slideWidth, slideMargin, isDragging])

  return { 
    nextSlide, 
    prevSlide, 
    activeId, 
    currentPosition, 
    slideWidth, 
    slideMargin,
    sliderRef,
    isDragging
  }
}
