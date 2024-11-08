'use client'

import ActionButtons from '@/components/ActionButtons'
import ChatBot from '@/components/chat-bot'
import ClientOnly from '@/components/ClientOnly'
import FileGrid from '@/components/FileGrid'
import Header from '@/components/Header'
import LandingPage from '@/app/components/LandingPage'
import Sidebar from '@/components/Sidebar'
import SuggestedActivity from '@/components/SuggestedActivity'
import { useSidebar } from '@/contexts/SidebarContext'
import { useAuth } from '@/hooks/useAuth'
import { ChatBubbleLeftIcon } from '@heroicons/react/24/outline'
import { useState } from 'react'
import { LoadingSpinner } from '@/components/ui/loading-spinner'
import { cn } from '@/lib/utils'

export default function Home() {
  const { isSignedIn, isLoaded } = useAuth()
  const { isExpanded } = useSidebar()
  const [isChatOpen, setIsChatOpen] = useState(false)

  if (!isLoaded) {
    return <LoadingSpinner />
  }

  if (!isSignedIn) {
    return <LandingPage />
  }

  return (
    <ClientOnly>
      <div className="min-h-screen bg-gray-50 overflow-x-hidden">
        <Header />
        <div className="flex relative">
          <Sidebar />
          <main className={cn(
            "flex-1 min-w-0 transition-all duration-300",
            "pt-14 pb-20 sm:pb-0", // Account for mobile navigation
            isExpanded ? "lg:ml-[240px]" : "lg:ml-0"
          )}>
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <ActionButtons />
              <SuggestedActivity />
              <FileGrid />
            </div>
          </main>
        </div>

        {/* Chat Button */}
        <button
          onClick={() => setIsChatOpen(true)}
          className={cn(
            'fixed p-4 bg-blue-600 text-white rounded-full shadow-lg',
            'hover:bg-blue-700 transition-all duration-200',
            'z-50 flex items-center gap-2',
            'bottom-20 right-4', // Mobile positioning
            'sm:bottom-8 sm:right-8' // Desktop positioning
          )}
        >
          <ChatBubbleLeftIcon className="h-6 w-6" />
        </button>

        {/* Chat Bot Component */}
        <ChatBot isOpen={isChatOpen} onClose={() => setIsChatOpen(false)} />
      </div>
    </ClientOnly>
  )
}
