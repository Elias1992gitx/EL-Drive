'use client'

import { createContext, useContext, useState, ReactNode } from 'react'

interface SidebarContextType {
  isExpanded: boolean
  toggleSidebar: () => void
  setExpanded: (value: boolean) => void
}

const SidebarContext = createContext<SidebarContextType | undefined>(undefined)

export function SidebarProvider({ children }: { children: ReactNode }) {
  const [isExpanded, setIsExpanded] = useState(true)
  
  const toggleSidebar = () => setIsExpanded(!isExpanded)

  return (
    <SidebarContext.Provider value={{ isExpanded, toggleSidebar, setExpanded: setIsExpanded }}>
      {children}
    </SidebarContext.Provider>
  )
}

export function useSidebar() {
  const context = useContext(SidebarContext)
  if (context === undefined) {
    throw new Error('useSidebar must be used within a SidebarProvider')
  }
  return context
} 