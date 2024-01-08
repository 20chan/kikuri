import { authOptions } from '@/lib/auth';
import { User } from '@/lib/room/roomMember';
import { NextApiResponseIO } from '@/types';
import { NextApiRequest } from 'next';
import { getServerSession } from 'next-auth';

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
    return res.status(200).json({
      ok: true,
    });
  }

  if (req.method === 'POST') {
    return res.status(200).json({
      ok: true,
    });
  }
}