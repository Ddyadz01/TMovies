import { useEffect, useState, useRef } from 'react'
import { SLIDES } from '../../constants'

export const useSlider = () => {
  const [currentPosition, setCurrentPossition] = useState(0)
  const [activeId, setActiveId] = useState(2)
  const [slideWidth, setSlideWidth] = useState(800)
  const [slideMargin, setSlideMargin] = useState(20)
  const [isDragging, setIsDragging] = useState(false)
  const [startX, setStartX] = useState(0)
  const [currentX, setCurrentX] = useState(0)
  
  const sliderRef = useRef(null)

  // Определяем размеры слайдов в зависимости от ширины экрана
  const getSlideDimensions = () => {
    const width = window.innerWidth
    
    // Учитываем ширину сайдбара
    let sidebarWidth = 280 // десктоп
    if (width <= 768) {
      sidebarWidth = 0 // мобильные - сайдбар скрыт
    } else if (width <= 1024) {
      sidebarWidth = 240 // планшеты
    }
    
    const availableWidth = width - sidebarWidth - 40 // отступы контента
    
    if (width <= 480) {
      return { width: availableWidth - 80, margin: 10 } // Учитываем отступы для кнопок
    } else if (width <= 768) {
      return { width: availableWidth - 100, margin: 15 }
    } else if (width <= 1024) {
      return { width: availableWidth - 120, margin: 20 }
    } else if (width <= 1440) {
      return { width: availableWidth - 140, margin: 20 }
    } else {
      return { width: availableWidth - 160, margin: 20 }
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

  // Определяем возможность навигации
  const canGoPrev = true // Всегда можно, так как слайдер циклический
  const canGoNext = true // Всегда можно, так как слайдер циклический

  return { 
    nextSlide, 
    prevSlide, 
    activeId, 
    currentPosition, 
    slideWidth, 
    slideMargin,
    sliderRef,
    isDragging,
    canGoPrev,
    canGoNext
  }
}
