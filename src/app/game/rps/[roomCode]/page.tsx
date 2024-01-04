'use client';

import { SocketProvider, useSocket } from '@/components/providers/SocketProvider';
import { RPSState } from '@/lib/games/rps/rpsState';
import type { User } from '@/lib/room/roomMember';
import { SessionProvider, useSession } from 'next-auth/react';
import { NextProps } from 'nextjs-parser';
import { useEffect, useMemo, useRef, useState } from 'react';
import Image from 'next/image';
import { useMutex } from 'react-context-mutex';

export default function RPSGamePage(props: NextProps) {
  const { params } = props;
  const roomCode = params.roomCode as string;

  const { data: session } = useSession();
  const { socket } = useSocket();
  const [joined, setJoined] = useState(false);
  const [members, setMembers] = useState<User[]>([]);
  const [game, setGame] = useState(RPSState.create());

  const mutexRunner = useMutex();

  const isHost = useMemo(() => {
    return members[0]?.id === (session?.user as any)?.id;
  }, [members, socket]);

  const addMember = (...users: User[]) => {
    setMembers(members => {
      const usersAdd = users.filter(user => members.find(x => x.id === user.id) === undefined);
      console.log({ members, users, usersAdd })
      return [...members, ...usersAdd]
    });
  };

  console.log(members)

  useEffect(() => {
    if (!socket) return;

    const socketKey = `game:rps:${roomCode}`;

    fetch(`/api/socket/rps/${roomCode}`, {
      method: 'POST',
      body: JSON.stringify({
        type: 'join',
      }),
    }).then(async () => {
      const res = await fetch(`/api/socket/rps/${roomCode}`);
      const json = await res.json();
      const members = json.members as User[];
      addMember(...members);
      setJoined(true);
    });

    socket.on(socketKey, (data) => {
      if (data.type === 'join') {
        const user = data.user as User;
        addMember(user);
      }
    });

    return () => {
      socket.off(socketKey);
    }
  }, [socket]);

  return (
    <div className='p-24 flex flex-col items-center h-screen'>
      <p className='text-5xl'>Rock Paper Scissors</p>
      <p className='text-xl text-half-white/70 mt-1'>
        Room Code: <span className='font-bold text-half-white'>{roomCode}</span>
      </p>

      {joined && <div className='flex flex-row gap-4 mt-10'>
        {
          members.map(member => (
            <div key={member.id}>
              <Image src={member.image} alt='user image' width={100} height={100} />
              <p className='text-center font-bold text-lg'>{member.name}</p>
            </div>
          ))
        }
      </div>
      }

      <div className='w-full h-full'>
        {
          isHost && (
            <div className='flex flex-col justify-center items-center h-full'>
              <button className='text-5xl'>
                START
              </button>
            </div>
          )
        }
      </div>
    </div>
  );
}