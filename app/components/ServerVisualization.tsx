'use client'

import { motion } from 'framer-motion'
import { useEffect, useState } from 'react'

const cloudInfrastructureImages = [
  // Digital World Visualization
  'https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&w=1800&q=80',
  // Cloud Infrastructure
  'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?auto=format&fit=crop&w=1800&q=80',
  // Technology Abstract
  'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?auto=format&fit=crop&w=1800&q=80'
]

export default function ServerVisualization() {
  const [isLoaded, setIsLoaded] = useState(false)
  const [currentImageIndex, setCurrentImageIndex] = useState(0)

  useEffect(() => {
    setIsLoaded(true)
    const interval = setInterval(() => {
      setCurrentImageIndex((prev) => (prev + 1) % cloudInfrastructureImages.length)
    }, 4000) // Reduced time for better engagement
    return () => clearInterval(interval)
  }, [])

  return (
    <div className="relative w-full max-w-5xl mx-auto h-[500px] mt-20"> {/* Reduced height and width */}
      {/* Optimized glow effects */}
      <div className="absolute inset-0 bg-blue-500/20 blur-[100px] rounded-full animate-pulse" />
      <div className="absolute inset-0 bg-purple-500/20 blur-[100px] rounded-full transform translate-x-1/4 animate-pulse" />
      
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ 
          opacity: isLoaded ? 1 : 0,
          y: isLoaded ? 0 : 20,
        }}
        transition={{ duration: 0.8, delay: 0.2 }}
        className="relative w-full h-full flex items-center justify-center"
      >
        <motion.div
          animate={{
            rotateY: [0, 5, 0], // Reduced rotation for subtlety
            rotateX: [0, -5, 0],
          }}
          transition={{
            duration: 6,
            repeat: Infinity,
            ease: "easeInOut"
          }}
          className="w-full h-full perspective-[2000px] transform-gpu"
          style={{
            transformStyle: 'preserve-3d'
          }}
        >
          <div className="relative w-full h-full border border-white/20 rounded-2xl bg-white/5 backdrop-blur-md overflow-hidden shadow-2xl">
            <motion.div 
              className="absolute inset-0"
              animate={{
                scale: [1, 1.03, 1], // Reduced scale for subtlety
                opacity: [0.7, 0.8, 0.7],
              }}
              transition={{
                duration: 4,
                repeat: Infinity,
                ease: "easeInOut"
              }}
            >
              <img
                src={cloudInfrastructureImages[currentImageIndex]}
                alt="Cloud Infrastructure"
                className="w-full h-full object-cover"
              />
              
              <div className="absolute inset-0 bg-gradient-to-t from-blue-600/40 to-transparent" />
              <div className="absolute inset-0 bg-gradient-to-b from-purple-600/40 to-transparent" />
              
              <div className="absolute inset-0 grid grid-cols-4 grid-rows-4 gap-3 p-6">
                {[...Array(16)].map((_, i) => (
                  <motion.div
                    key={i}
                    className="border border-blue-400/20 rounded-lg backdrop-blur-sm"
                    animate={{
                      borderColor: ['rgba(59, 130, 246, 0.2)', 'rgba(59, 130, 246, 0.4)', 'rgba(59, 130, 246, 0.2)'],
                      boxShadow: ['0 0 15px rgba(59, 130, 246, 0)', '0 0 15px rgba(59, 130, 246, 0.2)', '0 0 15px rgba(59, 130, 246, 0)'],
                    }}
                    transition={{
                      duration: 2,
                      delay: i * 0.1,
                      repeat: Infinity,
                      ease: "easeInOut"
                    }}
                  />
                ))}
              </div>
            </motion.div>
          </div>
        </motion.div>
      </motion.div>
    </div>
  )
}