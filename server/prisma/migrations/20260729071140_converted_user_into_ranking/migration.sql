/*
  Warnings:

  - You are about to drop the `User` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
DROP TABLE "User";

-- CreateTable
CREATE TABLE "Ranking" (
    "id" INTEGER NOT NULL,
    "username" TEXT NOT NULL,
    "time" TEXT NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "Ranking_id_key" ON "Ranking"("id");
