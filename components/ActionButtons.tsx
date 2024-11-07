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
  XMarkIcon,
} from '@heroicons/react/24/outline'
import { motion, AnimatePresence } from 'framer-motion'
import CreateFolderDialog from './CreateFolderDialog'
import EditPDFDialog from './EditPDFDialog'
import GetSignatureDialog from './GetSignatureDialog'
import SignYourselfDialog from './SignYourselfDialog'

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
      <div
        className="flex flex-col sm:flex-row items-start sm:items-center gap-2 
           mobile-safe-area py-3 sm:py-4 border-b border-gray-100"
      >
        <div className="flex items-center gap-4 mobile-safe-area py-3">
          {/* Create and Upload buttons */}
          <button
            ref={createButtonRef}
            onClick={() => setIsCreateMenuOpen(true)}
            className="touch-target w-[140px] h-[70px] px-4 bg-black text-white rounded-lg 
                     text-sm font-medium flex items-center justify-center gap-2"
          >
            <PlusIcon className="h-4 w-4" />
            <span className="sm:hidden lg:inline">Create</span>
          </button>

          <button
            onClick={() => setIsUploadDialogOpen(true)}
            className="touch-target w-[140px] h-[70px] px-4 border border-gray-200 rounded-lg 
                     text-sm font-medium flex items-center justify-center gap-2"
          >
            <ArrowUpTrayIcon className="h-5 w-5" />
            <span className="sm:hidden lg:inline">Upload</span>
          </button>

          {/* Action buttons */}
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => setIsCreateFolderOpen(true)}
            className="w-[140px] h-[70px] px-4 border border-gray-200 rounded-lg 
                     text-sm font-medium text-gray-600 flex items-center justify-center gap-2 hover:bg-gray-50"
          >
            <FolderPlusIcon className="h-4 w-4" />
            <span className="text-sm">New Folder</span>
          </motion.button>

          <button
            onClick={() => setIsEditPDFOpen(true)}
            className="w-[140px] h-[70px] px-4 border border-gray-200 rounded-lg 
                     text-sm font-medium text-gray-600 flex items-center justify-center gap-2 hover:bg-gray-50"
          >
            <DocumentTextIcon className="h-4 w-4" />
            <span className="text-sm">Edit PDF</span>
          </button>

          <button
            onClick={() => setIsGetSignatureOpen(true)}
            className="w-[140px] h-[70px] px-4 border border-gray-200 rounded-lg 
                     text-sm font-medium text-gray-600 flex items-center justify-center gap-2 hover:bg-gray-50"
          >
            <PencilSquareIcon className="h-4 w-4" />
            <span className="text-sm">Get signatures</span>
          </button>
          <button
            onClick={() => setIsSignYourselfOpen(true)}
            className="w-[140px] h-[70px] px-4 border border-gray-200 rounded-lg 
                     text-sm font-medium text-gray-600 flex items-center justify-center gap-2 hover:bg-gray-50"
          >
            <UserIcon className="h-4 w-4" />
            <span className="text-sm">Sign yourself</span>
          </button>
        </div>
      </div>

      <CreateMenu
        isOpen={isCreateMenuOpen}
        onClose={() => setIsCreateMenuOpen(false)}
        anchorEl={createButtonRef.current}
      />

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
                  ${
                    isDragging
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
                    animate={
                      isDragging
                        ? {
                            y: [0, -12, 0],
                            scale: [1, 1.1, 1],
                          }
                        : {}
                    }
                    transition={{
                      repeat: Infinity,
                      duration: 2.5,
                      ease: 'easeInOut',
                    }}
                    className="relative"
                  >
                    <motion.div
                      className="absolute -inset-4 rounded-full blur-2xl"
                      animate={{
                        background: isDragging
                          ? 'radial-gradient(circle, rgba(59, 130, 246, 0.3) 0%, rgba(59, 130, 246, 0) 70%)'
                          : 'radial-gradient(circle, rgba(59, 130, 246, 0.1) 0%, rgba(59, 130, 246, 0) 70%)',
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

      <CreateFolderDialog
        isOpen={isCreateFolderOpen}
        onClose={() => setIsCreateFolderOpen(false)}
      />

      <SignYourselfDialog
        isOpen={isSignYourselfOpen}
        onClose={() => setIsSignYourselfOpen(false)}
      />

      <EditPDFDialog
        isOpen={isEditPDFOpen}
        onClose={() => setIsEditPDFOpen(false)}
      />

      <GetSignatureDialog
        isOpen={isGetSignatureOpen}
        onClose={() => setIsGetSignatureOpen(false)}
      />
    </>
  )
}
