import { useEffect, useRef, useState } from 'react'

import { CircleX, Volume2Icon, VolumeOff } from 'lucide-react'

import { FormatSeconds } from '../../utils/SecondsFormat'

import styles from './film-modal.module.scss'
import { Loader } from '../Loader/Loader'

export const FilmModal = ({ activeFilm, setSearchParams, setIsModal }) => {
  const [isMuted, setIsMuted] = useState(true)
  const [progress, setProgress] = useState(0)
  const [isPlaying, setIsPlaying] = useState(false)
  const location = window.location.hostname
  // const [duration, setDuration] = useState(0)
  // const [currentTime, setCurrentTime] = useState('00:00')

  const videoRef = useRef()

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.play()
    }
  }, [])

  const volumeOff = () => {
    videoRef.current.volume = 0.8
    setIsMuted((prev) => !prev)
  }

  // const handlerDuration = () => {
  //   const { minutes, seconds } = FormatSeconds(videoRef.current.duration)
  //   setDuration(`${minutes}:${seconds}`)
  // }

  const timeUpdate = (e) => {
    if (!videoRef.current.paused) {
      setIsPlaying(true)
    }
    setProgress((e.target.currentTime / e.target.duration) * 100)
    if (e.target.currentTime === e.target.duration) {
      videoRef.current.currentTime = 0
    }
    // const { minutes, seconds } = FormatSeconds(e.target.currentTime)
    // setCurrentTime(
    //   `${minutes < 10 ? '0' + minutes : minutes}:${seconds < 10 ? '0' + seconds : seconds}`,
    // )
  }

  const closeHandler = () => {
    setSearchParams({})
    setIsModal((prev) => !prev)
  }

  const viewClick = () => {
    if (videoRef.current.src != 'http://localhost:5173' + activeFilm.fullVideo) {
      videoRef.current.src = activeFilm.fullVideo
      videoRef.current.play()
    }
  }

  return (
    <>
      <title>{activeFilm.title}</title>
      <div className={styles['film--modal']}>
        <div className={styles['film--modal__content']}>
          <div className={styles['film--modal__header']}>
            <div className={styles['film--modal__header--btns']}>
              <button onClick={viewClick}>Описание</button>
              <button className={styles['active']}>Просмотр</button>
            </div>
            <div className={styles['film--modal__header--close']} onClick={closeHandler}>
              <CircleX />
            </div>
          </div>

          <div className={styles['film--modal__body']}>
            <div className={styles['film--modal__video']}>
              <video
                // poster={activeFilm.posterUrl}
                // onLoadedMetadata={handlerDuration}
                style={isPlaying ? {} : { background: 'black' }}
                muted={isMuted}
                playsInline={true}
                ref={videoRef}
                src={activeFilm.trailerUrl}
                onTimeUpdate={timeUpdate}
              ></video>
              {/* <div className={styles['repeat']}>{!isPlaying && <Repeat />}</div> */}
              {!isPlaying && <Loader />}

              <div className={styles['progress']} style={{ width: progress + '%' }}></div>
              <div className={styles['film--modal__video-footer']}>
                {/* <p>
                {currentTime} / {duration}
              </p> */}

                {isMuted ? <VolumeOff onClick={volumeOff} /> : <Volume2Icon onClick={volumeOff} />}
              </div>
            </div>

            <div className={styles['film--modal__info']}>
              <div className={styles['film--modal__title']}>
                <h1>{activeFilm.title}</h1>
              </div>
              <div className={styles['film--modal__more']}>
                <div className={styles['film--modal__ganres']}>
                  {activeFilm.ganres.map((ganre, idx) => (
                    <p key = {idx}>
                      {ganre} {idx + 1 != activeFilm.ganres.length && '∙'}
                    </p>
                  ))}
                </div>
                <div className={styles['film--modal__country']}>
                  {activeFilm.country + ' ∙ ' + activeFilm.year + ' ∙ '}
                  <div className={styles['film--modal__age']}>{activeFilm.minAge + ' +'}</div>
                </div>
                <div className={styles['film--modal__description']}>
                  <h1>Описание</h1>
                  {activeFilm.description}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
