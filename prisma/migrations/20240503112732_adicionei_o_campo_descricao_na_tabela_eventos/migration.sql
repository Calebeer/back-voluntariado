/*
  Warnings:

  - You are about to alter the column `Data` on the `eventos` table. The data in that column could be lost. The data in that column will be cast from `DateTime(0)` to `DateTime`.
  - Added the required column `Descricao` to the `eventos` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `eventos` ADD COLUMN `Descricao` VARCHAR(255) NOT NULL,
    MODIFY `Data` DATETIME NOT NULL;
