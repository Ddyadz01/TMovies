// React
import { Route, Routes, useLocation, useNavigate } from 'react-router-dom'
import { useEffect } from 'react'

// Components
import { Sidebar, FilmModal } from './components/Index'

// Store
import { useMovieStore } from './store/store.js'

// Pages
import { Home } from './pages/Index'

// Constants
import { FILMSLIST } from '../constants.jsx'

function App() {
  const { isModalOpen, currentMovie, updateCurrentMovie, openModal, closeModal } = useMovieStore()
  const location = useLocation()
  const navigate = useNavigate()

  // Обработка URL параметров при загрузке страницы
  useEffect(() => {
    const searchParams = new URLSearchParams(location.search)
    const movieId = searchParams.get('movie')
    const movieTitle = searchParams.get('title')
    
    if (movieId) {
      const movie = FILMSLIST.find(film => film.id === parseInt(movieId))
      if (movie) {
        updateCurrentMovie(movie)
        openModal()
      }
    } else if (movieTitle) {
      // Поиск по названию (для случаев, когда ID может измениться)
      const movie = FILMSLIST.find(film => 
        film.title.toLowerCase().replace(/[^a-zа-я0-9]/g, '-') === movieTitle.toLowerCase()
      )
      if (movie) {
        updateCurrentMovie(movie)
        openModal()
      }
    }
  }, [location.search, updateCurrentMovie, openModal])

  // Обновление URL при открытии/закрытии модального окна
  useEffect(() => {
    if (isModalOpen && currentMovie.id) {
      const movieSlug = currentMovie.title.toLowerCase().replace(/[^a-zа-я0-9]/g, '-')
      const newUrl = `/?movie=${currentMovie.id}&title=${movieSlug}`
      if (location.search !== `?movie=${currentMovie.id}&title=${movieSlug}`) {
        navigate(newUrl, { replace: true })
      }
    } else if (!isModalOpen && location.search.includes('movie=')) {
      navigate('/', { replace: true })
    }
  }, [isModalOpen, currentMovie.id, currentMovie.title, location.search, navigate])

  return (
    <div className="wrapper">
      <Sidebar />
      <div className="content">
        <Routes>
          <Route path="/" element={<Home />} />
          {/* <Route path="/popular" element={<Popular />} /> */}
        </Routes>
      </div>
      
      {/* Модальное окно фильма */}
      {isModalOpen && <FilmModal />}
    </div>
  )
}

export default App
