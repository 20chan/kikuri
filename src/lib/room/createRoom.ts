import { prisma } from '../primsa';
import { generateRoomCode } from '../utils/roomCode';

export async function createNewRoomCode() {
  let roomCode = generateRoomCode();
  while (true) {
    const found = await prisma.game.findFirst({
      where: {
        roomCode,
      },
    });
    if (!found) {
      return roomCode;
    }
  }
}

export async function createGame(options: {
  gameKind: string;
}) {
  const { gameKind } = options;
  const roomCode = await createNewRoomCode();
  const game = await prisma.game.create({
    data: {
      roomCode,
      gameKind,
    },
  });
  return game;
}

export async function findGame(options: {
  roomCode: string;
}) {
  const { roomCode } = options;
  const game = await prisma.game.findFirst({
    where: {
      roomCode,
    },
  });
  return game;
}

export async function archiveGame(options: {
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

  await prisma.game.delete({
    where: {
      id: game.id,
    },
  })

  const archivedGame = await prisma.gameArchive.create({
    data: {
      ...game,
      archivedAt: new Date(),
    },
  });
  return archivedGame;
}