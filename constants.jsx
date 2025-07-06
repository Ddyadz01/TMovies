import { ChartNoAxesCombined, HomeIcon } from "lucide-react";

export const SLIDES = [
  {
    id: 1,
    path: "/slider-images/poster1.jpg",
  },
  {
    id: 2,
    path: "/slider-images/poster2.jpg",
  },
  {
    id: 3,
    path: "/slider-images/poster3.jpg",
  },
  {
    id: 4,
    path: "/slider-images/poster4.jpg",
  },
  {
    id: 5,
    path: "/slider-images/poster5.jpg",
  },
  {
    id: 6,
    path: "/slider-images/poster6.jpg",
  },
];

export const NAV = [
  {
    id: 1,
    title: "Главная",
    href: "/",
    icon: HomeIcon,
  },
  {
    id: 2,
    title: "Популярное",
    href: "/popular",
    icon: ChartNoAxesCombined,
  },
];

export const FILMSLIST = [
  {
    id: 1,
    title: "Граф Монте-Кристо",
    minAge: "16",
    trailerUrl: "/videos/1.mp4",
    fullVideo: "/videos/full5.mp4",
    year: 2025,
    country: "Франция",
    duration: "2:30",
    fullDuration: "2:30:15",
    ganres: ["Драма", "Криминал", "Боевик"],
    description:
      "Травма разрушила карьеру. Алкоголь превратил жизнь в хаос. Бывшая футбольная звезда теперь вынуждена тренировать подростков в колонии. Столкновение миров неизбежно.",
    posterUrl:
      "https://avatars.mds.yandex.net/get-kinopoisk-image/4773937/0c3ac588-4ebd-4c1b-9c3a-230c681d0585/576x",
  },
  {
    id: 2,
    title: "Джокер",
    minAge: "16",
    trailerUrl: "/videos/2.mp4",
    fullVideo: "/videos/1.mp4",
    year: 2019,
    country: "США",
    duration: "2:02",
    fullDuration: "2:02:30",
    ganres: ["Драма", "Криминал", "Триллер"],
    description:
      "История происхождения одного из самых известных злодеев в мире комиксов, Джокера, и его превращение из неудачника в преступного гения.",
    posterUrl:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTXkURXQR4DrMsv5mWpCi_m6om8aVD8rl9NZw&s",
  },
  {
    id: 3,
    title: "Новичок",
    minAge: "16",
    trailerUrl: "/videos/3.mp4",
    fullVideo: "/videos/2.mp4",
    year: 2021,
    country: "Россия",
    duration: "1:45",
    fullDuration: "1:45:20",
    ganres: ["Драма", "Спорт"],
    description:
      "Молодой хоккеист пытается пробиться в профессиональную лигу, преодолевая трудности и личные проблемы.",
    posterUrl:
      "https://avatars.mds.yandex.net/get-kinopoisk-image/4483445/857e271d-8456-4a08-b7da-3c59a221e2c5/576x",
  },
  {
    id: 4,
    title: "Каратэ-пацан 2",
    minAge: "16",
    trailerUrl: "/videos/4.mp4",
    fullVideo: "/videos/3.mp4",
    year: 1986,
    country: "США",
    duration: "1:53",
    fullDuration: "1:53:45",
    ganres: ["Драма", "Семейный", "Спорт"],
    description:
      "Дэниел и его наставник Мияги отправляются в Окинаву, где сталкиваются с новыми вызовами и врагами.",
    posterUrl:
      "https://avatars.mds.yandex.net/get-kinopoisk-image/10953618/3c584080-e30e-4f06-bd6e-f7b3f076069e/600x900",
  },
  {
    id: 5,
    title: "Интерстеллар",
    minAge: "12",
    trailerUrl: "/videos/1.mp4",
    fullVideo: "/videos/4.mp4",
    year: 2014,
    country: "США",
    duration: "2:49",
    fullDuration: "2:49:10",
    ganres: ["Научная фантастика", "Драма", "Приключения"],
    description:
      "Группа исследователей отправляется в путешествие через червоточину в космосе, чтобы спасти человечество.",
    posterUrl:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcREvTyVFcx4On1sQ3eKA9sPvos41mejMV-YWA&s",
  },
  {
    id: 6,
    title: "Начало",
    minAge: "16",
    trailerUrl: "/videos/2.mp4",
    fullVideo: "/videos/1.mp4",
    year: 2010,
    country: "США",
    duration: "2:28",
    fullDuration: "2:28:35",
    ganres: ["Научная фантастика", "Триллер"],
    description:
      "Вор, который крадет корпоративные секреты с помощью технологии совместного сна, получает задание внедрить идею в сознание человека.",
    posterUrl:
      "https://avatars.mds.yandex.net/get-kinopoisk-image/1946459/57165332-a703-410d-b3d8-5ab28ce34caa/180",
  },
  {
    id: 7,
    title: "Матрица",
    minAge: "16",
    trailerUrl: "/videos/3.mp4",
    fullVideo: "/videos/2.mp4",
    year: 1999,
    country: "США",
    duration: "2:16",
    fullDuration: "2:16:25",
    ganres: ["Научная фантастика", "Боевик"],
    description:
      "Хакер узнает о своей роли в войне против контролирующих человечество компьютеров.",
    posterUrl:
      "https://avatars.mds.yandex.net/get-kinopoisk-image/1946459/258fc3d6-8223-40ce-94ea-c87c2acc9f4b/180",
  },
  {
    id: 8,
    title: "Титаник",
    minAge: "12",
    trailerUrl: "/videos/4.mp4",
    fullVideo: "/videos/3.mp4",
    year: 1997,
    country: "США",
    duration: "3:14",
    fullDuration: "3:14:55",
    ganres: ["Драма", "Романтика"],
    description:
      "Эпическая история любви на фоне катастрофы, когда Титаник сталкивается с айсбергом.",
    posterUrl: "https://ir.ozone.ru/s3/multimedia-e/c1000/6667777994.jpg",
  },
  {
    id: 9,
    title: "Аватар",
    minAge: "12",
    trailerUrl: "/videos/1.mp4",
    fullVideo: "/videos/4.mp4",
    year: 2009,
    country: "США",
    duration: "2:42",
    fullDuration: "2:42:30",
    ganres: ["Научная фантастика", "Приключения"],
    description:
      "Человек отправляется на Пандору, чтобы добыть ценный минерал, но влюбляется в местную жительницу и встает на защиту ее мира.",
    posterUrl:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTn443jGrnmCWyuEL8PNg3Ij1j_heF2Kwcr8g&s",
  },
  {
    id: 10,
    title: "Властелин колец: Братство кольца",
    minAge: "12",
    trailerUrl: "/videos/2.mp4",
    fullVideo: "/videos/1.mp4",
    year: 2001,
    country: "Новая Зеландия",
    duration: "2:58",
    fullDuration: "2:58:40",
    ganres: ["Фэнтези", "Приключения"],
    description:
      "Хоббит Фродо Бэггинс отправляется в кольцо всевластия.",
    posterUrl:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQa6SX8bTtSqFHqHgmmUrEjXuvvkSDMP8OyNg&s",
  },
]; 