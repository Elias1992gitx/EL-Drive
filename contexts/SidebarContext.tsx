'use client'

import { createContext, useContext, useState } from 'react'

interface SidebarContextType {
  isExpanded: boolean
  setExpanded: (value: boolean) => void
  toggleSidebar: () => void
}

const SidebarContext = createContext<SidebarContextType>({
  isExpanded: true,
  setExpanded: () => {},
  toggleSidebar: () => {}
})

export function SidebarProvider({ children }: { children: React.ReactNode }) {
  const [isExpanded, setExpanded] = useState(true)

  const toggleSidebar = () => {
    setExpanded(prev => !prev)
  }

  return (
    <SidebarContext.Provider value={{ 
      isExpanded, 
      setExpanded,
      toggleSidebar 
    }}>
      {children}
    </SidebarContext.Provider>
  )
}

export const useSidebar = () => useContext(SidebarContext) 