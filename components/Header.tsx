'use client'

import { useState, useEffect } from 'react'
import { useAuth, useUser } from '@clerk/nextjs'
import { MagnifyingGlassIcon, Bars3Icon } from '@heroicons/react/24/outline'
import { motion, AnimatePresence } from 'framer-motion'
import { useSidebar } from '@/contexts/SidebarContext'
import Image from 'next/image'
import { cn } from '@/lib/utils'

// Add SearchBar component
function SearchBar() {
  return (
    <div className="relative">
      <input
        type="text"
        placeholder="Search files and folders..."
        className="w-full pl-10 pr-4 py-2 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
      />
      <MagnifyingGlassIcon className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
    </div>
  )
}

export default function Header() {
  const [isSearchFocused, setIsSearchFocused] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)
  const [isInviteOpen, setIsInviteOpen] = useState(false)
  const [isMobileSearchOpen, setIsMobileSearchOpen] = useState(false)
  const { signOut } = useAuth()
  const { user, isLoaded } = useUser()
  const { isExpanded, setExpanded } = useSidebar()

  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 0)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const toggleSidebar = () => {
    setExpanded(!isExpanded)
  }

  const toggleMobileSearch = () => {
    setIsMobileSearchOpen(!isMobileSearchOpen)
  }

  // Add MobileSearch component here, after state is defined
  const MobileSearch = () => (
    <AnimatePresence>
      {isMobileSearchOpen && (
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          className="absolute top-full left-0 right-0 p-4 bg-white border-b border-gray-200 shadow-lg"
        >
          <SearchBar />
        </motion.div>
      )}
    </AnimatePresence>
  )

  if (!isLoaded) {
    return null
  }

  return (
    <>
      <header className={cn(
        'fixed top-0 left-0 right-0 z-50',
        'bg-white/80 dark:bg-gray-900/80',
        'backdrop-blur-lg',
        'border-b border-gray-200/50 dark:border-gray-700/50',
        'transition-all duration-300'
      )}>
        <div className="px-4 sm:px-6 lg:px-8">
          <div className="flex h-14 sm:h-16 items-center justify-between gap-4">
            {/* Left Section */}
            <div className="flex items-center gap-3">
              <button 
                onClick={toggleSidebar}
                className="touch-target lg:hidden"
              >
                <Bars3Icon className="h-6 w-6" />
              </button>
              <Image 
                src="/ELST.svg" 
                alt="Logo"
                width={32} 
                height={32}
                className="h-8 w-auto"
                priority
              />
            </div>

            {/* Search - Responsive */}
            <div className="flex-1 max-w-2xl mx-auto hidden sm:block">
              <SearchBar />
            </div>

            {/* Mobile Search Trigger */}
            <button 
              onClick={toggleMobileSearch}
              className="sm:hidden"
            >
              <MagnifyingGlassIcon className="h-6 w-6" />
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Search Overlay */}
      <MobileSearch />
    </>
  )
} 
  