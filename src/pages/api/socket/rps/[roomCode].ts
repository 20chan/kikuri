import { NextApiResponseIO } from '@/types';
import { NextApiRequest } from 'next';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { User, getRoomMembers, joinRoom } from '@/lib/room/roomMember';
import { RPSState } from '@/lib/games/rps/rpsState';
import { RPSAction } from '@/lib/games/rps/rpsAction';
import { getGame, saveGame } from '@/lib/room/roomGame';

export type RPSRequest = {
  type: 'join';
} | {
  type: 'action';
  action: RPSAction;
  state: RPSState;
}

export default async function handler(req: NextApiRequest, res: NextApiResponseIO) {
  const session = await getServerSession(req, res, authOptions);
  if (!session?.user) {
    return res.status(401).json({
      error: 'Unauthorized',
    });
  }

  const user = session.user as User;

  const roomCode = req.query.roomCode as string;

  if (req.method === 'GET') {
    const members = await getRoomMembers({
      roomCode,
    });
    const state = await getGame({ roomCode, gameKind: 'rps' });
    return res.status(200).json({
      ok: true,
      members,
      state: state ?? RPSState.create(),
    });
  }

  if (req.method === 'POST') {
    const input = JSON.parse(req.body) as RPSRequest;

    if (input.type === 'join') {
      await joinRoom({
        roomCode,
        user,
      });

      const members = await getRoomMembers({ roomCode });

      res.socket.server.io.emit(`game:rps:${roomCode}`, {
        type: 'join',
        user,
        members,
      });
    } else if (input.type === 'action') {
      if (input.action.type === 'start') {
        const members = await getRoomMembers({ roomCode });
        if (members.length < 2) {
          return res.status(400).json({
            error: 'Not enough players',
          });
        }

        console.log({ members, user })
        if (members[0].id !== user.id) {
          return res.status(400).json({
            error: 'Not the host',
          });
        }
      }
      await saveGame({
        gameKind: 'rps',
        roomCode,
        game: input.state,
      });

      res.socket.server.io.emit(`game:rps:${roomCode}`, {
        type: 'action',
        action: input.action,
        state: input.state,
      });
    }

    return res.status(200).json({
      ok: true,
    });
  }
}