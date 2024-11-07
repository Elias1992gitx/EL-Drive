import { Dialog } from '@headlessui/react'
import { DocumentIcon, FolderIcon, XMarkIcon } from '@heroicons/react/24/outline'
import { AnimatePresence, motion } from 'framer-motion'
import { useState } from 'react'

interface AutomatedFolderDialogProps {
  isOpen: boolean
  onClose: () => void
}

const organizationOptions = [
  {
    id: 'month',
    label: 'Month',
    description: 'Month your content was added to EL_Drive',
  },
  {
    id: 'year',
    label: 'Year',
    description: 'Year your content was added to EL_Drive',
  },
  {
    id: 'keyword',
    label: 'Keyword',
    description: 'Group by specific keywords',
  },
]

export default function AutomatedFolderDialog({
  isOpen,
  onClose,
}: AutomatedFolderDialogProps) {
  const [selectedFolder, setSelectedFolder] = useState<string>('')
  const [selectedOption, setSelectedOption] = useState('month')

  return (
    <Dialog
      open={isOpen}
      onClose={onClose}
      className="relative z-50"
    >
      {/* Background overlay */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 bg-black/30 backdrop-blur-sm"
      />

      {/* Dialog position */}
      <div className="fixed inset-0 flex items-center justify-center p-4">
        <Dialog.Panel
          as={motion.div}
          initial={{ scale: 0.95, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.95, opacity: 0 }}
          className="relative w-full max-w-[95%] sm:max-w-[85%] md:max-w-4xl 
                   max-h-[90vh] sm:max-h-[85vh]
                   bg-white rounded-2xl shadow-xl overflow-hidden
                   flex flex-col lg:flex-row"
        >
          {/* Close button - Always visible */}
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={onClose}
            className="absolute top-4 right-4 p-2 rounded-full hover:bg-white/80 
                     transition-colors z-10"
          >
            <XMarkIcon className="h-5 w-5 text-gray-500" />
          </motion.button>

          {/* Left Configuration Section */}
          <div className="flex-1 flex flex-col h-full overflow-hidden">
            {/* Header */}
            <div className="p-4 sm:p-6 border-b border-gray-100">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <FolderIcon className="h-6 w-6 text-blue-500" />
                  <Dialog.Title className="text-lg sm:text-xl font-semibold">
                    Create Automated Folder
                  </Dialog.Title>
                </div>
              </div>
            </div>

            {/* Content */}
            <div className="flex-1 p-4 sm:p-6 overflow-y-auto custom-scrollbar">
              {/* When section */}
              <div className="space-y-4 mb-6">
                <div className="flex items-center gap-2">
                  <span className="text-sm text-gray-600">When</span>
                  <span className="text-sm font-medium">files are added to</span>
                </div>
                <button className="w-full px-4 py-3 text-sm text-red-600 bg-white border border-dashed border-red-300 rounded-lg hover:bg-red-50">
                  Select a folder
                </button>
              </div>

              {/* Then section */}
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">Then</span>
                  <span className="text-sm font-medium">
                    organize into folders grouped by
                  </span>
                </div>

                <div className="space-y-3">
                  {organizationOptions.map((option) => (
                    <motion.button
                      key={option.id}
                      whileHover={{ scale: 1.01 }}
                      whileTap={{ scale: 0.99 }}
                      onClick={() => setSelectedOption(option.id)}
                      className={`w-full flex items-center gap-3 p-4 rounded-lg border transition-all
                        ${selectedOption === option.id
                          ? 'border-blue-500 bg-blue-50'
                          : 'border-gray-200 hover:border-gray-300'
                        }`}
                    >
                      <input
                        type="radio"
                        checked={selectedOption === option.id}
                        onChange={() => setSelectedOption(option.id)}
                        className="h-4 w-4 text-blue-500 border-gray-300 focus:ring-blue-500"
                      />
                      <div className="flex-1 text-left">
                        <p className="text-sm font-medium text-gray-900">
                          {option.label}
                        </p>
                        <p className="text-sm text-gray-500">
                          {option.description}
                        </p>
                      </div>
                    </motion.button>
                  ))}
                </div>
              </div>
            </div>

            {/* Footer */}
            <div className="p-4 sm:p-6 bg-gray-50 border-t border-gray-100">
              <div className="flex justify-end gap-3">
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
                  disabled={!selectedFolder}
                  className="px-4 py-2 bg-blue-500 text-white rounded-lg text-sm 
                           font-medium hover:bg-blue-600 disabled:bg-gray-200 
                           disabled:text-gray-400 disabled:cursor-not-allowed"
                >
                  Create
                </motion.button>
              </div>
            </div>
          </div>

          {/* Right Preview Section - Hidden on mobile */}
          <div className="hidden lg:flex w-[400px] bg-gradient-to-br from-gray-50 to-white 
                        border-l border-gray-100">
            <div className="flex-1 flex items-center justify-center min-h-0">
              {/* Main Preview Area */}
              <motion.div
                className="w-full max-w-md aspect-square relative"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
              >
                {/* Central Folder */}
                <motion.div
                  className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2"
                  whileHover={{ scale: 1.05 }}
                  animate={{
                    y: [0, -10, 0],
                  }}
                  transition={{
                    duration: 4,
                    repeat: Infinity,
                    ease: 'easeInOut',
                  }}
                >
                  <div className="relative">
                    <motion.div
                      className="absolute -inset-4 bg-blue-100 rounded-full blur-xl"
                      animate={{
                        scale: [1, 1.2, 1],
                        opacity: [0.5, 0.8, 0.5],
                      }}
                      transition={{
                        duration: 4,
                        repeat: Infinity,
                        ease: 'easeInOut',
                      }}
                    />
                    <FolderIcon className="w-32 h-32 text-blue-500 relative z-10" />
                  </div>
                </motion.div>

                {/* Orbiting Files */}
                {selectedOption === 'month' && (
                  <div className="absolute inset-0">
                    {['Jan', 'Feb', 'Mar', 'Apr'].map((month, i) => (
                      <motion.div
                        key={month}
                        className="absolute left-1/2 top-1/2"
                        initial={{ opacity: 0, scale: 0 }}
                        animate={{
                          opacity: 1,
                          scale: 1,
                          rotate: i * 90,
                        }}
                        transition={{ delay: 0.4 + i * 0.1, duration: 0.5 }}
                      >
                        <motion.div
                          className="relative -translate-x-1/2 -translate-y-1/2"
                          animate={{
                            rotate: -360,
                          }}
                          transition={{
                            duration: 8,
                            repeat: Infinity,
                            ease: 'linear',
                          }}
                          style={{
                            transformOrigin: '50% 120px',
                          }}
                        >
                          <motion.div
                            whileHover={{ scale: 1.1 }}
                            className="px-4 py-2 bg-white rounded-lg shadow-lg border border-gray-200"
                          >
                            <span className="text-sm font-medium text-gray-700">
                              {month}
                            </span>
                          </motion.div>
                        </motion.div>
                      </motion.div>
                    ))}
                  </div>
                )}

                {/* Floating Documents */}
                <div className="absolute inset-0 pointer-events-none">
                  {[...Array(6)].map((_, i) => (
                    <motion.div
                      key={i}
                      className="absolute"
                      initial={{ opacity: 0 }}
                      animate={{
                        opacity: [0, 1, 0],
                        x: Math.random() * 300 - 150,
                        y: Math.random() * 300 - 150,
                      }}
                      transition={{
                        duration: 5,
                        delay: i * 0.5,
                        repeat: Infinity,
                        repeatType: 'reverse',
                      }}
                    >
                      <DocumentIcon className="w-6 h-6 text-blue-300" />
                    </motion.div>
                  ))}
                </div>
              </motion.div>

              {/* Description */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.4 }}
                className="max-w-sm relative"
              >
                <motion.div
                  className="absolute -inset-4 bg-blue-50 rounded-xl blur"
                  animate={{
                    scale: [1, 1.02, 1],
                  }}
                  transition={{
                    duration: 4,
                    repeat: Infinity,
                    ease: 'easeInOut',
                  }}
                />
                <div className="relative bg-white/80 backdrop-blur-sm rounded-lg p-6 shadow-sm border border-gray-100">
                  <h3 className="text-lg font-medium text-gray-900 mb-2">
                    {selectedOption === 'month' && 'Monthly Organization'}
                    {selectedOption === 'year' && 'Yearly Organization'}
                    {selectedOption === 'keyword' && 'Keyword Organization'}
                  </h3>
                  <p className="text-sm text-gray-600 leading-relaxed">
                    {selectedOption === 'month' &&
                      'Your files will be automatically sorted into monthly folders as they are added, keeping everything organized chronologically.'}
                    {selectedOption === 'year' &&
                      'Files will be automatically categorized by year, creating a clear timeline of your content.'}
                    {selectedOption === 'keyword' &&
                      'Smart organization based on keywords helps you group related files automatically.'}
                  </p>
                </div>
              </motion.div>
            </div>
          </div>
        </Dialog.Panel>
      </div>
    </Dialog>
  )
}

// Add this to your global CSS
const styles = `
.custom-scrollbar {
  scrollbar-width: thin;
  scrollbar-color: rgba(203, 213, 225, 1) transparent;
}

.custom-scrollbar::-webkit-scrollbar {
  width: 6px;
}

.custom-scrollbar::-webkit-scrollbar-track {
  background: transparent;
}

.custom-scrollbar::-webkit-scrollbar-thumb {
  background-color: rgba(203, 213, 225, 1);
  border-radius: 3px;
}
`
