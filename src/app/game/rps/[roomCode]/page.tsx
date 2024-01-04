'use client';

import { SocketProvider, useSocket } from '@/components/providers/SocketProvider';
import { RPSState } from '@/lib/games/rps/rpsState';
import type { User } from '@/lib/room/roomMember';
import { SessionProvider } from 'next-auth/react';
import { NextProps } from 'nextjs-parser';
import { useEffect, useMemo, useRef, useState } from 'react';
import Image from 'next/image';

export default function RPSGamePage(props: NextProps) {
  const { params } = props;
  const roomCode = params.roomCode as string;

  const { socket } = useSocket();
  const [joined, setJoined] = useState(false);
  const [members, setMembers] = useState<User[]>([]);
  const [game, setGame] = useState(RPSState.create());

  const isHost = useMemo(() => {
    return members[0]?.id === socket?.id;
  }, [members, socket]);

  const addMember = (user: User) => {
    if (members.find(x => x.id === user.id) === undefined) {
      setMembers(members => [...members, user]);
    }
  };

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
      const members = json.members;
      addMember(members[0]);
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
    <div>
      <h1>Rock Paper Scissors</h1>
      <p>Room Code: {roomCode}</p>

      {joined && members.map(member => (
        <div key={member.id}>
          <p>{member.name}</p>
          <Image src={member.image} alt='user image' width={24} height={24} />
        </div>
      ))}

      {
        isHost && (
          <button
          >
            START
          </button>
        )
      }
    </div>
  );
}