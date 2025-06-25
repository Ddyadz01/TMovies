import { useEffect, useState } from 'react';
import { useCurrentFilm } from '../store/store.js';

export  const useVideoModal = (setSearchParams,setIsModal, videoRef ) => {
  const [isMuted, setIsMuted] = useState(true)
  const [progress, setProgress] = useState(0)
  const [isPlaying, setIsPlaying] = useState(false)
  const {  currentMovie } = useCurrentFilm((state) => state);
  const location = window.location.hostname


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

  const closeHandler = () => {
    setSearchParams({})
    setIsModal((prev) => !prev)
  }

  const viewClick = () => {
    if (videoRef.current.src != 'http://localhost:5173' + currentMovie.fullVideo) {
      videoRef.current.src = currentMovie.fullVideo
      videoRef.current.play()
    }
  }
  return {
    videoRef,
    isMuted,
    progress,
    isPlaying,
    setIsMuted,
    setProgress,
    closeHandler,
    viewClick,
    volumeOff,
    timeUpdate,
    location
  }
}

