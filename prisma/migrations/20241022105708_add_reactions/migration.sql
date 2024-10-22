/*
  Warnings:

  - You are about to drop the column `createdAt` on the `Reaction` table. All the data in the column will be lost.
  - You are about to drop the column `userId` on the `Reaction` table. All the data in the column will be lost.
  - Added the required column `user` to the `Reaction` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Reaction" DROP CONSTRAINT "Reaction_userId_fkey";

-- AlterTable
ALTER TABLE "Reaction" DROP COLUMN "createdAt",
DROP COLUMN "userId",
ADD COLUMN     "user" TEXT NOT NULL;
