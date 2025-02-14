import { useState, useEffect } from 'react'
import { AnimatePresence } from 'framer-motion'
import { supabase, TABLES } from '../services/supabase'
import VerificationForm from '../components/VerificationForm'
import WelcomeAnimation from '../components/animations/WelcomeAnimation'

const Landing = () => {
  const [answer, setAnswer] = useState('')
  const [question, setQuestion] = useState('')
  const [isVerifying, setIsVerifying] = useState(false)
  const [error, setError] = useState('')
  const [showAnimation, setShowAnimation] = useState(false)

  useEffect(() => {
    fetchQuestion()
  }, [])

  const fetchQuestion = async () => {
    try {
      const { data, error } = await supabase
        .from(TABLES.AUTH_QUESTIONS)
        .select('question')
        .single()

      if (error) throw error
      setQuestion(data.question)
    } catch (error) {
      console.error('Error al cargar la pregunta:', error)
      setQuestion('Error al cargar la pregunta')
    }
  }

  const handleVerification = async (submittedAnswer) => {
    setIsVerifying(true)
    setError('')

    try {
      const { data, error } = await supabase
        .from(TABLES.AUTH_QUESTIONS)
        .select('answer')
        .single()

      if (error) throw error

      if (data.answer.toLowerCase() === submittedAnswer.toLowerCase().trim()) {
        setShowAnimation(true)
      } else {
        setError('Respuesta incorrecta')
      }
    } catch (error) {
      console.error('Error:', error)
      setError('Algo salió mal, intenta de nuevo')
    } finally {
      setIsVerifying(false)
    }
  }

  return (
    <AnimatePresence mode="wait">
      {!showAnimation ? (
        <VerificationForm
          question={question}
          answer={answer}
          setAnswer={setAnswer}
          error={error}
          isVerifying={isVerifying}
          onSubmit={handleVerification}
        />
      ) : (
        <WelcomeAnimation />
      )}
    </AnimatePresence>
  )
}

export default Landing