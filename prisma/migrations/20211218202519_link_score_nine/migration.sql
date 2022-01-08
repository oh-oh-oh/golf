/*
  Warnings:

  - Added the required column `courseNineId` to the `Score` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Score" ADD COLUMN     "courseNineId" INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE "Score" ADD CONSTRAINT "Score_courseNineId_fkey" FOREIGN KEY ("courseNineId") REFERENCES "CourseNine"("id") ON DELETE CASCADE ON UPDATE CASCADE;
