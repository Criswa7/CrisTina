import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { supabase } from '../services/supabase'

const Landing = () => {
  const [answer, setAnswer] = useState('')
  const [question, setQuestion] = useState('')
  const [isVerifying, setIsVerifying] = useState(false)
  const [error, setError] = useState('')
  const [showAnimation, setShowAnimation] = useState(false)

  useEffect(() => {
    // Cargar la pregunta al montar el componente
    fetchQuestion()
  }, [])

  const fetchQuestion = async () => {
    try {
      const { data, error } = await supabase
        .from('auth_questions')
        .select('question')
        .single()

      if (error) throw error
      setQuestion(data.question)
    } catch (error) {
      console.error('Error fetching question:', error)
      setQuestion('Error cargando la pregunta')
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setIsVerifying(true)
    setError('')

    try {
      const { data, error } = await supabase
        .from('auth_questions')
        .select('answer')
        .single()

      if (error) throw error

      if (data.answer.toLowerCase() === answer.toLowerCase().trim()) {
        setShowAnimation(true)
        // Aquí posteriormente añadiremos la lógica de autenticación
      } else {
        setError('Respuesta incorrecta 💔')
      }
    } catch (error) {
      console.error('Error:', error)
      setError('Algo salió mal, intenta de nuevo')
    } finally {
      setIsVerifying(false)
    }
  }

  return (
    <AnimatePresence>
      {!showAnimation ? (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="min-h-screen flex items-center justify-center bg-white"
        >
          <div className="w-full max-w-md p-8">
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label 
                  htmlFor="answer"
                  className="block text-sm font-medium text-gray-700 mb-2"
                >
                  {question}
                </label>
                <input
                  type="text"
                  id="answer"
                  value={answer}
                  onChange={(e) => setAnswer(e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-pink-500 focus:border-transparent"
                  placeholder="Tu respuesta..."
                  required
                />
              </div>
              {error && (
                <p className="text-red-500 text-sm">{error}</p>
              )}
              <button
                type="submit"
                disabled={isVerifying}
                className="w-full px-4 py-2 text-white bg-gradient-to-r from-pink-500 to-rose-500 rounded-md hover:from-pink-600 hover:to-rose-600 focus:outline-none focus:ring-2 focus:ring-pink-500 focus:ring-offset-2 transition-colors"
              >
                {isVerifying ? 'Verificando...' : 'Entrar 💝'}
              </button>
            </form>
          </div>
        </motion.div>
      ) : (
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: [0, 1.2, 1] }}
          transition={{ duration: 1.5, ease: "easeInOut" }}
          className="fixed inset-0 bg-gradient-to-br from-pink-400 to-rose-500"
        >
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1, duration: 1 }}
            className="absolute inset-0 flex items-center justify-center text-white text-4xl font-bold"
          >
            Te amo, mi amor 💖
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}

export default Landing