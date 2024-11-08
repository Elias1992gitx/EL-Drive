'use client'

import { useState, useEffect } from 'react'
import { useAuth, useUser } from '@clerk/nextjs'
import { MagnifyingGlassIcon, Bars3Icon, UserCircleIcon, Cog6ToothIcon, ArrowRightOnRectangleIcon, UserPlusIcon } from '@heroicons/react/24/outline'
import { motion, AnimatePresence } from 'framer-motion'
import { useSidebar } from '@/contexts/SidebarContext'
import Image from 'next/image'
import { cn } from '@/lib/utils'
import { Menu, Transition } from '@headlessui/react'
import { Fragment } from 'react'
import InviteMemberDialog from './InviteMemberDialog'

// Update the MobileSearch component
const MobileSearch = ({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) => (
  <AnimatePresence>
    {isOpen && (
      <motion.div
        initial={{ opacity: 0, height: 0 }}
        animate={{ opacity: 1, height: "auto" }}
        exit={{ opacity: 0, height: 0 }}
        className="absolute top-full left-0 right-0 bg-white border-b border-gray-200 shadow-sm z-50"
      >
        <div className="p-2 max-w-lg mx-auto">
          <SearchBar />
        </div>
      </motion.div>
    )}
  </AnimatePresence>
)

// Update the SearchBar component
function SearchBar() {
  return (
    <div className="relative">
      <input
        type="text"
        placeholder="Search..."
        className="w-full pl-9 pr-4 py-2 text-sm rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
      />
      <MagnifyingGlassIcon className="absolute left-2.5 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
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
        'transition-all duration-300',
        isInviteOpen && 'pointer-events-none opacity-50'
      )}>
        <div className={cn(
          "px-4 sm:px-6 lg:px-8",
          isInviteOpen && 'opacity-50'
        )}>
          <div className="flex h-14 sm:h-16 items-center justify-between gap-4">
            {/* Left Section */}
            <div className="flex items-center gap-2 sm:gap-3">
              {/* Toggle Button - Always visible */}
              <button
                onClick={toggleSidebar}
                className="p-1.5 hover:bg-gray-50 rounded-lg"
              >
                <Bars3Icon className="h-6 w-6 text-gray-600" />
              </button>

              {/* Desktop Only: Logo */}
              <Image 
                src="/ELST.svg" 
                alt="Logo"
                width={32} 
                height={32}
                className="h-8 w-auto hidden sm:block"
                priority
              />
            </div>

            {/* Search - Desktop */}
            <div className="flex-1 max-w-2xl mx-auto hidden sm:block">
              <SearchBar />
            </div>

            {/* Right Section - Mobile & Desktop */}
            <div className="flex items-center gap-2">
              {/* Mobile Icons */}
              <div className="flex items-center gap-2 sm:hidden">
                <button 
                  onClick={toggleMobileSearch}
                  className="p-1.5 hover:bg-gray-50 rounded-lg"
                >
                  <MagnifyingGlassIcon className="h-6 w-6 text-gray-600" />
                </button>

                <button
                  onClick={() => setIsInviteOpen(true)}
                  className="p-1.5 hover:bg-gray-50 rounded-lg"
                >
                  <UserPlusIcon className="h-6 w-6 text-gray-600" />
                </button>

                <Menu as="div" className="relative">
                  <Menu.Button className="flex items-center p-1.5 hover:bg-gray-50 rounded-lg">
                    {user?.imageUrl ? (
                      <Image
                        src={user.imageUrl}
                        alt="Profile"
                        width={32}
                        height={32}
                        className="h-8 w-8 rounded-full"
                      />
                    ) : (
                      <UserCircleIcon className="h-8 w-8 text-gray-400" />
                    )}
                  </Menu.Button>
                  <Transition
                    as={Fragment}
                    enter="transition ease-out duration-100"
                    enterFrom="transform opacity-0 scale-95"
                    enterTo="transform opacity-100 scale-100"
                    leave="transition ease-in duration-75"
                    leaveFrom="transform opacity-100 scale-100"
                    leaveTo="transform opacity-0 scale-95"
                  >
                    <Menu.Items className="absolute right-0 mt-2 w-48 origin-top-right rounded-lg bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none z-[70]">
                      <div className="py-1">
                        <Menu.Item>
                          {({ active }) => (
                            <a
                              href="/settings"
                              className={cn(
                                'flex items-center gap-2 px-4 py-2 text-sm sm:text-base',
                                active ? 'bg-gray-50' : ''
                              )}
                            >
                              <Cog6ToothIcon className="h-5 w-5" />
                              Settings
                            </a>
                          )}
                        </Menu.Item>
                        <Menu.Item>
                          {({ active }) => (
                            <button
                              onClick={() => signOut()}
                              className={cn(
                                'flex w-full items-center gap-2 px-4 py-2 text-sm sm:text-base text-red-600',
                                active ? 'bg-gray-50' : ''
                              )}
                            >
                              <ArrowRightOnRectangleIcon className="h-5 w-5" />
                              Sign out
                            </button>
                          )}
                        </Menu.Item>
                      </div>
                    </Menu.Items>
                  </Transition>
                </Menu>
              </div>

              {/* Desktop Only Icons */}
              <div className="hidden sm:flex items-center gap-2">
                <button
                  onClick={() => setIsInviteOpen(true)}
                  className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 rounded-lg"
                >
                  <UserPlusIcon className="h-5 w-5" />
                  <span>Invite</span>
                </button>

                <Menu as="div" className="relative">
                  <Menu.Button className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 rounded-lg">
                    {user?.imageUrl ? (
                      <Image
                        src={user.imageUrl}
                        alt="Profile"
                        width={32}
                        height={32}
                        className="h-8 w-8 rounded-full"
                      />
                    ) : (
                      <UserCircleIcon className="h-8 w-8 text-gray-400" />
                    )}
                    <span>Profile</span>
                  </Menu.Button>
                  <Transition
                    as={Fragment}
                    enter="transition ease-out duration-100"
                    enterFrom="transform opacity-0 scale-95"
                    enterTo="transform opacity-100 scale-100"
                    leave="transition ease-in duration-75"
                    leaveFrom="transform opacity-100 scale-100"
                    leaveTo="transform opacity-0 scale-95"
                  >
                    <Menu.Items className="absolute right-0 mt-2 w-48 origin-top-right rounded-lg bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                      <div className="py-1">
                        <Menu.Item>
                          {({ active }) => (
                            <a
                              href="/settings"
                              className={cn(
                                'flex items-center gap-2 px-4 py-2 text-sm',
                                active ? 'bg-gray-50' : ''
                              )}
                            >
                              <Cog6ToothIcon className="h-5 w-5" />
                              Settings
                            </a>
                          )}
                        </Menu.Item>
                        <Menu.Item>
                          {({ active }) => (
                            <button
                              onClick={() => signOut()}
                              className={cn(
                                'flex w-full items-center gap-2 px-4 py-2 text-sm text-red-600',
                                active ? 'bg-gray-50' : ''
                              )}
                            >
                              <ArrowRightOnRectangleIcon className="h-5 w-5" />
                              Sign out
                            </button>
                          )}
                        </Menu.Item>
                      </div>
                    </Menu.Items>
                  </Transition>
                </Menu>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Add overlay when invite dialog is open */}
      <AnimatePresence>
        {isInviteOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/30 backdrop-blur-sm z-40"
            aria-hidden="true"
          />
        )}
      </AnimatePresence>

      {/* Mobile Search Overlay */}
      <MobileSearch 
        isOpen={isMobileSearchOpen} 
        onClose={() => setIsMobileSearchOpen(false)} 
      />

      {/* Update InviteMemberDialog z-index */}
      <div className="relative z-50">
        <InviteMemberDialog
          isOpen={isInviteOpen}
          onClose={() => setIsInviteOpen(false)}
        />
      </div>
    </>
  )
} 
  