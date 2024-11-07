'use client'

import { useState, useRef, useEffect, Fragment } from 'react'
import { useAuth, useUser } from '@clerk/nextjs'
import { Menu, Transition } from '@headlessui/react'
import { 
  MagnifyingGlassIcon,
  Bars3Icon,
  XMarkIcon,
  UserCircleIcon,
  Cog6ToothIcon,
  ArrowRightOnRectangleIcon,
  BellIcon,
  UserPlusIcon
} from '@heroicons/react/24/outline'
import { motion, AnimatePresence } from 'framer-motion'
import { useSidebar } from '@/contexts/SidebarContext'
import InviteMemberDialog from './InviteMemberDialog'

export default function Header() {
  const [isSearchFocused, setIsSearchFocused] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)
  const [isInviteOpen, setIsInviteOpen] = useState(false)
  const { signOut } = useAuth()
  const { user, isLoaded } = useUser()
  const { isExpanded } = useSidebar()

  // Calculate dynamic max-width based on sidebar state
  const getSearchMaxWidth = () => {
    return isExpanded ? 'max-w-xl' : 'max-w-3xl'
  }

  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 0)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  if (!isLoaded) {
    return null // Or a loading spinner
  }

  return (
    <header 
      className={`fixed top-0 w-full z-50 transition-all duration-200 
        ${isScrolled ? 'bg-white/80 backdrop-blur-md shadow-sm' : 'bg-white'}
        after:content-[''] after:absolute after:bottom-0 after:left-0 after:right-0 
        after:h-[1px] after:bg-gradient-to-r after:from-transparent after:via-gray-200 after:to-transparent`}
    >
      <div className="max-w-full mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between gap-4">
          {/* Left Section */}
          <div className="flex items-center gap-4">
            <button 
              className="lg:hidden -ml-2 p-2 rounded-full hover:bg-gray-100 transition-colors"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
              <motion.div
                animate={{ rotate: isMobileMenuOpen ? 90 : 0 }}
                transition={{ duration: 0.2 }}
              >
                {isMobileMenuOpen ? (
                  <XMarkIcon className="h-6 w-6" />
                ) : (
                  <Bars3Icon className="h-6 w-6" />
                )}
              </motion.div>
            </button>
            
            {/* Logo - visible on mobile */}
            <div className="lg:hidden">
              <img src="/ELST.svg" alt="ELST Logo" className="h-8 w-auto" />
            </div>
          </div>

          {/* Search Bar - Center with dynamic width */}
          <motion.div 
            className={`
              flex-1 items-center gap-2
              ${isSearchFocused ? 'z-30' : ''}
              transition-all duration-300 ease-in-out
              lg:flex hidden
            `}
            animate={{
              maxWidth: isExpanded ? '32rem' : '48rem',
              marginLeft: isExpanded ? '16rem' : '4rem'
            }}
          >
            <div className="relative flex items-center gap-2 w-full">
              <div className="relative flex-1">
                <input
                  type="text"
                  placeholder="Search files and folders..."
                  onFocus={() => setIsSearchFocused(true)}
                  onBlur={() => setIsSearchFocused(false)}
                  className="w-full pl-10 pr-4 py-2 text-sm bg-gray-50 border border-gray-200 
                           rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500/20
                           transition-all duration-200 hover:bg-gray-100 focus:bg-white"
                />
                <MagnifyingGlassIcon className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
              </div>

              <button 
                onClick={() => setIsInviteOpen(true)}
                className="hidden md:flex items-center gap-2 bg-black text-sm text-white hover:text-white 
                         px-3 py-2 rounded-lg hover:bg-gray-800 whitespace-nowrap border border-gray-200"
              >
                <UserPlusIcon className="h-4 w-4" />
                <span className="hidden lg:inline">Invite members</span>
              </button>
            </div>
          </motion.div>

          {/* Right Actions */}
          <div className="flex items-center gap-2 sm:gap-4">
            {/* Invite Members Button - Mobile */}
            <button 
              onClick={() => setIsInviteOpen(true)}
              className="md:hidden p-2 rounded-full hover:bg-gray-100 transition-colors"
            >
              <UserPlusIcon className="h-6 w-6 text-gray-600" />
            </button>

            {/* Existing Notifications button */}
            <button className="p-2 rounded-full hover:bg-gray-100 transition-colors relative">
              <BellIcon className="h-6 w-6 text-gray-600" />
              <span className="absolute top-1 right-1 h-2 w-2 bg-red-500 rounded-full" />
            </button>

            {/* User Profile Dropdown */}
            <Menu as="div" className="relative">
              <Menu.Button className="flex items-center gap-2 p-1.5 rounded-full hover:bg-gray-100 transition-colors">
                {user?.imageUrl ? (
                  <img 
                    src={user.imageUrl} 
                    alt="Profile" 
                    className="h-8 w-8 rounded-full object-cover ring-2 ring-white"
                  />
                ) : (
                  <UserCircleIcon className="h-8 w-8 text-gray-400" />
                )}
                <span className="hidden sm:block text-sm font-medium text-gray-700">
                  {user?.fullName || 'User'}
                </span>
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
                <Menu.Items className="absolute right-0 mt-2 w-56 origin-top-right bg-white rounded-xl 
                  shadow-lg ring-1 ring-black/5 focus:outline-none divide-y divide-gray-50">
                  <div className="p-2">
                    <Menu.Item>
                      {({ active }) => (
                        <button
                          className={`${
                            active ? 'bg-gray-50' : ''
                          } flex w-full items-center gap-2 px-3 py-2 text-sm text-gray-700 rounded-lg 
                          transition-colors hover:bg-gray-50/80`}
                        >
                          <Cog6ToothIcon className="h-4 w-4" />
                          Settings
                        </button>
                      )}
                    </Menu.Item>
                  </div>
                  <div className="p-2">
                    <Menu.Item>
                      {({ active }) => (
                        <button
                          onClick={() => signOut()}
                          className={`${
                            active ? 'bg-gray-50' : ''
                          } flex w-full items-center gap-2 px-3 py-2 text-sm text-gray-700 rounded-lg 
                          transition-colors hover:bg-gray-50/80`}
                        >
                          <ArrowRightOnRectangleIcon className="h-4 w-4" />
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

        {/* Mobile Search - Shown when menu is open */}
        <AnimatePresence>
          {isMobileMenuOpen && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              className="lg:hidden pb-4"
            >
              <div className="relative">
                <input
                  type="text"
                  placeholder="Search..."
                  className="w-full pl-10 pr-4 py-2 text-sm bg-gray-50 border border-gray-200 
                           rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500/20"
                />
                <MagnifyingGlassIcon className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      <InviteMemberDialog
        isOpen={isInviteOpen}
        onClose={() => setIsInviteOpen(false)}
      />
    </header>
  )
} 