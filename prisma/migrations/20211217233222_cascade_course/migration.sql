-- DropForeignKey
ALTER TABLE "CourseNine" DROP CONSTRAINT "CourseNine_courseId_fkey";

-- DropForeignKey
ALTER TABLE "Handicap" DROP CONSTRAINT "Handicap_courseNineId_fkey";

-- DropForeignKey
ALTER TABLE "Par" DROP CONSTRAINT "Par_courseNineId_fkey";

-- AddForeignKey
ALTER TABLE "CourseNine" ADD CONSTRAINT "CourseNine_courseId_fkey" FOREIGN KEY ("courseId") REFERENCES "Course"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Par" ADD CONSTRAINT "Par_courseNineId_fkey" FOREIGN KEY ("courseNineId") REFERENCES "CourseNine"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Handicap" ADD CONSTRAINT "Handicap_courseNineId_fkey" FOREIGN KEY ("courseNineId") REFERENCES "CourseNine"("id") ON DELETE CASCADE ON UPDATE CASCADE;
