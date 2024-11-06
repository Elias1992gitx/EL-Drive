'use client'

import { useState, useRef } from 'react'
import CreateMenu from './CreateMenu'
import { 
  PlusIcon, 
  ArrowUpTrayIcon, 
  FolderPlusIcon, 
  DocumentTextIcon, 
  PencilSquareIcon,
  UserIcon 
} from '@heroicons/react/24/outline'

export default function ActionButtons() {
  const [isCreateMenuOpen, setIsCreateMenuOpen] = useState(false)
  const createButtonRef = useRef<HTMLButtonElement>(null)

  return (
    <div className="flex items-center gap-3 px-4 py-6 border-b border-gray-100">
      <button 
        ref={createButtonRef}
        onClick={() => setIsCreateMenuOpen(true)}
        className="px-6 py-[21px] bg-black text-white rounded-lg text-sm font-medium flex items-center gap-2 shadow-sm border border-transparent whitespace-nowrap"
      >
        <PlusIcon className="h-4 w-4" />
        Create
      </button>
      
      <CreateMenu 
        isOpen={isCreateMenuOpen}
        onClose={() => setIsCreateMenuOpen(false)}
        anchorEl={createButtonRef.current}
      />
      
      <button className="px-6 py-[21px] border-2 border-dashed border-gray-300 rounded-lg text-sm font-medium flex items-center gap-2 hover:bg-gray-50 whitespace-nowrap">
        <ArrowUpTrayIcon className="h-4 w-4" />
        Upload or drop
      </button>
      
      <button className="px-6 py-[21px] border border-gray-200 rounded-lg text-sm font-medium text-gray-600 flex items-center gap-2 hover:bg-gray-50 whitespace-nowrap">
        <FolderPlusIcon className="h-4 w-4" />
        Create folder
      </button>
      
      <button className="px-6 py-[22px] border border-gray-200 rounded-lg text-sm font-medium text-gray-600 flex items-center gap-2 hover:bg-gray-50 whitespace-nowrap">
        <DocumentTextIcon className="h-4 w-4" />
        Edit PDF
      </button>
      
      <button className="px-6 py-[22px] border border-gray-200 rounded-lg text-sm font-medium text-gray-600 flex items-center gap-2 hover:bg-gray-50 whitespace-nowrap">
        <PencilSquareIcon className="h-4 w-4" />
        Get signatures
      </button>
      
      <button className="px-6 py-[22px] border border-gray-200 rounded-lg text-sm font-medium text-gray-600 flex items-center gap-2 hover:bg-gray-50 whitespace-nowrap">
        <UserIcon className="h-4 w-4" />
        Sign yourself
      </button>
    </div>
  )
} 