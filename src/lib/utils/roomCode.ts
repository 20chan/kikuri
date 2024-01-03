import { z } from 'zod';

export const roomCodeSchema = z.string().length(5).regex(/^[a-zA-Z0-9]+$/i);

export function generateRoomCode(): string {
  const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
  let result = '';
  for (let i = 0; i < 5; i++) {
    result += characters.charAt(Math.floor(Math.random() * characters.length));
  }
  return result;
}