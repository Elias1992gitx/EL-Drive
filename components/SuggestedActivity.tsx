'use client'

import { motion } from 'framer-motion'
import { EyeIcon, FolderIcon, DocumentIcon } from '@heroicons/react/24/outline'

export default function SuggestedActivity() {
  return (
    <div className="px-4 py-6">
      <div className="flex items-center gap-2 mb-4">
        <EyeIcon className="h-4 w-4 text-gray-400" />
        <h2 className="text-sm font-medium text-gray-900">Suggested from your activity</h2>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <motion.div
          whileHover={{ scale: 1.02 }}
          className="p-4 rounded-lg border border-gray-200 bg-white hover:shadow-sm"
        >
          <div className="mb-3">
            <FolderIcon className="h-12 w-12 text-blue-400" />
          </div>
          <div>
            <h3 className="text-sm font-medium text-gray-900">ASMobbi... Folder</h3>
            <p className="text-xs text-gray-500 mt-0.5">Folder • ASMobbin</p>
          </div>
        </motion.div>

        <motion.div
          whileHover={{ scale: 1.02 }}
          className="p-4 rounded-lg border border-gray-200 bg-white hover:shadow-sm"
        >
          <div className="mb-3">
            <DocumentIcon className="h-12 w-12 text-gray-400" />
          </div>
          <div>
            <h3 className="text-sm font-medium text-gray-900">PDF File</h3>
            <p className="text-xs text-gray-500 mt-0.5">PDF • ASMobbin Team Folder</p>
          </div>
        </motion.div>
      </div>
    </div>
  )
} 