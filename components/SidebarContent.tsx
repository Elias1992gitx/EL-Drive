import { XMarkIcon, Bars3Icon, PlusIcon } from '@heroicons/react/24/outline'
import { useSidebar } from '@/contexts/SidebarContext'
import { menuItems, quickAccessSection } from '@/types/sidebar'
import { motion } from 'framer-motion'

interface SidebarContentProps {
  isMobile: boolean
}

const menuItemVariants = {
  expanded: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.2 }
  },
  collapsed: {
    opacity: 0,
    x: -10,
    transition: { duration: 0.2 }
  }
}

export default function SidebarContent({ isMobile }: SidebarContentProps) {
  const { isExpanded, toggleSidebar } = useSidebar()

  return (
    <div className="flex flex-col h-full">
      {/* Logo and Toggle Button */}
      <div className="flex items-center justify-between p-4 border-b border-gray-100">
        <div className="flex items-center gap-2">
          {/* Toggle Button - Always visible */}

          {/* Logo */}
          {isExpanded && (
            <img src="/ELST.svg" alt="ELST Logo" className="h-12 w-auto" />
          )}

          <button
            onClick={toggleSidebar}
            className="p-2 rounded-lg hover:bg-gray-50 transition"
            aria-label="Toggle sidebar"
          >
            <Bars3Icon className="h-5 w-5 text-gray-500" />
          </button>
        </div>

        {/* Close Button (only for mobile) */}
        {isMobile && (
          <button
            onClick={toggleSidebar}
            className="p-2 rounded-lg hover:bg-gray-50 transition"
            aria-label="Close sidebar"
          >
            <XMarkIcon className="h-6 w-6" />
          </button>
        )}
      </div>

      {/* Navigation content */}
      <div className="flex-1 overflow-y-auto">
        <nav className="space-y-0.5 p-2">
          {menuItems.map((item) => (
            <motion.a
              key={item.label}
              href={item.href}
              variants={menuItemVariants}
              animate={isExpanded ? 'expanded' : 'collapsed'}
              className="flex items-center gap-3 px-3 py-1.5 text-sm text-gray-600 rounded-lg hover:bg-gray-50"
            >
              <item.icon className="h-4 w-4 shrink-0" />
              {isExpanded && <span className="truncate">{item.label}</span>}
            </motion.a>
          ))}
        </nav>

        {/* Quick Access Section */}
        {isExpanded && (
          <motion.div
            className="mt-6 pt-2 border-t border-gray-100 p-2"
            variants={menuItemVariants}
            animate="expanded"
          >
            <div className="flex items-center justify-between px-3 mb-0.5">
              <span className="text-sm text-gray-900">
                {quickAccessSection.title}
              </span>
              <button className="p-1 hover:bg-gray-50 rounded">
                <PlusIcon className="h-4 w-4 text-gray-400" />
              </button>
            </div>
            <p className="text-xs text-gray-600 px-3 mb-1">
              {quickAccessSection.description}
            </p>
            {quickAccessSection.items.map((item) => (
              <motion.a
                key={item.label}
                href={item.href}
                className="flex items-center gap-3 px-3 py-1.5 text-sm text-gray-600 rounded-lg hover:bg-gray-50"
              >
                {item.icon && (
                  <item.icon className="h-4 w-4 shrink-0 text-gray-400" />
                )}
                <span className="truncate">{item.label}</span>
              </motion.a>
            ))}
          </motion.div>
        )}
      </div>
    </div>
  )
}
