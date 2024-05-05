/*
  Warnings:

  - You are about to alter the column `Data` on the `eventos` table. The data in that column could be lost. The data in that column will be cast from `DateTime(0)` to `DateTime`.

*/
-- AlterTable
ALTER TABLE `eventos` MODIFY `Data` DATETIME NOT NULL;
