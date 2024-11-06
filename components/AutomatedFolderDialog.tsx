import { Dialog } from '@headlessui/react'
import { DocumentIcon, FolderIcon } from '@heroicons/react/24/outline'
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
          {/* Backdrop */}
          <motion.div
            className="fixed inset-0 bg-black/30 backdrop-blur-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          />

          <div className="fixed inset-0 flex items-center justify-center p-4">
            <Dialog.Panel
              as={motion.div}
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              className="relative bg-white rounded-lg shadow-xl w-full max-w-6xl h-[80vh] grid grid-cols-2 overflow-hidden"
            >
              {/* Left Configuration Section */}
              <div className="p-6 flex flex-col h-full overflow-hidden">
                <Dialog.Title className="text-lg font-medium text-gray-900 mb-6 flex-shrink-0">
                  Create automated folder
                </Dialog.Title>

                <div className="flex-1 overflow-y-auto space-y-6 pr-2 custom-scrollbar">
                  {/* When section */}
                  <div className="space-y-2">
                    <div className="flex items-center gap-2">
                      <span className="text-sm text-gray-600">When</span>
                      <span className="text-sm font-medium">
                        files are added to
                      </span>
                    </div>
                    <button className="w-full px-3 py-2 text-sm text-red-600 bg-white border border-dashed border-red-300 rounded-lg hover:bg-red-50">
                      Select a folder
                    </button>
                  </div>

                  {/* Then section */}
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-600">Then</span>
                      <span className="text-sm font-medium">
                        organize into folders grouped by
                      </span>
                    </div>

                    <div className="space-y-2">
                      {organizationOptions.map((option) => (
                        <button
                          key={option.id}
                          onClick={() => setSelectedOption(option.id)}
                          className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg border ${
                            selectedOption === option.id
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
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Add step button */}
                  <button className="flex items-center gap-2 px-4 py-2 text-sm text-gray-600 hover:text-gray-900 rounded-lg hover:bg-gray-50">
                    <span className="h-5 w-5 flex items-center justify-center border border-gray-300 rounded-full">
                      +
                    </span>
                    Add step
                  </button>
                </div>

                {/* Footer */}
                <div className="flex-shrink-0 mt-6 pt-4 border-t border-gray-100 flex items-center justify-between">
                  <button className="text-sm text-gray-600 hover:text-gray-900">
                    Send feedback
                  </button>
                  <div className="flex gap-3">
                    <button
                      onClick={onClose}
                      className="px-4 py-2 text-sm text-gray-600 hover:text-gray-900"
                    >
                      Back
                    </button>
                    <button
                      disabled={!selectedFolder}
                      className="px-4 py-2 text-sm font-medium rounded-lg bg-blue-500 text-white hover:bg-blue-600 disabled:bg-gray-100 disabled:text-gray-400 disabled:cursor-not-allowed"
                    >
                      Next
                    </button>
                  </div>
                </div>
              </div>

              {/* Right Preview Section */}
              <div className="bg-gradient-to-br from-gray-50 to-white border-l border-gray-100 rounded-r-lg relative overflow-hidden flex flex-col">
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
      )}
    </AnimatePresence>
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
