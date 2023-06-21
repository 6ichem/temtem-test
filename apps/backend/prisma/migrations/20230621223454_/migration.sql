/*
  Warnings:

  - You are about to drop the column `themoviedb_id` on the `Content` table. All the data in the column will be lost.
  - You are about to drop the column `trailerUrl` on the `Content` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[moviedbId]` on the table `Content` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `moviedbId` to the `Content` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX "Favorite_userId_contentId_key";

-- AlterTable
ALTER TABLE "Content" DROP COLUMN "themoviedb_id",
DROP COLUMN "trailerUrl",
ADD COLUMN     "bannerUrl" TEXT,
ADD COLUMN     "moviedbId" INTEGER NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "Content_moviedbId_key" ON "Content"("moviedbId");
