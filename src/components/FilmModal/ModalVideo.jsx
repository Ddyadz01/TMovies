import styles from "./film-modal.module.scss";
import { Loader } from "../Loader/Loader.jsx";
import {
  Expand,
  PauseIcon,
  PlayIcon,
  Volume2Icon,
  VolumeOff,
} from "lucide-react";
import { useMovieStore } from "../../store/store.js";
import { FormatSeconds } from "../../utils/SecondsFormat.jsx";
import { useEffect, useRef, useState } from "react";

export const ModalVideo = ({
  isPlaying,
  isMuted,
  videoRef,
  timeUpdate,
  progress,
  volumeOff,
}) => {
  const { currentMovie, isFullMovie } = useMovieStore((state) => state);

  const [duration, setDuration] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);
  const [procent, setProcent] = useState(0);
  const [currentPointerTime, setPointerTime] = useState("00:00");

  const playerRef = useRef();

  useEffect(() => {
    if (videoRef.current && videoRef.current.duration > 0) {
      const formatedTime = FormatSeconds(videoRef.current.duration);
      setDuration(formatedTime);
    }
  }, [videoRef]);

  const updateCurrentProgress = (e) => {
    //Обновление текущего времени
    timeUpdate(e);
    if (!videoRef.current) return;
    const formatedTime = FormatSeconds(videoRef.current.currentTime);
    setCurrentTime(formatedTime);
  };

  const fullScreenHandler = () => {
    //Вход и выход (Полноэкранный режим)
    if (document.fullscreenElement) {
      document.exitFullscreen();
    } else {
      playerRef.current.requestFullscreen();
    }
  };

  const onMouseMove = (e) => {
    //Наводим мышку на progress-bar
    if (e.target === e.currentTarget) {
      if (videoRef.current.duration <= 0) return false;
      const width = e.nativeEvent.target.offsetWidth;
      const currentPosition = e.nativeEvent.offsetX;
      const procentMove = (currentPosition / width) * 100;
      if (procentMove < 0) return;
      setProcent(procentMove);
      if (!videoRef.current.duration) return;
      const currentMoveTime = Math.floor(
        (videoRef.current.duration / 100) * procentMove,
      );
      const time = FormatSeconds(currentMoveTime);
      setPointerTime(time);
    }
  };

  const onMouseOut = () => {
    //Уводим мышку с progress-bar
    setPointerTime(0);
    setProcent(0);
  };

  const progressClick = (e) => {
    //Нажатие на progres-bar для перемотки
    e.stopPropagation();
    const width = e.nativeEvent.target.offsetWidth;
    const currentPosition = e.nativeEvent.offsetX;
    const procentMove = (currentPosition / width) * 100;
    const currentMoveTime = Math.floor(
      (videoRef.current.duration / 100) * procentMove,
    );
    videoRef.current.currentTime = currentMoveTime;
  };

  //TEst
  return (
    <div className={styles["film--modal__video"]} ref={playerRef}>
      <video
        style={isPlaying ? {} : { background: "black" }}
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
      {isFullMovie ? (
        <div className={styles["player"]}>
          {videoRef.current?.paused ? (
            <PlayIcon
              className={styles["player--icon"]}
              onClick={() => videoRef.current.play()}
            />
          ) : (
            <PauseIcon
              className={styles["player--icon"]}
              onClick={() => videoRef.current.pause()}
            />
          )}
          <div className={styles["player--content"]}>
            <span>{currentTime}</span>
            <div
              className={styles["player--progress"]}
              onClick={progressClick}
              onMouseMove={onMouseMove}
              onMouseOut={onMouseOut}
            >
              <span
                style={{
                  left: procent + "%",
                  display: procent == 0 ? "none" : "block",
                }}
              >
                {currentPointerTime}
              </span>
              <div
                className={styles["player--progress_bar"]}
                style={{ width: progress + "%" }}
              ></div>
            </div>
            <span>{duration}</span>
          </div>
          {isFullMovie ? (
            isMuted ? (
              <VolumeOff onClick={volumeOff} />
            ) : (
              <Volume2Icon onClick={volumeOff} />
            )
          ) : (
            ""
          )}
          <Expand onClick={fullScreenHandler} />
        </div>
      ) : (
        <div
          className={styles["progress"]}
          style={{ width: progress + "%" }}
        ></div>
      )}
      <div className={styles["film--modal__video-footer"]}>
        {!isFullMovie ? (
          isMuted ? (
            <VolumeOff onClick={volumeOff} />
          ) : (
            <Volume2Icon onClick={volumeOff} />
          )
        ) : (
          ""
        )}
      </div>
    </div>
  );
};
