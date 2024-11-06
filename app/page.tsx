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
    </div>
  )
}
