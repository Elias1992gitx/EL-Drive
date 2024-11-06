'use client'

import { 
  PlusIcon, 
  ArrowUpTrayIcon, 
  FolderPlusIcon, 
  DocumentTextIcon, 
  PencilSquareIcon,
  UserIcon 
} from '@heroicons/react/24/outline'

export default function ActionButtons() {
  return (
    <div className="flex items-center gap-3 px-4 py-6 border-b border-gray-100">
      <button className="px-6 py-6 bg-black text-white rounded-lg text-sm font-medium flex items-center gap-2 shadow-sm">
        <PlusIcon className="h-4 w-4" />
        Create
      </button>
      
      <button className="px-6 py-6 border-2 border-dashed border-gray-300 rounded-lg text-sm font-medium flex items-center gap-2 hover:bg-gray-50">
        <ArrowUpTrayIcon className="h-4 w-4" />
        Upload or drop
      </button>
      
      <button className="px-6 py-6 border border-gray-200 rounded-lg text-sm font-medium text-gray-600 flex items-center gap-2 hover:bg-gray-50">
        <FolderPlusIcon className="h-4 w-4" />
        Create folder
      </button>
      
      <button className="px-6 py-6 border border-gray-200 rounded-lg text-sm font-medium text-gray-600 flex items-center gap-2 hover:bg-gray-50">
        <DocumentTextIcon className="h-4 w-4" />
        Edit PDF
      </button>
      
      <button className="px-6 py-6 border border-gray-200 rounded-lg text-sm font-medium text-gray-600 flex items-center gap-2 hover:bg-gray-50">
        <PencilSquareIcon className="h-4 w-4" />
        Get signatures
      </button>
      
      <button className="px-6 py-6 border border-gray-200 rounded-lg text-sm font-medium text-gray-600 flex items-center gap-2 hover:bg-gray-50">
        <UserIcon className="h-4 w-4" />
        Sign yourself
      </button>
    </div>
  )
} 