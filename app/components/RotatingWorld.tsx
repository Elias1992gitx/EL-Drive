'use client'

import { motion } from 'framer-motion'
import { useEffect, useState } from 'react'

export function RotatingWorld() {
  const [mounted, setMounted] = useState(false)
  const orbitingLines = Array.from({ length: 50 })

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) return null

  return (
    <div className="relative w-full max-w-5xl mx-auto h-[600px]">
      {/* Background glow effects */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-blue-500/20 blur-[100px] rounded-full" />
        <div className="absolute inset-0 bg-purple-500/20 blur-[100px] rounded-full transform translate-x-1/4" />
      </div>

      {/* Main content container */}
      <div className="relative z-10 h-full flex flex-col items-center justify-center text-white">
        {/* Rotating globe */}
        <motion.div
          className="relative"
          animate={{
            rotateY: 360,
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: 'linear',
          }}
        >
          <div className="w-48 h-48 rounded-full bg-gradient-to-r from-blue-400 via-cyan-400 to-purple-400 opacity-90 blur-sm" />
          <div className="absolute inset-0 w-48 h-48 rounded-full bg-gradient-to-r from-blue-500 via-cyan-500 to-purple-500" />
        </motion.div>

        {/* Orbiting lines */}
        <div className="absolute inset-0">
          {orbitingLines.map((_, i) => (
            <motion.div
              key={i}
              className="absolute left-1/2 top-1/2"
              initial={{
                opacity: 0,
                scale: 0,
                x: '-50%',
                y: '-50%',
              }}
              animate={{
                opacity: [0, 1, 0],
                scale: [0, 1, 0],
                rotate: 360,
              }}
              transition={{
                duration: Math.random() * 5 + 3,
                repeat: Infinity,
                delay: Math.random() * 2,
                ease: 'linear',
              }}
            >
              <div
                className="h-0.5 bg-gradient-to-r from-blue-400/20 via-cyan-400/40 to-transparent"
                style={{
                  width: `${Math.random() * 100 + 50}px`,
                  transform: `rotate(${Math.random() * 360}deg)`,
                }}
              />
            </motion.div>
          ))}
        </div>

        {/* Text overlay */}
        <div className="absolute inset-0 flex flex-col items-start justify-center p-8">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="max-w-xl"
          >
            <h1 className="text-5xl font-bold mb-4 text-white">
              One Unified Payment Infrastructure
            </h1>
            <h2 className="text-4xl font-bold mb-6 text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-400">
              Instant Invoicing
            </h2>
          </motion.div>
        </div>
      </div>
    </div>
  )
}
