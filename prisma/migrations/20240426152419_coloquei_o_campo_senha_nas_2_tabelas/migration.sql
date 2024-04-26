/*
  Warnings:

  - Added the required column `Senha` to the `organizacoes` table without a default value. This is not possible if the table is not empty.
  - Added the required column `Senha` to the `voluntarios` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `organizacoes` ADD COLUMN `Senha` VARCHAR(255) NOT NULL;

-- AlterTable
ALTER TABLE `voluntarios` ADD COLUMN `Senha` VARCHAR(255) NOT NULL;
