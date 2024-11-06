'use client'

import { Fragment, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Menu, Transition } from '@headlessui/react'
import { 
  MagnifyingGlassIcon, PlusIcon, UserPlusIcon, ChevronDownIcon,
  ArrowUpTrayIcon, FolderPlusIcon, DocumentTextIcon, PencilSquareIcon,
  BellIcon, QuestionMarkCircleIcon
} from '@heroicons/react/24/outline'
import { UserButton } from "@clerk/nextjs";
import { useSidebar } from '@/contexts/SidebarContext';
import InviteMemberDialog from './InviteMemberDialog';

const actionButtons = [
  { icon: PlusIcon, label: 'Create', primary: true },
  { icon: ArrowUpTrayIcon, label: 'Upload or drop', border: true },
  { icon: FolderPlusIcon, label: 'Create folder' },
  { icon: DocumentTextIcon, label: 'Edit PDF' },
  { icon: PencilSquareIcon, label: 'Get signatures' },
  { icon: UserPlusIcon, label: 'Sign yourself' }
]

const sidebarVariants = {
  expanded: {
    width: "16rem",
    transition: {
      type: "spring",
      stiffness: 200,
      damping: 25
    }
  },
  collapsed: {
    width: "3rem",
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

export default function Header() {
  const { isExpanded } = useSidebar()
  const [isInviteOpen, setIsInviteOpen] = useState(false)

  return (
    <header 
      className={`fixed top-0 h-14 bg-white border-b border-gray-100 z-50 transition-all duration-200 ease-in-out
        ${isExpanded ? 'left-56' : 'left-10'} right-0`}
    >
      <div className="h-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <Menu as="div" className="relative">
            
          </Menu>
        </div>

        <div className="flex-1 max-w-2xl mx-8">
          <div className="relative">
            <input
              type="text"
              placeholder="Search"
              className="w-full pl-9 pr-4 py-2 text-sm bg-gray-50 border border-gray-200 
                       rounded-lg focus:outline-none focus:ring-1 focus:ring-gray-300"
            />
            <MagnifyingGlassIcon className="absolute left-3 top-2.5 h-4 w-4 text-gray-400" />
          </div>
        </div>

        <div className="flex items-center gap-3">
          <button 
            onClick={() => setIsInviteOpen(true)}
            className="flex items-center gap-2 text-sm text-gray-600 hover:text-gray-900 
                     px-3 py-1.5 rounded-lg hover:bg-gray-50"
          >
            <UserPlusIcon className="h-4 w-4" />
            Invite members
          </button>
          <button className="p-2 rounded-lg hover:bg-gray-50">
            <QuestionMarkCircleIcon className="h-4 w-4 text-gray-500" />
          </button>
          <UserButton />
        </div>
      </div>
      <InviteMemberDialog 
        isOpen={isInviteOpen}
        onClose={() => setIsInviteOpen(false)}
      />
    </header>
  )
} 