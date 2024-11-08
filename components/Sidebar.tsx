import { useSidebar } from '@/contexts/SidebarContext'
import { useBreakpoint } from '@/hooks/useBreakpoint'
import { motion, AnimatePresence } from 'framer-motion'
import { usePathname } from 'next/navigation'
import { useEffect } from 'react'
import SidebarContent from './SidebarContent'
import { cn } from '@/lib/utils'

export default function Sidebar() {
  const { isExpanded, setExpanded } = useSidebar()
  const isDesktop = useBreakpoint('lg')
  const pathname = usePathname()

  // Auto-toggle sidebar based on screen width
  useEffect(() => {
    if (window.innerWidth < 640) {
      setExpanded(false)
    } else {
      setExpanded(true)
    }
  }, [setExpanded])

  return (
    <>
      {/* Mobile Overlay */}
      <AnimatePresence>
        {!isDesktop && isExpanded && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.5 }}
            exit={{ opacity: 0 }}
            className={cn(
              'fixed inset-0 z-40',
              'bg-black/50 backdrop-blur-sm',
              'lg:hidden'
            )}
            onClick={() => setExpanded(false)}
          />
        )}
      </AnimatePresence>

      {/* Sidebar Component */}
      <motion.aside
        className={cn(
          'fixed left-0 top-0 bottom-0 z-50',
          'w-[280px] sm:w-[240px]',
          'bg-white dark:bg-gray-900',
          'transform transition-all duration-300',
          'lg:translate-x-0',
          isExpanded ? 'translate-x-0' : '-translate-x-full',
          'border-r border-gray-200/50 dark:border-gray-700/50',
          'flex flex-col',
          'safe-area-inset-left'
        )}
      >
        <SidebarContent isMobile={!isDesktop} />
      </motion.aside>
    </>
  )
}
