import { useEffect, useRef, useState } from 'react'

import { CircleX, Volume2Icon, VolumeOff } from 'lucide-react'

import { FormatSeconds } from '../../utils/SecondsFormat'

import styles from './film-modal.module.scss'

export const FilmModal = ({ activeFilm, setSearchParams, setIsModal }) => {
  const [isMuted, setIsMuted] = useState(true)
  const [progress, setProgress] = useState(0)
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
    setProgress((e.target.currentTime / e.target.duration) * 100)
    if (e.target.currentTime == e.target.duration) {
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

  return (
    <div className={styles['film--modal']}>
      <div className={styles['film--modal__content']}>
        <div className={styles['film--modal__header']}>
          <CircleX onClick={closeHandler} />
        </div>

        <div className={styles['film--modal__body']}>
          <div className={styles['film--modal__video']}>
            <video
              // poster={activeFilm.posterUrl}
              // onLoadedMetadata={handlerDuration}
              muted={isMuted}
              playsinline
              playsInline={true}
              ref={videoRef}
              src={activeFilm.trailerUrl}
              onTimeUpdate={timeUpdate}
            ></video>
            {/* <div className={styles['repeat']}>{!isPlaying && <Repeat />}</div> */}

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
                  <p>
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
  )
}
