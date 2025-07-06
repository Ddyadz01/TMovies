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
    
    if (width <= 768) {
      // На мобильных - один слайд с небольшими отступами
      return { 
        width: width - 20, // 10px отступ с каждой стороны (учитываем компенсацию в hero-section)
        margin: 0, 
        slidesToShow: 1,
        isMobile: true
      }
    } else {
      // На десктопе - учитываем сайдбар и отступы
      const availableWidth = width - sidebarWidth - 40 // отступы контента
      
      if (width <= 1024) {
        return { width: availableWidth - 120, margin: 20, slidesToShow: 2, isMobile: false }
      } else if (width <= 1440) {
        return { width: availableWidth - 140, margin: 20, slidesToShow: 3, isMobile: false }
      } else {
        return { width: availableWidth - 160, margin: 20, slidesToShow: 3, isMobile: false }
      }
    }
  }

  // Обновляем размеры при изменении размера окна
  useEffect(() => {
    const updateDimensions = () => {
      const { width, margin, slidesToShow, isMobile } = getSlideDimensions()
      setSlideWidth(width)
      setSlideMargin(margin)
      
      // Пересчитываем позицию при изменении размеров
      if (isMobile) {
        // На мобильных - каждый слайд занимает всю ширину
        const newPosition = -width * (activeId - 1)
        setCurrentPossition(newPosition)
      } else {
        // На десктопе - учитываем отступы
        const slideStep = width + margin * 2
        const newPosition = -slideStep * (activeId - 1)
        setCurrentPossition(newPosition)
      }
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
      const { isMobile } = getSlideDimensions()
      if (isMobile) {
        // На мобильных - перемещаем на полную ширину
        const newPosition = currentPosition + slideWidth
        setCurrentPossition(newPosition)
      } else {
        // На десктопе - учитываем отступы
        const slideStep = slideWidth + slideMargin * 2
        const newPosition = currentPosition + slideStep
        setCurrentPossition(newPosition)
      }
      setActiveId(activeId - 1)
    }
  }

  const nextSlide = () => {
    if (activeId === SLIDES.length) {
      setCurrentPossition(0)
      setActiveId(1)
    } else {
      const { isMobile } = getSlideDimensions()
      if (isMobile) {
        // На мобильных - перемещаем на полную ширину
        const newPosition = currentPosition - slideWidth
        setCurrentPossition(newPosition)
      } else {
        // На десктопе - учитываем отступы
        const slideStep = slideWidth + slideMargin * 2
        const newPosition = currentPosition - slideStep
        setCurrentPossition(newPosition)
      }
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
