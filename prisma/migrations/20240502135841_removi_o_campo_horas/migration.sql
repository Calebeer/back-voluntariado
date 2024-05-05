/*
  Warnings:

  - You are about to drop the column `Hora` on the `eventos` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE `eventos` DROP COLUMN `Hora`,
    MODIFY `Data` DATETIME NOT NULL;
