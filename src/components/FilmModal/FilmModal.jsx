import { useEffect, useRef, useState } from 'react'

import { Loader } from '../Loader/Loader'
import { Button } from '../Index.js';

import { useVideoModal } from '../../hooks/useVideoModal';

import { FormatSeconds } from '../../utils/SecondsFormat'

import { CircleX, PlayIcon, Volume2Icon, VolumeOff } from 'lucide-react';
import styles from './film-modal.module.scss'

export const FilmModal = ({ activeFilm, setSearchParams, setIsModal }) => {

  const videoRef = useRef(null)

  const {
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
  } = useVideoModal(activeFilm, setSearchParams,setIsModal, videoRef)

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

                style={isPlaying ? {} : { background: 'black' }}
                muted={isMuted}
                playsInline={true}
                ref={videoRef}
                src={activeFilm.trailerUrl}
                onTimeUpdate={timeUpdate}
              ></video>
              {!isPlaying && <Loader />}

              <div className={styles['progress']} style={{ width: progress + '%' }}></div>
              <div className={styles['film--modal__video-footer']}>

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
                <Button>
                  <PlayIcon />
                  Смотреть
                </Button>
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
