'use client'

import { motion } from 'framer-motion'
import { useEffect, useState } from 'react'
import { MacbookScrollDemo } from '@/components/MacbookScrollDemo'
import { BackgroundLines } from '@/components/ui/background-lines'
import { AnimatedPinDemo } from '@/components/AnimatedPinDemo'
import Footer from '@/components/Footer'

export default function LandingPage() {
  const [isLoaded, setIsLoaded] = useState(false)

  useEffect(() => {
    setIsLoaded(true)
  }, [])

  return (
    <BackgroundLines 
      className="min-h-screen"
      svgOptions={{ duration: 15 }}
    >
      <div className="relative z-10 bg-transparent">
        {/* Navigation */}
        <nav className="px-4 sm:px-6 py-3 sm:py-4">
          <div className="max-w-7xl mx-auto flex items-center justify-between">
            <div className="flex items-center gap-4 sm:gap-8">
              <img src="/ELST.svg" alt="Cloudy" className="h-12 sm:h-16 w-auto" />
            </div>
            <div className="flex items-center gap-2 sm:gap-4">
              <button className="px-3 sm:px-4 py-2 text-xs sm:text-sm text-blue-600 hover:text-blue-600 transition-colors">
                Sign up
              </button>
              <button className="px-4 sm:px-5 py-2 text-xs sm:text-sm bg-blue-600 hover:bg-gray-700 text-red-100 rounded-lg transition-all duration-300">
                Create
              </button>
            </div>
          </div>
        </nav>

        {/* Hero Section */}
        <div className="pt-12 sm:pt-16 md:pt-24">
          <div className="max-w-7xl mx-auto px-4 sm:px-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="text-center"
            >
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.2, duration: 0.8 }}
                className="mb-4 sm:mb-6"
              >
                <h3 className="text-2xl sm:text-3xl md:text-6xl lg:text-7xl font-semibold leading-tight mb-4 sm:mb-6 text-gray-900">
                  Transform Your Digital<br />
                  <span className="bg-gradient-to-r from-blue-400 via-cyan-400 to-purple-400 bg-clip-text text-transparent">
                    Workspace Experience
                  </span>
                </h3>
                <p className="text-gray-600 text-base sm:text-lg max-w-2xl mx-auto mb-6 sm:mb-8 px-4">
                  Elevate your workflow with next-generation cloud storage. 
                  Advanced security, seamless collaboration, infinite possibilities.
                </p>
              </motion.div>
              
              <div className="flex items-center justify-center gap-4">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="px-6 sm:px-8 py-3 sm:py-3.5 text-sm bg-gradient-to-r from-blue-500 to-blue-600 text-gray-100 rounded-lg font-medium shadow-xl shadow-blue-500/25 hover:shadow-blue-500/40 transition-all duration-300"
                >
                  GET STARTED
                </motion.button>
              </div>
            </motion.div>

            {/* Features Grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-24">
              <Feature
                icon="💫"
                title="Smart Workspace"
                description="Experience intelligent file organization with AI-powered suggestions and automated workflows that adapt to your needs."
              />
              <Feature
                icon="🔒"
                title="Advanced Security"
                description="Military-grade encryption, biometric authentication, and real-time threat monitoring keep your data fortress-strong."
              />
              <Feature
                icon="⚡"
                title="Lightning Performance"
                description="Quantum-speed file transfers and instant syncing across all devices, powered by cutting-edge cloud architecture."
              />
            </div>
          </div>
        </div>

        {/* MacbookScrollDemo */}
        <div className="mt-32">
          <MacbookScrollDemo />
        </div>

        {/* AnimatedPinDemo */}
        <div className="mt-32">
          <AnimatedPinDemo />
        </div>
      </div>

      <Footer />
    </BackgroundLines>
  )
}

function Feature({ icon, title, description }: { icon: string; title: string; description: string }) {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
      whileHover={{ scale: 1.02, y: -5 }}
      className="text-left p-8 rounded-2xl bg-white backdrop-blur-sm
                 border border-gray-200 hover:border-gray-300 transition-all duration-300 
                 shadow-xl shadow-gray-200/50 hover:shadow-gray-300/50"
    >
      <motion.span 
        className="text-4xl mb-6 inline-block"
        whileHover={{ scale: 1.2, rotate: [0, 10, -10, 0] }}
        transition={{ duration: 0.5 }}
      >
        {icon}
      </motion.span>
      <h3 className="text-xl font-medium mb-4 text-gray-900">
        {title}
      </h3>
      <p className="text-gray-600 text-sm leading-relaxed">
        {description}
      </p>
    </motion.div>
  )
}
