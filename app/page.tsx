'use client'

import Header from '@/components/Header'
import Sidebar from '@/components/Sidebar'
import FileGrid from '@/components/FileGrid'
import SuggestedActivity from '@/components/SuggestedActivity'
import { useAuth } from '@/hooks/useAuth'
import { SignIn } from "@clerk/nextjs"
import ActionButtons from '@/components/ActionButtons'
import { useSidebar } from '@/contexts/SidebarContext'

export default function Home() {
  const { isSignedIn, isLoaded } = useAuth();
  const { isExpanded } = useSidebar();

  if (!isLoaded) {
    return <div>Loading...</div>
  }

  if (!isSignedIn) {
    return <SignIn routing="hash" />
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <div className="flex">
        <Sidebar />
        <main className={`flex-1 min-w-0 pt-14 transition-all duration-300
          ${isExpanded ? 'ml-[304px]' : 'ml-12'}`}>
          <div className="w-full h-full max-w-[1920px] mx-auto px-4">
            <ActionButtons />
            <SuggestedActivity />
            <div className="px-4 py-4">
              <FileGrid />
            </div>
          </div>
        </main>
      </div>
    </div>
  )
}
