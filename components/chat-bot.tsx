'use client'

import { cn } from '@/lib/utils'
import { AnimatePresence, motion, useAnimation } from 'framer-motion'
import { useEffect, useRef, useState } from 'react'
import { Message } from '@/lib/types'
import { Loader2, Send, X } from 'lucide-react'

interface ChatBotProps {
  isOpen: boolean
  onClose: () => void
}

export default function ChatBot({ isOpen, onClose }: ChatBotProps) {
  const [messages, setMessages] = useState<Message[]>([
    {
      role: 'assistant',
      content: "Hello! I'm your digital workspace assistant. How may I assist you today?",
    },
  ])
  const [input, setInput] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)
  // const controls = useAnimation()

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = 'unset'
    }
    return () => {
      document.body.style.overflow = 'unset'
    }
  }, [isOpen])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!input.trim() || isLoading) return

    const userMessage: Message = { role: 'user', content: input }
    setMessages((prev) => [...prev, userMessage])
    setInput('')
    setIsLoading(true)

    try {
      const res = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: input }),
      })

      const data = await res.json()

      if (!res.ok) {
        throw new Error(data.error || 'Failed to get response')
      }

      setMessages((prev) => [
        ...prev,
        { role: 'assistant', content: data.response },
      ])
    } catch (error) {
      console.error('Chat Error:', error)
      setMessages((prev) => [
        ...prev,
        {
          role: 'assistant',
          content: `I apologize, but I encountered an error: ${error instanceof Error ? error.message : 'Unknown error occurred'}. Please try again.`,
        },
      ])
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          transition={{ duration: 0.2, ease: 'easeOut' }}
          className={cn(
            'fixed z-50 overflow-hidden border border-gray-100',
            'bottom-0 right-0 w-[85%] h-[85vh]',
            'sm:w-[400px] sm:h-[450px]',
            'sm:bottom-24 sm:right-8 sm:rounded-2xl',
            'bg-gradient-to-b from-white to-gray-50',
            'shadow-[0_0_50px_0_rgba(0,0,0,0.1)]',
            'mx-auto'
          )}
        >
          {/* Header */}
          <div className="p-3 sm:p-4 bg-gradient-to-r from-blue-600 to-indigo-600">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <h3 className="text-sm text-white font-medium">AI Assistant</h3>
                <span className="text-xs text-white/80">Online</span>
              </div>
              <button onClick={onClose} className="p-1 hover:bg-white/10 rounded-full">
                <X className="h-4 w-4 text-white" />
              </button>
            </div>
          </div>

          {/* Messages */}
          <div className="h-[calc(100%-8rem)] overflow-y-auto p-3 sm:p-4 space-y-4">
            {messages.map((message, index) => (
              <motion.div
                initial={{ opacity: 0, x: message.role === 'assistant' ? -20 : 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
                key={index}
                className={cn(
                  'max-w-[85%] p-4 rounded-2xl text-sm leading-relaxed',
                  message.role === 'assistant'
                    ? 'bg-gradient-to-br from-gray-100 to-gray-50 text-gray-800 rounded-tl-none shadow-sm'
                    : 'bg-gradient-to-br from-blue-500 to-blue-600 text-white ml-auto rounded-tr-none shadow-md'
                )}
              >
                <div className="text-base">
                  {message.content}
                </div>
                <div className={cn(
                  "text-xs mt-2",
                  message.role === 'assistant' ? 'text-gray-400' : 'text-blue-100'
                )}>
                  {new Date().toLocaleTimeString()}
                </div>
              </motion.div>
            ))}
            {isLoading && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-gradient-to-br from-gray-100 to-gray-50 max-w-[85%] p-4 rounded-2xl rounded-tl-none shadow-sm"
              >
                <div className="flex items-center gap-3">
                  <Loader2 className="h-5 w-5 animate-spin text-blue-500" />
                  <span className="text-sm text-gray-500">Thinking...</span>
                </div>
              </motion.div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Input Form */}
          <motion.form
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.2 }}
            onSubmit={handleSubmit}
            className="absolute bottom-0 left-0 right-0 p-3 sm:p-4 bg-white border-t"
          >
            <div className="flex gap-3 items-center">
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Ask about files, signatures, or document management..."
                className="flex-1 p-4 rounded-xl text-base bg-gray-50 border border-gray-100 
                         focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500
                         transition-all duration-200"
                disabled={isLoading}
              />
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                type="submit"
                disabled={isLoading}
                className="p-4 rounded-xl bg-gradient-to-r from-blue-500 to-blue-600 
                         text-white shadow-lg shadow-blue-500/25 hover:shadow-blue-500/40 
                         disabled:opacity-50 transition-all duration-200"
              >
                <Send className="h-6 w-6" />
              </motion.button>
            </div>
          </motion.form>
        </motion.div>
      )}
    </AnimatePresence>
  )
}


