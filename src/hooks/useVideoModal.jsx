import { useEffect, useState } from 'react';
import { useMovieStore } from '../store/store';

export const useVideoModal = (closeModal, videoRef) => {
  const [isMuted, setIsMuted] = useState(true)
  const [progress, setProgress] = useState(0)
  const [buffered, setBuffered] = useState(0)
  const [isPlaying, setIsPlaying] = useState(false)
  const location = window.location.hostname

  const { updateIsFullMovie, currentMovie, isFullMovie, saveWatchedTime } = useMovieStore()

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.play()
    }
  }, [])

  const volumeOff = () => {
    videoRef.current.volume = 0.8
    setIsMuted((prev) => !prev)
  }

  const timeUpdate = (e) => {
    if (!videoRef.current.paused) {
      setIsPlaying(true)
    }
    setProgress((e.target.currentTime / e.target.duration) * 100)
    if (e.target.currentTime === e.target.duration) {
      videoRef.current.currentTime = 0
    }
  }

  const updateBuffered = (e) => {
    if (!videoRef.current || !videoRef.current.buffered.length) return
    
    const buffered = videoRef.current.buffered
    const duration = videoRef.current.duration
    
    if (duration > 0) {
      let bufferedEnd = 0
      for (let i = 0; i < buffered.length; i++) {
        if (buffered.end(i) > bufferedEnd) {
          bufferedEnd = buffered.end(i)
        }
      }
      
      const bufferedPercent = (bufferedEnd / duration) * 100
      setBuffered(bufferedPercent)
    }
  }

  const closeHandler = () => {
    // Сохраняем время просмотра только если это полный фильм
    if (isFullMovie && videoRef.current) {
      saveWatchedTime(currentMovie, videoRef.current.currentTime)
    }
    closeModal()
    updateIsFullMovie(false)
  }

  return {
    videoRef,
    isMuted,
    progress,
    buffered,
    isPlaying,
    closeHandler,
    volumeOff,
    timeUpdate,
    updateBuffered,
    location
  }
}

