-- CreateTable
CREATE TABLE "WholeScore" (
    "id" SERIAL NOT NULL,
    "courseId" INTEGER NOT NULL,
    "userId" INTEGER NOT NULL,
    "date" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "WholeScore_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Score" (
    "id" SERIAL NOT NULL,
    "wholeScoreId" INTEGER NOT NULL,
    "one" INTEGER NOT NULL,
    "two" INTEGER NOT NULL,
    "three" INTEGER NOT NULL,
    "four" INTEGER NOT NULL,
    "five" INTEGER NOT NULL,
    "six" INTEGER NOT NULL,
    "seven" INTEGER NOT NULL,
    "eight" INTEGER NOT NULL,
    "nine" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Score_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "WholeScore" ADD CONSTRAINT "WholeScore_courseId_fkey" FOREIGN KEY ("courseId") REFERENCES "Course"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "WholeScore" ADD CONSTRAINT "WholeScore_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Score" ADD CONSTRAINT "Score_wholeScoreId_fkey" FOREIGN KEY ("wholeScoreId") REFERENCES "WholeScore"("id") ON DELETE CASCADE ON UPDATE CASCADE;
