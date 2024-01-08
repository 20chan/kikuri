'use client';

import { useSocket } from '@/components/providers/SocketProvider';
import { Canvas, useThree } from '@react-three/fiber';
import { useSession } from 'next-auth/react';
import { NextProps } from 'nextjs-parser';
import { useCallback, useEffect } from 'react';
import { World } from './world';

export default function MarbleGamePage(props: NextProps) {
  const { params } = props;
  const roomCode = params.roomCode as string;

  const { data: session } = useSession();
  const { socket } = useSocket();

  const send = useCallback(async (data: any) => {
    await fetch(`/api/socket/marble/${roomCode}`, {
      method: 'POST',
      body: JSON.stringify(data),
    })
  }, []);

  useEffect(() => {
    if (!socket) return;

    const socketKey = `game:marble:${roomCode}`;

    send({ type: 'join' })
      .then(async () => {
        const res = await fetch(`/api/socket/marble/${roomCode}`);
        const json = await res.json();
      });

    socket.on(socketKey, (data) => {
    });

    return () => {
      socket.off(socketKey);
    }
  }, [socket]);

  return (
    <div className='p-12 flex flex-col items-center h-screen'>
      <p className='text-5xl'>Rainbow Marble</p>

      <Canvas className='w-full h-full' orthographic>
        <OrthographicCamera />
        <directionalLight position={[-10, 15, -5]} />
        <ambientLight intensity={0.5} />
        <World />
      </Canvas>
    </div>
  )
}

function OrthographicCamera() {
  const { camera } = useThree();

  useEffect(() => {
    camera.zoom = 60;
    camera.position.set(-10, 12, -10);
    camera.lookAt(0, 0, 0);
  }, [camera]);

  return null;
}