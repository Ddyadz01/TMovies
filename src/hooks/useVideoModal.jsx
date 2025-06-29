import { useEffect, useState } from 'react';
import { useMovieStore } from '../store/store';

export  const useVideoModal = (setSearchParams,setIsModal, videoRef ) => {
  const [isMuted, setIsMuted] = useState(true)
  const [progress, setProgress] = useState(0)
  const [isPlaying, setIsPlaying] = useState(false)
  const location = window.location.hostname

  const {updateIsFullMovie} = useMovieStore()


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

    updateIsFullMovie(false)

  }


  return {
    videoRef,
    isMuted,
    progress,
    isPlaying,
    closeHandler,
    volumeOff,
    timeUpdate,
    location
  }
}

