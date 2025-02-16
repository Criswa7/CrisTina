import { motion } from 'framer-motion'
import PropTypes from 'prop-types'

const VerificationForm = ({
  question,
  answer,
  setAnswer,
  error,
  isVerifying,
  onSubmit
}) => {
  const handleSubmit = (e) => {
    e.preventDefault()
    onSubmit(answer)
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="min-h-screen flex items-center justify-center"
    >
      <div className="w-full max-w-md p-8">
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label 
              htmlFor="answer"
              className="block text-lg font-medium text-gray-800 mb-2"
            >
              {question}
            </label>
            <input
              type="text"
              id="answer"
              value={answer}
              onChange={(e) => setAnswer(e.target.value)}
              className="w-full px-4 py-2 bg-white/80 backdrop-blur-sm border border-gray-200 rounded-md focus:outline-none focus:ring-2 focus:ring-pink-500 focus:border-transparent"
              placeholder="♡..."
              required
            />
          </div>
          
          {error && (
            <p className="text-red-500 text-sm">{error}</p>
          )}
          
          <button
            type="submit"
            disabled={isVerifying}
            className="w-full px-4 py-2 bg-white text-gray-900 font-medium rounded-md 
                     hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-pink-500 
                     focus:ring-offset-2 transition-colors shadow-sm
                     disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isVerifying ? 'Verificando...' : 'Validar 💝'}
          </button>
        </form>
      </div>
    </motion.div>
  )
}

VerificationForm.propTypes = {
  question: PropTypes.string.isRequired,
  answer: PropTypes.string.isRequired,
  setAnswer: PropTypes.func.isRequired,
  error: PropTypes.string,
  isVerifying: PropTypes.bool.isRequired,
  onSubmit: PropTypes.func.isRequired
}

export default VerificationForm