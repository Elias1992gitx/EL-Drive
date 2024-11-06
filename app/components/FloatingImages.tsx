'use client'
import { motion, AnimatePresence } from 'framer-motion'
import { useEffect, useState } from 'react'

const images = [
  // Cloud technology and data center themed images
  'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?auto=format&fit=crop&w=2000&q=100', // Modern data center
  'https://images.unsplash.com/photo-1544197150-b99a580bb7a8?auto=format&fit=crop&w=2000&q=100', // Server racks
  'https://images.unsplash.com/photo-1562813733-b31f71025d54?auto=format&fit=crop&w=2000&q=100', // Network infrastructure
  'https://images.unsplash.com/photo-1560732488-6b0df240254a?auto=format&fit=crop&w=2000&q=100', // Data visualization
  'https://images.unsplash.com/photo-1551703599-6b3e8379aa8b?auto=format&fit=crop&w=2000&q=100'  // Cloud computing concept
]

export function FloatingImages() {
  const [mounted, setMounted] = useState(false)
  const [currentImageIndex, setCurrentImageIndex] = useState(0)

  useEffect(() => {
    setMounted(true)
    const interval = setInterval(() => {
      setCurrentImageIndex((prev) => (prev + 1) % images.length)
    }, 5000) // Change image every 5 seconds

    return () => clearInterval(interval)
  }, [])

  if (!mounted) return null

  return (
    <div className="fixed inset-0 -z-10">
      <AnimatePresence mode="wait">
        <motion.div
          key={images[currentImageIndex]}
          className="absolute inset-0 w-screen h-screen"
          initial={{ opacity: 0, scale: 1.1 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 1.1 }}
          transition={{ duration: 2.5, ease: 'easeInOut' }}
        >
          {/* Modern gradient overlay with multiple layers */}
          <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-transparent to-black/30 z-10" />
          <div className="absolute inset-0 bg-gradient-to-r from-[#B8860B]/30 to-[#DAA520]/20 z-10" />
          <div className="absolute inset-0 backdrop-blur-[2px] z-10" />
          
          <motion.img
            src={images[currentImageIndex]}
            alt="Cloud storage visualization"
            className="w-full h-full object-cover"
            style={{
              position: 'fixed',
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              width: '100vw',
              height: '100vh',
              filter: 'brightness(0.8) contrast(1.2) saturate(1.1)'
            }}
          />
        </motion.div>
      </AnimatePresence>
    </div>
  )
}