import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import AuthProvider from '@/components/providers/AuthProvider'
import { ServerAuthProvider } from '@/components/providers/ServerAuthProvider'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'kikuri',
  description: 'playground',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={`font-sans`}>
        <ServerAuthProvider>
          {children}
        </ServerAuthProvider>
      </body>
    </html>
  )
}
