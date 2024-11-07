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
  return (
    <Dialog
      open={isOpen}
      onClose={onClose}
      className="relative z-50"
    >
      {/* Background overlay */}
      <div className="fixed inset-0 bg-black/30 backdrop-blur-sm" aria-hidden="true" />

      {/* Dialog position */}
      <div className="fixed inset-0 flex items-center justify-center p-4">
        <Dialog.Panel className={`
          w-full max-w-[95%] sm:max-w-[85%] md:max-w-3xl 
          max-h-[90vh] sm:max-h-[85vh]
          bg-white rounded-2xl shadow-xl overflow-hidden
          flex flex-col md:flex-row
        `}>
          {/* Left Content Section */}
          <div className="flex-1 p-4 sm:p-6 overflow-y-auto">
            <div className="space-y-4">
              <h2 className="text-lg sm:text-xl font-semibold">
                Create Automated Folder
              </h2>
              <p className="text-sm sm:text-base text-gray-600">
                Set up rules for automatic file organization
              </p>
              {/* Rest of your form content with adjusted text sizes */}
            </div>
          </div>

          {/* Right Preview Section - Hide on mobile */}
          <div className="hidden md:block w-1/3 bg-gradient-to-br from-gray-50 to-white">
            {/* Your existing preview content */}
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
