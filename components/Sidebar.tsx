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

  useEffect(() => {
    if (window.innerWidth < 640) {
      setExpanded(false)
    } else {
      setExpanded(true)
    }
  }, [setExpanded])

  return (
    <>
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

      <motion.aside
        initial={false}
        animate={{ 
          width: isExpanded ? 240 : 0,
          transition: { duration: 0.3, ease: 'easeInOut' }
        }}
        className={cn(
          'fixed left-0 top-0 bottom-0 z-[60]',
          'bg-white dark:bg-gray-900',
          'transform transition-transform duration-300',
          'border-r border-gray-200/50 dark:border-gray-700/50',
          'overflow-hidden',
          isExpanded ? 'w-[240px]' : 'w-0',
          'lg:block'
        )}
      >
        <div className={cn(
          'w-[240px]',
          'h-full',
          'transition-transform duration-300',
          isExpanded ? 'translate-x-0' : '-translate-x-full'
        )}>
          <SidebarContent isMobile={!isDesktop} />
        </div>
      </motion.aside>
    </>
  )
}
