import { useSidebar } from '@/contexts/SidebarContext'
import { useBreakpoint } from '@/hooks/useBreakpoint'
import { motion, AnimatePresence } from 'framer-motion'
import { usePathname } from 'next/navigation'
import { useEffect, useState } from 'react'
import SidebarContent from './SidebarContent'
import styles from '@/styles/Sidebar.module.css'
import { Bars3Icon } from '@heroicons/react/24/solid'

export default function Sidebar() {
  const { isExpanded, toggleSidebar, setExpanded } = useSidebar()
  const isDesktop = useBreakpoint('lg')
  const [isMobileOpen, setIsMobileOpen] = useState(false)
  const pathname = usePathname()

  // Close mobile sidebar on route change
  useEffect(() => {
    if (!isDesktop) setIsMobileOpen(false)
  }, [pathname, isDesktop])

  // Auto-toggle sidebar based on screen width
  useEffect(() => {
    if (window.innerWidth < 640) {
      setExpanded(false)
      setIsMobileOpen(false)
    } else {
      setExpanded(true)
    }
  }, [setExpanded])

  return (
    <>
      {/* Mobile Overlay */}
      <AnimatePresence>
        {!isDesktop && isMobileOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.5 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 z-40"
            onClick={() => setIsMobileOpen(false)}
          />
        )}
      </AnimatePresence>

      {/* Sidebar Component */}
      <motion.aside
        className={`fixed left-0 top-0 bottom-0 z-50 bg-white ${
          isDesktop ? 'block shadow-sm' : 'hidden'
        } ${isMobileOpen ? '!block' : ''}`}
        animate={
          !isDesktop
            ? isMobileOpen
              ? { x: 0, width: '240px' }
              : { x: '-100%', width: '240px' }
            : isExpanded
            ? { width: 'var(--sidebar-width)', x: 0 }
            : { width: '0px', x: 0 }
        }
      >
        <SidebarContent isMobile={!isDesktop} />
      </motion.aside>
    </>
  )
}
