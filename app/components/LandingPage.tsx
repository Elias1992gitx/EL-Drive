'use client'

import { AnimatedPinDemo } from '@/components/AnimatedPinDemo'
import Footer from '@/components/Footer'
import { MacbookScrollDemo } from '@/components/MacbookScrollDemo'
import { BackgroundLines } from '@/components/ui/background-lines'
import { useAuth } from '@clerk/nextjs'
import { motion } from 'framer-motion'
import { useRouter } from 'next/navigation'
import { useEffect } from 'react'
import Feature from '@/components/Feature'
import Image from 'next/image';

export default function LandingPage() {
  const router = useRouter()
  const { isSignedIn } = useAuth()

  useEffect(() => {
    if (isSignedIn) {
      router.push('/dashboard')
    }
  }, [isSignedIn, router])

  const handleGetStarted = () => {
    router.push('/sign-up')
  }

  const handleSignIn = () => {
    router.push('/sign-in')
  }

  return (
    <div className="relative min-h-screen w-full">
      <BackgroundLines
        className="fixed inset-0 w-full"
        svgOptions={{ duration: 15 }}
      >
        <div />
      </BackgroundLines>

      <div className="relative z-10">
        {/* Navigation remains fixed */}
        <nav className="fixed top-0 left-0 right-0 backdrop-blur-sm bg-white/70 z-50 px-4 sm:px-6 py-3 sm:py-4">
          <div className="max-w-7xl mx-auto flex items-center justify-between">
            <div className="flex items-center gap-3 sm:gap-4 md:gap-8">
              <Image
                src="/ELST.svg"
                alt="Cloudy"
                className="h-8 sm:h-12 md:h-16 w-auto transition-all duration-300"
                width={500}
                height={300}
                priority={true}
              />
            </div>
            <div className="flex items-center gap-2 sm:gap-4">
              <button
                onClick={handleSignIn}
                className="px-2 sm:px-3 md:px-4 py-1.5 sm:py-2 text-xs sm:text-sm md:text-base text-blue-600 hover:text-blue-700 transition-colors"
              >
                Sign in
              </button>
              <button
                onClick={handleGetStarted}
                className="px-3 sm:px-4 md:px-5 py-1.5 sm:py-2 text-xs sm:text-sm md:text-base bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-all duration-300"
              >
                Get Started
              </button>
            </div>
          </div>
        </nav>

        {/* Main content wrapper with proper spacing */}
        <main className="relative pt-20">
          {/* Hero Section */}
          <div className="pt-24 sm:pt-28 md:pt-32 lg:pt-36">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
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
                  className="mb-4 sm:mb-6 md:mb-8"
                >
                  <h3 className="text-xl sm:text-3xl md:text-5xl lg:text-7xl font-semibold leading-tight mb-4 sm:mb-6 text-gray-900 tracking-tight">
                    Transform Your Digital {' '}
                    <br className="hidden sm:block" />
                    <span className="bg-gradient-to-r from-blue-400 via-cyan-400 to-purple-400 bg-clip-text text-transparent">
                      Workspace Experience
                    </span>
                  </h3>
                  <p className="text-gray-600 text-sm sm:text-base md:text-lg max-w-xl sm:max-w-2xl mx-auto mb-6 sm:mb-8 px-4">
                    Elevate your workflow with next-generation cloud storage.
                    Advanced security, seamless collaboration, infinite
                    possibilities.
                  </p>
                </motion.div>

                <div className="flex items-center justify-center gap-4">
                  <motion.button
                    onClick={handleGetStarted}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="px-4 sm:px-6 md:px-8 py-2 sm:py-3 text-xs sm:text-sm md:text-base bg-gradient-to-r from-blue-500 to-blue-600 text-gray-100 rounded-lg font-medium shadow-xl shadow-blue-500/25 hover:shadow-blue-500/40 transition-all duration-300"
                  >
                    GET STARTED
                  </motion.button>
                </div>
              </motion.div>

              {/* Enhanced Responsive Features Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 lg:gap-8 mt-16 sm:mt-20 md:mt-24 px-4 sm:px-6 lg:px-8">
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

          {/* Demo Sections */}
          <div className="mt-16 sm:mt-24 md:mt-32 px-4 sm:px-0">
            <MacbookScrollDemo />
          </div>

          <div className="mt-16 sm:mt-24 md:mt-32 px-4 sm:px-0">
            <AnimatedPinDemo />
          </div>
          <Footer />
        </main>
      </div>
    </div>
  )
}
