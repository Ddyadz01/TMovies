import { useEffect,  useState } from 'react';

export  const useVideoModal = (activeFilm, setSearchParams,setIsModal, videoRef ) => {
  const [isMuted, setIsMuted] = useState(true)
  const [progress, setProgress] = useState(0)
  const [isPlaying, setIsPlaying] = useState(false)

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
    console.log('f')
  }

  const viewClick = () => {
    if (videoRef.current.src != 'http://localhost:5173' + activeFilm.fullVideo) {
      videoRef.current.src = activeFilm.fullVideo
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

