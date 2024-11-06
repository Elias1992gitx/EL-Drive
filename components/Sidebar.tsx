'use client'

import { motion, AnimatePresence } from 'framer-motion'
import { useState } from 'react'
import { useAuth } from '@/hooks/useAuth'
import { 
  HomeIcon, DocumentIcon, ShareIcon, TrashIcon, StarIcon,
  PaperAirplaneIcon, InboxIcon, Cog6ToothIcon, ChevronDownIcon,
  ChevronUpIcon, FolderIcon, PlusIcon, Bars3Icon, BellIcon, Squares2X2Icon
} from '@heroicons/react/24/outline'
import { Tooltip } from "@/components/ui/Tooltip"
import { EmptyState } from "@/components/ui/empty-state"
import { Menu, Transition } from '@headlessui/react'
import { Fragment } from 'react'
import { useSidebar } from '@/contexts/SidebarContext'

interface MenuItem {
  icon: any;
  label: string;
  href: string;
  items?: MenuItem[];
}

const menuItems: MenuItem[] = [
  { 
    icon: HomeIcon, 
    label: 'All Files', 
    href: '#',
  },
  { 
    icon: StarIcon,
    label: 'Quick Access',
    href: '#',
    items: [
      { icon: FolderIcon, label: 'Recent Files', href: '#' },
      { icon: StarIcon, label: 'Starred', href: '#' },
    ]
  },
  { 
    icon: DocumentIcon, 
    label: 'Signatures', 
    href: '#' 
  },
  { 
    icon: PaperAirplaneIcon, 
    label: 'Send and track', 
    href: '#' 
  },
  { 
    icon: ShareIcon, 
    label: 'Shared', 
    href: '#' 
  },
  { 
    icon: InboxIcon, 
    label: 'File requests', 
    href: '#',
    items: [
      { icon: InboxIcon, label: 'Received', href: '#' },
      { icon: PaperAirplaneIcon, label: 'Sent', href: '#' },
    ]
  },
  { 
    icon: TrashIcon, 
    label: 'Deleted Files', 
    href: '#' 
  },
  { 
    icon: Cog6ToothIcon, 
    label: 'Admin console', 
    href: '#' 
  },
]

const sidebarVariants = {
  expanded: {
    width: "12rem",
    transition: {
      type: "spring",
      stiffness: 200,
      damping: 25
    }
  },
  collapsed: {
    width: "1rem",
    transition: {
      type: "spring",
      stiffness: 200,
      damping: 25
    }
  }
};

const iconVariants = {
  expanded: { rotate: 0 },
  collapsed: { rotate: 180 }
};

const menuItemVariants = {
  expanded: {
    opacity: 1,
    x: 0,
    transition: {
      duration: 0.2,
      ease: "easeOut"
    }
  },
  collapsed: {
    opacity: 0,
    x: -10,
    transition: {
      duration: 0.2,
      ease: "easeIn"
    }
  }
};

export default function Sidebar() {
  const { isExpanded, toggleSidebar } = useSidebar();
  const [expandedSections, setExpandedSections] = useState({
    starred: true,
    untitled: true
  });

  return (
    <aside className="fixed left-0 top-0 bottom-0 flex bg-white z-50 shadow-sm">
      {/* Icon Bar */}
      <div className="w-10 flex flex-col items-center py-2 border-r border-gray-100">
        <motion.button 
          onClick={toggleSidebar}
          className="p-2 rounded-lg hover:bg-gray-50 text-gray-500"
          variants={iconVariants}
          animate={isExpanded ? "expanded" : "collapsed"}
        >
          <Bars3Icon className="h-5 w-5" />
        </motion.button>
        
        <div className="flex-1 w-full mt-4 space-y-2">
          {menuItems.map(item => (
            <Tooltip key={item.label} content={item.label}>
              <button className="w-full p-2 flex justify-center text-gray-600 hover:bg-gray-50 rounded-lg">
                <item.icon className="h-5 w-5" />
              </button>
            </Tooltip>
          ))}
        </div>
      </div>

      {/* Expandable Content */}
      <motion.div
        variants={sidebarVariants}
        animate={isExpanded ? "expanded" : "collapsed"}
        className="overflow-hidden border-r border-gray-100"
      >
        {/* Navigation Items */}
        <nav className="p-3 space-y-1">
          {menuItems.map(item => (
            <motion.a
              key={item.label}
              variants={menuItemVariants}
              animate={isExpanded ? "expanded" : "collapsed"}
              className="flex items-center gap-3 px-3 py-2 text-sm text-gray-600 rounded-lg hover:bg-gray-50"
            >
              <item.icon className="h-4 w-4 shrink-0" />
              <span className="truncate">{item.label}</span>
            </motion.a>
          ))}
        </nav>
      </motion.div>
    </aside>
  )
} 