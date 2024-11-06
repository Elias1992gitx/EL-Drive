'use client'

import { Inter } from 'next/font/google'
import './globals.css'
import { ClerkProvider } from '@clerk/nextjs'
import { usePathname } from 'next/navigation'
import { SidebarProvider } from '@/contexts/SidebarContext'

const inter = Inter({ subsets: ['latin'] })

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const pathname = usePathname()
  const isAuthPage = pathname?.includes('/sign-in') || pathname?.includes('/sign-up')

  return (
    <html lang="en">
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1" />
      </head>
      <body className={`${inter.className} bg-gray-50 dark:bg-gray-900`}>
        <ClerkProvider>
          <SidebarProvider>
            {isAuthPage ? (
              <div className="min-h-screen grid place-items-center">
                <div className="w-full max-w-md p-4">
                  {children}
                </div>
              </div>
            ) : (
              children
            )}
          </SidebarProvider>
        </ClerkProvider>
      </body>
    </html>
  )
}
