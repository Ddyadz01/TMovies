# Рекомендации по хранению видео для стриминга

## Текущая проблема

В вашем проекте видео хранятся локально в папке `/videos/`, что создаёт следующие проблемы:

- **Безопасность**: Видео доступны напрямую по URL
- **Размер**: Большие видеофайлы увеличивают размер проекта
- **Производительность**: Нагрузка на основной сервер
- **Масштабируемость**: Сложно управлять большой библиотекой

## Рекомендуемые решения

### 1. AWS S3 + CloudFront (Рекомендуется)

**Преимущества:**
- Масштабируемость до любых объёмов
- Глобальная CDN для быстрой доставки
- Надёжность 99.999999999% (11 девяток)
- Относительно низкая стоимость

**Настройка:**
```javascript
// Пример конфигурации
const AWS_CONFIG = {
  region: 'us-east-1',
  bucket: 'your-movies-bucket',
  cloudfront: 'https://d1234567890.cloudfront.net'
}

// В constants.jsx
export const FILMSLIST = [
  {
    id: 1,
    title: "Граф Монте-Кристо",
    trailerUrl: `${AWS_CONFIG.cloudfront}/trailers/1.mp4`,
    fullVideo: `${AWS_CONFIG.cloudfront}/movies/full5.mp4`,
    // ...
  }
]
```

**Стоимость:** ~$0.023 за ГБ хранения + ~$0.085 за ГБ трафика

### 2. Специализированные видео-платформы

#### VdoCipher (Безопасное видео)
- **DRM защита** от пиратства
- **Динамические водяные знаки**
- **Geo-блокировка**
- **Адаптивное качество**
- Стоимость: от $50/месяц

#### Bunny.net Stream
- **Быстрая CDN** (119 точек присутствия)
- **Защита от хотлинкинга**
- **Адаптивная доставка**
- **Встроенный плеер**
- Стоимость: от $1/месяц + $0.01/ГБ

#### Cloudflare Stream
- **Глобальная CDN**
- **Автоматическое кодирование**
- **Адаптивный битрейт**
- **Встроенная защита**
- Стоимость: $1 за 1000 минут + $1/ТБ доставки

### 3. Самостоятельное решение с CDN

**Компоненты:**
- **Хранилище**: AWS S3, Google Cloud Storage, или любой VPS
- **CDN**: CloudFlare, AWS CloudFront, или Bunny CDN
- **Кодирование**: FFmpeg для создания разных качеств
- **Защита**: Токены доступа, рефереры

### 4. Бесплатные/Дешёвые варианты для тестирования

#### YouTube/Vimeo (Для демо)
```javascript
// Использование Vimeo API
const DEMO_FILMS = [
  {
    id: 1,
    title: "Демо фильм",
    trailerUrl: "https://player.vimeo.com/video/123456789",
    embedId: "123456789"
  }
]
```

#### GitHub LFS (Ограниченно)
- До 1 ГБ бесплатно
- Только для небольших демо-файлов

## Рекомендации по архитектуре

### Структура для продакшена:

```javascript
// config/storage.js
export const STORAGE_CONFIG = {
  provider: 'aws', // 'aws', 'bunny', 'cloudflare'
  baseUrl: process.env.REACT_APP_CDN_URL,
  bucket: process.env.REACT_APP_STORAGE_BUCKET,
  region: process.env.REACT_APP_AWS_REGION
}

// utils/videoManager.js
export const getVideoUrl = (filename, quality = 'auto') => {
  const { provider, baseUrl } = STORAGE_CONFIG
  
  switch (provider) {
    case 'aws':
      return `${baseUrl}/videos/${quality}/${filename}`
    case 'bunny':
      return `${baseUrl}/${filename}?quality=${quality}`
    default:
      return `${baseUrl}/${filename}`
  }
}

// components/VideoPlayer.jsx
import { getVideoUrl } from '../utils/videoManager'

const VideoPlayer = ({ videoId, quality }) => {
  const videoUrl = getVideoUrl(`movie-${videoId}.mp4`, quality)
  
  return (
    <video
      src={videoUrl}
      controls
      preload="metadata"
    />
  )
}
```

### Безопасность:

```javascript
// Генерация подписанных URL (для AWS)
const generateSignedUrl = async (filename) => {
  const response = await fetch('/api/video-token', {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${userToken}`,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ filename, userId })
  })
  
  return response.json()
}
```

## Миграция с текущей структуры

### Шаг 1: Подготовка
```bash
# Создание структуры папок для разных качеств
mkdir -p uploads/{original,720p,480p,360p}
```

### Шаг 2: Кодирование видео
```bash
# FFmpeg для создания разных качеств
ffmpeg -i original.mp4 -vf scale=1280:720 -c:v libx264 -crf 23 720p.mp4
ffmpeg -i original.mp4 -vf scale=854:480 -c:v libx264 -crf 25 480p.mp4
ffmpeg -i original.mp4 -vf scale=640:360 -c:v libx264 -crf 28 360p.mp4
```

### Шаг 3: Загрузка в облако
```javascript
// utils/uploadToCloud.js
export const uploadVideo = async (file, quality) => {
  const formData = new FormData()
  formData.append('video', file)
  formData.append('quality', quality)
  
  const response = await fetch('/api/upload-video', {
    method: 'POST',
    body: formData
  })
  
  return response.json()
}
```

## Мои рекомендации для вашего проекта

### Для разработки/демо:
1. **Vimeo Pro** ($20/месяц) - быстрый старт с готовым плеером
2. **Bunny.net** ($1/месяц) - дешево и функционально

### Для продакшена:
1. **AWS S3 + CloudFront** - если планируете масштабирование
2. **VdoCipher** - если нужна максимальная защита от пиратства
3. **Cloudflare Stream** - если нужен баланс цены и функций

### Первые шаги:
1. Выберите провайдера на основе бюджета и требований
2. Создайте аккаунт и настройте хранилище
3. Обновите `constants.jsx` с новыми URL
4. Добавьте переменные окружения для безопасности
5. Протестируйте с несколькими видео

### Переменные окружения (.env):
```env
REACT_APP_CDN_URL=https://your-cdn.com
REACT_APP_VIDEO_TOKEN=your-secret-token
REACT_APP_STORAGE_PROVIDER=bunny
```

Хотите, чтобы я помог с настройкой конкретного провайдера или покажу, как интегрировать выбранное решение в ваш проект?