import { SocketProvider } from '@/components/providers/SocketProvider';
import React from 'react';

export default function GameMarbleLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <SocketProvider>
      {children}
    </SocketProvider>
  )
}