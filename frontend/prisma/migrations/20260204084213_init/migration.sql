-- CreateTable
CREATE TABLE "Score" (
    "id" SERIAL NOT NULL,
    "course" TEXT NOT NULL,
    "score" INTEGER NOT NULL,
    "player" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Score_pkey" PRIMARY KEY ("id")
);
