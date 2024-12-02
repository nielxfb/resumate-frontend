/*
  Warnings:

  - You are about to drop the column `invoiceId` on the `Transaction` table. All the data in the column will be lost.

*/
-- DropIndex
DROP INDEX "Transaction_invoiceId_key";

-- AlterTable
ALTER TABLE "Transaction" DROP COLUMN "invoiceId";
