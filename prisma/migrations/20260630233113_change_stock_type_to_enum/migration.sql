/*
  Warnings:

  - Changed the type of `type` on the `Stock` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- CreateEnum
CREATE TYPE "StockType" AS ENUM ('INCOME', 'EXPENSE');

-- AlterTable
ALTER TABLE "Stock" DROP COLUMN "type",
ADD COLUMN     "type" "StockType" NOT NULL;
