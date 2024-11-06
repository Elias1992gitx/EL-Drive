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

export default function Home() {
  const { isSignedIn, isLoaded } = useAuth()
  const { isExpanded } = useSidebar()
  const [isChatOpen, setIsChatOpen] = useState(false)

  if (!isLoaded) {
    return <div>Loading...</div>
  }

  if (!isSignedIn) {
    return <LandingPage />
  }

  return (
    <ClientOnly>
      <div className="min-h-screen bg-gray-50">
        <Header />
        <div className="flex">
          <Sidebar />
          <main
            className={`flex-1 min-w-0 transition-all duration-300 ease-out pt-14
              ${isExpanded ? 'ml-56' : 'ml-10'}`}
          >
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
          className="fixed bottom-4 right-4 p-4 bg-blue-600 text-white rounded-full shadow-lg hover:bg-blue-700 transition-colors z-50"
        >
          <ChatBubbleLeftIcon className="h-6 w-6" />
        </button>

        {/* Chat Bot Component */}
        <ChatBot isOpen={isChatOpen} onClose={() => setIsChatOpen(false)} />
      </div>
    </ClientOnly>
  )
}
