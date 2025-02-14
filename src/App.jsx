import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { useState, useEffect } from 'react'
import { supabase } from './services/supabase'
import MainLayout from './components/layout/MainLayout'
import Landing from './pages/Landing'
import Home from './pages/Home'

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    checkUser()
    const { data: { subscription } } = supabase.auth.onAuthStateChange((event, session) => {
      setIsAuthenticated(event === 'SIGNED_IN')
    })

    return () => subscription?.unsubscribe()
  }, [])

  async function checkUser() {
    try {
      const { data: { session } } = await supabase.auth.getSession()
      setIsAuthenticated(!!session)
    } catch (error) {
      console.error('Error verificando estado de autenticación:', error)
    } finally {
      setIsLoading(false)
    }
  }

  if (isLoading) {
    return (
      <MainLayout>
        <div className="flex items-center justify-center min-h-screen">
          <p>Cargando...</p>
        </div>
      </MainLayout>
    )
  }

  return (
    <Router>
      <MainLayout>
        <Routes>
          <Route 
            path="/" 
            element={isAuthenticated ? <Home /> : <Landing />} 
          />
        </Routes>
      </MainLayout>
    </Router>
  )
}

export default App