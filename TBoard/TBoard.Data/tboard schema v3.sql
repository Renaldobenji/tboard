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
DROP SCHEMA IF EXISTS `tboard` ;

-- -----------------------------------------------------
-- Schema tboard
-- -----------------------------------------------------
CREATE SCHEMA IF NOT EXISTS `tboard` DEFAULT CHARACTER SET utf8 ;
USE `tboard` ;

-- -----------------------------------------------------
-- Table `tboard`.`addresstype`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `tboard`.`addresstype` ;

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
DROP TABLE IF EXISTS `tboard`.`address` ;

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
AUTO_INCREMENT = 14
DEFAULT CHARACTER SET = utf8
COMMENT = '						';


-- -----------------------------------------------------
-- Table `tboard`.`auditentry`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `tboard`.`auditentry` ;

CREATE TABLE IF NOT EXISTS `tboard`.`auditentry` (
  `auditEntryID` INT(11) NOT NULL AUTO_INCREMENT,
  `userID` INT(11) NOT NULL,
  `auditEntryOwnerType` VARCHAR(45) NOT NULL,
  `auditEntryOwnerTypeID` VARCHAR(45) NOT NULL,
  `auditEntrySummary` VARCHAR(250) NOT NULL,
  `auditEntryDetail` VARCHAR(1000) NOT NULL,
  `auditEntryComment` VARCHAR(250) NULL DEFAULT NULL,
  `auditEntryTime` DATETIME NOT NULL,
  PRIMARY KEY (`auditEntryID`))
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8
COMMENT = 'store audit entries	';


-- -----------------------------------------------------
-- Table `tboard`.`auditentrytype`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `tboard`.`auditentrytype` ;

CREATE TABLE IF NOT EXISTS `tboard`.`auditentrytype` (
  `auditEntryTypeID` INT(11) NOT NULL AUTO_INCREMENT,
  `auditEntryOwnerType` VARCHAR(45) NOT NULL,
  `auditEntryName` VARCHAR(45) NOT NULL,
  `auditEntryDescription` VARCHAR(100) NULL DEFAULT NULL,
  PRIMARY KEY (`auditEntryTypeID`))
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8
COMMENT = 'Audit Entry Types		';


-- -----------------------------------------------------
-- Table `tboard`.`bankaccounttype`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `tboard`.`bankaccounttype` ;

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
DROP TABLE IF EXISTS `tboard`.`bankaccountdetails` ;

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
AUTO_INCREMENT = 6
DEFAULT CHARACTER SET = utf8;


-- -----------------------------------------------------
-- Table `tboard`.`communicationtype`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `tboard`.`communicationtype` ;

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
DROP TABLE IF EXISTS `tboard`.`communication` ;

CREATE TABLE IF NOT EXISTS `tboard`.`communication` (
  `communicationID` INT(10) UNSIGNED NOT NULL AUTO_INCREMENT,
  `owningType` VARCHAR(45) NULL DEFAULT NULL,
  `owningID` VARCHAR(45) NULL DEFAULT NULL,
  `communicationLine1` VARCHAR(45) NULL DEFAULT NULL,
  `communicationLine2` VARCHAR(45) NULL DEFAULT NULL,
  `communicationTypeID` INT(11) NULL DEFAULT NULL,
  `role` VARCHAR(150) NULL DEFAULT NULL,
  PRIMARY KEY (`communicationID`),
  INDEX `commTypeID_idx` (`communicationTypeID` ASC),
  CONSTRAINT `commTypeID`
    FOREIGN KEY (`communicationTypeID`)
    REFERENCES `tboard`.`communicationtype` (`communicationTypeID`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB
AUTO_INCREMENT = 54
DEFAULT CHARACTER SET = utf8;


-- -----------------------------------------------------
-- Table `tboard`.`config`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `tboard`.`config` ;

CREATE TABLE IF NOT EXISTS `tboard`.`config` (
  `configID` INT(11) NOT NULL AUTO_INCREMENT,
  `name` VARCHAR(200) NULL DEFAULT NULL,
  `value` VARCHAR(5000) NULL DEFAULT NULL,
  PRIMARY KEY (`configID`))
ENGINE = InnoDB
AUTO_INCREMENT = 5
DEFAULT CHARACTER SET = utf8;


-- -----------------------------------------------------
-- Table `tboard`.`custodian`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `tboard`.`custodian` ;

CREATE TABLE IF NOT EXISTS `tboard`.`custodian` (
  `custodianID` INT(11) NOT NULL AUTO_INCREMENT,
  `name` VARCHAR(150) NULL DEFAULT NULL,
  `surname` VARCHAR(150) NULL DEFAULT NULL,
  `jobTitle` VARCHAR(45) NULL DEFAULT NULL,
  `companyNumber` VARCHAR(150) NULL DEFAULT NULL,
  `email` VARCHAR(150) NULL DEFAULT NULL,
  `landline` VARCHAR(45) NULL DEFAULT NULL,
  `cell` VARCHAR(45) NULL DEFAULT NULL,
  `organizationID` INT(11) NULL DEFAULT NULL,
  PRIMARY KEY (`custodianID`))
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8;


-- -----------------------------------------------------
-- Table `tboard`.`documenttypes`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `tboard`.`documenttypes` ;

CREATE TABLE IF NOT EXISTS `tboard`.`documenttypes` (
  `documentTypeID` INT(11) NOT NULL AUTO_INCREMENT,
  `documentCode` VARCHAR(45) NULL DEFAULT NULL,
  `documentDescription` VARCHAR(45) NULL DEFAULT NULL,
  `expiryTermMonths` INT(11) NULL DEFAULT NULL,
  PRIMARY KEY (`documentTypeID`))
ENGINE = InnoDB
AUTO_INCREMENT = 5
DEFAULT CHARACTER SET = utf8;


-- -----------------------------------------------------
-- Table `tboard`.`organizationtypes`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `tboard`.`organizationtypes` ;

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
DROP TABLE IF EXISTS `tboard`.`documentrequirements` ;

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
DROP TABLE IF EXISTS `tboard`.`organization` ;

CREATE TABLE IF NOT EXISTS `tboard`.`organization` (
  `organizationID` INT(11) NOT NULL AUTO_INCREMENT,
  `name` VARCHAR(150) NULL DEFAULT NULL,
  `tradingName` VARCHAR(150) NULL DEFAULT NULL,
  `registrationNumber` VARCHAR(150) NULL DEFAULT NULL,
  `vatNumber` VARCHAR(150) NULL DEFAULT NULL,
  `taxNumber` VARCHAR(150) NULL DEFAULT NULL,
  `organizationTypeID` INT(11) NULL DEFAULT NULL,
  `oem` BIT(1) NULL DEFAULT NULL,
  `verified` DATETIME NULL DEFAULT NULL,
  `organizationuuid` VARCHAR(45) NULL DEFAULT NULL,
  PRIMARY KEY (`organizationID`),
  UNIQUE INDEX `organizationID_UNIQUE` (`organizationID` ASC),
  INDEX `orgType_idx` (`organizationTypeID` ASC),
  CONSTRAINT `orgType`
    FOREIGN KEY (`organizationTypeID`)
    REFERENCES `tboard`.`organizationtypes` (`organizationTypeID`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB
AUTO_INCREMENT = 6
DEFAULT CHARACTER SET = utf8;


-- -----------------------------------------------------
-- Table `tboard`.`documents`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `tboard`.`documents` ;

CREATE TABLE IF NOT EXISTS `tboard`.`documents` (
  `documentID` INT(11) NOT NULL AUTO_INCREMENT,
  `documentTypeID` INT(11) NULL DEFAULT NULL,
  `organizationID` INT(11) NULL DEFAULT NULL,
  `documentPath` VARCHAR(5000) NULL DEFAULT NULL,
  `dateCreated` DATETIME NULL DEFAULT NULL,
  `expiryDate` DATETIME NULL DEFAULT NULL,
  `verified` DATETIME NULL DEFAULT NULL,
  `documentuuid` VARCHAR(45) NULL DEFAULT NULL,
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
AUTO_INCREMENT = 19
DEFAULT CHARACTER SET = utf8;


-- -----------------------------------------------------
-- Table `tboard`.`emailqueue`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `tboard`.`emailqueue` ;

CREATE TABLE IF NOT EXISTS `tboard`.`emailqueue` (
  `emailQueueID` INT(11) NOT NULL AUTO_INCREMENT,
  `from` VARCHAR(200) NULL DEFAULT NULL,
  `to` VARCHAR(200) NULL DEFAULT NULL,
  `subject` VARCHAR(500) NULL DEFAULT NULL,
  `body` TEXT NULL DEFAULT NULL,
  `createdDate` DATETIME NULL DEFAULT NULL,
  `sentDate` DATETIME NULL DEFAULT NULL,
  PRIMARY KEY (`emailQueueID`))
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8;


-- -----------------------------------------------------
-- Table `tboard`.`expertisecategory`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `tboard`.`expertisecategory` ;

CREATE TABLE IF NOT EXISTS `tboard`.`expertisecategory` (
  `ExpertiseCategoryID` INT(11) NOT NULL AUTO_INCREMENT,
  `Name` VARCHAR(100) NULL DEFAULT NULL,
  PRIMARY KEY (`ExpertiseCategoryID`))
ENGINE = InnoDB
AUTO_INCREMENT = 4
DEFAULT CHARACTER SET = utf8;


-- -----------------------------------------------------
-- Table `tboard`.`expertisesubcategory`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `tboard`.`expertisesubcategory` ;

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
AUTO_INCREMENT = 12
DEFAULT CHARACTER SET = utf8;


-- -----------------------------------------------------
-- Table `tboard`.`expertiseownership`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `tboard`.`expertiseownership` ;

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
AUTO_INCREMENT = 29
DEFAULT CHARACTER SET = utf8;


-- -----------------------------------------------------
-- Table `tboard`.`groupmembership`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `tboard`.`groupmembership` ;

CREATE TABLE IF NOT EXISTS `tboard`.`groupmembership` (
  `groupMembershipID` INT(11) NOT NULL AUTO_INCREMENT,
  `userID` INT(11) NOT NULL,
  `groupCode` VARCHAR(50) NOT NULL,
  `fromDate` DATETIME NOT NULL,
  `toDate` DATETIME NULL DEFAULT NULL,
  PRIMARY KEY (`groupMembershipID`))
ENGINE = InnoDB
AUTO_INCREMENT = 4
DEFAULT CHARACTER SET = utf8
COMMENT = 'group membership';


-- -----------------------------------------------------
-- Table `tboard`.`grouprolemapping`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `tboard`.`grouprolemapping` ;

CREATE TABLE IF NOT EXISTS `tboard`.`grouprolemapping` (
  `groupRoleMappingID` INT(11) NOT NULL AUTO_INCREMENT,
  `groupCode` VARCHAR(45) NOT NULL,
  `roleCode` VARCHAR(45) NOT NULL,
  `fromDate` DATETIME NOT NULL,
  `toDate` DATETIME NULL DEFAULT NULL,
  PRIMARY KEY (`groupRoleMappingID`))
ENGINE = InnoDB
AUTO_INCREMENT = 5
DEFAULT CHARACTER SET = utf8
COMMENT = 'Maps group to roles		';


-- -----------------------------------------------------
-- Table `tboard`.`groups`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `tboard`.`groups` ;

CREATE TABLE IF NOT EXISTS `tboard`.`groups` (
  `groupID` INT(11) NOT NULL AUTO_INCREMENT,
  `groupCode` VARCHAR(45) NOT NULL,
  `groupName` VARCHAR(100) NOT NULL,
  `groupDescription` VARCHAR(100) NULL DEFAULT NULL,
  `groupStatus` VARCHAR(45) NOT NULL,
  PRIMARY KEY (`groupID`))
ENGINE = InnoDB
AUTO_INCREMENT = 2
DEFAULT CHARACTER SET = utf8
COMMENT = 'Groups for the application		';


-- -----------------------------------------------------
-- Table `tboard`.`metadata`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `tboard`.`metadata` ;

CREATE TABLE IF NOT EXISTS `tboard`.`metadata` (
  `metadataID` INT(11) NOT NULL AUTO_INCREMENT,
  `ownerType` VARCHAR(45) NULL DEFAULT NULL,
  `ownerTypeID` VARCHAR(45) NULL DEFAULT NULL,
  `dateCreated` DATETIME NULL DEFAULT NULL,
  `dateUpdated` DATETIME NULL DEFAULT NULL,
  `metaDataName` VARCHAR(100) NULL DEFAULT NULL,
  `metaDataValue` VARCHAR(500) NULL DEFAULT NULL,
  PRIMARY KEY (`metadataID`))
ENGINE = InnoDB
AUTO_INCREMENT = 2
DEFAULT CHARACTER SET = utf8
COMMENT = 'metadata';


-- -----------------------------------------------------
-- Table `tboard`.`organizationmapping`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `tboard`.`organizationmapping` ;

CREATE TABLE IF NOT EXISTS `tboard`.`organizationmapping` (
  `organizationMappingID` INT(11) NOT NULL AUTO_INCREMENT,
  `organizationID` INT(11) NULL DEFAULT NULL,
  `userID` INT(11) NULL DEFAULT NULL,
  `created` DATETIME NULL DEFAULT NULL,
  PRIMARY KEY (`organizationMappingID`))
ENGINE = InnoDB
AUTO_INCREMENT = 4
DEFAULT CHARACTER SET = utf8;


-- -----------------------------------------------------
-- Table `tboard`.`quote`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `tboard`.`quote` ;

CREATE TABLE IF NOT EXISTS `tboard`.`quote` (
  `quoteID` INT(11) NOT NULL AUTO_INCREMENT,
  `rfqReference` VARCHAR(45) NOT NULL,
  `userID` INT(11) NULL DEFAULT NULL,
  `createdDate` DATETIME NULL DEFAULT NULL,
  `amount` DECIMAL(16,9) NULL DEFAULT NULL,
  `supplyTime` DATETIME NULL DEFAULT NULL,
  `deliveryTime` DATETIME NULL DEFAULT NULL,
  PRIMARY KEY (`quoteID`))
ENGINE = InnoDB
AUTO_INCREMENT = 16
DEFAULT CHARACTER SET = utf8;


-- -----------------------------------------------------
-- Table `tboard`.`rfqtype`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `tboard`.`rfqtype` ;

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
DROP TABLE IF EXISTS `tboard`.`users` ;

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
  `employeeCode` VARCHAR(245) NULL DEFAULT NULL,
  `departmentCode` VARCHAR(245) NULL DEFAULT NULL,
  `useruuid` VARCHAR(45) NULL DEFAULT NULL,
  PRIMARY KEY (`userID`))
ENGINE = InnoDB
AUTO_INCREMENT = 2
DEFAULT CHARACTER SET = utf8
COMMENT = 'User';


-- -----------------------------------------------------
-- Table `tboard`.`rfq`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `tboard`.`rfq` ;

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
AUTO_INCREMENT = 7
DEFAULT CHARACTER SET = utf8;


-- -----------------------------------------------------
-- Table `tboard`.`quotestatus`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `tboard`.`quotestatus` ;

CREATE TABLE IF NOT EXISTS `tboard`.`quotestatus` (
  `quoteStatusID` INT(11) NOT NULL AUTO_INCREMENT,
  `rfqID` INT(11) NULL DEFAULT NULL,
  `quoteID` INT(11) NULL DEFAULT NULL,
  `status` VARCHAR(45) NULL DEFAULT NULL,
  `quoteStatusDateTime` DATETIME NULL DEFAULT NULL,
  `userID` INT(11) NULL DEFAULT NULL,
  PRIMARY KEY (`quoteStatusID`),
  INDEX `a_idx` (`quoteID` ASC),
  INDEX `b_idx` (`rfqID` ASC),
  CONSTRAINT `a`
    FOREIGN KEY (`quoteID`)
    REFERENCES `tboard`.`quote` (`quoteID`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `b`
    FOREIGN KEY (`rfqID`)
    REFERENCES `tboard`.`rfq` (`rfqID`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB
AUTO_INCREMENT = 7
DEFAULT CHARACTER SET = utf8;


-- -----------------------------------------------------
-- Table `tboard`.`rating`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `tboard`.`rating` ;

CREATE TABLE IF NOT EXISTS `tboard`.`rating` (
  `ratingID` INT(11) NOT NULL AUTO_INCREMENT,
  `ownerType` VARCHAR(45) NULL DEFAULT NULL,
  `owningID` VARCHAR(45) NULL DEFAULT NULL,
  `rating` INT(11) NULL DEFAULT NULL,
  `comment` VARCHAR(590) NULL DEFAULT NULL,
  `dateCreated` DATETIME NULL DEFAULT NULL,
  PRIMARY KEY (`ratingID`))
ENGINE = InnoDB
AUTO_INCREMENT = 17
DEFAULT CHARACTER SET = utf8;


-- -----------------------------------------------------
-- Table `tboard`.`requirements`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `tboard`.`requirements` ;

CREATE TABLE IF NOT EXISTS `tboard`.`requirements` (
  `requirementsID` INT(11) NOT NULL AUTO_INCREMENT,
  `owningType` VARCHAR(45) NOT NULL,
  `owningID` VARCHAR(45) NULL DEFAULT NULL,
  `requirementTypeCode` VARCHAR(45) NULL DEFAULT NULL,
  `metaData` TEXT NULL DEFAULT NULL,
  `date` DATETIME NULL DEFAULT NULL,
  `resolved` DATETIME NULL DEFAULT NULL,
  PRIMARY KEY (`requirementsID`))
ENGINE = InnoDB
AUTO_INCREMENT = 3
DEFAULT CHARACTER SET = utf8
COMMENT = '	';


-- -----------------------------------------------------
-- Table `tboard`.`roles`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `tboard`.`roles` ;

CREATE TABLE IF NOT EXISTS `tboard`.`roles` (
  `roleID` INT(11) NOT NULL AUTO_INCREMENT,
  `roleCode` VARCHAR(45) NOT NULL,
  `roleName` VARCHAR(100) NOT NULL,
  `roleDescription` VARCHAR(200) NULL DEFAULT NULL,
  `roleStatus` VARCHAR(10) NOT NULL,
  PRIMARY KEY (`roleID`))
ENGINE = InnoDB
AUTO_INCREMENT = 5
DEFAULT CHARACTER SET = utf8
COMMENT = 'Roles Table used for Authorization	';

USE `tboard` ;

-- -----------------------------------------------------
-- procedure GetSubscribedOwnershipDetails
-- -----------------------------------------------------

USE `tboard`;
DROP procedure IF EXISTS `tboard`.`GetSubscribedOwnershipDetails`;

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
-- procedure sps_GetAllOrganizationInformation
-- -----------------------------------------------------

USE `tboard`;
DROP procedure IF EXISTS `tboard`.`sps_GetAllOrganizationInformation`;

DELIMITER $$
USE `tboard`$$
CREATE DEFINER=`root`@`localhost` PROCEDURE `sps_GetAllOrganizationInformation`(IN organizationID INT)
BEGIN


SELECT *
FROM organization org 
LEFT JOIN address ad ON ad.owningType = 'ORG' AND ad.owningID = org.organizationID
LEFT JOIN bankaccountdetails bd ON bd.owningType = 'ORG' AND bd.owningID = org.organizationID
LEFT JOIN communication com ON com.owningType = 'ORG' AND com.owningID = org.organizationID
LEFT JOIN expertiseownership eo ON eo.ownerType = 'ORG' AND eo.owningID = org.organizationID
WHERE org.organizationID = organizationID;

END$$

DELIMITER ;

-- -----------------------------------------------------
-- procedure sps_GetAllUserInformation
-- -----------------------------------------------------

USE `tboard`;
DROP procedure IF EXISTS `tboard`.`sps_GetAllUserInformation`;

DELIMITER $$
USE `tboard`$$
CREATE DEFINER=`root`@`localhost` PROCEDURE `sps_GetAllUserInformation`(IN userID INT)
BEGIN

	SELECT *
	FROM users u
	LEFT JOIN address ad ON ad.owningType = 'PER' AND ad.owningID = u.userID
	LEFT JOIN organization org ON org.organizationID = u.organizationID
	LEFT JOIN bankaccountdetails bd ON bd.owningType = 'PER' AND bd.owningID = u.userID
	LEFT JOIN communication com ON com.owningType = 'PER' AND com.owningID = u.userID
	WHERE u.userId = userID;
    
END$$

DELIMITER ;

-- -----------------------------------------------------
-- procedure sps_GetBidsForQuote
-- -----------------------------------------------------

USE `tboard`;
DROP procedure IF EXISTS `tboard`.`sps_GetBidsForQuote`;

DELIMITER $$
USE `tboard`$$
CREATE DEFINER=`root`@`localhost` PROCEDURE `sps_GetBidsForQuote`(IN rfqReference VARCHAR(50))
BEGIN

SELECT q.CreatedDate, q.Amount, q.SupplyTime, q.DeliveryTime, u.FirstName, u.Surname, o.name, o.oem, u.OrganizationID, avgRating.AverageRating, q.QuoteID
FROM quote q
INNER JOIN users u ON u.UserID = q.UserID
LEFT JOIN organization o ON o.OrganizationID = u.OrganizationID
LEFT JOIN 
(
	SELECT owningID, AVG(rating) AS AverageRating
	FROM rating
	WHERE ownerType = 'ORG'
) AS avgRating ON  avgRating.owningID = u.OrganizationID

WHERE q.rfqReference = rfqReference;

END$$

DELIMITER ;

-- -----------------------------------------------------
-- procedure sps_GetHighestBidsForQuote
-- -----------------------------------------------------

USE `tboard`;
DROP procedure IF EXISTS `tboard`.`sps_GetHighestBidsForQuote`;

DELIMITER $$
USE `tboard`$$
CREATE DEFINER=`root`@`localhost` PROCEDURE `sps_GetHighestBidsForQuote`(IN rfqReference VARCHAR(50))
BEGIN

SELECT quote.createdDate, quote.amount FROM rfq
INNER JOIN quote on rfq.reference = quote.rfqReference
WHERE quote.rfqReference = rfqReference
AND rfq.rfqTypeID in (1,2);

END$$

DELIMITER ;

-- -----------------------------------------------------
-- procedure sps_GetOutstandingDocumentRequirements
-- -----------------------------------------------------

USE `tboard`;
DROP procedure IF EXISTS `tboard`.`sps_GetOutstandingDocumentRequirements`;

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

-- -----------------------------------------------------
-- procedure sps_GetQuoteHistory
-- -----------------------------------------------------

USE `tboard`;
DROP procedure IF EXISTS `tboard`.`sps_GetQuoteHistory`;

DELIMITER $$
USE `tboard`$$
CREATE DEFINER=`root`@`localhost` PROCEDURE `sps_GetQuoteHistory`(IN userID INT, IN qStatus VARCHAR(50), IN startDate VARCHAR(50), IN endDate VARCHAR(50))
BEGIN

	SELECT q.rfqReference,q.createdDate,q.amount,qs.quoteStatusDateTime
    FROM quotestatus qs
    INNER JOIN quote q ON q.quoteID = qs.quoteID
    WHERE qs.status = @qStatus
    AND q.userID = @userID
    AND qs.quoteStatusDateTime BETWEEN @startDate AND @endDate;

END$$

DELIMITER ;

-- -----------------------------------------------------
-- procedure sps_GetQuoteOwnerDetails
-- -----------------------------------------------------

USE `tboard`;
DROP procedure IF EXISTS `tboard`.`sps_GetQuoteOwnerDetails`;

DELIMITER $$
USE `tboard`$$
CREATE DEFINER=`root`@`localhost` PROCEDURE `sps_GetQuoteOwnerDetails`(IN quoteID INT)
BEGIN

	select c.communicationLine1, u.firstname, u.surname
    from quote q
    inner join users u on u.userID = q.userID
    INNER JOIN communication c ON c.owningType = 'PER' AND c.owningID = u.userID
    INNER JOIN communicationtype ct ON ct.communicationTypeID = c.communicationTypeID
    where q.quoteID = quoteID
    and ct.communicationTypeTLA = 'EML'
    
    UNION ALL 

	select c.communicationLine1, u.firstname, u.surname
    from quote q
    inner join users u on u.userID = q.userID
    INNER JOIN communication c ON c.owningType = 'ORG' AND c.owningID = u.organizationID
    INNER JOIN communicationtype ct ON ct.communicationTypeID = c.communicationTypeID
    where q.quoteID = quoteID
    and ct.communicationTypeTLA = 'EML'; 
    
END$$

DELIMITER ;

-- -----------------------------------------------------
-- procedure sps_GetRolesForUser
-- -----------------------------------------------------

USE `tboard`;
DROP procedure IF EXISTS `tboard`.`sps_GetRolesForUser`;

DELIMITER $$
USE `tboard`$$
CREATE DEFINER=`root`@`localhost` PROCEDURE `sps_GetRolesForUser`(IN userID INT)
BEGIN
	
    SELECT r.roleID, r.roleCode,r.roleName, r.roleDescription, r.roleStatus
    FROM groupmembership gm 
    INNER JOIN groups g on gm.groupCode = g.groupCode
    INNER JOIN grouprolemapping grm on grm.groupCode = g.groupCode
    INNER JOIN roles r ON r.roleCode = grm.roleCode
    WHERE r.roleStatus = 'ACT' 
    AND gm.userID = userID ;
    
    
END$$

DELIMITER ;

-- -----------------------------------------------------
-- procedure sps_GetSubCategories
-- -----------------------------------------------------

USE `tboard`;
DROP procedure IF EXISTS `tboard`.`sps_GetSubCategories`;

DELIMITER $$
USE `tboard`$$
CREATE DEFINER=`root`@`localhost` PROCEDURE `sps_GetSubCategories`()
BEGIN

SELECT CONCAT(c.Name, '-', s.Name) as SubCategoryName
		, s.ExpertiseSubCategoryID		
 FROM expertisecategory c
inner join expertisesubcategory s on s.expertiseCategoryID = c.expertiseCategoryID;

END$$

DELIMITER ;

-- -----------------------------------------------------
-- procedure sps_getRFQOwnerDetails
-- -----------------------------------------------------

USE `tboard`;
DROP procedure IF EXISTS `tboard`.`sps_getRFQOwnerDetails`;

DELIMITER $$
USE `tboard`$$
CREATE DEFINER=`root`@`localhost` PROCEDURE `sps_getRFQOwnerDetails`(IN rfqReference varchar(50))
BEGIN

	select rfq.reference, rfq.dateCreated, c.communicationLine1, u.firstname, u.surname
    from rfq rfq
    inner join users u on u.userID = rfq.userID
    INNER JOIN communication c ON c.owningType = 'PER' AND c.owningID = u.userID
    INNER JOIN communicationtype ct ON ct.communicationTypeID = c.communicationTypeID
    where rfq.reference = rfqReference
    and ct.communicationTypeTLA = 'EML';    

END$$

DELIMITER ;

SET SQL_MODE=@OLD_SQL_MODE;
SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS;
SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS;
