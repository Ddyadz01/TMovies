import { Route, Routes } from 'react-router-dom'
import { Sidebar } from './components/Index'
import { Home, Popular } from './pages/Index'

function App() {
  return (
    <div className="wrapper">
      <Sidebar />
      <div className="content">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/popular" element={<Popular />} />
        </Routes>
      </div>
    </div>
  )
}

export default App
