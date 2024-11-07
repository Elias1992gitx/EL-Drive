import { Dialog } from '@headlessui/react'
import { motion, AnimatePresence } from 'framer-motion'
import { useState, useRef } from 'react'
import {
  UserIcon,
  XMarkIcon,
  PencilSquareIcon,
  ArrowPathIcon,
  CheckIcon,
} from '@heroicons/react/24/outline'

interface SignYourselfDialogProps {
  isOpen: boolean
  onClose: () => void
}

export default function SignYourselfDialog({
  isOpen,
  onClose,
}: SignYourselfDialogProps) {
  const [activeColor, setActiveColor] = useState('#000000')
  const [isDrawing, setIsDrawing] = useState(false)
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const [signature, setSignature] = useState<string | null>(null)

  const colors = [
    '#000000',
    '#2563eb',
    '#dc2626',
    '#16a34a',
    '#9333ea',
    '#ea580c',
  ]

  const handleStartDrawing = (e: React.MouseEvent<HTMLCanvasElement>) => {
    setIsDrawing(true)
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext('2d')
    if (!ctx) return

    const rect = canvas.getBoundingClientRect()
    const x = e.clientX - rect.left
    const y = e.clientY - rect.top

    ctx.beginPath()
    ctx.moveTo(x, y)
  }

  const handleDraw = (e: React.MouseEvent<HTMLCanvasElement>) => {
    if (!isDrawing || !canvasRef.current) return

    const canvas = canvasRef.current
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    const rect = canvas.getBoundingClientRect()
    const x = e.clientX - rect.left
    const y = e.clientY - rect.top

    ctx.lineTo(x, y)
    ctx.strokeStyle = activeColor
    ctx.lineWidth = 2
    ctx.lineCap = 'round'
    ctx.stroke()
  }

  const handleStopDrawing = () => {
    setIsDrawing(false)
  }

  const clearCanvas = () => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return
    ctx.clearRect(0, 0, canvas.width, canvas.height)
  }

  const saveSignature = () => {
    if (!canvasRef.current) return
    const dataUrl = canvasRef.current.toDataURL()
    setSignature(dataUrl)
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
          className="fixed inset-0 z-50 overflow-y-auto"
        >
          <div className="fixed inset-0 flex items-center justify-center p-2 sm:p-4">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/30 backdrop-blur-sm"
            />

            <Dialog.Panel
              as={motion.div}
              initial={{ scale: 0.95, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.95, opacity: 0, y: 20 }}
              className="relative bg-white rounded-xl shadow-2xl w-[85%] sm:w-[500px] max-w-lg overflow-hidden"
            >
              {/* Header - Reduced padding on mobile */}
              <div className="p-4 sm:p-6 border-b border-gray-100">
                <div className="flex items-center gap-2 sm:gap-3">
                  <motion.div
                    initial={{ rotate: -15, scale: 0.8 }}
                    animate={{ rotate: 0, scale: 1 }}
                    transition={{ type: 'spring' }}
                  >
                    <UserIcon className="h-5 w-5 sm:h-6 sm:w-6 text-blue-500" />
                  </motion.div>
                  <Dialog.Title className="text-lg sm:text-xl font-semibold text-gray-900">
                    Sign Yourself
                  </Dialog.Title>
                </div>
                <button
                  onClick={onClose}
                  className="absolute top-4 right-4 p-2 rounded-full hover:bg-gray-100 transition-colors"
                >
                  <XMarkIcon className="h-5 w-5 text-gray-500" />
                </button>
              </div>

              {/* Drawing Area - Adjusted padding */}
              <div className="p-3 sm:p-6">
                <div className="bg-gray-50 rounded-xl p-2 sm:p-4 mb-4">
                  <canvas
                    ref={canvasRef}
                    width={300}
                    height={150}
                    onMouseDown={handleStartDrawing}
                    onMouseMove={handleDraw}
                    onMouseUp={handleStopDrawing}
                    onMouseLeave={handleStopDrawing}
                    className="w-full bg-white rounded-lg border border-gray-200 cursor-crosshair"
                  />
                </div>

                {/* Color Picker - Adjusted sizes */}
                <div className="flex items-center justify-between mb-4 sm:mb-6">
                  <div className="flex gap-1 sm:gap-2">
                    {colors.map((color) => (
                      <motion.button
                        key={color}
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                        onClick={() => setActiveColor(color)}
                        className={`w-6 h-6 sm:w-8 sm:h-8 rounded-full ${
                          activeColor === color
                            ? 'ring-2 ring-offset-2 ring-blue-500'
                            : ''
                        }`}
                        style={{ backgroundColor: color }}
                      />
                    ))}
                  </div>
                  <motion.button
                    whileHover={{ scale: 1.05, rotate: 180 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={clearCanvas}
                    className="p-2 rounded-full hover:bg-gray-100"
                  >
                    <ArrowPathIcon className="h-5 w-5 text-gray-500" />
                  </motion.button>
                </div>
              </div>

              {/* Footer - Adjusted padding */}
              <div className="px-4 py-3 sm:px-6 sm:py-4 bg-gray-50 border-t border-gray-100 flex justify-end gap-2 sm:gap-3">
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
                  onClick={saveSignature}
                  className="px-4 py-2 bg-gradient-to-r from-blue-500 to-blue-600 
                           text-white rounded-lg text-sm font-medium
                           shadow-lg shadow-blue-500/25 hover:shadow-blue-500/40
                           transition-shadow flex items-center gap-2"
                >
                  <CheckIcon className="h-4 w-4" />
                  Save Signature
                </motion.button>
              </div>
            </Dialog.Panel>
          </div>
        </Dialog>
      )}
    </AnimatePresence>
  )
}
