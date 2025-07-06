# 🚀 Быстрая демонстрация: Интеграция Vimeo (5 минут)

## Шаг 1: Загрузите одно видео на Vimeo

1. Зарегистрируйтесь на [vimeo.com](https://vimeo.com) (бесплатно)
2. Нажмите "Upload" 
3. Загрузите например `public/videos/1.mp4`
4. Поставьте настройки:
   - **Privacy**: Unlisted (не будет в поиске)
   - **Embed**: Allow everywhere
5. Скопируйте ID видео из URL (например: `https://vimeo.com/123456789` → ID: `123456789`)

## Шаг 2: Обновите constants.jsx (тестово для одного фильма)

```javascript
import { createVimeoVideo } from './src/utils/videoManager'

export const FILMSLIST = [
  {
    id: 1,
    title: "Граф Монте-Кристо",
    minAge: "16",
    trailerUrl: createVimeoVideo("123456789"), // Замените на ваш ID
    fullVideo: "/videos/full5.mp4", // Пока оставим локально
    year: 2025,
    country: "Франция",
    ganres: ["Драма", "Криминал", "Боевик"],
    description: "Травма разрушила карьеру...",
    posterUrl: "data:image/jpeg;base64,/9j/4AAQSkZJ..." // остается как есть
  },
  // Остальные фильмы без изменений...
  {
    id: 2,
    title: "Джокер",
    trailerUrl: "/videos/2.mp4", // Локально
    // ...
  }
  // ...
]
```

## Шаг 3: Обновите видеоплеер

```jsx
// src/components/FilmModal/ModalVideo.jsx
import { getVideoUrl, needsIframe } from '../../utils/videoManager'

export const ModalVideo = ({ isPlaying, isMuted, videoRef, timeUpdate, progress, buffered, updateBuffered, volumeOff }) => {
  const { currentMovie, isFullMovie, saveWatchedTime, lastWatchedMovie, lastWatchedTime: savedTime } = useMovieStore((state) => state)

  // Определяем источник видео
  const videoUrl = typeof currentMovie.trailerUrl === 'object' 
    ? getVideoUrl(currentMovie.trailerUrl)
    : currentMovie.trailerUrl

  const isIframe = typeof currentMovie.trailerUrl === 'object' 
    ? needsIframe(currentMovie.trailerUrl.provider)
    : false

  // ... остальной код ...

  return (
    <div className={styles['film--modal__video']} ref={playerRef}>
      {isIframe ? (
        // Для Vimeo/YouTube
        <iframe
          src={videoUrl}
          frameBorder="0"
          allow="autoplay; fullscreen; picture-in-picture"
          allowFullScreen
          style={{ 
            width: '100%', 
            height: '100%',
            background: isPlaying ? 'transparent' : 'black'
          }}
        />
      ) : (
        // Для обычных видео (локальные/Cloudflare)
        <video
          style={isPlaying ? {} : { background: 'black' }}
          muted={isMuted}
          playsInline={true}
          ref={videoRef}
          src={videoUrl}
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
      )}
      
      {/* Показываем загрузчик только для локальных видео */}
      {!isPlaying && !isIframe && <Loader />}
      
      {/* Остальные контролы... */}
    </div>
  )
}
```

## Результат после интеграции:

✅ **Фильм "Граф Монте-Кристо"** будет воспроизводиться с Vimeo  
✅ **Остальные фильмы** остаются локальными  
✅ **Размер проекта** уменьшится на 24MB  
✅ **Нет прямых ссылок** на скачивание для Vimeo видео  

## Что дальше?

После тестирования можете:
1. **Загрузить все видео** на Vimeo
2. **Обновить все записи** в FILMSLIST  
3. **Удалить локальные файлы** из проекта
4. **Или мигрировать на Cloudflare R2** для лучшего контроля

## Альтернатива: Cloudflare R2 (10GB бесплатно)

Если хотите полный контроль над плеером:

```bash
# 1. Установите Wrangler
npm install -g wrangler

# 2. Логин в Cloudflare
wrangler login

# 3. Создайте R2 bucket
wrangler r2 bucket create tmovie-videos

# 4. Загрузите видео
wrangler r2 object put tmovie-videos/1.mp4 --file=./public/videos/1.mp4
wrangler r2 object put tmovie-videos/2.mp4 --file=./public/videos/2.mp4
```

Затем обновите URL в constants.jsx:

```javascript
trailerUrl: "https://pub-xxxxxxxxx.r2.dev/1.mp4"
```

Какой вариант попробуем сначала? Vimeo (проще) или Cloudflare R2 (больше контроля)?