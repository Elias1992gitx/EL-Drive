'use client'

import { useState, useRef, Fragment } from 'react'
import { Dialog, Menu, Transition } from '@headlessui/react'
import CreateMenu from './CreateMenu'
import { 
  PlusIcon, 
  ArrowUpTrayIcon, 
  FolderPlusIcon, 
  DocumentTextIcon, 
  PencilSquareIcon,
  UserIcon,
  CloudArrowUpIcon,
  XMarkIcon,
  EllipsisHorizontalIcon
} from '@heroicons/react/24/outline'
import { motion, AnimatePresence } from 'framer-motion'
import { useMediaQuery } from '@/hooks/useMediaQuery'
import CreateFolderDialog from './CreateFolderDialog'
import EditPDFDialog from './EditPDFDialog'
import GetSignatureDialog from './GetSignatureDialog'
import SignYourselfDialog from './SignYourselfDialog'

export default function ActionButtons() {
  const isMobile = useMediaQuery('(max-width: 768px)')
  const isTablet = useMediaQuery('(max-width: 1024px)')
  const [isCreateMenuOpen, setIsCreateMenuOpen] = useState(false)
  const [isUploadDialogOpen, setIsUploadDialogOpen] = useState(false)
  const createButtonRef = useRef<HTMLButtonElement>(null)
  const fileInputRef = useRef<HTMLInputElement>(null)
  const [isDragging, setIsDragging] = useState(false)
  const [isCreateFolderOpen, setIsCreateFolderOpen] = useState(false)
  const [isEditPDFOpen, setIsEditPDFOpen] = useState(false)
  const [isGetSignatureOpen, setIsGetSignatureOpen] = useState(false)
  const [isSignYourselfOpen, setIsSignYourselfOpen] = useState(false)

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault()
    setIsDragging(true)
  }

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault()
    setIsDragging(false)
  }

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault()
    setIsDragging(false)
    const files = e.dataTransfer.files
    if (files.length > 0) {
      handleFiles(files)
    }
  }

  const handleFiles = (files: FileList) => {
    // Handle the uploaded files here
    console.log('Files:', Array.from(files))
    setIsUploadDialogOpen(false)
  }

  const actionButtons = [
    {
      label: 'Create',
      icon: PlusIcon,
      onClick: () => setIsCreateMenuOpen(true),
      primary: true,
      mobileVisible: true
    },
    {
      label: 'Upload',
      icon: ArrowUpTrayIcon,
      onClick: () => setIsUploadDialogOpen(true),
      mobileVisible: true
    },
    {
      label: 'New Folder',
      icon: FolderPlusIcon,
      onClick: () => setIsCreateFolderOpen(true)
    },
    {
      label: 'Edit PDF',
      icon: DocumentTextIcon,
      onClick: () => setIsEditPDFOpen(true)
    },
    {
      label: 'Get Signatures',
      icon: PencilSquareIcon,
      onClick: () => setIsGetSignatureOpen(true)
    },
    {
      label: 'Sign Yourself',
      icon: UserIcon,
      onClick: () => setIsSignYourselfOpen(true),
      border: true
    }
  ]

  return (
    <div className="sticky top-0 z-10 bg-white/80 backdrop-blur-sm">
      <div className="flex items-center gap-2 sm:gap-3 px-4 py-3 sm:py-4 lg:py-6 border-b border-gray-100 overflow-x-auto">
        <AnimatePresence mode="wait">
          {isMobile ? (
            <motion.div 
              className="flex items-center gap-2"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              {actionButtons.filter(btn => btn.mobileVisible).map((button) => (
                <ActionButton key={button.label} {...button} isMobile={true} />
              ))}
              <Menu as="div" className="relative">
                <Menu.Button className="p-2.5 rounded-lg border-2 border-dashed border-gray-300 hover:bg-gray-50">
                  <EllipsisHorizontalIcon className="h-5 w-5" />
                </Menu.Button>
                <Transition
                  as={Fragment}
                  enter="transition ease-out duration-200"
                  enterFrom="opacity-0 scale-95"
                  enterTo="opacity-100 scale-100"
                  leave="transition ease-in duration-150"
                  leaveFrom="opacity-100 scale-100"
                  leaveTo="opacity-0 scale-95"
                >
                  <Menu.Items className="absolute right-0 mt-2 w-56 bg-white rounded-xl shadow-lg border border-gray-100 p-1.5">
                    {actionButtons.slice(2).map((button, index) => (
                      <Menu.Item key={button.label}>
                        {({ active }) => (
                          <>
                            {button.border && index !== 0 && (
                              <div className="my-1 border-t border-gray-100" />
                            )}
                            <button
                              onClick={button.onClick}
                              className={`
                                ${active ? 'bg-gray-50' : ''}
                                flex items-center gap-2 w-full px-3 py-2 text-sm text-gray-700 rounded-lg
                              `}
                            >
                              <button.icon className="h-4 w-4" />
                              {button.label}
                            </button>
                          </>
                        )}
                      </Menu.Item>
                    ))}
                  </Menu.Items>
                </Transition>
              </Menu>
            </motion.div>
          ) : (
            // Tablet/Desktop View - Show all buttons
            <div className="flex items-center gap-2">
              {actionButtons.map((button, index) => (
                <Fragment key={button.label}>
                  {button.border && index !== 0 && (
                    <div className="h-8 w-px bg-gray-200" />
                  )}
                  <ActionButton 
                    {...button} 
                    buttonRef={button.label === 'Create' ? createButtonRef : undefined}
                  />
                </Fragment>
              ))}
            </div>
          )}
        </AnimatePresence>
      </div>

      {/* Add Dialogs */}
      <CreateFolderDialog 
        isOpen={isCreateFolderOpen} 
        onClose={() => setIsCreateFolderOpen(false)} 
      />
      <EditPDFDialog 
        isOpen={isEditPDFOpen} 
        onClose={() => setIsEditPDFOpen(false)} 
      />
      <GetSignatureDialog 
        isOpen={isGetSignatureOpen} 
        onClose={() => setIsGetSignatureOpen(false)} 
      />
      <SignYourselfDialog 
        isOpen={isSignYourselfOpen} 
        onClose={() => setIsSignYourselfOpen(false)} 
      />
      <CreateMenu
        isOpen={isCreateMenuOpen}
        onClose={() => setIsCreateMenuOpen(false)}
        anchorRef={createButtonRef}
      />
      <input
        type="file"
        ref={fileInputRef}
        className="hidden"
        multiple
        onChange={(e) => {
          if (e.target.files) {
            handleFiles(e.target.files)
          }
        }}
      />
      <Dialog
        open={isUploadDialogOpen}
        onClose={() => setIsUploadDialogOpen(false)}
        className="fixed inset-0 z-50 overflow-y-auto"
      >
        <div className="fixed inset-0 flex items-center justify-center p-4">
          <div className="fixed inset-0 bg-black/30 backdrop-blur-sm" aria-hidden="true" />
          
          <Dialog.Panel className="relative bg-white rounded-xl shadow-2xl w-[500px] p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-xl font-semibold text-gray-900">Upload Files</h3>
              <button
                onClick={() => setIsUploadDialogOpen(false)}
                className="p-2 rounded-full hover:bg-gray-100"
              >
                <XMarkIcon className="h-5 w-5 text-gray-500" />
              </button>
            </div>
            
            <div
              onDragOver={handleDragOver}
              onDragLeave={handleDragLeave}
              onDrop={handleDrop}
              className={`
                border-2 border-dashed rounded-xl p-8
                flex flex-col items-center justify-center gap-4
                ${isDragging ? 'border-blue-500 bg-blue-50' : 'border-gray-200'}
              `}
            >
              <CloudArrowUpIcon className="h-12 w-12 text-gray-400" />
              <div className="text-center">
                <p className="text-gray-600">Drag and drop your files here, or</p>
                <button
                  onClick={() => fileInputRef.current?.click()}
                  className="text-blue-500 hover:text-blue-600 font-medium"
                >
                  browse files
                </button>
              </div>
            </div>
          </Dialog.Panel>
        </div>
      </Dialog>
    </div>
  )
}

// Extracted ActionButton component
function ActionButton({ 
  label, 
  icon: Icon, 
  onClick, 
  primary,
  isMobile,
  buttonRef 
}: {
  label: string;
  icon: any;
  onClick: () => void;
  primary?: boolean;
  isMobile?: boolean;
  buttonRef?: React.RefObject<HTMLButtonElement>;
}) {
  return (
    <motion.button
      ref={buttonRef}
      onClick={onClick}
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      className={`
        ${isMobile ? 'px-3 py-2' : 'px-4 sm:px-6 py-2.5 sm:py-[21px]'}
        rounded-lg text-sm font-medium
        flex items-center gap-2 whitespace-nowrap transition-all
        ${primary ? 
          'bg-black text-white shadow-sm' : 
          'border-2 border-dashed border-gray-300 hover:bg-gray-50'
        }
      `}
    >
      <Icon className="h-4 w-4" />
      <span className={isMobile ? 'hidden' : 'hidden sm:inline'}>{label}</span>
    </motion.button>
  );
}