import { useEffect, useRef, useState } from 'react'
import { Expand, PauseIcon, PlayIcon, Volume2Icon, VolumeOff, RotateCcw } from 'lucide-react'
import { useMovieStore } from '../../store/store.js'
import { FormatSeconds } from '../../utils/SecondsFormat.jsx'
import { Loader } from '../Loader/Loader.jsx'
import styles from './film-modal.module.scss'

export const ModalVideo = ({ isPlaying, isMuted, videoRef, timeUpdate, progress, buffered, updateBuffered, volumeOff }) => {
  const { currentMovie, isFullMovie, saveWatchedTime, lastWatchedMovie, lastWatchedTime: savedTime } = useMovieStore((state) => state)

  const [duration, setDuration] = useState(0)
  const [currentTime, setCurrentTime] = useState(0)
  const [procent, setProcent] = useState(0)
  const [currentPointerTime, setPointerTime] = useState('00:00')

  const playerRef = useRef()

  useEffect(() => {
    if (videoRef.current && videoRef.current.duration > 0) {
      const formatedTime = FormatSeconds(videoRef.current.duration)
      setDuration(formatedTime)
    }
  }, [videoRef])

  // Устанавливаем время воспроизведения при загрузке полного фильма
  useEffect(() => {
    if (isFullMovie && videoRef.current && lastWatchedMovie && lastWatchedMovie.id === currentMovie.id && savedTime > 0) {
      videoRef.current.currentTime = savedTime
    }
  }, [isFullMovie, currentMovie.id, lastWatchedMovie, savedTime])

  const updateCurrentProgress = (e) => {
    //Обновление текущего времени
    timeUpdate(e)
    if (!videoRef.current) return
    const formatedTime = FormatSeconds(videoRef.current.currentTime)
    setCurrentTime(formatedTime)
  }

  const fullScreenHandler = () => {
    //Вход и выход (Полноэкранный режим)
    if (document.fullscreenElement || document.webkitFullscreenElement) {
      // Выход из полноэкранного режима
      if (document.exitFullscreen) {
        document.exitFullscreen()
      } else if (document.webkitExitFullscreen) {
        document.webkitExitFullscreen()
      }
    } else {
      // Вход в полноэкранный режим
      const element = playerRef.current
      if (element.requestFullscreen) {
        element.requestFullscreen()
      } else if (element.webkitRequestFullscreen) {
        element.webkitRequestFullscreen()
      } else if (element.webkitEnterFullscreen) {
        element.webkitEnterFullscreen()
      }
    }
  }

  const onMouseMove = (e) => {
    //Наводим мышку на progress-bar
    if (e.target === e.currentTarget) {
      if (videoRef.current.duration <= 0) return false
      const width = e.nativeEvent.target.offsetWidth
      const currentPosition = e.nativeEvent.offsetX
      const procentMove = (currentPosition / width) * 100
      if (procentMove < 0) return
      setProcent(procentMove)
      if (!videoRef.current.duration) return
      const currentMoveTime = Math.floor((videoRef.current.duration / 100) * procentMove)
      const time = FormatSeconds(currentMoveTime)
      setPointerTime(time)
    }
  }

  const onMouseOut = () => {
    //Уводим мышку с progress-bar
    setPointerTime(0)
    setProcent(0)
  }

  const progressClick = (e) => {
    //Нажатие на progres-bar для перемотки
    e.stopPropagation()
    const width = e.nativeEvent.target.offsetWidth
    const currentPosition = e.nativeEvent.offsetX
    const procentMove = (currentPosition / width) * 100
    const currentMoveTime = Math.floor((videoRef.current.duration / 100) * procentMove)
    videoRef.current.currentTime = currentMoveTime
  }

  const togglePlay = () => {
    if (videoRef.current.paused) {
      videoRef.current.play()
    } else {
      videoRef.current.pause()
    }
  }

  const restartVideo = () => {
    if (videoRef.current) {
      videoRef.current.currentTime = 0
      videoRef.current.play()
    }
  }

  return (
    <div className={styles['film--modal__video']} ref={playerRef}>
      <video
        style={isPlaying ? {} : { background: 'black' }}
        muted={isMuted}
        playsInline={true}
        ref={videoRef}
        src={currentMovie.trailerUrl}
        onTimeUpdate={updateCurrentProgress}
        onProgress={updateBuffered}
        onCanPlay={updateBuffered}
        onLoadedMetadata={() => {
          if (videoRef.current) {
            const formatedTime = FormatSeconds(videoRef.current.duration)
            setDuration(formatedTime)
          }
        }}
      />
      
      {/* Видео оверлей */}
      <div className={styles['video-overlay']} />
      
      {/* Лоадер */}
      {!isPlaying && <Loader />}
      
      {/* Кнопка повтора */}
      {videoRef.current?.ended && (
        <div className={styles['repeat']} onClick={restartVideo}>
          <RotateCcw />
        </div>
      )}
      
      {/* Плеер */}
      <div className={styles['player']}>
        <div className={styles['player--content']}>
          {/* Кнопка воспроизведения/паузы */}
          <div className={styles['player--icon']} onClick={togglePlay}>
            {videoRef.current?.paused ? (
              <PlayIcon />
            ) : (
              <PauseIcon />
            )}
          </div>
          
          {/* Время */}
          <div className={styles['time-display']}>
            {currentTime}
          </div>
          
          {/* Прогресс бар */}
          <div
            className={styles['player--progress']}
            onClick={progressClick}
            onMouseMove={onMouseMove}
            onMouseOut={onMouseOut}
          >
            <div
              className={styles['player--progress_buffered']}
              style={{ width: buffered + '%' }}
            />
            <div
              className={styles['player--progress_bar']}
              style={{ width: progress + '%' }}
            />
          </div>
          
          {/* Общая длительность */}
          <div className={styles['time-display']}>
            {duration}
          </div>
          
          {/* Управление звуком */}
          <div className={styles['volume-control']} onClick={volumeOff}>
            {isMuted ? (
              <VolumeOff />
            ) : (
              <Volume2Icon />
            )}
          </div>
          
          {/* Полноэкранный режим */}
          <div className={styles['volume-control']} onClick={fullScreenHandler}>
            <Expand />
          </div>
        </div>
      </div>
    </div>
  )
}
