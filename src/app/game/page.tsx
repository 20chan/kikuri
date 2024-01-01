import { SocketProvider } from '@/components/providers/SocketProvider';

export default function GamePage() {
  return (
    <main>
      <SocketProvider>
        <div>game</div>
      </SocketProvider>
    </main>
  )
}