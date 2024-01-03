/*
  Warnings:

  - You are about to drop the column `name` on the `Game` table. All the data in the column will be lost.
  - You are about to drop the column `imageUrl` on the `GameArchive` table. All the data in the column will be lost.
  - You are about to drop the column `name` on the `GameArchive` table. All the data in the column will be lost.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Game" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "roomCode" TEXT NOT NULL,
    "gameKind" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL
);
INSERT INTO "new_Game" ("createdAt", "gameKind", "id", "roomCode", "updatedAt") SELECT "createdAt", "gameKind", "id", "roomCode", "updatedAt" FROM "Game";
DROP TABLE "Game";
ALTER TABLE "new_Game" RENAME TO "Game";
CREATE UNIQUE INDEX "Game_roomCode_key" ON "Game"("roomCode");
CREATE TABLE "new_GameArchive" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "roomCode" TEXT NOT NULL,
    "gameKind" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    "archivedAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
);
INSERT INTO "new_GameArchive" ("archivedAt", "createdAt", "gameKind", "id", "roomCode", "updatedAt") SELECT "archivedAt", "createdAt", "gameKind", "id", "roomCode", "updatedAt" FROM "GameArchive";
DROP TABLE "GameArchive";
ALTER TABLE "new_GameArchive" RENAME TO "GameArchive";
CREATE UNIQUE INDEX "GameArchive_roomCode_key" ON "GameArchive"("roomCode");
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
