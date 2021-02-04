-- AlterTable
ALTER TABLE "Application" ADD COLUMN     "statusId" INTEGER;

-- AddForeignKey
ALTER TABLE "Application" ADD FOREIGN KEY ("statusId") REFERENCES "Status"("id") ON DELETE SET NULL ON UPDATE CASCADE;
