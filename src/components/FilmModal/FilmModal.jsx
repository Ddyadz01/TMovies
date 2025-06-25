import { useEffect, useRef, useState } from 'react'

import { Loader } from '../Loader/Loader'
import { Button } from '../Index.js';

import { useVideoModal } from '../../hooks/useVideoModal';

import { FormatSeconds } from '../../utils/SecondsFormat'

import { CircleX, MonitorPlay, PlayIcon, Volume2Icon, VolumeOff, X } from 'lucide-react';
import { ModalHeader } from './ModalHeader.jsx';
import { ModalVideo } from './ModalVideo.jsx';
import { ModalFilmInfo } from './ModalFilmInfo.jsx';

import styles from './film-modal.module.scss'
import { useCurrentFilm } from '../../store/store.js';

export const FilmModal = ({ setSearchParams, setIsModal }) => {

  const videoRef = useRef(null)

  const {  currentMovie } = useCurrentFilm((state) => state)

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
  } = useVideoModal(setSearchParams,setIsModal, videoRef)

  return (
    <>
      <title>{'TMovie' + ' | ' + currentMovie.title}</title>
      <div className={styles['film--modal']}>
        <div className={styles['film--modal__content']}>
          <ModalHeader  closeHandler={closeHandler} />
          <div className={styles['film--modal__body']}>
            <ModalVideo
              videoRef={videoRef}
              isPlaying={isPlaying}
              isMuted={isMuted}
              progress={progress}
              timeUpdate={timeUpdate}
              volumeOff={volumeOff}
            />
            <ModalFilmInfo videoRef = {videoRef} />
          </div>
        </div>
      </div>
    </>
  )
}
