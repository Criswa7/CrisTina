import { useEffect, useRef } from 'react'
import { motion, animate } from 'framer-motion'

const InteractiveBackground = () => {
  const containerRef = useRef(null)
  const dotSize = 2
  const gap = 25
  const baseOpacity = 0.25
  const hoverOpacity = 0.8
  const radialGradientSize = 200

  useEffect(() => {
    if (!containerRef.current) return

    const dots = containerRef.current.querySelectorAll('.dot')
    let mouseX = window.innerWidth / 2
    let mouseY = window.innerHeight / 2

    const handleMouseMove = (e) => {
      mouseX = e.clientX
      mouseY = e.clientY

      dots.forEach((dot) => {
        const rect = dot.getBoundingClientRect()
        const dotX = rect.left + dotSize / 2
        const dotY = rect.top + dotSize / 2

        const distance = Math.sqrt(
          Math.pow(mouseX - dotX, 2) + Math.pow(mouseY - dotY, 2)
        )

        const opacity = Math.max(
          baseOpacity,
          hoverOpacity - (distance / radialGradientSize)
        )

        animate(dot, { opacity }, { duration: 0.3 })
      })
    }

    window.addEventListener('mousemove', handleMouseMove)
    return () => window.removeEventListener('mousemove', handleMouseMove)
  }, [])

  const createDotGrid = () => {
    const cols = Math.ceil(window.innerWidth / gap)
    const rows = Math.ceil(window.innerHeight / gap)
    const dots = []

    for (let i = 0; i < rows; i++) {
      for (let j = 0; j < cols; j++) {
        const x = j * gap
        const y = i * gap
        const distanceFromCenter = Math.sqrt(
          Math.pow(x - window.innerWidth / 2, 2) + 
          Math.pow(y - window.innerHeight / 2, 2)
        )
        const initialOpacity = Math.max(
          0.05,
          baseOpacity - (distanceFromCenter / (window.innerWidth / 2)) * baseOpacity
        )

        dots.push(
          <motion.circle
            key={`${i}-${j}`}
            className="dot"
            cx={x}
            cy={y}
            r={dotSize / 2}
            fill="currentColor"
            initial={{ opacity: initialOpacity }}
          />
        )
      }
    }
    return dots
  }

  return (
    <div className="fixed inset-0 pointer-events-none text-black/40">
      <svg
        ref={containerRef}
        className="w-full h-full"
        style={{ minHeight: '100vh' }}
      >
        {createDotGrid()}
      </svg>
    </div>
  )
}

export default InteractiveBackground