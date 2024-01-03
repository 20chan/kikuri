import { NextApiResponseIO } from '@/types';
import { NextApiRequest } from 'next';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { getRoomMembers, joinRoom } from '@/lib/room/roomMember';

export type RPSRequest = {
  type: 'join';
} | {
  type: 'action';
  action: any;
}

export default async function handler(req: NextApiRequest, res: NextApiResponseIO) {
  const session = await getServerSession(req, res, authOptions);
  if (!session?.user) {
    return res.status(401).json({
      error: 'Unauthorized',
    });
  }

  const roomCode = req.query.roomCode as string;

  if (req.method === 'GET') {
    const members = await getRoomMembers({
      roomCode,
    });
    return res.status(200).json({
      ok: true,
      members,
    });
  }

  if (req.method === 'POST') {
    const input = JSON.parse(req.body) as RPSRequest;

    if (input.type === 'join') {
      await joinRoom({
        roomCode,
        user: session.user as any,
      });

      res.socket.server.io.emit(`game:rps:${roomCode}`, {
        type: 'join',
        user: session.user,
      });
    } else if (input.type === 'action') {
      input.action
    }

    return res.status(200).json({
      ok: true,
    });
  }
}