'use client'

import { motion } from 'framer-motion'
import { DocumentIcon, FolderIcon } from '@heroicons/react/24/outline'
import { Checkbox } from './ui'

interface FileCardProps {
  file: {
    id: string
    name: string
    type: 'file' | 'folder'
  }
  selected: boolean
  onSelect: () => void
}

export function FileCard({ file, selected, onSelect }: FileCardProps) {
  return (
    <motion.div
      whileHover={{ scale: 1.02 }}
      className={`p-3 rounded-lg border ${
        selected 
          ? 'border-blue-500 bg-blue-50' 
          : 'border-gray-200 hover:border-gray-300 bg-white'
      }`}
    >
      <div className="flex items-start gap-2">
        <Checkbox checked={selected} onChange={onSelect} />
        <div className="flex-1 min-w-0">
          {file.type === 'folder' ? (
            <FolderIcon className="h-10 w-10 text-blue-400" />
          ) : (
            <DocumentIcon className="h-10 w-10 text-gray-400" />
          )}
          <p className="mt-1 text-sm font-medium text-gray-900 truncate">{file.name}</p>
        </div>
      </div>
    </motion.div>
  )
} 