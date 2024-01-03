import { redis } from '../redis';

export function saveGame(options: {
  gameKind: string;
  roomCode: string;
  game: any;
}) {
  const { gameKind, roomCode, game } = options;

  redis.set(`game:${gameKind}:${roomCode}`, JSON.stringify(game));
}

export function getGame(options: {
  gameKind: string;
  roomCode: string;
}) {
  const { gameKind, roomCode } = options;

  return redis.get(`game:${gameKind}:${roomCode}`);
}