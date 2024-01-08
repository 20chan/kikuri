import { createGame, findGame } from '@/lib/room/createRoom';
import { redirect } from 'next/navigation';
import { NextFormData, NextProps } from 'nextjs-parser';

export default function MarblePage(props: NextProps) {
  const { searchParams } = props;
  const notFound = searchParams['notfound'] !== undefined;

  async function create() {
    'use server';

    const game = await createGame({ gameKind: 'marble' });
    redirect(`/game/marble/${game.roomCode}`);
  }

  async function join(formData: FormData) {
    'use server';

    const parsed = new NextFormData(formData);
    const roomCode = parsed.getString('roomCode')!;

    const game = await findGame({ roomCode });
    if (game) {
      redirect(`/game/marble/${roomCode}`);
    } else {
      redirect(`/game/marble?notfound`)
    }
  }

  return (
    <>
      <main className='p-24 flex flex-col items-center'>
        <p className='text-5xl'>Rainbow Marble</p>

        <form action={create}>

          <input
            type='submit'
            className='mt-20 p-6 w-96 text-xl bg-half-green hover:bg-half-green/70 text-half-black cursor-pointer'
            value='새로운 방 생성'
          />
        </form>

        <p className='mt-8 text-2xl'>혹은...</p>

        <form action={join}>
          <input
            type='text'
            name='roomCode'
            className='block mt-8 p-6 w-96 text-xl bg-transparent text-half-white focus:outline-none border-2 border-half-green'
            placeholder='방 코드 입력'
          />

          <input
            type='submit'
            className='block p-6 w-96 text-xl bg-half-green hover:bg-half-green/70 text-half-black cursor-pointer'
            value='기존 방 참가'
          />
        </form>

        {
          notFound && (
            <p className='mt-8 text-2xl'>방을 찾을 수 없습니다.</p>
          )
        }
      </main>
    </>
  )
}