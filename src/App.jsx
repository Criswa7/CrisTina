import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import MainLayout from './components/layout/MainLayout'
import Landing from './pages/Landing'
import Home from './pages/Home'
import QuinceMeses from './pages/QuinceMeses'

function App() {
  return (
    <Router>
      <MainLayout>
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route path="/home" element={<Home />} />
          <Route path="/15-meses" element={<QuinceMeses />} /> {/* Nueva ruta */}
        </Routes>
      </MainLayout>
    </Router>
  )
}

export default App