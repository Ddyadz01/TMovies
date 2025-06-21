import styles from './film-modal.module.scss';
import { Loader } from '../Loader/Loader.jsx';
import { Volume2Icon, VolumeOff } from 'lucide-react';
import { useCurrentFilm } from '../../store/store.js';

export const ModalVideo = ({isPlaying, isMuted, videoRef, timeUpdate, progress, volumeOff}) => {
  const {currentFilm} = useCurrentFilm(state => state)
  return(
    <div className={styles['film--modal__video']}>
      <video
        style={isPlaying ? {} : { background: 'black' }}
        muted={isMuted}
        playsInline={true}
        ref={videoRef}
        src={currentFilm.trailerUrl}
        onTimeUpdate={timeUpdate}
      ></video>
      {!isPlaying && <Loader />}
      <div className={styles['progress']} style={{ width: progress + '%' }}></div>
      <div className={styles['film--modal__video-footer']}>
        {isMuted ? <VolumeOff onClick={volumeOff} /> : <Volume2Icon onClick={volumeOff} />}
      </div>
    </div>
  )
}