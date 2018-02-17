-- MySQL Workbench Forward Engineering

SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0;
SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0;
SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='TRADITIONAL,ALLOW_INVALID_DATES';

-- -----------------------------------------------------
-- Schema mydb
-- -----------------------------------------------------
-- -----------------------------------------------------
-- Schema sql3128648
-- -----------------------------------------------------

-- -----------------------------------------------------
-- Schema sql3128648
-- -----------------------------------------------------
CREATE SCHEMA IF NOT EXISTS `sql3128648` DEFAULT CHARACTER SET latin1 ;
USE `sql3128648` ;

-- -----------------------------------------------------
-- Table `sql3128648`.`addresstype`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `sql3128648`.`addresstype` (
  `addressTypeID` INT(11) NOT NULL AUTO_INCREMENT,
  `addressTypeTLA` VARCHAR(45) NULL DEFAULT NULL,
  `AddressTypeDescription` VARCHAR(200) NULL DEFAULT NULL,
  PRIMARY KEY (`addressTypeID`),
  UNIQUE INDEX `addressTypeID_UNIQUE` (`addressTypeID` ASC))
ENGINE = InnoDB
AUTO_INCREMENT = 3
DEFAULT CHARACTER SET = utf8;


-- -----------------------------------------------------
-- Table `sql3128648`.`address`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `sql3128648`.`address` (
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
    REFERENCES `sql3128648`.`addresstype` (`addressTypeID`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB
AUTO_INCREMENT = 41
DEFAULT CHARACTER SET = utf8
COMMENT = '						';


-- -----------------------------------------------------
-- Table `sql3128648`.`auditentry`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `sql3128648`.`auditentry` (
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
-- Table `sql3128648`.`auditentrytype`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `sql3128648`.`auditentrytype` (
  `auditEntryTypeID` INT(11) NOT NULL AUTO_INCREMENT,
  `auditEntryOwnerType` VARCHAR(45) NOT NULL,
  `auditEntryName` VARCHAR(45) NOT NULL,
  `auditEntryDescription` VARCHAR(100) NULL DEFAULT NULL,
  PRIMARY KEY (`auditEntryTypeID`))
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8
COMMENT = 'Audit Entry Types		';


-- -----------------------------------------------------
-- Table `sql3128648`.`bankaccounttype`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `sql3128648`.`bankaccounttype` (
  `bankAccountTypeID` INT(11) NOT NULL AUTO_INCREMENT,
  `bankAccountTypeCode` VARCHAR(45) NULL DEFAULT NULL,
  `bankAccountTypeDescription` VARCHAR(200) NULL DEFAULT NULL,
  PRIMARY KEY (`bankAccountTypeID`),
  UNIQUE INDEX `bankAccountTypeID_UNIQUE` (`bankAccountTypeID` ASC))
ENGINE = InnoDB
AUTO_INCREMENT = 3
DEFAULT CHARACTER SET = utf8;


-- -----------------------------------------------------
-- Table `sql3128648`.`bankaccountdetails`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `sql3128648`.`bankaccountdetails` (
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
    REFERENCES `sql3128648`.`bankaccounttype` (`bankAccountTypeID`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB
AUTO_INCREMENT = 6
DEFAULT CHARACTER SET = utf8;


-- -----------------------------------------------------
-- Table `sql3128648`.`communicationtype`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `sql3128648`.`communicationtype` (
  `communicationTypeID` INT(11) NOT NULL AUTO_INCREMENT,
  `communicationTypeTLA` VARCHAR(45) NULL DEFAULT NULL,
  `communicationTypeDescription` VARCHAR(45) NULL DEFAULT NULL,
  PRIMARY KEY (`communicationTypeID`),
  UNIQUE INDEX `communicationTypeID_UNIQUE` (`communicationTypeID` ASC))
ENGINE = InnoDB
AUTO_INCREMENT = 5
DEFAULT CHARACTER SET = utf8;


-- -----------------------------------------------------
-- Table `sql3128648`.`communication`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `sql3128648`.`communication` (
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
    REFERENCES `sql3128648`.`communicationtype` (`communicationTypeID`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB
AUTO_INCREMENT = 138
DEFAULT CHARACTER SET = utf8;


-- -----------------------------------------------------
-- Table `sql3128648`.`config`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `sql3128648`.`config` (
  `configID` INT(11) NOT NULL AUTO_INCREMENT,
  `name` VARCHAR(200) NULL DEFAULT NULL,
  `value` VARCHAR(5000) NULL DEFAULT NULL,
  PRIMARY KEY (`configID`))
ENGINE = InnoDB
AUTO_INCREMENT = 5
DEFAULT CHARACTER SET = utf8;


-- -----------------------------------------------------
-- Table `sql3128648`.`custodian`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `sql3128648`.`custodian` (
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
AUTO_INCREMENT = 6
DEFAULT CHARACTER SET = utf8;


-- -----------------------------------------------------
-- Table `sql3128648`.`documenttypes`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `sql3128648`.`documenttypes` (
  `documentTypeID` INT(11) NOT NULL AUTO_INCREMENT,
  `documentCode` VARCHAR(45) NULL DEFAULT NULL,
  `documentDescription` VARCHAR(45) NULL DEFAULT NULL,
  PRIMARY KEY (`documentTypeID`))
ENGINE = InnoDB
AUTO_INCREMENT = 5
DEFAULT CHARACTER SET = utf8;


-- -----------------------------------------------------
-- Table `sql3128648`.`organizationtypes`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `sql3128648`.`organizationtypes` (
  `organizationTypeID` INT(11) NOT NULL AUTO_INCREMENT,
  `name` VARCHAR(150) NULL DEFAULT NULL,
  `description` VARCHAR(150) NULL DEFAULT NULL,
  PRIMARY KEY (`organizationTypeID`),
  UNIQUE INDEX `organizationTypeID_UNIQUE` (`organizationTypeID` ASC))
ENGINE = InnoDB
AUTO_INCREMENT = 3
DEFAULT CHARACTER SET = utf8;


-- -----------------------------------------------------
-- Table `sql3128648`.`documentrequirements`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `sql3128648`.`documentrequirements` (
  `documentRequirementsID` INT(11) NOT NULL AUTO_INCREMENT,
  `documentTypeID` INT(11) NULL DEFAULT NULL,
  `organizationTypeID` INT(11) NULL DEFAULT NULL,
  PRIMARY KEY (`documentRequirementsID`),
  INDEX `documentTypeID_idx` (`documentTypeID` ASC),
  INDEX `organizationTypeID_idx` (`organizationTypeID` ASC),
  CONSTRAINT `documentTypeID`
    FOREIGN KEY (`documentTypeID`)
    REFERENCES `sql3128648`.`documenttypes` (`documentTypeID`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `organizationTypeID`
    FOREIGN KEY (`organizationTypeID`)
    REFERENCES `sql3128648`.`organizationtypes` (`organizationTypeID`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB
AUTO_INCREMENT = 9
DEFAULT CHARACTER SET = utf8;


-- -----------------------------------------------------
-- Table `sql3128648`.`organization`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `sql3128648`.`organization` (
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
    REFERENCES `sql3128648`.`organizationtypes` (`organizationTypeID`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB
AUTO_INCREMENT = 14
DEFAULT CHARACTER SET = utf8;


-- -----------------------------------------------------
-- Table `sql3128648`.`documents`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `sql3128648`.`documents` (
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
    REFERENCES `sql3128648`.`documenttypes` (`documentTypeID`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `orgID`
    FOREIGN KEY (`organizationID`)
    REFERENCES `sql3128648`.`organization` (`organizationID`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB
AUTO_INCREMENT = 6
DEFAULT CHARACTER SET = utf8;


-- -----------------------------------------------------
-- Table `sql3128648`.`emailqueue`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `sql3128648`.`emailqueue` (
  `emailQueueID` INT(11) NOT NULL AUTO_INCREMENT,
  `from` VARCHAR(200) NULL DEFAULT NULL,
  `to` VARCHAR(200) NULL DEFAULT NULL,
  `subject` VARCHAR(500) NULL DEFAULT NULL,
  `body` VARCHAR(5000) NULL DEFAULT NULL,
  `createdDate` DATETIME NULL DEFAULT NULL,
  `sentDate` DATETIME NULL DEFAULT NULL,
  PRIMARY KEY (`emailQueueID`))
ENGINE = InnoDB
AUTO_INCREMENT = 40
DEFAULT CHARACTER SET = utf8;


-- -----------------------------------------------------
-- Table `sql3128648`.`expertisecategory`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `sql3128648`.`expertisecategory` (
  `ExpertiseCategoryID` INT(11) NOT NULL AUTO_INCREMENT,
  `Name` VARCHAR(100) NULL DEFAULT NULL,
  PRIMARY KEY (`ExpertiseCategoryID`))
ENGINE = InnoDB
AUTO_INCREMENT = 4
DEFAULT CHARACTER SET = utf8;


-- -----------------------------------------------------
-- Table `sql3128648`.`expertisesubcategory`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `sql3128648`.`expertisesubcategory` (
  `ExpertiseSubCategoryID` INT(11) NOT NULL AUTO_INCREMENT,
  `Name` VARCHAR(500) NULL DEFAULT NULL,
  `ExpertiseCategoryID` INT(11) NULL DEFAULT NULL,
  PRIMARY KEY (`ExpertiseSubCategoryID`),
  INDEX `CatetoryID_idx` (`ExpertiseCategoryID` ASC),
  CONSTRAINT `CatetoryID`
    FOREIGN KEY (`ExpertiseCategoryID`)
    REFERENCES `sql3128648`.`expertisecategory` (`ExpertiseCategoryID`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB
AUTO_INCREMENT = 14
DEFAULT CHARACTER SET = utf8;


-- -----------------------------------------------------
-- Table `sql3128648`.`expertiseownership`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `sql3128648`.`expertiseownership` (
  `expertiseOwnershipID` INT(11) NOT NULL AUTO_INCREMENT,
  `ownerType` VARCHAR(45) NULL DEFAULT NULL,
  `owningID` VARCHAR(45) NULL DEFAULT NULL,
  `expertiseSubCategoryID` INT(11) NULL DEFAULT NULL,
  PRIMARY KEY (`expertiseOwnershipID`),
  INDEX `subCat_idx` (`expertiseSubCategoryID` ASC),
  CONSTRAINT `subCat`
    FOREIGN KEY (`expertiseSubCategoryID`)
    REFERENCES `sql3128648`.`expertisesubcategory` (`ExpertiseSubCategoryID`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB
AUTO_INCREMENT = 27
DEFAULT CHARACTER SET = utf8;


-- -----------------------------------------------------
-- Table `sql3128648`.`groupmembership`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `sql3128648`.`groupmembership` (
  `groupMembershipID` INT(11) NOT NULL AUTO_INCREMENT,
  `userID` INT(11) NOT NULL,
  `groupCode` VARCHAR(50) NOT NULL,
  `fromDate` DATETIME NOT NULL,
  `toDate` DATETIME NULL DEFAULT NULL,
  PRIMARY KEY (`groupMembershipID`))
ENGINE = InnoDB
AUTO_INCREMENT = 8
DEFAULT CHARACTER SET = utf8
COMMENT = 'group membership';


-- -----------------------------------------------------
-- Table `sql3128648`.`grouprolemapping`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `sql3128648`.`grouprolemapping` (
  `groupRoleMappingID` INT(11) NOT NULL AUTO_INCREMENT,
  `groupCode` VARCHAR(45) NOT NULL,
  `roleCode` VARCHAR(45) NOT NULL,
  `fromDate` DATETIME NOT NULL,
  `toDate` DATETIME NULL DEFAULT NULL,
  PRIMARY KEY (`groupRoleMappingID`))
ENGINE = InnoDB
AUTO_INCREMENT = 7
DEFAULT CHARACTER SET = utf8
COMMENT = 'Maps group to roles		';


-- -----------------------------------------------------
-- Table `sql3128648`.`groups`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `sql3128648`.`groups` (
  `groupID` INT(11) NOT NULL AUTO_INCREMENT,
  `groupCode` VARCHAR(45) NOT NULL,
  `groupName` VARCHAR(100) NOT NULL,
  `groupDescription` VARCHAR(100) NULL DEFAULT NULL,
  `groupStatus` VARCHAR(45) NOT NULL,
  PRIMARY KEY (`groupID`))
ENGINE = InnoDB
AUTO_INCREMENT = 6
DEFAULT CHARACTER SET = utf8
COMMENT = 'Groups for the application		';


-- -----------------------------------------------------
-- Table `sql3128648`.`quote`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `sql3128648`.`quote` (
  `quoteID` INT(11) NOT NULL AUTO_INCREMENT,
  `rfqReference` VARCHAR(45) NOT NULL,
  `userID` INT(11) NULL DEFAULT NULL,
  `createdDate` DATETIME NULL DEFAULT NULL,
  `amount` DECIMAL(16,9) NULL DEFAULT NULL,
  `supplyTime` DATETIME NULL DEFAULT NULL,
  `deliveryTime` DATETIME NULL DEFAULT NULL,
  PRIMARY KEY (`quoteID`))
ENGINE = InnoDB
AUTO_INCREMENT = 18
DEFAULT CHARACTER SET = utf8;


-- -----------------------------------------------------
-- Table `sql3128648`.`rfqtype`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `sql3128648`.`rfqtype` (
  `rfqTypeID` INT(11) NOT NULL AUTO_INCREMENT,
  `code` VARCHAR(45) NULL DEFAULT NULL,
  `description` VARCHAR(200) NULL DEFAULT NULL,
  `Prefix` VARCHAR(3) NULL DEFAULT NULL,
  PRIMARY KEY (`rfqTypeID`))
ENGINE = InnoDB
AUTO_INCREMENT = 4
DEFAULT CHARACTER SET = utf8;


-- -----------------------------------------------------
-- Table `sql3128648`.`users`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `sql3128648`.`users` (
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
  PRIMARY KEY (`userID`))
ENGINE = InnoDB
AUTO_INCREMENT = 40
DEFAULT CHARACTER SET = utf8
COMMENT = 'User';


-- -----------------------------------------------------
-- Table `sql3128648`.`rfq`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `sql3128648`.`rfq` (
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
    REFERENCES `sql3128648`.`rfqtype` (`rfqTypeID`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `rfq2`
    FOREIGN KEY (`userID`)
    REFERENCES `sql3128648`.`users` (`userID`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `rfq3`
    FOREIGN KEY (`expertiseSubCategoryID`)
    REFERENCES `sql3128648`.`expertisesubcategory` (`ExpertiseSubCategoryID`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB
AUTO_INCREMENT = 12
DEFAULT CHARACTER SET = utf8;


-- -----------------------------------------------------
-- Table `sql3128648`.`quotestatus`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `sql3128648`.`quotestatus` (
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
    REFERENCES `sql3128648`.`quote` (`quoteID`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `b`
    FOREIGN KEY (`rfqID`)
    REFERENCES `sql3128648`.`rfq` (`rfqID`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB
AUTO_INCREMENT = 7
DEFAULT CHARACTER SET = utf8;


-- -----------------------------------------------------
-- Table `sql3128648`.`rating`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `sql3128648`.`rating` (
  `ratingID` INT(11) NOT NULL AUTO_INCREMENT,
  `ownerType` VARCHAR(45) NULL DEFAULT NULL,
  `owningID` VARCHAR(45) NULL DEFAULT NULL,
  `rating` INT(11) NULL DEFAULT NULL,
  `comment` VARCHAR(590) NULL DEFAULT NULL,
  `dateCreated` DATETIME NULL DEFAULT NULL,
  PRIMARY KEY (`ratingID`))
ENGINE = InnoDB
AUTO_INCREMENT = 10
DEFAULT CHARACTER SET = utf8;


-- -----------------------------------------------------
-- Table `sql3128648`.`roles`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `sql3128648`.`roles` (
  `roleID` INT(11) NOT NULL AUTO_INCREMENT,
  `roleCode` VARCHAR(45) NOT NULL,
  `roleName` VARCHAR(100) NOT NULL,
  `roleDescription` VARCHAR(200) NULL DEFAULT NULL,
  `roleStatus` VARCHAR(10) NOT NULL,
  PRIMARY KEY (`roleID`))
ENGINE = InnoDB
AUTO_INCREMENT = 8
DEFAULT CHARACTER SET = utf8
COMMENT = 'Roles Table used for Authorization	';

USE `sql3128648` ;

-- -----------------------------------------------------
-- procedure GetSubscribedOwnershipDetails
-- -----------------------------------------------------

DELIMITER $$
USE `sql3128648`$$
CREATE DEFINER=`sql3128648`@`%` PROCEDURE `GetSubscribedOwnershipDetails`(IN expertiseSubCategoryID INT)
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

DELIMITER $$
USE `sql3128648`$$
CREATE DEFINER=`sql3128648`@`%` PROCEDURE `sps_GetAllOrganizationInformation`(IN organizationID INT)
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

DELIMITER $$
USE `sql3128648`$$
CREATE DEFINER=`sql3128648`@`%` PROCEDURE `sps_GetAllUserInformation`(IN userID INT)
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

DELIMITER $$
USE `sql3128648`$$
CREATE DEFINER=`sql3128648`@`%` PROCEDURE `sps_GetBidsForQuote`(IN rfqReference VARCHAR(50))
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
-- procedure sps_GetOutstandingDocumentRequirements
-- -----------------------------------------------------

DELIMITER $$
USE `sql3128648`$$
CREATE DEFINER=`sql3128648`@`%` PROCEDURE `sps_GetOutstandingDocumentRequirements`(IN organizationID INT)
BEGIN
	SELECT  dr.documentTypeID,
			dt.documentCode,
            dt.documentDescription
	FROM documentrequirements dr
	INNER JOIN documenttypes dt on dt.documentTypeID = dr.documentTypeID
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

DELIMITER $$
USE `sql3128648`$$
CREATE DEFINER=`sql3128648`@`%` PROCEDURE `sps_GetQuoteHistory`(IN userID INT, IN qStatus VARCHAR(50), IN startDate VARCHAR(50), IN endDate VARCHAR(50))
BEGIN

	SELECT q.rfqReference,q.createdDate,q.amount,qs.quoteStatusDateTime
    FROM quotestatus qs
    INNER JOIN quote q ON q.quoteID = qs.quoteID
    WHERE qs.status = 'ACCEPTED'
    AND q.userID = 1
    AND qs.quoteStatusDateTime BETWEEN '2012/01/01' AND '2018/01/01';

END$$

DELIMITER ;

-- -----------------------------------------------------
-- procedure sps_GetQuoteOwnerDetails
-- -----------------------------------------------------

DELIMITER $$
USE `sql3128648`$$
CREATE DEFINER=`sql3128648`@`%` PROCEDURE `sps_GetQuoteOwnerDetails`(IN quoteID INT)
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

DELIMITER $$
USE `sql3128648`$$
CREATE DEFINER=`sql3128648`@`%` PROCEDURE `sps_GetRolesForUser`(IN userID INT)
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
-- procedure sps_getRFQOwnerDetails
-- -----------------------------------------------------

DELIMITER $$
USE `sql3128648`$$
CREATE DEFINER=`sql3128648`@`%` PROCEDURE `sps_getRFQOwnerDetails`(IN rfqReference varchar(50))
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
