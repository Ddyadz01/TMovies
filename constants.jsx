import { ChartNoAxesCombined, HomeIcon } from 'lucide-react'

export const SLIDES = [
  {
    id: 1,
    path: '/slider-iamges/poster1.jpg',
  },
  {
    id: 2,
    path: '/slider-iamges/poster2.jpg',
  },
  {
    id: 3,
    path: '/slider-iamges/poster3.jpg',
  },
  {
    id: 4,
    path: '/slider-iamges/poster4.jpg',
  },
  {
    id: 5,
    path: '/slider-iamges/poster5.jpg',
  },
  {
    id: 6,
    path: '/slider-iamges/poster6.jpg',
  },
]

export const NAV = [
  {
    id: 1,
    title: 'Главаня',
    href: '/',
    icon: HomeIcon,
  },
  {
    id: 2,
    title: 'Популярное',
    href: '/popular',
    icon: ChartNoAxesCombined,
  },
]

export const FILMSLIST = [
  {
    id: 1,
    title: 'Граф Монте-Кристо',
    minAge: '16',
    trailerUrl: '/videos/1.mp4',
    year: 2025,
    country: 'Франция',
    ganres: ['Драма', 'Криминал', 'Боевик'],
    description:
      'Травма разрушила карьеру. Алкоголь превратил жизнь в хаос. Бывшая футбольная звезда теперь вынуждена тренировать подростков в колонии. Столкновение миров неизбежно.',
    posterUrl:
      'data:image/jpeg;base64,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',
  },
  {
    id: 2,
    title: 'Джокер',
    minAge: '16',
    trailerUrl: '/videos/2.mp4',
    year: 2019,
    country: 'США',
    ganres: ['Драма', 'Криминал', 'Триллер'],
    description:
      'История происхождения одного из самых известных злодеев в мире комиксов, Джокера, и его превращение из неудачника в преступного гения.',
    posterUrl:
      'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTXkURXQR4DrMsv5mWpCi_m6om8aVD8rl9NZw&s',
  },
  {
    id: 3,
    title: 'Новичок',
    minAge: '16',
    trailerUrl: '/videos/3.mp4',
    year: 2021,
    country: 'Россия',
    ganres: ['Драма', 'Спорт'],
    description:
      'Молодой хоккеист пытается пробиться в профессиональную лигу, преодолевая трудности и личные проблемы.',
    posterUrl:
      'https://avatars.mds.yandex.net/get-kinopoisk-image/4483445/857e271d-8456-4a08-b7da-3c59a221e2c5/576x',
  },
  {
    id: 4,
    title: 'Каратэ-пацан 2',
    minAge: '16',
    trailerUrl: '/videos/4.mp4',
    year: 1986,
    country: 'США',
    ganres: ['Драма', 'Семейный', 'Спорт'],
    description:
      'Дэниел и его наставник Мияги отправляются в Окинаву, где сталкиваются с новыми вызовами и врагами.',
    posterUrl:
      'https://avatars.mds.yandex.net/get-kinopoisk-image/10953618/3c584080-e30e-4f06-bd6e-f7b3f076069e/600x900',
  },
  {
    id: 5,
    title: 'Интерстеллар',
    minAge: '12',
    trailerUrl: '/videos/1.mp4',
    year: 2014,
    country: 'США',
    ganres: ['Научная фантастика', 'Драма', 'Приключения'],
    description:
      'Группа исследователей отправляется в путешествие через червоточину в космосе, чтобы спасти человечество.',
    posterUrl:
      'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcREvTyVFcx4On1sQ3eKA9sPvos41mejMV-YWA&s',
  },
  {
    id: 6,
    title: 'Начало',
    minAge: '16',
    trailerUrl: '/videos/2.mp4',
    year: 2010,
    country: 'США',
    ganres: ['Научная фантастика', 'Триллер'],
    description:
      'Вор, который крадет корпоративные секреты с помощью технологии совместного сна, получает задание внедрить идею в сознание человека.',
    posterUrl:
      'https://avatars.mds.yandex.net/get-kinopoisk-image/1946459/57165332-a703-410d-b3d8-5ab28ce34caa/180',
  },
  {
    id: 7,
    title: 'Матрица',
    minAge: '16',
    trailerUrl: '/videos/3.mp4',
    year: 1999,
    country: 'США',
    ganres: ['Научная фантастика', 'Боевик'],
    description:
      'Хакер узнает о своей роли в войне против контролирующих человечество компьютеров.',
    posterUrl:
      'https://avatars.mds.yandex.net/get-kinopoisk-image/1946459/258fc3d6-8223-40ce-94ea-c87c2acc9f4b/180',
  },
  {
    id: 8,
    title: 'Титаник',
    minAge: '12',
    trailerUrl: '/videos/4.mp4',
    year: 1997,
    country: 'США',
    ganres: ['Драма', 'Романтика'],
    description:
      'Эпическая история любви на фоне катастрофы, когда Титаник сталкивается с айсбергом.',
    posterUrl: 'https://ir.ozone.ru/s3/multimedia-e/c1000/6667777994.jpg',
  },
  {
    id: 9,
    title: 'Аватар',
    minAge: '12',
    trailerUrl: '/videos/1.mp4',
    year: 2009,
    country: 'США',
    ganres: ['Научная фантастика', 'Приключения'],
    description:
      'Человек отправляется на Пандору, чтобы добыть ценный минерал, но влюбляется в местную жительницу и встает на защиту ее мира.',
    posterUrl:
      'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTn443jGrnmCWyuEL8PNg3Ij1j_heF2Kwcr8g&s',
  },
  {
    id: 10,
    title: 'Властелин колец: Братство кольца',
    minAge: '12',
    trailerUrl: '/videos/2.mp4',
    year: 2001,
    country: 'Новая Зеландия',
    ganres: ['Фэнтези', 'Приключения'],
    description:
      'Хоббит Фродо Бэггинс отправляется в опасное путешествие, чтобы уничтожить кольцо всевластия.',
    posterUrl:
      'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQa6SX8bTtSqFHqHgmmUrEjXuvvkSDMP8OyNg&s',
  },
]
