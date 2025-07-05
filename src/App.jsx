// React
import { Route, Routes } from 'react-router-dom'

// Components
import { Sidebar, FilmModal } from './components/Index'

// Store
import { useMovieStore } from './store/store.js'

// Pages
import { Home } from './pages/Index'

function App() {
  const { isModalOpen } = useMovieStore()

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
