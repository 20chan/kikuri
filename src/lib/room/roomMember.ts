import { prisma } from '../primsa';
import { redis } from '../redis';

export interface User {
  id: string;
  name: string;
  image: string;
}

export async function joinRoom(options: {
  roomCode: string;
  user: User;
}) {
  const { roomCode, user } = options;
  const game = await prisma.game.findFirst({
    where: {
      roomCode,
    },
  });
  if (!game) {
    throw new Error(`Game not found for room code ${roomCode}`);
  }

  redis.sadd(`game:${game.gameKind}:${roomCode}:members`, user.id);
  redis.hset(`game:${game.gameKind}:${roomCode}:members:info`, user.id, JSON.stringify(user));
}

export async function leaveRoom(options: {
  roomCode: string;
  userId: string;
}) {
  const { roomCode, userId } = options;
  const game = await prisma.game.findFirst({
    where: {
      roomCode,
    },
  });
  if (!game) {
    throw new Error(`Game not found for room code ${roomCode}`);
  }

  redis.srem(`game:${game.gameKind}:${roomCode}:members`, userId);
  redis.srem(`game:${game.gameKind}:${roomCode}:members:${userId}`, userId);
}

export async function getRoomMembers(options: {
  roomCode: string;
}) {
  const { roomCode } = options;
  const game = await prisma.game.findFirst({
    where: {
      roomCode,
    },
  });
  if (!game) {
    throw new Error(`Game not found for room code ${roomCode}`);
  }

  const members = await redis.smembers(`game:${game.gameKind}:${roomCode}:members`);
  if (members.length === 0) {
    return [];
  };
  const users = await redis.hmget(`game:${game.gameKind}:${roomCode}:members:info`, ...members);
  return users.map((user) => JSON.parse(user!)) as User[];
}