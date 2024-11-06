'use client'

import { Dialog } from '@headlessui/react'
import { motion, AnimatePresence } from 'framer-motion'
import { useState } from 'react'
import { FolderIcon, XMarkIcon } from '@heroicons/react/24/outline'

interface CreateFolderDialogProps {
  isOpen: boolean
  onClose: () => void
}

export default function CreateFolderDialog({
  isOpen,
  onClose,
}: CreateFolderDialogProps) {
  const [folderName, setFolderName] = useState('')
  const [addAutomation, setAddAutomation] = useState(false)

  const handleCreate = () => {
    if (!folderName.trim()) return
    // Handle folder creation here
    console.log('Creating folder:', { folderName, addAutomation })
    onClose()
  }

  return (
    <AnimatePresence>
      {isOpen && (
        <Dialog
          as={motion.div}
          static
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          open={isOpen}
          onClose={onClose}
          className="fixed inset-0 z-50 overflow-y-auto flex items-center justify-center"
        >
          <motion.div
            className="fixed inset-0 bg-black/20 backdrop-blur-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          />

          <Dialog.Panel
            as={motion.div}
            initial={{ scale: 0.95, opacity: 0, y: 20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.95, opacity: 0, y: 20 }}
            className="relative bg-white rounded-xl shadow-xl w-full max-w-md overflow-hidden"
          >
            {/* Header */}
            <div className="p-6 pb-4 border-b border-gray-100">
              <div className="flex items-center gap-3">
                <motion.div
                  initial={{ rotate: -15, scale: 0.8 }}
                  animate={{ rotate: 0, scale: 1 }}
                  transition={{ type: 'spring', bounce: 0.5 }}
                >
                  <FolderIcon className="h-8 w-8 text-blue-500" />
                </motion.div>
                <Dialog.Title className="text-xl font-semibold text-gray-900">
                  Create folder
                </Dialog.Title>
              </div>
              <button
                onClick={onClose}
                className="absolute top-4 right-4 p-2 rounded-full hover:bg-gray-100 transition-colors"
              >
                <XMarkIcon className="h-5 w-5 text-gray-500" />
              </button>
            </div>

            {/* Content */}
            <div className="p-6 space-y-6">
              <div className="space-y-2">
                <label className="block text-sm font-medium text-gray-700">
                  Name
                </label>
                <motion.div
                  initial={false}
                  animate={folderName ? { scale: [1, 1.02, 1] } : {}}
                >
                  <input
                    type="text"
                    value={folderName}
                    onChange={(e) => setFolderName(e.target.value)}
                    className="w-full px-4 py-2 rounded-lg border border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-all"
                    placeholder="Folder name"
                    autoFocus
                  />
                </motion.div>
              </div>

              <div className="bg-gray-50 rounded-lg p-4">
                <label className="flex items-start gap-3">
                  <motion.input
                    type="checkbox"
                    checked={addAutomation}
                    onChange={(e) => setAddAutomation(e.target.checked)}
                    className="mt-1 h-4 w-4 text-blue-500 border-gray-300 rounded focus:ring-blue-500"
                    whileTap={{ scale: 0.9 }}
                  />
                  <div className="space-y-1">
                    <p className="text-sm font-medium text-gray-900">
                      Add automation
                    </p>
                    <p className="text-sm text-gray-500">
                      Set up this folder to automatically handle tasks like
                      organizing your content and converting files.
                    </p>
                  </div>
                </label>
              </div>
            </div>

            {/* Footer */}
            <div className="px-6 py-4 bg-gray-50 border-t border-gray-100 flex justify-end gap-3">
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={onClose}
                className="px-4 py-2 text-sm text-gray-600 hover:text-gray-900"
              >
                Cancel
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={handleCreate}
                disabled={!folderName.trim()}
                className="px-4 py-2 text-sm font-medium rounded-lg bg-blue-500 text-white hover:bg-blue-600 disabled:bg-gray-100 disabled:text-gray-400 disabled:cursor-not-allowed transition-colors"
              >
                Create
              </motion.button>
            </div>
          </Dialog.Panel>
        </Dialog>
      )}
    </AnimatePresence>
  )
}
