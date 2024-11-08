'use client'

import { Inter } from 'next/font/google'
import './globals.css'
import { ClerkProvider } from '@clerk/nextjs'
import { SidebarProvider } from '@/contexts/SidebarContext'

const inter = Inter({ subsets: ['latin'] })

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className} suppressHydrationWarning>
        <ClerkProvider>
          <SidebarProvider>
            {children}
          </SidebarProvider>
        </ClerkProvider>
      </body>
    </html>
  )
}
