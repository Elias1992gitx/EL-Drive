'use client'

import { MacbookScrollDemo } from '@/components/MacbookScrollDemo'
import { useAuth } from '@clerk/nextjs'
import { ArrowRightIcon } from '@heroicons/react/24/outline'
import { motion } from 'framer-motion'
import { useRouter } from 'next/navigation'
import { FloatingImages } from './FloatingImages'

export default function LandingPage() {
  const { isSignedIn } = useAuth()
  const router = useRouter()

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50/60 to-white/60 relative overflow-hidden">
      <FloatingImages />
      {/* Navigation */}
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 relative z-20">
        <div className="flex items-center justify-between">
          <img src="/ELST.svg" alt="ELST Logo" className="h-16" />
          <div className="flex items-center gap-4">
            <button
              onClick={() => router.push('/sign-in')}
              className="px-4 py-2 text-sm text-white/90 hover:text-white transition-colors"
            >
              Sign in
            </button>
            <button
              onClick={() => router.push('/sign-up')}
              className="px-4 py-2 text-sm text-white bg-[#585131]/90 rounded-lg hover:bg-[#585131] transition-all"
            >
              Get started
            </button>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <div className="relative z-20 h-[calc(100vh-5rem)] flex items-center">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <motion.div
              initial={{ opacity: 0, y: -50 }}
              animate={{
                opacity: [0, 1, 1, 0],
                y: [-50, 0, 0, 50],
              }}
              transition={{
                duration: 6,
                repeat: Infinity,
                repeatType: 'reverse',
                ease: 'easeInOut',
              }}
              className="relative"
            >
              <motion.h1
                //    animate={{
                //      color: ['#FFD700', '#DAA520', '#B8860B', '#FFD700'],
                //    }}
                transition={{
                  duration: 6,
                  repeat: Infinity,
                  repeatType: 'reverse',
                  ease: 'linear',
                }}
                className="text-5xl font-bold mb-6 text-[#585131]"
              >
                EL Drive
              </motion.h1>
            </motion.div>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto"
            >
              Experience seamless cloud storage with EL Drive. Your files, your
              control, anywhere in the world.
            </motion.p>
            <motion.button
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              onClick={() => router.push('/sign-up')}
              className="px-6 py-3 text-sm text-white bg-[#585131] rounded-lg hover:bg-[#585131]/90 
                      flex items-center gap-2 mx-auto"
            >
              Get started
              <ArrowRightIcon className="h-3.5 w-3.5" />
            </motion.button>
          </div>
        </div>
      </div>

      {/* MacBook Scroll Demo Section */}
      <div className="w-full relative z-20 bg-white/80 backdrop-blur-sm">
        <MacbookScrollDemo />
      </div>
    </div>
  )
}
