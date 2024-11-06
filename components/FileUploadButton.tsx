import { useState, useRef } from 'react'
import { motion } from 'framer-motion'
import { ArrowUpTrayIcon, XMarkIcon } from '@heroicons/react/24/outline'

export default function FileUploadButton() {
  const [isDragging, setIsDragging] = useState(false)
  const [selectedFile, setSelectedFile] = useState<File | null>(null)
  const [fileContent, setFileContent] = useState<string | null>(null)
  const fileInputRef = useRef<HTMLInputElement>(null)

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
    
    const file = e.dataTransfer.files[0]
    if (file) {
      handleFile(file)
    }
  }

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      handleFile(file)
    }
  }

  const handleFile = (file: File) => {
    setSelectedFile(file)

    // Read file content based on type
    if (file.type.startsWith('image/')) {
      const reader = new FileReader()
      reader.onload = (e) => {
        const content = e.target?.result as string
        setFileContent(content)
      }
      reader.readAsDataURL(file)
    } else {
      const reader = new FileReader()
      reader.onload = (e) => {
        const content = e.target?.result as string
        setFileContent(content)
      }
      reader.readAsText(file)
    }

    // Log file info
    console.log({
      name: file.name,
      size: file.size,
      type: file.type
    })
  }

  const clearFile = () => {
    setSelectedFile(null)
    setFileContent(null)
    if (fileInputRef.current) {
      fileInputRef.current.value = ''
    }
  }

  const downloadFile = () => {
    if (selectedFile && fileContent) {
      const element = document.createElement('a')
      const file = new Blob([fileContent], { type: selectedFile.type })
      element.href = URL.createObjectURL(file)
      element.download = selectedFile.name
      document.body.appendChild(element)
      element.click()
      document.body.removeChild(element)
    }
  }

  return (
    <div className="relative">
      <input
        ref={fileInputRef}
        type="file"
        className="hidden"
        onChange={handleFileSelect}
      />
      
      <motion.button
        onClick={() => fileInputRef.current?.click()}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        className={`
          px-6 py-[21px] rounded-lg text-sm font-medium 
          flex items-center gap-2 whitespace-nowrap
          transition-all duration-200 ease-out
          ${isDragging 
            ? 'border-2 border-blue-500 bg-blue-50 text-blue-600' 
            : 'border-2 border-dashed border-gray-300 hover:border-gray-400 hover:bg-gray-50'
          }
        `}
      >
        <motion.div
          animate={isDragging ? { y: [0, -4, 0] } : {}}
          transition={{ repeat: Infinity, duration: 1.5 }}
        >
          <ArrowUpTrayIcon className="h-4 w-4" />
        </motion.div>
        <span>{isDragging ? 'Drop here' : 'Upload or drop'}</span>
      </motion.button>

      {selectedFile && (
        <div className="absolute top-full left-0 mt-2 w-full bg-white rounded-lg shadow-lg border border-gray-200 p-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2 truncate">
              <ArrowUpTrayIcon className="h-4 w-4 text-blue-500" />
              <span className="text-sm truncate">{selectedFile.name}</span>
            </div>
            <div className="flex items-center gap-2">
              <button 
                onClick={downloadFile}
                className="text-sm text-blue-500 hover:text-blue-600"
              >
                Download
              </button>
              <button 
                onClick={clearFile}
                className="p-1 hover:bg-gray-100 rounded-full"
              >
                <XMarkIcon className="h-4 w-4 text-gray-500" />
              </button>
            </div>
          </div>
          {selectedFile.type.startsWith('image/') && fileContent && (
            <div className="mt-2">
              <img 
                src={fileContent} 
                alt={selectedFile.name}
                className="max-h-32 rounded-lg"
              />
            </div>
          )}
        </div>
      )}
    </div>
  )
}