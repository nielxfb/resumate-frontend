/*
  Warnings:

  - You are about to drop the column `fileData` on the `CV` table. All the data in the column will be lost.
  - You are about to drop the column `rating` on the `CV` table. All the data in the column will be lost.
  - Added the required column `educationRating` to the `CV` table without a default value. This is not possible if the table is not empty.
  - Added the required column `experienceRating` to the `CV` table without a default value. This is not possible if the table is not empty.
  - Added the required column `fileURL` to the `CV` table without a default value. This is not possible if the table is not empty.
  - Added the required column `gpaRating` to the `CV` table without a default value. This is not possible if the table is not empty.
  - Added the required column `jobRating` to the `CV` table without a default value. This is not possible if the table is not empty.
  - Added the required column `languageRating` to the `CV` table without a default value. This is not possible if the table is not empty.
  - Added the required column `skillRating` to the `CV` table without a default value. This is not possible if the table is not empty.
  - Added the required column `softSkillRating` to the `CV` table without a default value. This is not possible if the table is not empty.
  - Added the required column `yearsRating` to the `CV` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Analysis" ADD COLUMN     "educationTarget" TEXT[],
ADD COLUMN     "experienceTarget" TEXT[],
ADD COLUMN     "gpaTarget" TEXT[],
ADD COLUMN     "jobTarget" TEXT[],
ADD COLUMN     "languageTarget" TEXT[],
ADD COLUMN     "skillTarget" TEXT[],
ADD COLUMN     "softSkillTarget" TEXT[],
ADD COLUMN     "yearsTarget" TEXT[];

-- AlterTable
ALTER TABLE "CV" DROP COLUMN "fileData",
DROP COLUMN "rating",
ADD COLUMN     "educationRating" DECIMAL(65,30) NOT NULL,
ADD COLUMN     "experienceRating" DECIMAL(65,30) NOT NULL,
ADD COLUMN     "fileURL" TEXT NOT NULL,
ADD COLUMN     "gpaRating" DECIMAL(65,30) NOT NULL,
ADD COLUMN     "jobRating" DECIMAL(65,30) NOT NULL,
ADD COLUMN     "languageRating" DECIMAL(65,30) NOT NULL,
ADD COLUMN     "skillRating" DECIMAL(65,30) NOT NULL,
ADD COLUMN     "softSkillRating" DECIMAL(65,30) NOT NULL,
ADD COLUMN     "yearsRating" DECIMAL(65,30) NOT NULL;
