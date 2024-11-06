import { Dialog } from '@headlessui/react'
import {
  ChevronDownIcon,
  DocumentTextIcon,
  MagnifyingGlassIcon,
  XMarkIcon,
} from '@heroicons/react/24/outline'
import { AnimatePresence, motion } from 'framer-motion'
import { useState } from 'react'

interface EditPDFDialogProps {
  isOpen: boolean
  onClose: () => void
}

export default function EditPDFDialog({ isOpen, onClose }: EditPDFDialogProps) {
  const [searchQuery, setSearchQuery] = useState('')

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
          className="fixed inset-0 z-50 overflow-y-auto"
        >
          <div className="fixed inset-0 flex items-center justify-center p-4">
            <Dialog.Panel
              as={motion.div}
              initial={{ scale: 0.95, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.95, opacity: 0, y: 20 }}
              className="bg-white rounded-xl shadow-2xl w-[70%] h-[70vh] overflow-hidden flex flex-col"
            >
              {/* Header */}
              <div className="px-6 py-4 border-b border-gray-100 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <motion.div
                    initial={{ rotate: -15, scale: 0.8 }}
                    animate={{ rotate: 0, scale: 1 }}
                    transition={{ type: 'spring' }}
                  >
                    <DocumentTextIcon className="h-6 w-6 text-blue-500" />
                  </motion.div>
                  <Dialog.Title className="text-xl font-semibold text-gray-900">
                    Choose a PDF to edit
                  </Dialog.Title>
                </div>
                <button
                  onClick={onClose}
                  className="p-2 rounded-full hover:bg-gray-100 transition-colors"
                >
                  <XMarkIcon className="h-5 w-5 text-gray-500" />
                </button>
              </div>

              {/* Search Bar */}
              <div className="p-4 border-b border-gray-100">
                <div className="relative">
                  <MagnifyingGlassIcon className="h-5 w-5 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Search files..."
                    className="w-full pl-10 pr-4 py-2 rounded-lg border border-gray-200 
                             focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 
                             transition-all"
                  />
                </div>
              </div>

              {/* Content Area */}
              <div className="p-4 flex-1 overflow-y-auto">
                {/* Location Selector */}
                <div className="flex items-center gap-2 mb-4">
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="flex items-center gap-2 px-4 py-2 rounded-lg 
                             border border-gray-200 text-sm text-gray-700
                             hover:bg-gray-50 transition-colors"
                  >
                    <span>EL_Drive</span>
                    <ChevronDownIcon className="h-4 w-4" />
                  </motion.button>
                </div>

                {/* File List */}
                <div className="space-y-2">
                  {/* Example folder/file items */}
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="flex items-center gap-3 p-3 rounded-lg hover:bg-gray-50 cursor-pointer"
                  >
                    {/* Add your file/folder items here */}
                  </motion.div>
                </div>
              </div>

              {/* Footer */}
              <div className="px-6 py-4 bg-gray-50 border-t border-gray-100 flex justify-between">
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => {
                    const input = document.createElement('input')
                    input.type = 'file'
                    input.accept = '.pdf'
                    input.onchange = (e) => {
                      const file = (e.target as HTMLInputElement).files?.[0]
                      if (file) {
                        console.log('Selected file:', file)
                        onClose()
                      }
                    }
                    input.click()
                  }}
                  className="px-4 py-2 text-sm font-medium text-blue-500 hover:text-blue-600"
                >
                  Upload files
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="px-4 py-2 bg-blue-500 text-white rounded-lg text-sm font-medium
                           hover:bg-blue-600 transition-colors"
                >
                  Choose
                </motion.button>
              </div>
            </Dialog.Panel>
          </div>
        </Dialog>
      )}
    </AnimatePresence>
  )
}
