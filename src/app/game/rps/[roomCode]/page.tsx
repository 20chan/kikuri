'use client';

import { SocketProvider, useSocket } from '@/components/providers/SocketProvider';
import { RPSState } from '@/lib/games/rps/rpsState';
import type { User } from '@/lib/room/roomMember';
import { SessionProvider, useSession } from 'next-auth/react';
import { NextProps } from 'nextjs-parser';
import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import Image from 'next/image';
import { useMutex } from 'react-context-mutex';
import { RPSAction } from '@/lib/games/rps/rpsAction';
import { RPSMachine } from '@/lib/games/rps/rpsMachine';
import classNames from 'classnames';

interface GameState {
  state: RPSState;
}

export default function RPSGamePage(props: NextProps) {
  const { params } = props;
  const roomCode = params.roomCode as string;

  const { data: session } = useSession();
  const { socket } = useSocket();
  const [joined, setJoined] = useState(false);
  const [members, setMembers] = useState<User[]>([]);
  const [game, setGame] = useState<GameState>({
    state: RPSState.create(),
  });

  const user = session?.user as User;
  const myPid = useMemo(() => {
    return members.findIndex(member => member.id === user?.id);
  }, [members, user]);

  const send = useCallback(async (data: any) => {
    await fetch(`/api/socket/rps/${roomCode}`, {
      method: 'POST',
      body: JSON.stringify(data),
    })
  }, []);

  const isHost = useMemo(() => {
    return members[0]?.id === (session?.user as any)?.id;
  }, [members, socket]);

  useEffect(() => {
    if (!socket) return;

    const socketKey = `game:rps:${roomCode}`;

    send({ type: 'join' })
      .then(async () => {
        const res = await fetch(`/api/socket/rps/${roomCode}`);
        const json = await res.json();
        const members = json.members as User[];
        const state = json.state as RPSState;
        setMembers(members);
        setGame({ state });
        setJoined(true);
      });

    socket.on(socketKey, (data) => {
      if (data.type === 'join') {
        const members = data.members as User[];
        setMembers(members);
      } else if (data.type === 'action') {
        const newState = data.state as RPSState;
        console.log(newState);
        setGame({ state: newState });
      }
    });

    return () => {
      socket.off(socketKey);
    }
  }, [socket]);

  const {
    hands,
    phase,
    score,
    winners,
  } = game.state;

  const currentState = useMemo(() => {
    if (phase === 'pick') {
      if (hands.findIndex(x => x === null) === myPid) {
        return 'pick-myturn';
      } else {
        return 'pick-waiting';
      }
    } else if (phase === 'result') {
      return 'result';
    } else if (phase === 'end') {
      return 'end';
    } else if (phase === 'wait') {
      return 'wait';
    }

    return 'wait';
  }, [phase, hands, myPid]);

  const doAction = useCallback((action: RPSAction) => {
    const res = new RPSMachine().transit(game.state, myPid, action);
    if (!res.ok) {
      console.log(game.state);
      console.error(res.error);
      return;
    }
    const { next } = res;
    send({ type: 'action', action, state: next });
  }, [game, send]);

  return (
    <div className='p-24 flex flex-col items-center h-screen'>
      <p className='text-5xl'>Rock Paper Scissors</p>
      <p className='text-xl text-half-white/70 mt-1'>
        Room Code: <span className='font-bold text-half-white'>{roomCode}</span>
      </p>

      {joined && <div className='flex flex-row gap-4 mt-10'>
        {
          members.map((member, pid) => (
            <div key={member.id}>
              <Image src={member.image} alt='user image' width={100} height={100} />
              <p className='text-center font-bold text-lg'>{member.name}</p>

              {
                currentState !== 'wait' && (
                  <p className='text-center text-2xl'>
                    {score[pid]}
                  </p>
                )
              }
            </div>
          ))
        }
      </div>
      }

      <div className='w-full h-full mt-10'>
        {
          (isHost && currentState === 'wait') && (
            <div className='flex flex-col justify-center items-center h-full'>
              <button
                className='text-5xl'
                onClick={() => doAction({ type: 'start' })}
              >
                START
              </button>
            </div>
          )
        }
        {
          (currentState !== 'wait' && currentState !== 'end') && (
            <div className='flex flex-row gap-4 justify-center'>
              {
                members.map((member, pid) => (
                  <div key={`card-${pid}`}>
                    <Card hand={(currentState === 'result' || pid === myPid) ? hands[pid] : null} />
                  </div>
                ))
              }
            </div>
          )
        }

        {
          currentState === 'pick-myturn' && (
            <div className='flex flex-row justify-center items-center gap-4 mt-10'>
              <button
                className='text-5xl'
                onClick={() => doAction({ type: 'pick', payload: { hand: 'r' } })}
              >
                <Card hand='r' />
              </button>
              <button
                className='text-5xl'
                onClick={() => doAction({ type: 'pick', payload: { hand: 'p' } })}
              >
                <Card hand='p' />
              </button>
              <button
                className='text-5xl'
                onClick={() => doAction({ type: 'pick', payload: { hand: 's' } })}
              >
                <Card hand='s' />
              </button>
            </div>
          )
        }

        {
          isHost && currentState === 'result' && (
            <div className='text-center mt-5'>
              <button
                className='text-5xl'
                onClick={() => doAction({ type: 'next' })}
              >
                NEXT
              </button>
            </div>
          )
        }

        {
          currentState === 'end' && (
            <div className='text-3xl text-center mt-5'>
              FINISHED! Winner: {members[score.findIndex(x => x === 3)].name}
            </div>
          )
        }
      </div>
    </div>
  );
}

function Card({ hand }: { hand: string | null }) {
  const text = (
    hand === 'r' ? '✊' :
      hand === 'p' ? '✋' :
        hand === 's' ? '✌️' :
          '??'
  );

  return (
    <div className={classNames('w-32 h-48 flex flex-col text-5xl justify-center items-center', {
      'bg-half-white/70': hand === null,
      'bg-half-yellow': hand !== null,
    })}>
      <p className=''>
        {text}
      </p>
    </div>
  )
}