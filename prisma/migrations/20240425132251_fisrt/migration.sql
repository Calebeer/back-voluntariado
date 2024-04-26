-- CreateTable
CREATE TABLE `avaliacoes` (
    `ID` INTEGER NOT NULL AUTO_INCREMENT,
    `OrganizacaoID` INTEGER NULL,
    `VoluntarioID` INTEGER NULL,
    `Nota` INTEGER NULL,
    `Comentario` TEXT NULL,
    `DataAvaliacao` DATETIME(0) NOT NULL,

    INDEX `OrganizacaoID`(`OrganizacaoID`),
    INDEX `VoluntarioID`(`VoluntarioID`),
    PRIMARY KEY (`ID`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `candidaturas` (
    `ID` INTEGER NOT NULL AUTO_INCREMENT,
    `VoluntarioID` INTEGER NULL,
    `EventoID` INTEGER NULL,
    `DataCandidatura` DATETIME(0) NOT NULL,
    `Estado` ENUM('Pendente', 'Aceito', 'Rejeitado') NULL DEFAULT 'Pendente',

    INDEX `EventoID`(`EventoID`),
    INDEX `VoluntarioID`(`VoluntarioID`),
    PRIMARY KEY (`ID`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `eventos` (
    `ID` INTEGER NOT NULL AUTO_INCREMENT,
    `OrganizacaoID` INTEGER NULL,
    `Nome` VARCHAR(100) NOT NULL,
    `Data` DATE NOT NULL,
    `Hora` TIME(0) NOT NULL,
    `Local` VARCHAR(255) NOT NULL,
    `NumVoluntariosNecessarios` INTEGER NOT NULL,

    INDEX `OrganizacaoID`(`OrganizacaoID`),
    PRIMARY KEY (`ID`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `horasvoluntariado` (
    `ID` INTEGER NOT NULL AUTO_INCREMENT,
    `VoluntarioID` INTEGER NULL,
    `EventoID` INTEGER NULL,
    `HorasRegistradas` DECIMAL(5, 2) NOT NULL,
    `DataRegistro` DATETIME(0) NOT NULL,
    `Atividades` TEXT NULL,

    INDEX `EventoID`(`EventoID`),
    INDEX `VoluntarioID`(`VoluntarioID`),
    PRIMARY KEY (`ID`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `logalteracoes` (
    `ID` INTEGER NOT NULL AUTO_INCREMENT,
    `TabelaAtingida` VARCHAR(100) NULL,
    `Operacao` VARCHAR(10) NULL,
    `RegistroID` INTEGER NULL,
    `DataHora` TIMESTAMP(0) NOT NULL DEFAULT CURRENT_TIMESTAMP(0),

    PRIMARY KEY (`ID`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `organizacoes` (
    `ID` INTEGER NOT NULL AUTO_INCREMENT,
    `Nome` VARCHAR(100) NOT NULL,
    `CNPJ` VARCHAR(18) NOT NULL,
    `Telefone` VARCHAR(20) NOT NULL,
    `Email` VARCHAR(100) NOT NULL,
    `Endereco` VARCHAR(255) NOT NULL,

    UNIQUE INDEX `CNPJ`(`CNPJ`),
    UNIQUE INDEX `Email`(`Email`),
    PRIMARY KEY (`ID`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `voluntarios` (
    `ID` INTEGER NOT NULL AUTO_INCREMENT,
    `Nome` VARCHAR(100) NOT NULL,
    `Telefone` VARCHAR(20) NOT NULL,
    `Email` VARCHAR(100) NOT NULL,
    `CPF` VARCHAR(14) NOT NULL,
    `Endereco` VARCHAR(255) NOT NULL,
    `DataNascimento` DATE NOT NULL,
    `Motivo` TEXT NULL,

    UNIQUE INDEX `Email`(`Email`),
    UNIQUE INDEX `CPF`(`CPF`),
    PRIMARY KEY (`ID`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `avaliacoes` ADD CONSTRAINT `avaliacoes_ibfk_1` FOREIGN KEY (`OrganizacaoID`) REFERENCES `organizacoes`(`ID`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `avaliacoes` ADD CONSTRAINT `avaliacoes_ibfk_2` FOREIGN KEY (`VoluntarioID`) REFERENCES `voluntarios`(`ID`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `candidaturas` ADD CONSTRAINT `candidaturas_ibfk_1` FOREIGN KEY (`VoluntarioID`) REFERENCES `voluntarios`(`ID`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `candidaturas` ADD CONSTRAINT `candidaturas_ibfk_2` FOREIGN KEY (`EventoID`) REFERENCES `eventos`(`ID`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `eventos` ADD CONSTRAINT `eventos_ibfk_1` FOREIGN KEY (`OrganizacaoID`) REFERENCES `organizacoes`(`ID`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `horasvoluntariado` ADD CONSTRAINT `horasvoluntariado_ibfk_1` FOREIGN KEY (`VoluntarioID`) REFERENCES `voluntarios`(`ID`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `horasvoluntariado` ADD CONSTRAINT `horasvoluntariado_ibfk_2` FOREIGN KEY (`EventoID`) REFERENCES `eventos`(`ID`) ON DELETE NO ACTION ON UPDATE NO ACTION;

