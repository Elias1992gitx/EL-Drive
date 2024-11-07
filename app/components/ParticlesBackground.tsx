'use client'

import { useEffect, useMemo, useState } from 'react'
import { motion } from 'framer-motion'

export function ParticlesBackground() {
  const particles = useMemo(() => Array.from({ length: 50 }), [])

  return (
    <div className="fixed inset-0 w-full h-full -z-10">
      {particles.map((_, i) => (
        <motion.div
          key={i}
          className="absolute w-1 h-1 bg-blue-500/5 rounded-full"
          animate={{
            x: [
              `${Math.random() * 100}vw`,
              `${Math.random() * 100}vw`,
              `${Math.random() * 100}vw`
            ],
            y: [
              `${Math.random() * 100}vh`,
              `${Math.random() * 100}vh`,
              `${Math.random() * 100}vh`
            ],
            scale: [0, 1.5, 0],
            opacity: [0, 0.5, 0]
          }}
          transition={{
            duration: Math.random() * 20 + 10,
            repeat: Infinity,
            ease: "linear"
          }}
          style={{
            position: 'fixed'
          }}
        />
      ))}
    </div>
  )
} 