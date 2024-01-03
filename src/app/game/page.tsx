import { SocketProvider } from '@/components/providers/SocketProvider';
import Link from 'next/link';

export default function GamePage() {
  return (
    <main>
      <h1>available games:</h1>
      <Link href='/game/rps'>rps</Link>
    </main>
  )
}