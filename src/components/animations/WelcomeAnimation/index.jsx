import { motion } from 'framer-motion'

const WelcomeAnimation = () => {
  return (
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
  )
}

export default WelcomeAnimation