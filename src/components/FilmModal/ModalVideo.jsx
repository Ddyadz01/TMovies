import styles from './film-modal.module.scss';
import { Loader } from '../Loader/Loader.jsx';
import { PauseIcon, PlayIcon, Volume2Icon, VolumeOff } from 'lucide-react';
import { useMovieStore } from '../../store/store.js';
import { FormatSeconds } from '../../utils/SecondsFormat.jsx';
import { useEffect, useState } from 'react';

export const ModalVideo = ({isPlaying, isMuted, videoRef, timeUpdate, progress, volumeOff}) => {
  const {currentMovie, isFullMovie} = useMovieStore(state => state)

  const [duration, setDuration] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);

  useEffect(() => {
    if (videoRef.current && videoRef.current.duration > 0) {
      const formatedTime = FormatSeconds(videoRef.current.duration);
      setDuration(formatedTime);
    }
  }, [videoRef]);


  const updateCurrentProgress = (e) => {
    timeUpdate(e)
    if(!videoRef.current) return
    const formatedTime = FormatSeconds(videoRef.current.currentTime)
    setCurrentTime(formatedTime)
  }

  return(
    <div className={styles['film--modal__video']}>
      <video
        style={isPlaying ? {} : { background: 'black' }}
        muted={isMuted}
        playsInline={true}
        ref={videoRef}
        src={currentMovie.trailerUrl}
        onTimeUpdate={updateCurrentProgress}
        onLoadedMetadata={() => {
          if (videoRef.current) {
            const formatedTime = FormatSeconds(videoRef.current.duration);
            setDuration(formatedTime);
          }
        }}
      ></video>
      {!isPlaying && <Loader />}
      {isFullMovie ?
        <div className={styles['player']}>
          {videoRef.current?.paused ? <PlayIcon className={styles['player--icon']} onClick={() => videoRef.current.play()} /> : <PauseIcon className={styles['player--icon']} onClick={() => videoRef.current.pause()} />}
          <div className={styles['player--content']}>
            <span>{currentTime}</span>
            <div className={styles['player--progress']}>
              <div className={styles['player--progress_bar']} style={{ width: progress + '%' }}></div>
            </div>
            <span>{duration}</span>
          </div>
          { isFullMovie ? isMuted  ? <VolumeOff onClick={volumeOff} /> : <Volume2Icon onClick={volumeOff} /> : ''}
        </div>
        :
        <div className={styles['progress']} style={{ width: progress + '%' }}></div>
      }
      <div className={styles['film--modal__video-footer']}>
        { !isFullMovie ? isMuted  ? <VolumeOff onClick={volumeOff} /> : <Volume2Icon onClick={volumeOff} /> : ''}
      </div>
    </div>
  )
}