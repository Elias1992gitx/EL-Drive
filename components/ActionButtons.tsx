'use client'

import { useState, useRef } from 'react'
import { Dialog } from '@headlessui/react'
import CreateMenu from './CreateMenu'
import { 
  PlusIcon, 
  ArrowUpTrayIcon, 
  FolderPlusIcon, 
  DocumentTextIcon, 
  PencilSquareIcon,
  UserIcon,
  CloudArrowUpIcon,
  XMarkIcon
} from '@heroicons/react/24/outline'
import { motion } from 'framer-motion'
import CreateFolderDialog from './CreateFolderDialog'
import EditPDFDialog from './EditPDFDialog'
import GetSignatureDialog from './GetSignatureDialog'
import SignYourselfDialog from './SignYourselfDialog'
import { cn } from '@/lib/utils'

export default function ActionButtons() {
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

  return (
    <>
      <div className={cn(
        "flex gap-3 px-4 py-6 border-b border-gray-100",
        "flex-col sm:flex-row",
        "items-stretch sm:items-center"
      )}>
        <button 
          ref={createButtonRef}
          onClick={() => setIsCreateMenuOpen(true)}
          className={cn(
            "px-4 py-3 sm:px-6 sm:py-[21px]",
            "bg-black text-white rounded-lg",
            "text-xs sm:text-sm font-medium flex items-center justify-center gap-2",
            "shadow-sm border border-transparent",
            "w-full sm:w-auto"
          )}
        >
          <PlusIcon className="h-4 w-4" />
          <span>Create</span>
        </button>
        
        <CreateMenu 
          isOpen={isCreateMenuOpen}
          onClose={() => setIsCreateMenuOpen(false)}
          anchorEl={createButtonRef.current}
        />
        
        <button 
          onClick={() => setIsUploadDialogOpen(true)}
          className={cn(
            "px-4 py-3 sm:px-6 sm:py-[21px]",
            "border-2 border-dashed border-gray-300 rounded-lg",
            "text-xs sm:text-sm font-medium flex items-center justify-center gap-2",
            "hover:bg-gray-50",
            "w-full sm:w-auto"
          )}
        >
          <ArrowUpTrayIcon className="h-4 w-4" />
          <span>Upload</span>
        </button>
        
        <button 
          onClick={() => setIsCreateFolderOpen(true)}
          className={cn(
            "px-4 py-3 sm:px-6 sm:py-[21px]",
            "border border-gray-200 rounded-lg",
            "text-xs sm:text-sm font-medium text-gray-600 flex items-center justify-center gap-2",
            "hover:bg-gray-50",
            "w-full sm:w-auto"
          )}
        >
          <FolderPlusIcon className="h-4 w-4" />
          <span>Folder</span>
        </button>
        
        <CreateFolderDialog 
          isOpen={isCreateFolderOpen}
          onClose={() => setIsCreateFolderOpen(false)}
        />
        
        <button 
          onClick={() => setIsEditPDFOpen(true)}
          className={cn(
            "px-4 py-3 sm:px-6 sm:py-[22px]",
            "border border-gray-200 rounded-lg",
            "text-xs sm:text-sm font-medium text-gray-600 flex items-center justify-center gap-2",
            "hover:bg-gray-50",
            "w-full sm:w-auto"
          )}
        >
          <DocumentTextIcon className="h-4 w-4" />
          <span>PDF</span>
        </button>
        
        <EditPDFDialog 
          isOpen={isEditPDFOpen}
          onClose={() => setIsEditPDFOpen(false)}
        />
        
        <button 
          onClick={() => setIsGetSignatureOpen(true)}
          className={cn(
            "px-4 py-3 sm:px-6 sm:py-[22px]",
            "border border-gray-200 rounded-lg",
            "text-xs sm:text-sm font-medium text-gray-600 flex items-center justify-center gap-2",
            "hover:bg-gray-50",
            "w-full sm:w-auto"
          )}
        >
          <PencilSquareIcon className="h-4 w-4" />
          <span>Sign</span>
        </button>
        
        <GetSignatureDialog 
          isOpen={isGetSignatureOpen}
          onClose={() => setIsGetSignatureOpen(false)}
        />
        
        <button 
          onClick={() => setIsSignYourselfOpen(true)}
          className={cn(
            "px-4 py-3 sm:px-6 sm:py-[22px]",
            "border border-gray-200 rounded-lg",
            "text-xs sm:text-sm font-medium text-gray-600 flex items-center justify-center gap-2",
            "hover:bg-gray-50",
            "w-full sm:w-auto"
          )}
        >
          <UserIcon className="h-4 w-4" />
          <span>Sign yourself</span>
        </button>
      </div>

      {/* Upload Dialog */}
      <Dialog
        open={isUploadDialogOpen}
        onClose={() => setIsUploadDialogOpen(false)}
        className="relative z-50"
      >
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black/30 backdrop-blur-sm"
          aria-hidden="true"
        />

        <div className="fixed inset-0 flex items-center justify-center p-4">
          <Dialog.Panel 
            as={motion.div}
            initial={{ scale: 0.95, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.95, opacity: 0 }}
            className="relative bg-white rounded-2xl shadow-2xl w-[60%] h-[60vh] overflow-hidden"
          >
            <div className="h-full p-8 bg-gradient-to-br from-white to-gray-50">
              <input
                ref={fileInputRef}
                type="file"
                multiple
                className="hidden"
                onChange={(e) => {
                  if (e.target.files && e.target.files.length > 0) {
                    handleFiles(e.target.files)
                  }
                }}
              />
              <motion.button
                whileHover={{ scale: 1.1, rotate: 90 }}
                whileTap={{ scale: 0.9 }}
                onClick={() => setIsUploadDialogOpen(false)}
                className="absolute top-4 right-4 p-2 rounded-full hover:bg-white/80 transition-colors z-10"
              >
                <XMarkIcon className="h-5 w-5 text-gray-500" />
              </motion.button>

              <div 
                onDragOver={handleDragOver}
                onDragLeave={handleDragLeave}
                onDrop={handleDrop}
                className={`
                  flex flex-col items-center justify-center
                  w-full h-full rounded-xl border-2 border-dashed
                  transition-all duration-300 ease-in-out
                  backdrop-blur-sm
                  relative overflow-hidden
                  ${isDragging 
                    ? 'border-blue-500 bg-blue-50/30' 
                    : 'border-gray-200 hover:border-gray-300 bg-white/50'
                  }
                `}
              >
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 }}
                  className="relative z-10 flex flex-col items-center"
                >
                  <motion.div
                    animate={isDragging ? {
                      y: [0, -12, 0],
                      scale: [1, 1.1, 1]
                    } : {}}
                    transition={{ 
                      repeat: Infinity,
                      duration: 2.5,
                      ease: "easeInOut"
                    }}
                    className="relative"
                  >
                    <motion.div
                      className="absolute -inset-4 rounded-full blur-2xl"
                      animate={{
                        background: isDragging 
                          ? 'radial-gradient(circle, rgba(59, 130, 246, 0.3) 0%, rgba(59, 130, 246, 0) 70%)'
                          : 'radial-gradient(circle, rgba(59, 130, 246, 0.1) 0%, rgba(59, 130, 246, 0) 70%)'
                      }}
                    />
                    <CloudArrowUpIcon 
                      className={`h-20 w-20 ${
                        isDragging ? 'text-blue-500' : 'text-blue-400/80'
                      }`}
                    />
                  </motion.div>

                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.3 }}
                    className="text-center mt-6"
                  >
                    <h3 className="text-xl font-semibold bg-gradient-to-r from-gray-800 to-gray-600 bg-clip-text text-transparent">
                      Upload your files
                    </h3>
                    <p className="text-gray-500 mt-2 mb-6">
                      Drag & drop files here or click to browse
                    </p>
                    
                    <motion.button
                      whileHover={{ scale: 1.03 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={() => fileInputRef.current?.click()}
                      className="px-6 py-2.5 bg-gradient-to-r from-blue-500 to-blue-600 
                                text-white rounded-lg text-sm font-medium 
                                shadow-lg shadow-blue-500/25 hover:shadow-blue-500/40
                                transition-shadow"
                    >
                      Browse Files
                    </motion.button>
                  </motion.div>
                </motion.div>

                {/* Animated background patterns */}
                <motion.div 
                  className="absolute inset-0 pointer-events-none"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 1 }}
                >
                  {[...Array(3)].map((_, i) => (
                    <motion.div
                      key={i}
                      className="absolute h-64 w-64 rounded-full"
                      style={{
                        background: `radial-gradient(circle, rgba(59, 130, 246, 0.05) 0%, rgba(59, 130, 246, 0) 70%)`,
                        left: `${Math.random() * 100}%`,
                        top: `${Math.random() * 100}%`,
                      }}
                      animate={{
                        scale: [1, 1.2, 1],
                        opacity: [0.3, 0.5, 0.3],
                        x: [0, Math.random() * 50 - 25, 0],
                        y: [0, Math.random() * 50 - 25, 0],
                      }}
                      transition={{
                        duration: 8,
                        repeat: Infinity,
                        delay: i * 2,
                      }}
                    />
                  ))}
                </motion.div>
              </div>
            </div>
          </Dialog.Panel>
        </div>
      </Dialog>

      <SignYourselfDialog 
        isOpen={isSignYourselfOpen}
        onClose={() => setIsSignYourselfOpen(false)}
      />
    </>
  )
} 