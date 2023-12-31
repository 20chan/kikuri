import { SignIn } from '@/components/SignIn'
import { authOptions } from '@/lib/auth/authOptions'
import { kaiji } from '@/lib/images'
import { getServerSession } from 'next-auth'
import Image from 'next/image'
import { redirect } from 'next/navigation'

export default async function Home() {
  const session = await getServerSession(authOptions);
  if (session) {
    redirect('/game');
  }

  return (
    <main className="flex min-h-screen flex-col items-center justify-center pb-10">
      <Image src={kaiji} alt='kaiji' width={256} height={256} />
      <div className='text-5xl'>
        kikuri.io
      </div>

      <div className='mt-12 w-96 max-w-full'>
        <SignIn className='px-6 py-4 text-xl' />
      </div>

      <div className='mt-1'>
        로그인 필수
      </div>
    </main>
  )
}
