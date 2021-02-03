/*
  Warnings:

  - The migration will add a unique constraint covering the columns `[name]` on the table `Company`. If there are existing duplicate values, the migration will fail.

*/
-- AlterTable
ALTER TABLE "Company" ALTER COLUMN "logo" DROP NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "Company.name_unique" ON "Company"("name");
