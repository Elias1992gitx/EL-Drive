'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { FileCard } from '@/components/FileCard'
import EmptyState from '@/components/EmptyState'
import { 
  DocumentIcon, FolderIcon, ClockIcon, StarIcon,
  ViewColumnsIcon, Squares2X2Icon, Bars4Icon, ChevronUpIcon,
  InformationCircleIcon
} from '@heroicons/react/24/outline'

const dummyFiles = [
  { id: '1', name: 'Documents', type: 'folder' as const },
  { id: '2', name: 'Images', type: 'folder' as const },
  { id: '3', name: 'Report.pdf', type: 'file' as const },
  { id: '4', name: 'Presentation.pptx', type: 'file' as const },
]

const tabs = [
  { icon: ClockIcon, label: 'Recents' },
  { icon: StarIcon, label: 'Starred' }
]

export default function FileGrid() {
  const [selectedFiles, setSelectedFiles] = useState<string[]>([])
  
  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between pb-3 border-b border-gray-100">
        <div className="flex items-center gap-6">
          <div className="flex items-center gap-2">
            <h2 className="text-base font-medium">All files</h2>
            <span className="text-gray-400">
              <InformationCircleIcon className="h-4 w-4" />
            </span>
          </div>
          <div className="flex items-center gap-4">
            <button className="flex items-center gap-1.5 text-sm text-gray-600 hover:text-gray-900">
              <ClockIcon className="h-4 w-4" />
              Recents
            </button>
            <button className="flex items-center gap-1.5 text-sm text-gray-600 hover:text-gray-900">
              <StarIcon className="h-4 w-4" />
              Starred
            </button>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <button className="flex items-center gap-1 text-sm text-gray-600">
            Name
            <ChevronUpIcon className="h-4 w-4" />
          </button>
          <div className="flex">
            <button className="p-1.5 rounded-l-lg border border-gray-200 hover:bg-gray-50">
              <Squares2X2Icon className="h-4 w-4 text-gray-600" />
            </button>
            <button className="p-1.5 rounded-r-lg border-t border-r border-b border-gray-200 hover:bg-gray-50">
              <Bars4Icon className="h-4 w-4 text-gray-600" />
            </button>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
        {dummyFiles.map((file) => (
          <FileCard 
            key={file.id} 
            file={file}
            selected={selectedFiles.includes(file.id)}
            onSelect={() => {
              setSelectedFiles(prev => 
                prev.includes(file.id) 
                  ? prev.filter(id => id !== file.id)
                  : [...prev, file.id]
              )
            }}
          />
        ))}
      </div>
    </div>
  )
} 