import AuthProvider from '@/components/providers/AuthProvider';
import { SocketProvider } from '@/components/providers/SocketProvider';
import React from 'react';

export default function GameRPSLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (

    <AuthProvider>
      <SocketProvider>
        {children}
      </SocketProvider>
    </AuthProvider>
  )
}