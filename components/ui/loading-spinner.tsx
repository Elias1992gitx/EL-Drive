'use client'

import { motion } from 'framer-motion'

export function LoadingSpinner() {
  return (
    <div className="min-h-screen grid place-items-center bg-gray-50">
      <motion.div 
        className="relative w-16 h-16"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.3 }}
      >
        {[...Array(12)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-3 h-3"
            style={{
              left: '50%',
              top: '50%',
              transform: `rotate(${i * 30}deg) translateY(-150%)`,
              transformOrigin: '50% 150%',
            }}
          >
            <motion.div
              className="w-full h-full bg-blue-400 rounded-full"
              animate={{
                scale: [1, 1.5, 1],
                opacity: [0.3, 1, 0.3]
              }}
              transition={{
                duration: 1,
                repeat: Infinity,
                delay: i * 0.1,
                ease: "easeInOut"
              }}
            />
          </motion.div>
        ))}
      </motion.div>
    </div>
  )
}
