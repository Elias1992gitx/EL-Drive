'use client'

import { motion } from 'framer-motion'
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
  hidden: { 
    width: 0,
    x: -256,
    opacity: 0,
    transition: {
      width: { duration: 0.3 },
      x: { duration: 0.3 },
      opacity: { duration: 0.2 }
    }
  },
  visible: { 
    width: "16rem",
    x: 0,
    opacity: 1,
    transition: {
      width: { duration: 0.3 },
      x: { duration: 0.3 },
      opacity: { duration: 0.2 }
    }
  }
};

export default function Sidebar() {
  const [isExpanded, setIsExpanded] = useState(true);
  const [expandedSections, setExpandedSections] = useState({
    starred: true,
    untitled: true
  });

  const toggleSidebar = () => setIsExpanded(!isExpanded);

  return (
    <aside className="fixed left-0 top-0 bottom-0 flex bg-white z-50">
      {/* Vertical Icon Navigation */}
      <div className="w-12 border-r border-gray-100 flex flex-col items-center">
        <button 
          onClick={toggleSidebar}
          className="w-full p-3 flex justify-center text-gray-600 hover:bg-gray-50"
        >
          <Bars3Icon className="h-5 w-5" />
        </button>

        <div className="flex-1 w-full mt-2">
          <div className="space-y-0.5">
            <button className="w-full py-2 flex flex-col items-center text-gray-600 hover:bg-gray-50">
              <HomeIcon className="h-5 w-5 mb-1" />
              <span className="text-[10px]">Home</span>
            </button>
            
            <button className="w-full py-2 flex flex-col items-center text-gray-600 hover:bg-gray-50">
              <FolderIcon className="h-5 w-5 mb-1" />
              <span className="text-[10px]">Folders</span>
            </button>
            
            <button className="w-full py-2 flex flex-col items-center text-gray-600 hover:bg-gray-50">
              <Squares2X2Icon className="h-5 w-5 mb-1" />
              <span className="text-[10px]">More</span>
            </button>
          </div>
        </div>
        
        {/* Bottom Icons */}
        <div className="pb-4 w-full space-y-1">
          <button className="w-full p-3 flex justify-center text-gray-600 hover:bg-gray-50">
            <BellIcon className="h-5 w-5" />
          </button>
          <div className="w-full p-3 flex justify-center">
            <div className="h-7 w-7 rounded-full bg-rose-100 flex items-center justify-center">
              <span className="text-xs font-medium text-rose-600">AS</span>
            </div>
          </div>
        </div>
      </div>

      {/* Expandable Sidebar Content */}
      <motion.div
        initial="visible"
        animate={isExpanded ? "visible" : "hidden"}
        variants={sidebarVariants}
        className="w-64 border-r border-gray-100 overflow-hidden transition-all duration-300"
      >
        <div className="h-14 border-b border-gray-100">
          <Menu as="div" className="relative h-full px-3 flex items-center">
            <Menu.Button className="w-full flex items-center justify-between hover:bg-gray-50 rounded-lg px-2 py-1.5">
              <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="flex items-center gap-2"
              >
                <span className="text-sm font-medium">ASMobbin</span>
                <div className="flex items-center justify-center h-5 w-5 bg-gray-100 rounded text-xs font-medium">
                  2
                </div>
              </motion.div>
              <ChevronDownIcon className="h-4 w-4 text-gray-400" />
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
              <Menu.Items className="absolute left-0 z-10 mt-1 w-56 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                <div className="py-1">
                  <Menu.Item>
                    {({ active }) => (
                      <a
                        href="#"
                        className={`${
                          active ? 'bg-gray-50 text-gray-900' : 'text-gray-700'
                        } flex items-center px-4 py-2 text-sm`}
                      >
                        Settings
                      </a>
                    )}
                  </Menu.Item>
                </div>
              </Menu.Items>
            </Transition>
          </Menu>
        </div>

        <nav className="flex-1 px-2 py-2">
          <div className="space-y-0.5">
            <a href="#" className="flex items-center gap-2 px-2 py-1.5 text-sm text-gray-900 rounded-md bg-gray-100">
              <DocumentIcon className="h-4 w-4" />
              <span>All files</span>
            </a>
            
            <a href="#" className="flex items-center gap-2 px-2 py-1.5 text-sm text-gray-600 rounded-md hover:bg-gray-50">
              <DocumentIcon className="h-4 w-4" />
              <span>Signatures</span>
            </a>
            
            <a href="#" className="flex items-center gap-2 px-2 py-1.5 text-sm text-gray-600 rounded-md hover:bg-gray-50">
              <PaperAirplaneIcon className="h-4 w-4" />
              <span>Send and track</span>
            </a>
            
            <a href="#" className="flex items-center gap-2 px-2 py-1.5 text-sm text-gray-600 rounded-md hover:bg-gray-50">
              <ShareIcon className="h-4 w-4" />
              <span>Shared</span>
            </a>
            
            <a href="#" className="flex items-center gap-2 px-2 py-1.5 text-sm text-gray-600 rounded-md hover:bg-gray-50">
              <InboxIcon className="h-4 w-4" />
              <span>File requests</span>
            </a>
            
            <a href="#" className="flex items-center gap-2 px-2 py-1.5 text-sm text-gray-600 rounded-md hover:bg-gray-50">
              <TrashIcon className="h-4 w-4" />
              <span>Deleted files</span>
            </a>
            
            <a href="#" className="flex items-center gap-2 px-2 py-1.5 text-sm text-gray-600 rounded-md hover:bg-gray-50">
              <Cog6ToothIcon className="h-4 w-4" />
              <span>Admin console</span>
            </a>
          </div>

          {/* Quick Access Section */}
          <div className="mt-4">
            <div className="flex items-center justify-between px-2 py-1">
              <span className="text-xs font-medium text-gray-500">Quick access</span>
              <button className="text-gray-400 hover:text-gray-500 p-0.5">
                <PlusIcon className="h-3 w-3" />
              </button>
            </div>
            
            <div className="mt-0.5">
              <button 
                onClick={() => setExpandedSections(prev => ({ ...prev, starred: !prev.starred }))}
                className="w-full flex items-center gap-2 px-2 py-1.5 text-sm text-gray-600 rounded-md hover:bg-gray-50"
              >
                <ChevronDownIcon className="h-3 w-3" />
                <span>Starred</span>
              </button>
              
              <button 
                onClick={() => setExpandedSections(prev => ({ ...prev, untitled: !prev.untitled }))}
                className="w-full flex items-center gap-2 px-2 py-1.5 text-sm text-gray-600 rounded-md hover:bg-gray-50"
              >
                <ChevronDownIcon className="h-3 w-3" />
                <span>Untitled section</span>
              </button>
              
              <div className="px-3 py-2">
                <p className="text-xs text-gray-500">Add items that you use all the time.</p>
              </div>
            </div>
          </div>
        </nav>
      </motion.div>
    </aside>
  )
} 