import { useRef,  } from 'react'


import { useVideoModal } from '../../hooks/useVideoModal';

import { ModalHeader } from './ModalHeader.jsx';
import { ModalVideo } from './ModalVideo.jsx';
import { ModalFilmInfo } from './ModalFilmInfo.jsx';

import styles from './film-modal.module.scss'
import { useMovieStore } from '../../store/store.js';

export const FilmModal = ({ setSearchParams, setIsModal }) => {

  const videoRef = useRef(null)

  const {  currentMovie } = useMovieStore((state) => state)

  const {
    isMuted,
    progress,
    buffered,
    isPlaying,
    closeHandler,
    volumeOff,
    timeUpdate,
    updateBuffered,
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
              buffered={buffered}
              timeUpdate={timeUpdate}
              updateBuffered={updateBuffered}
              volumeOff={volumeOff}
            />
            <ModalFilmInfo videoRef = {videoRef} />
          </div>
        </div>
      </div>
    </>
  )
}
