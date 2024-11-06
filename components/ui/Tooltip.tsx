import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

interface TooltipProps {
  content: string
  children: React.ReactNode
  side?: 'top' | 'right' | 'bottom' | 'left'
}

export function Tooltip({ content, children, side = 'top' }: TooltipProps) {
  const [isVisible, setIsVisible] = useState(false)

  const positionClasses = {
    top: '-top-8 left-1/2 transform -translate-x-1/2',
    right: 'top-1/2 left-full transform -translate-y-1/2 ml-2',
    bottom: 'top-full left-1/2 transform -translate-x-1/2 mt-2',
    left: 'top-1/2 right-full transform -translate-y-1/2 -ml-2'
  }

  return (
    <div 
      onMouseEnter={() => setIsVisible(true)}
      onMouseLeave={() => setIsVisible(false)}
      className="relative"
    >
      {children}
      <AnimatePresence>
        {isVisible && (
          <motion.div
            initial={{ opacity: 0, y: side === 'top' || side === 'bottom' ? 5 : 0, x: side === 'left' || side === 'right' ? 5 : 0 }}
            animate={{ opacity: 1, y: 0, x: 0 }}
            exit={{ opacity: 0 }}
            className={`absolute z-50 px-2 py-1 text-xs bg-gray-900 text-white rounded whitespace-nowrap ${positionClasses[side]}`}
          >
            {content}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
} 