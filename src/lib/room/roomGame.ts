import { redis } from '../redis';

export async function saveGame(options: {
  gameKind: string;
  roomCode: string;
  game: any;
}) {
  const { gameKind, roomCode, game } = options;

  await redis.set(`game:${gameKind}:${roomCode}`, JSON.stringify(game));
}

export async function getGame(options: {
  gameKind: string;
  roomCode: string;
}) {
  const { gameKind, roomCode } = options;

  const text = await redis.get(`game:${gameKind}:${roomCode}`);
  if (!text) {
    return null;
  }

  return JSON.parse(text);
}