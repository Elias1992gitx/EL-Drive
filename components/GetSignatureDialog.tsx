import { Dialog } from '@headlessui/react'
import { motion, AnimatePresence } from 'framer-motion'
import { useState, useRef } from 'react'
import { 
  PencilSquareIcon, 
  XMarkIcon,
  ArrowUpTrayIcon,
  DeviceTabletIcon,
  EnvelopeIcon
} from '@heroicons/react/24/outline'

interface GetSignatureDialogProps {
  isOpen: boolean
  onClose: () => void
}

export default function GetSignatureDialog({ isOpen, onClose }: GetSignatureDialogProps) {
  const [activeTab, setActiveTab] = useState<'draw' | 'upload' | 'sign-pad'>('draw')
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const [selectedColor, setSelectedColor] = useState('#000000')
  const [isDrawing, setIsDrawing] = useState(false)
  const [signature, setSignature] = useState<string | null>(null)

  const handleStartDrawing = () => {
    setIsDrawing(true)
  }

  const handleStopDrawing = () => {
    setIsDrawing(false)
  }

  const handleDraw = (e: React.MouseEvent<HTMLCanvasElement>) => {
    if (!isDrawing || !canvasRef.current) return
    const canvas = canvasRef.current
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    const rect = canvas.getBoundingClientRect()
    const x = e.clientX - rect.left
    const y = e.clientY - rect.top

    ctx.lineWidth = 2
    ctx.lineCap = 'round'
    ctx.strokeStyle = selectedColor
    ctx.lineTo(x, y)
    ctx.stroke()
    ctx.beginPath()
    ctx.moveTo(x, y)
  }

  const clearSignature = () => {
    if (!canvasRef.current) return
    const canvas = canvasRef.current
    const ctx = canvas.getContext('2d')
    if (!ctx) return
    ctx.clearRect(0, 0, canvas.width, canvas.height)
    setSignature(null)
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
              <div className="p-3 sm:p-6">
                <div className="flex items-center justify-between mb-4 sm:mb-6">
                  <Dialog.Title className="text-lg sm:text-xl font-semibold text-gray-900">
                    Set Signature
                  </Dialog.Title>
                  <button
                    onClick={onClose}
                    className="p-2 rounded-full hover:bg-gray-100 transition-colors"
                  >
                    <XMarkIcon className="h-5 w-5 text-gray-500" />
                  </button>
                </div>

                {/* Tabs */}
                <div className="flex gap-1 sm:gap-2 mb-4 sm:mb-6">
                  {[
                    { id: 'draw', label: 'Draw', icon: PencilSquareIcon },
                    { id: 'upload', label: 'Upload', icon: ArrowUpTrayIcon },
                    { id: 'sign-pad', label: 'Sign Pad', icon: DeviceTabletIcon }
                  ].map((tab) => (
                    <motion.button
                      key={tab.id}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={() => setActiveTab(tab.id as any)}
                      className={`flex-1 py-2 px-1 sm:px-2 rounded-lg flex items-center justify-center gap-1 sm:gap-2 text-sm
                        ${activeTab === tab.id 
                          ? 'bg-blue-50 text-blue-500 font-medium' 
                          : 'text-gray-600 hover:bg-gray-50'
                        }`}
                    >
                      <tab.icon className="h-4 w-4" />
                      <span className="hidden sm:inline">{tab.label}</span>
                    </motion.button>
                  ))}
                </div>

                {/* Drawing Canvas */}
                <div className="bg-gray-50 rounded-xl p-2 sm:p-4 mb-3 sm:mb-4">
                  <canvas
                    ref={canvasRef}
                    width={300}
                    height={150}
                    onMouseDown={handleStartDrawing}
                    onMouseUp={handleStopDrawing}
                    onMouseOut={handleStopDrawing}
                    onMouseMove={handleDraw}
                    className="w-full bg-white rounded-lg border border-gray-200 cursor-crosshair"
                  />
                </div>

                {/* Color Picker */}
                <div className="flex items-center gap-1 sm:gap-2 mb-4 sm:mb-6">
                  {['#000000', '#2563eb', '#dc2626'].map((color) => (
                    <motion.button
                      key={color}
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                      onClick={() => setSelectedColor(color)}
                      className={`w-6 h-6 rounded-full ${
                        selectedColor === color ? 'ring-2 ring-offset-2 ring-blue-500' : ''
                      }`}
                      style={{ backgroundColor: color }}
                    />
                  ))}
                  <button
                    onClick={clearSignature}
                    className="ml-auto text-sm text-gray-600 hover:text-gray-900"
                  >
                    Clear
                  </button>
                </div>

                {/* Footer */}
                <div className="flex justify-end gap-2 sm:gap-3">
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
                    className="px-4 py-2 bg-blue-500 text-white rounded-lg text-sm font-medium
                             hover:bg-blue-600 transition-colors"
                  >
                    Done
                  </motion.button>
                </div>
              </div>
            </Dialog.Panel>
          </div>
        </Dialog>
      )}
    </AnimatePresence>
  )
}