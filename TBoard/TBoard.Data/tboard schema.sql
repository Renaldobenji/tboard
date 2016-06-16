-- MySQL Workbench Forward Engineering

SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0;
SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0;
SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='TRADITIONAL,ALLOW_INVALID_DATES';

-- -----------------------------------------------------
-- Schema mydb
-- -----------------------------------------------------
-- -----------------------------------------------------
-- Schema tboard
-- -----------------------------------------------------

-- -----------------------------------------------------
-- Schema tboard
-- -----------------------------------------------------
CREATE SCHEMA IF NOT EXISTS `tboard` DEFAULT CHARACTER SET utf8 ;
USE `tboard` ;

-- -----------------------------------------------------
-- Table `tboard`.`addresstype`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `tboard`.`addresstype` (
  `addressTypeID` INT(11) NOT NULL AUTO_INCREMENT,
  `addressTypeTLA` VARCHAR(45) NULL DEFAULT NULL,
  `AddressTypeDescription` VARCHAR(200) NULL DEFAULT NULL,
  PRIMARY KEY (`addressTypeID`),
  UNIQUE INDEX `addressTypeID_UNIQUE` (`addressTypeID` ASC))
ENGINE = InnoDB
AUTO_INCREMENT = 3
DEFAULT CHARACTER SET = utf8;


-- -----------------------------------------------------
-- Table `tboard`.`address`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `tboard`.`address` (
  `addressID` INT(10) UNSIGNED NOT NULL AUTO_INCREMENT,
  `owningType` VARCHAR(50) NULL DEFAULT NULL,
  `owningID` VARCHAR(50) NULL DEFAULT NULL,
  `addressTypeID` INT(11) NULL DEFAULT NULL,
  `addressLine1` VARCHAR(200) NULL DEFAULT NULL,
  `addressLine2` VARCHAR(200) NULL DEFAULT NULL,
  `addressLine3` VARCHAR(200) NULL DEFAULT NULL,
  `addressLine4` VARCHAR(200) NULL DEFAULT NULL,
  `addressLine5` VARCHAR(200) NULL DEFAULT NULL,
  `postalCode` VARCHAR(45) NULL DEFAULT NULL,
  PRIMARY KEY (`addressID`),
  INDEX `addType_idx` (`addressTypeID` ASC),
  CONSTRAINT `addType`
    FOREIGN KEY (`addressTypeID`)
    REFERENCES `tboard`.`addresstype` (`addressTypeID`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB
AUTO_INCREMENT = 9
DEFAULT CHARACTER SET = utf8
COMMENT = '						';


-- -----------------------------------------------------
-- Table `tboard`.`bankaccounttype`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `tboard`.`bankaccounttype` (
  `bankAccountTypeID` INT(11) NOT NULL AUTO_INCREMENT,
  `bankAccountTypeCode` VARCHAR(45) NULL DEFAULT NULL,
  `bankAccountTypeDescription` VARCHAR(200) NULL DEFAULT NULL,
  PRIMARY KEY (`bankAccountTypeID`),
  UNIQUE INDEX `bankAccountTypeID_UNIQUE` (`bankAccountTypeID` ASC))
ENGINE = InnoDB
AUTO_INCREMENT = 3
DEFAULT CHARACTER SET = utf8;


-- -----------------------------------------------------
-- Table `tboard`.`bankaccountdetails`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `tboard`.`bankaccountdetails` (
  `bankAccountDetailID` INT(10) UNSIGNED NOT NULL AUTO_INCREMENT,
  `owningType` VARCHAR(45) NULL DEFAULT NULL,
  `owningID` VARCHAR(45) NULL DEFAULT NULL,
  `accountName` VARCHAR(45) NULL DEFAULT NULL,
  `accountNumber` VARCHAR(45) NULL DEFAULT NULL,
  `branchCode` VARCHAR(45) NULL DEFAULT NULL,
  `branchName` VARCHAR(150) NULL DEFAULT NULL,
  `default` BIT(1) NULL DEFAULT NULL,
  `bankAccountTypeID` INT(11) NULL DEFAULT NULL,
  PRIMARY KEY (`bankAccountDetailID`),
  INDEX `bankAcctype_idx` (`bankAccountTypeID` ASC),
  CONSTRAINT `bankAcctype`
    FOREIGN KEY (`bankAccountTypeID`)
    REFERENCES `tboard`.`bankaccounttype` (`bankAccountTypeID`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB
AUTO_INCREMENT = 3
DEFAULT CHARACTER SET = utf8;


-- -----------------------------------------------------
-- Table `tboard`.`communicationtype`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `tboard`.`communicationtype` (
  `communicationTypeID` INT(11) NOT NULL AUTO_INCREMENT,
  `communicationTypeTLA` VARCHAR(45) NULL DEFAULT NULL,
  `communicationTypeDescription` VARCHAR(45) NULL DEFAULT NULL,
  PRIMARY KEY (`communicationTypeID`),
  UNIQUE INDEX `communicationTypeID_UNIQUE` (`communicationTypeID` ASC))
ENGINE = InnoDB
AUTO_INCREMENT = 5
DEFAULT CHARACTER SET = utf8;


-- -----------------------------------------------------
-- Table `tboard`.`communication`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `tboard`.`communication` (
  `communicationID` INT(10) UNSIGNED NOT NULL AUTO_INCREMENT,
  `owningType` VARCHAR(45) NULL DEFAULT NULL,
  `owningID` VARCHAR(45) NULL DEFAULT NULL,
  `communicationLine1` VARCHAR(45) NULL DEFAULT NULL,
  `communicationLine2` VARCHAR(45) NULL DEFAULT NULL,
  `communicationTypeID` INT(11) NULL DEFAULT NULL,
  PRIMARY KEY (`communicationID`),
  INDEX `commTypeID_idx` (`communicationTypeID` ASC),
  CONSTRAINT `commTypeID`
    FOREIGN KEY (`communicationTypeID`)
    REFERENCES `tboard`.`communicationtype` (`communicationTypeID`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB
AUTO_INCREMENT = 33
DEFAULT CHARACTER SET = utf8;


-- -----------------------------------------------------
-- Table `tboard`.`documenttypes`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `tboard`.`documenttypes` (
  `documentTypeID` INT(11) NOT NULL AUTO_INCREMENT,
  `documentCode` VARCHAR(45) NULL DEFAULT NULL,
  `documentDescription` VARCHAR(45) NULL DEFAULT NULL,
  PRIMARY KEY (`documentTypeID`))
ENGINE = InnoDB
AUTO_INCREMENT = 5
DEFAULT CHARACTER SET = utf8;


-- -----------------------------------------------------
-- Table `tboard`.`organizationtypes`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `tboard`.`organizationtypes` (
  `organizationTypeID` INT(11) NOT NULL AUTO_INCREMENT,
  `name` VARCHAR(150) NULL DEFAULT NULL,
  `description` VARCHAR(150) NULL DEFAULT NULL,
  PRIMARY KEY (`organizationTypeID`),
  UNIQUE INDEX `organizationTypeID_UNIQUE` (`organizationTypeID` ASC))
ENGINE = InnoDB
AUTO_INCREMENT = 3
DEFAULT CHARACTER SET = utf8;


-- -----------------------------------------------------
-- Table `tboard`.`documentrequirements`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `tboard`.`documentrequirements` (
  `documentRequirementsID` INT(11) NOT NULL AUTO_INCREMENT,
  `documentTypeID` INT(11) NULL DEFAULT NULL,
  `organizationTypeID` INT(11) NULL DEFAULT NULL,
  PRIMARY KEY (`documentRequirementsID`),
  INDEX `documentTypeID_idx` (`documentTypeID` ASC),
  INDEX `organizationTypeID_idx` (`organizationTypeID` ASC),
  CONSTRAINT `documentTypeID`
    FOREIGN KEY (`documentTypeID`)
    REFERENCES `tboard`.`documenttypes` (`documentTypeID`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `organizationTypeID`
    FOREIGN KEY (`organizationTypeID`)
    REFERENCES `tboard`.`organizationtypes` (`organizationTypeID`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB
AUTO_INCREMENT = 8
DEFAULT CHARACTER SET = utf8;


-- -----------------------------------------------------
-- Table `tboard`.`organization`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `tboard`.`organization` (
  `organizationID` INT(11) NOT NULL AUTO_INCREMENT,
  `name` VARCHAR(150) NULL DEFAULT NULL,
  `tradingName` VARCHAR(150) NULL DEFAULT NULL,
  `registrationNumber` VARCHAR(150) NULL DEFAULT NULL,
  `vatNumber` VARCHAR(150) NULL DEFAULT NULL,
  `taxNumber` VARCHAR(150) NULL DEFAULT NULL,
  `organizationTypeID` INT(11) NULL DEFAULT NULL,
  `oem` BIT(1) NULL DEFAULT NULL,
  PRIMARY KEY (`organizationID`),
  UNIQUE INDEX `organizationID_UNIQUE` (`organizationID` ASC),
  INDEX `orgType_idx` (`organizationTypeID` ASC),
  CONSTRAINT `orgType`
    FOREIGN KEY (`organizationTypeID`)
    REFERENCES `tboard`.`organizationtypes` (`organizationTypeID`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB
AUTO_INCREMENT = 3
DEFAULT CHARACTER SET = utf8;


-- -----------------------------------------------------
-- Table `tboard`.`documents`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `tboard`.`documents` (
  `documentID` INT(11) NOT NULL AUTO_INCREMENT,
  `documentTypeID` INT(11) NULL DEFAULT NULL,
  `organizationID` INT(11) NULL DEFAULT NULL,
  `documentPath` VARCHAR(5000) NULL DEFAULT NULL,
  `dateCreated` DATETIME NULL DEFAULT NULL,
  PRIMARY KEY (`documentID`),
  INDEX `documentType_idx` (`documentTypeID` ASC),
  INDEX `orgID_idx` (`organizationID` ASC),
  CONSTRAINT `documentType`
    FOREIGN KEY (`documentTypeID`)
    REFERENCES `tboard`.`documenttypes` (`documentTypeID`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `orgID`
    FOREIGN KEY (`organizationID`)
    REFERENCES `tboard`.`organization` (`organizationID`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB
AUTO_INCREMENT = 6
DEFAULT CHARACTER SET = utf8;


-- -----------------------------------------------------
-- Table `tboard`.`emailqueue`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `tboard`.`emailqueue` (
  `emailQueueID` INT(11) NOT NULL AUTO_INCREMENT,
  `from` VARCHAR(200) NULL DEFAULT NULL,
  `to` VARCHAR(200) NULL DEFAULT NULL,
  `subject` VARCHAR(500) NULL DEFAULT NULL,
  `body` VARCHAR(5000) NULL DEFAULT NULL,
  `createdDate` DATETIME NULL DEFAULT NULL,
  `sentDate` DATETIME NULL DEFAULT NULL,
  PRIMARY KEY (`emailQueueID`))
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8;


-- -----------------------------------------------------
-- Table `tboard`.`expertisecategory`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `tboard`.`expertisecategory` (
  `ExpertiseCategoryID` INT(11) NOT NULL AUTO_INCREMENT,
  `Name` VARCHAR(100) NULL DEFAULT NULL,
  PRIMARY KEY (`ExpertiseCategoryID`))
ENGINE = InnoDB
AUTO_INCREMENT = 3
DEFAULT CHARACTER SET = utf8;


-- -----------------------------------------------------
-- Table `tboard`.`expertisesubcategory`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `tboard`.`expertisesubcategory` (
  `ExpertiseSubCategoryID` INT(11) NOT NULL AUTO_INCREMENT,
  `Name` VARCHAR(500) NULL DEFAULT NULL,
  `ExpertiseCategoryID` INT(11) NULL DEFAULT NULL,
  PRIMARY KEY (`ExpertiseSubCategoryID`),
  INDEX `CatetoryID_idx` (`ExpertiseCategoryID` ASC),
  CONSTRAINT `CatetoryID`
    FOREIGN KEY (`ExpertiseCategoryID`)
    REFERENCES `tboard`.`expertisecategory` (`ExpertiseCategoryID`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB
AUTO_INCREMENT = 10
DEFAULT CHARACTER SET = utf8;


-- -----------------------------------------------------
-- Table `tboard`.`expertiseownership`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `tboard`.`expertiseownership` (
  `expertiseOwnershipID` INT(11) NOT NULL AUTO_INCREMENT,
  `ownerType` VARCHAR(45) NULL DEFAULT NULL,
  `owningID` VARCHAR(45) NULL DEFAULT NULL,
  `expertiseSubCategoryID` INT(11) NULL DEFAULT NULL,
  PRIMARY KEY (`expertiseOwnershipID`),
  INDEX `subCat_idx` (`expertiseSubCategoryID` ASC),
  CONSTRAINT `subCat`
    FOREIGN KEY (`expertiseSubCategoryID`)
    REFERENCES `tboard`.`expertisesubcategory` (`ExpertiseSubCategoryID`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB
AUTO_INCREMENT = 22
DEFAULT CHARACTER SET = utf8;


-- -----------------------------------------------------
-- Table `tboard`.`rfqtype`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `tboard`.`rfqtype` (
  `rfqTypeID` INT(11) NOT NULL AUTO_INCREMENT,
  `code` VARCHAR(45) NULL DEFAULT NULL,
  `description` VARCHAR(200) NULL DEFAULT NULL,
  `Prefix` VARCHAR(3) NULL DEFAULT NULL,
  PRIMARY KEY (`rfqTypeID`))
ENGINE = InnoDB
AUTO_INCREMENT = 4
DEFAULT CHARACTER SET = utf8;


-- -----------------------------------------------------
-- Table `tboard`.`users`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `tboard`.`users` (
  `userID` INT(11) NOT NULL AUTO_INCREMENT,
  `organizationID` INT(11) NULL DEFAULT NULL,
  `username` VARCHAR(45) NOT NULL,
  `password` VARCHAR(100) NOT NULL,
  `passwordSalt` VARCHAR(45) NOT NULL,
  `title` VARCHAR(45) NOT NULL,
  `firstname` VARCHAR(100) NOT NULL,
  `surname` VARCHAR(100) NOT NULL,
  `identificationNumber` VARCHAR(45) NOT NULL,
  `isApproved` BIT(1) NOT NULL,
  `isLockedOut` VARCHAR(45) NOT NULL,
  `lastActivityDate` DATETIME NULL DEFAULT NULL,
  `lastPasswordChange` DATETIME NULL DEFAULT NULL,
  `lastLoginDate` DATETIME NULL DEFAULT NULL,
  `failedPasswordAttemptCount` INT(11) NULL DEFAULT NULL,
  `created` DATETIME NOT NULL,
  `updated` DATETIME NULL DEFAULT NULL,
  PRIMARY KEY (`userID`))
ENGINE = InnoDB
AUTO_INCREMENT = 13
DEFAULT CHARACTER SET = utf8
COMMENT = 'User';


-- -----------------------------------------------------
-- Table `tboard`.`rfq`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `tboard`.`rfq` (
  `rfqID` INT(11) NOT NULL AUTO_INCREMENT,
  `reference` VARCHAR(45) NULL DEFAULT NULL,
  `userID` INT(11) NULL DEFAULT NULL,
  `expertiseSubCategoryID` INT(11) NULL DEFAULT NULL,
  `rfqDetails` VARCHAR(5000) NULL DEFAULT NULL,
  `rfqTypeID` INT(11) NULL DEFAULT NULL,
  `dateCreated` DATETIME NULL DEFAULT NULL,
  `expiryDate` DATETIME NULL DEFAULT NULL,
  `status` VARCHAR(45) NULL DEFAULT NULL,
  PRIMARY KEY (`rfqID`),
  INDEX `rfq1_idx` (`rfqTypeID` ASC),
  INDEX `rfq2_idx` (`userID` ASC),
  INDEX `rfq3_idx` (`expertiseSubCategoryID` ASC),
  CONSTRAINT `rfq1`
    FOREIGN KEY (`rfqTypeID`)
    REFERENCES `tboard`.`rfqtype` (`rfqTypeID`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `rfq2`
    FOREIGN KEY (`userID`)
    REFERENCES `tboard`.`users` (`userID`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `rfq3`
    FOREIGN KEY (`expertiseSubCategoryID`)
    REFERENCES `tboard`.`expertisesubcategory` (`ExpertiseSubCategoryID`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8;

USE `tboard` ;

-- -----------------------------------------------------
-- procedure GetSubscribedOwnershipDetails
-- -----------------------------------------------------

DELIMITER $$
USE `tboard`$$
CREATE DEFINER=`root`@`localhost` PROCEDURE `GetSubscribedOwnershipDetails`(IN expertiseSubCategoryID INT)
BEGIN

	SELECT org.Name, org.tradingName, o.ownerType, o.owningID, c.communicationLine1, c.communicationLine2
    FROM expertiseownership o 
    INNER JOIN communication c ON c.owningType = o.ownerType AND c.owningID = o.owningID
    INNER JOIN communicationtype ct ON ct.communicationTypeID = c.communicationTypeID
    INNER JOIN organization org ON org.organizationID = o.owningID AND o.ownerType = 'ORG'
    WHERE o.expertiseSubCategoryID = expertiseSubCategoryID
    AND ct.communicationTypeTLA = 'EML';
    

END$$

DELIMITER ;

-- -----------------------------------------------------
-- procedure sps_GetOutstandingDocumentRequirements
-- -----------------------------------------------------

DELIMITER $$
USE `tboard`$$
CREATE DEFINER=`root`@`localhost` PROCEDURE `sps_GetOutstandingDocumentRequirements`(IN organizationID INT)
BEGIN
	SELECT  dr.documentTypeID,
			dt.documentCode,
            dt.documentDescription
	FROM documentrequirements dr
	INNER JOIN documentTypes dt on dt.documentTypeID = dr.documentTypeID
	WHERE dr.documentTypeID NOT IN (
								SELECT d.documentTypeID
								FROM documents d 
								WHERE d.organizationID = organizationID
								)
	AND dr.organizationTypeID = (SELECT o.organizationTypeID
								FROM organization o
								WHERE o.organizationID = organizationID);
END$$

DELIMITER ;

SET SQL_MODE=@OLD_SQL_MODE;
SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS;
SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS;
