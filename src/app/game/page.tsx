import { SocketProvider } from '@/components/providers/SocketProvider';
import Link from 'next/link';

export default function GamePage() {
  return (
    <main className='p-24 flex flex-col items-center'>
      <p className='text-5xl'>Games</p>

      <div className='mt-20'>
        <Link href='/game/rps' className='block w-96 p-6 text-xl text-center bg-half-green hover:bg-half-green/70 text-half-black cursor-pointer'>
          Rock Paper Scissors
        </Link>
      </div>
    </main>
  )
}