// Утилита для управления видео из разных источников

export const VIDEO_PROVIDERS = {
  LOCAL: 'local',
  VIMEO: 'vimeo', 
  YOUTUBE: 'youtube',
  CLOUDFLARE: 'cloudflare'
}

export const STORAGE_CONFIG = {
  provider: VIDEO_PROVIDERS.LOCAL, // Пока локально
  vimeo: {
    baseUrl: 'https://player.vimeo.com/video/'
  },
  youtube: {
    baseUrl: 'https://www.youtube.com/embed/'
  },
  cloudflare: {
    baseUrl: process.env.REACT_APP_CLOUDFLARE_URL || ''
  }
}

// Получение URL видео в зависимости от провайдера
export const getVideoUrl = (videoData) => {
  const { provider = VIDEO_PROVIDERS.LOCAL, id, path } = videoData

  switch (provider) {
    case VIDEO_PROVIDERS.VIMEO:
      return `${STORAGE_CONFIG.vimeo.baseUrl}${id}?badge=0&autopause=0&quality_selector=1`
    
    case VIDEO_PROVIDERS.YOUTUBE:
      return `${STORAGE_CONFIG.youtube.baseUrl}${id}?controls=0&modestbranding=1`
    
    case VIDEO_PROVIDERS.CLOUDFLARE:
      return `${STORAGE_CONFIG.cloudflare.baseUrl}/${path}`
    
    case VIDEO_PROVIDERS.LOCAL:
    default:
      return path || videoData // Для обратной совместимости
  }
}

// Проверка, нужен ли iframe вместо video элемента
export const needsIframe = (provider) => {
  return provider === VIDEO_PROVIDERS.VIMEO || provider === VIDEO_PROVIDERS.YOUTUBE
}

// Функция для миграции локальных видео на Cloudflare
export const migrateToCloudflare = (localPath) => {
  return {
    provider: VIDEO_PROVIDERS.CLOUDFLARE,
    path: localPath.replace('/videos/', '')
  }
}

// Функция для создания записи Vimeo
export const createVimeoVideo = (vimeoId) => {
  return {
    provider: VIDEO_PROVIDERS.VIMEO,
    id: vimeoId
  }
}