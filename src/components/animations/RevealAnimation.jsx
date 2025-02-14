import { motion } from 'framer-motion'

const FloatingHeart = ({ delay }) => (
  <motion.div
    initial={{ scale: 0, y: 100 }}
    animate={{ 
      scale: [0, 1, 0.8],
      y: [100, -20, -40],
      opacity: [0, 1, 0]
    }}
    transition={{ 
      duration: 3,
      delay,
      repeat: Infinity,
      repeatDelay: 2
    }}
    className="absolute text-4xl"
  >
    🌸
  </motion.div>
)

const RevealAnimation = () => {
  return (
    <div className="fixed inset-0 pointer-events-none">
      {[...Array(15)].map((_, i) => (
        <FloatingHeart 
          key={i}
          delay={i * 0.3}
          style={{
            left: `${Math.random() * 100}%`,
          }}
        />
      ))}
    </div>
  )
}

export default RevealAnimation