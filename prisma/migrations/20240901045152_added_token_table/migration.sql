-- CreateTable
CREATE TABLE "Token" (
    "userId" TEXT NOT NULL,
    "tokenAmount" INTEGER NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "Token_userId_key" ON "Token"("userId");
