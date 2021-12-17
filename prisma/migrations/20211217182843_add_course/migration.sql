-- CreateTable
CREATE TABLE "Course" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "Course_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "CourseNine" (
    "id" SERIAL NOT NULL,
    "courseId" INTEGER NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "CourseNine_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Par" (
    "id" SERIAL NOT NULL,
    "courseNineId" INTEGER NOT NULL,
    "one" INTEGER NOT NULL,
    "two" INTEGER NOT NULL,
    "three" INTEGER NOT NULL,
    "four" INTEGER NOT NULL,
    "five" INTEGER NOT NULL,
    "six" INTEGER NOT NULL,
    "seven" INTEGER NOT NULL,
    "eight" INTEGER NOT NULL,
    "nine" INTEGER NOT NULL,

    CONSTRAINT "Par_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Handicap" (
    "id" SERIAL NOT NULL,
    "courseNineId" INTEGER NOT NULL,
    "one" INTEGER NOT NULL,
    "two" INTEGER NOT NULL,
    "three" INTEGER NOT NULL,
    "four" INTEGER NOT NULL,
    "five" INTEGER NOT NULL,
    "six" INTEGER NOT NULL,
    "seven" INTEGER NOT NULL,
    "eight" INTEGER NOT NULL,
    "nine" INTEGER NOT NULL,

    CONSTRAINT "Handicap_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Course_name_key" ON "Course"("name");

-- CreateIndex
CREATE UNIQUE INDEX "Par_courseNineId_key" ON "Par"("courseNineId");

-- CreateIndex
CREATE UNIQUE INDEX "Handicap_courseNineId_key" ON "Handicap"("courseNineId");

-- AddForeignKey
ALTER TABLE "CourseNine" ADD CONSTRAINT "CourseNine_courseId_fkey" FOREIGN KEY ("courseId") REFERENCES "Course"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Par" ADD CONSTRAINT "Par_courseNineId_fkey" FOREIGN KEY ("courseNineId") REFERENCES "CourseNine"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Handicap" ADD CONSTRAINT "Handicap_courseNineId_fkey" FOREIGN KEY ("courseNineId") REFERENCES "CourseNine"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
