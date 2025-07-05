import { useEffect, useState } from 'react'
import { SLIDES } from '../../constants'

export const useSlider = () => {
  const [currentPosition, setCurrentPossition] = useState(-1315)

  const [activeId, setActiveId] = useState(2)

  const prevSlide = () => {
    if (activeId == 1) {
      setCurrentPossition(105)
    } else {
      setCurrentPossition(currentPosition + 1420)
      setActiveId(activeId - 1)
    }
  }
  const nextSlide = () => {
    if (activeId == SLIDES.length) {
      setCurrentPossition(105)
      setActiveId(1)
    } else {
      setCurrentPossition(currentPosition - 1420)
      setActiveId(activeId + 1)
    }
  }

  useEffect(() => {
    const interval = setInterval(() => {
      nextSlide()
    }, 3000)

    return () => clearInterval(interval)
  }, [currentPosition])
  return { nextSlide, prevSlide, activeId, currentPosition }
}
