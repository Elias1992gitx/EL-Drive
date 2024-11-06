import {
  ArrowPathIcon,
  DocumentIcon,
  FolderIcon,
  PhotoIcon,
  VideoCameraIcon,
  XMarkIcon,
} from '@heroicons/react/24/outline'
import { motion, AnimatePresence } from 'framer-motion'
import { useState } from 'react'

interface AutomationOption {
  id: string
  icon: any
  title: string
  description: string
}

const automationOptions: AutomationOption[] = [
  {
    id: 'sort',
    icon: FolderIcon,
    title: 'Choose a category to sort files by',
    description:
      'Automatically organize files into subfolders based on type, date, or other criteria',
  },
  {
    id: 'rename',
    icon: ArrowPathIcon,
    title: 'Set a rule that renames files',
    description: 'Automatically rename incoming files based on custom patterns',
  },
  {
    id: 'convert-pdf',
    icon: DocumentIcon,
    title: 'Convert files to PDFs',
    description: 'Automatically convert compatible files to PDF format',
  },
  {
    id: 'convert-image',
    icon: PhotoIcon,
    title: 'Choose an image format to convert files to',
    description: 'Convert images to JPG, PNG, or other formats automatically',
  },
  {
    id: 'convert-video',
    icon: VideoCameraIcon,
    title: 'Choose a file format to convert videos to',
    description: 'Convert videos to MP4, MOV, or other formats automatically',
  },
]

interface AutomatedFolderDialogProps {
  isOpen: boolean
  onClose: () => void
}

export default function AutomatedFolderDialog({
  isOpen,
  onClose,
}: AutomatedFolderDialogProps) {
  const [selectedOption, setSelectedOption] = useState<string | null>(null)

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 overflow-y-auto"
        >
          {/* Backdrop */}
          <div className="fixed inset-0 bg-black bg-opacity-50" onClick={onClose} />

          {/* Dialog */}
          <div className="relative min-h-screen flex items-center justify-center p-4">
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              className="relative bg-white rounded-lg shadow-xl max-w-2xl w-full"
            >
              {/* Header */}
              <div className="flex items-center justify-between p-6 border-b border-gray-100">
                <h2 className="text-xl font-semibold text-gray-900">
                  Create automated folder
                </h2>
                <button
                  onClick={onClose}
                  className="p-2 rounded-lg hover:bg-gray-50 text-gray-400 hover:text-gray-500"
                >
                  <XMarkIcon className="w-5 h-5" />
                </button>
              </div>

              {/* Content */}
              <div className="p-6">
                <h3 className="text-sm font-medium text-gray-900 mb-4">
                  Choose an automation
                </h3>

                <div className="space-y-3">
                  {automationOptions.map((option) => (
                    <motion.button
                      key={option.id}
                      onClick={() => setSelectedOption(option.id)}
                      whileHover={{ scale: 1.01 }}
                      whileTap={{ scale: 0.99 }}
                      className={`w-full p-4 flex items-start gap-4 rounded-lg border transition-colors
                        ${selectedOption === option.id 
                          ? 'border-blue-500 bg-blue-50' 
                          : 'border-gray-200 hover:border-gray-300 hover:bg-gray-50'
                        }`}
                    >
                      <option.icon className={`w-6 h-6 mt-1 ${
                        selectedOption === option.id ? 'text-blue-500' : 'text-gray-400'
                      }`} />
                      <div className="flex-1 text-left">
                        <h4 className={`text-sm font-medium ${
                          selectedOption === option.id ? 'text-blue-700' : 'text-gray-900'
                        }`}>
                          {option.title}
                        </h4>
                        <p className="text-sm text-gray-500 mt-1">
                          {option.description}
                        </p>
                      </div>
                    </motion.button>
                  ))}
                </div>
              </div>

              {/* Footer */}
              <div className="flex justify-between items-center p-6 border-t border-gray-100">
                <button
                  onClick={onClose}
                  className="px-4 py-2 text-sm font-medium text-gray-700 hover:text-gray-800"
                >
                  Send feedback
                </button>
                <button
                  onClick={onClose}
                  disabled={!selectedOption}
                  className={`px-4 py-2 rounded-lg text-sm font-medium ${
                    selectedOption
                      ? 'bg-blue-500 text-white hover:bg-blue-600'
                      : 'bg-gray-100 text-gray-400 cursor-not-allowed'
                  }`}
                >
                  Next
                </button>
              </div>
            </motion.div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
