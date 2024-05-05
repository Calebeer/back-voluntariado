/*
  Warnings:

  - You are about to drop the column `DataCandidatura` on the `candidaturas` table. All the data in the column will be lost.
  - You are about to alter the column `Data` on the `eventos` table. The data in that column could be lost. The data in that column will be cast from `DateTime(0)` to `DateTime`.

*/
-- AlterTable
ALTER TABLE `candidaturas` DROP COLUMN `DataCandidatura`,
    ADD COLUMN `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3);

-- AlterTable
ALTER TABLE `eventos` MODIFY `Data` DATETIME NOT NULL;
