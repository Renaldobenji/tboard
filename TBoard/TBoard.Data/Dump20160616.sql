CREATE DATABASE  IF NOT EXISTS `tboard` /*!40100 DEFAULT CHARACTER SET utf8 */;
USE `tboard`;
-- MySQL dump 10.13  Distrib 5.6.17, for Win64 (x86_64)
--
-- Host: localhost    Database: tboard
-- ------------------------------------------------------
-- Server version	5.6.14

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `address`
--

DROP TABLE IF EXISTS `address`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `address` (
  `addressID` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `owningType` varchar(50) DEFAULT NULL,
  `owningID` varchar(50) DEFAULT NULL,
  `addressTypeID` int(11) DEFAULT NULL,
  `addressLine1` varchar(200) DEFAULT NULL,
  `addressLine2` varchar(200) DEFAULT NULL,
  `addressLine3` varchar(200) DEFAULT NULL,
  `addressLine4` varchar(200) DEFAULT NULL,
  `addressLine5` varchar(200) DEFAULT NULL,
  `postalCode` varchar(45) DEFAULT NULL,
  PRIMARY KEY (`addressID`),
  KEY `addType_idx` (`addressTypeID`),
  CONSTRAINT `addType` FOREIGN KEY (`addressTypeID`) REFERENCES `addresstype` (`addressTypeID`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB AUTO_INCREMENT=9 DEFAULT CHARSET=utf8 COMMENT='						';
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `address`
--

LOCK TABLES `address` WRITE;
/*!40000 ALTER TABLE `address` DISABLE KEYS */;
INSERT INTO `address` VALUES (1,'PER','1',1,'Renaldo','Renaldo','Renaldo','Renaldo','Renaldo','Renaldo'),(2,'PER','2',1,'Renaldo','Renaldo','Renaldo','Renaldo','Renaldo','Renaldo'),(3,'PER','3',1,'Renaldo','Renaldo','Renaldo','Renaldo','Renaldo','Renaldo'),(4,'ORG','1',1,'sdfgdsfg','dfgsdfg','33333333333','345345','53453443','345345345'),(5,'PER','4',2,'Renaldo','Renaldo','Renaldo','Renaldo','Renaldo','Renaldo'),(6,'PER','5',1,'werwer','werwer','werwer','werwer','werwer','werwer'),(7,'ORG','2',1,'werwer','werwer','werwer','werwer','werwer','werwer'),(8,'PER','6',2,'werwer','werwer','werwer','werwer','werwer','werwer');
/*!40000 ALTER TABLE `address` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `addresstype`
--

DROP TABLE IF EXISTS `addresstype`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `addresstype` (
  `addressTypeID` int(11) NOT NULL AUTO_INCREMENT,
  `addressTypeTLA` varchar(45) DEFAULT NULL,
  `AddressTypeDescription` varchar(200) DEFAULT NULL,
  PRIMARY KEY (`addressTypeID`),
  UNIQUE KEY `addressTypeID_UNIQUE` (`addressTypeID`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `addresstype`
--

LOCK TABLES `addresstype` WRITE;
/*!40000 ALTER TABLE `addresstype` DISABLE KEYS */;
INSERT INTO `addresstype` VALUES (1,'PHY','Physical Address'),(2,'WRK','Work Address');
/*!40000 ALTER TABLE `addresstype` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `bankaccountdetails`
--

DROP TABLE IF EXISTS `bankaccountdetails`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `bankaccountdetails` (
  `bankAccountDetailID` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `owningType` varchar(45) DEFAULT NULL,
  `owningID` varchar(45) DEFAULT NULL,
  `accountName` varchar(45) DEFAULT NULL,
  `accountNumber` varchar(45) DEFAULT NULL,
  `branchCode` varchar(45) DEFAULT NULL,
  `branchName` varchar(150) DEFAULT NULL,
  `default` bit(1) DEFAULT NULL,
  `bankAccountTypeID` int(11) DEFAULT NULL,
  PRIMARY KEY (`bankAccountDetailID`),
  KEY `bankAcctype_idx` (`bankAccountTypeID`),
  CONSTRAINT `bankAcctype` FOREIGN KEY (`bankAccountTypeID`) REFERENCES `bankaccounttype` (`bankAccountTypeID`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `bankaccountdetails`
--

LOCK TABLES `bankaccountdetails` WRITE;
/*!40000 ALTER TABLE `bankaccountdetails` DISABLE KEYS */;
INSERT INTO `bankaccountdetails` VALUES (1,NULL,'1','11111','1111','11111','11111111',NULL,1),(2,'ORG','1','666666','222222','11111','5555555',NULL,1);
/*!40000 ALTER TABLE `bankaccountdetails` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `bankaccounttype`
--

DROP TABLE IF EXISTS `bankaccounttype`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `bankaccounttype` (
  `bankAccountTypeID` int(11) NOT NULL AUTO_INCREMENT,
  `bankAccountTypeCode` varchar(45) DEFAULT NULL,
  `bankAccountTypeDescription` varchar(200) DEFAULT NULL,
  PRIMARY KEY (`bankAccountTypeID`),
  UNIQUE KEY `bankAccountTypeID_UNIQUE` (`bankAccountTypeID`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `bankaccounttype`
--

LOCK TABLES `bankaccounttype` WRITE;
/*!40000 ALTER TABLE `bankaccounttype` DISABLE KEYS */;
INSERT INTO `bankaccounttype` VALUES (1,'Cheque','Cheque'),(2,'Savings','Savings');
/*!40000 ALTER TABLE `bankaccounttype` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `communication`
--

DROP TABLE IF EXISTS `communication`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `communication` (
  `communicationID` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `owningType` varchar(45) DEFAULT NULL,
  `owningID` varchar(45) DEFAULT NULL,
  `communicationLine1` varchar(45) DEFAULT NULL,
  `communicationLine2` varchar(45) DEFAULT NULL,
  `communicationTypeID` int(11) DEFAULT NULL,
  PRIMARY KEY (`communicationID`),
  KEY `commTypeID_idx` (`communicationTypeID`),
  CONSTRAINT `commTypeID` FOREIGN KEY (`communicationTypeID`) REFERENCES `communicationtype` (`communicationTypeID`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB AUTO_INCREMENT=33 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `communication`
--

LOCK TABLES `communication` WRITE;
/*!40000 ALTER TABLE `communication` DISABLE KEYS */;
INSERT INTO `communication` VALUES (1,'PER','1','Renaldo',NULL,1),(2,'PER','1','Renaldo',NULL,3),(3,'PER','1','Renaldo',NULL,2),(4,'PER','1','Renaldo',NULL,4),(5,'PER','2','Renaldo',NULL,1),(6,'PER','2','Renaldo',NULL,3),(7,'PER','2','Renaldo',NULL,2),(8,'PER','2','Renaldo',NULL,4),(9,'PER','3','Renaldo',NULL,1),(10,'PER','3','Renaldo',NULL,3),(11,'PER','3','Renaldo',NULL,2),(12,'PER','3','Renaldo',NULL,4),(13,'ORG','1','4444444',NULL,1),(14,'PER','4','Renaldo',NULL,1),(15,'ORG','1','222222',NULL,3),(16,'PER','4','Renaldo',NULL,3),(17,'ORG','1','3333333333',NULL,2),(18,'PER','4','Renaldo',NULL,2),(19,'ORG','1','4444444444',NULL,4),(20,'PER','4','Renaldo',NULL,4),(21,'PER','5','werwer',NULL,1),(22,'PER','5','werwer',NULL,3),(23,'PER','5','werwer',NULL,2),(24,'PER','5','werwer',NULL,4),(25,'ORG','2','werwer',NULL,1),(26,'PER','6','werwer',NULL,1),(27,'ORG','2','werwer',NULL,3),(28,'PER','6','werwer',NULL,3),(29,'ORG','2','werwer',NULL,2),(30,'PER','6','werwer',NULL,2),(31,'ORG','2','werwer',NULL,4),(32,'PER','6','werwer',NULL,4);
/*!40000 ALTER TABLE `communication` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `communicationtype`
--

DROP TABLE IF EXISTS `communicationtype`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `communicationtype` (
  `communicationTypeID` int(11) NOT NULL AUTO_INCREMENT,
  `communicationTypeTLA` varchar(45) DEFAULT NULL,
  `communicationTypeDescription` varchar(45) DEFAULT NULL,
  PRIMARY KEY (`communicationTypeID`),
  UNIQUE KEY `communicationTypeID_UNIQUE` (`communicationTypeID`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `communicationtype`
--

LOCK TABLES `communicationtype` WRITE;
/*!40000 ALTER TABLE `communicationtype` DISABLE KEYS */;
INSERT INTO `communicationtype` VALUES (1,'CELL','Cellphone'),(2,'WRK','Work Number'),(3,'HME','Home Number'),(4,'EML','Email ');
/*!40000 ALTER TABLE `communicationtype` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `documentrequirements`
--

DROP TABLE IF EXISTS `documentrequirements`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `documentrequirements` (
  `documentRequirementsID` int(11) NOT NULL AUTO_INCREMENT,
  `documentTypeID` int(11) DEFAULT NULL,
  `organizationTypeID` int(11) DEFAULT NULL,
  PRIMARY KEY (`documentRequirementsID`),
  KEY `documentTypeID_idx` (`documentTypeID`),
  KEY `organizationTypeID_idx` (`organizationTypeID`),
  CONSTRAINT `documentTypeID` FOREIGN KEY (`documentTypeID`) REFERENCES `documenttypes` (`documentTypeID`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  CONSTRAINT `organizationTypeID` FOREIGN KEY (`organizationTypeID`) REFERENCES `organizationtypes` (`organizationTypeID`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB AUTO_INCREMENT=8 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `documentrequirements`
--

LOCK TABLES `documentrequirements` WRITE;
/*!40000 ALTER TABLE `documentrequirements` DISABLE KEYS */;
INSERT INTO `documentrequirements` VALUES (1,1,1),(2,2,1),(3,3,1),(4,4,1),(5,1,2),(6,2,2),(7,3,2);
/*!40000 ALTER TABLE `documentrequirements` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `documents`
--

DROP TABLE IF EXISTS `documents`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `documents` (
  `documentID` int(11) NOT NULL AUTO_INCREMENT,
  `documentTypeID` int(11) DEFAULT NULL,
  `organizationID` int(11) DEFAULT NULL,
  `documentPath` varchar(5000) DEFAULT NULL,
  `dateCreated` datetime DEFAULT NULL,
  PRIMARY KEY (`documentID`),
  KEY `documentType_idx` (`documentTypeID`),
  KEY `orgID_idx` (`organizationID`),
  CONSTRAINT `documentType` FOREIGN KEY (`documentTypeID`) REFERENCES `documenttypes` (`documentTypeID`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  CONSTRAINT `orgID` FOREIGN KEY (`organizationID`) REFERENCES `organization` (`organizationID`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `documents`
--

LOCK TABLES `documents` WRITE;
/*!40000 ALTER TABLE `documents` DISABLE KEYS */;
INSERT INTO `documents` VALUES (3,1,1,'C:\\Users\\Renaldo\\Documents\\GitHub\\tboard\\TBoard\\TBoard.Web\\Pluralsight.-.Real-time.Web.Applications.torrent','2016-06-07 19:58:52'),(4,3,1,'C:\\Users\\Renaldo\\Documents\\GitHub\\tboard\\TBoard\\TBoard.Web\\[Limetorrents.com]_Pretty Little Liars S04E02 HDTV x264-LOL[ettv].torrent','2016-06-07 19:59:22'),(5,2,1,'C:\\Users\\Renaldo\\Documents\\GitHub\\tboard\\TBoard\\TBoard.Web\\[Limetorrents.com]_Happy Endings S01E12 HDTV XviD-LOL [eztv].torrent','2016-06-07 19:59:42');
/*!40000 ALTER TABLE `documents` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `documenttypes`
--

DROP TABLE IF EXISTS `documenttypes`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `documenttypes` (
  `documentTypeID` int(11) NOT NULL AUTO_INCREMENT,
  `documentCode` varchar(45) DEFAULT NULL,
  `documentDescription` varchar(45) DEFAULT NULL,
  PRIMARY KEY (`documentTypeID`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `documenttypes`
--

LOCK TABLES `documenttypes` WRITE;
/*!40000 ALTER TABLE `documenttypes` DISABLE KEYS */;
INSERT INTO `documenttypes` VALUES (1,'Doc1','Doc1'),(2,'Doc2','Doc2'),(3,'Doc3','Doc3'),(4,'Doc4','Doc4');
/*!40000 ALTER TABLE `documenttypes` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `emailqueue`
--

DROP TABLE IF EXISTS `emailqueue`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `emailqueue` (
  `emailQueueID` int(11) NOT NULL AUTO_INCREMENT,
  `from` varchar(200) DEFAULT NULL,
  `to` varchar(200) DEFAULT NULL,
  `subject` varchar(500) DEFAULT NULL,
  `body` varchar(5000) DEFAULT NULL,
  `createdDate` datetime DEFAULT NULL,
  `sentDate` datetime DEFAULT NULL,
  PRIMARY KEY (`emailQueueID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `emailqueue`
--

LOCK TABLES `emailqueue` WRITE;
/*!40000 ALTER TABLE `emailqueue` DISABLE KEYS */;
/*!40000 ALTER TABLE `emailqueue` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `expertisecategory`
--

DROP TABLE IF EXISTS `expertisecategory`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `expertisecategory` (
  `ExpertiseCategoryID` int(11) NOT NULL AUTO_INCREMENT,
  `Name` varchar(100) DEFAULT NULL,
  PRIMARY KEY (`ExpertiseCategoryID`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `expertisecategory`
--

LOCK TABLES `expertisecategory` WRITE;
/*!40000 ALTER TABLE `expertisecategory` DISABLE KEYS */;
INSERT INTO `expertisecategory` VALUES (1,'General'),(2,'Motor');
/*!40000 ALTER TABLE `expertisecategory` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `expertiseownership`
--

DROP TABLE IF EXISTS `expertiseownership`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `expertiseownership` (
  `expertiseOwnershipID` int(11) NOT NULL AUTO_INCREMENT,
  `ownerType` varchar(45) DEFAULT NULL,
  `owningID` varchar(45) DEFAULT NULL,
  `expertiseSubCategoryID` int(11) DEFAULT NULL,
  PRIMARY KEY (`expertiseOwnershipID`),
  KEY `subCat_idx` (`expertiseSubCategoryID`),
  CONSTRAINT `subCat` FOREIGN KEY (`expertiseSubCategoryID`) REFERENCES `expertisesubcategory` (`ExpertiseSubCategoryID`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB AUTO_INCREMENT=22 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `expertiseownership`
--

LOCK TABLES `expertiseownership` WRITE;
/*!40000 ALTER TABLE `expertiseownership` DISABLE KEYS */;
INSERT INTO `expertiseownership` VALUES (16,'ORG','1',1),(17,'ORG','1',3),(18,'ORG','1',5),(19,'ORG','1',7),(20,'ORG','1',9),(21,'ORG','1',6);
/*!40000 ALTER TABLE `expertiseownership` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `expertisesubcategory`
--

DROP TABLE IF EXISTS `expertisesubcategory`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `expertisesubcategory` (
  `ExpertiseSubCategoryID` int(11) NOT NULL AUTO_INCREMENT,
  `Name` varchar(500) DEFAULT NULL,
  `ExpertiseCategoryID` int(11) DEFAULT NULL,
  PRIMARY KEY (`ExpertiseSubCategoryID`),
  KEY `CatetoryID_idx` (`ExpertiseCategoryID`),
  CONSTRAINT `CatetoryID` FOREIGN KEY (`ExpertiseCategoryID`) REFERENCES `expertisecategory` (`ExpertiseCategoryID`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB AUTO_INCREMENT=10 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `expertisesubcategory`
--

LOCK TABLES `expertisesubcategory` WRITE;
/*!40000 ALTER TABLE `expertisesubcategory` DISABLE KEYS */;
INSERT INTO `expertisesubcategory` VALUES (1,'SubCat1',1),(2,'SubCat2',1),(3,'SubCat3',1),(4,'SubCat4',1),(5,'SubCat5',1),(6,'asdfas',2),(7,'sdf',2),(8,'asdff',2),(9,'sdfsdf',2);
/*!40000 ALTER TABLE `expertisesubcategory` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `organization`
--

DROP TABLE IF EXISTS `organization`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `organization` (
  `organizationID` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(150) DEFAULT NULL,
  `tradingName` varchar(150) DEFAULT NULL,
  `registrationNumber` varchar(150) DEFAULT NULL,
  `vatNumber` varchar(150) DEFAULT NULL,
  `taxNumber` varchar(150) DEFAULT NULL,
  `organizationTypeID` int(11) DEFAULT NULL,
  `oem` bit(1) DEFAULT NULL,
  PRIMARY KEY (`organizationID`),
  UNIQUE KEY `organizationID_UNIQUE` (`organizationID`),
  KEY `orgType_idx` (`organizationTypeID`),
  CONSTRAINT `orgType` FOREIGN KEY (`organizationTypeID`) REFERENCES `organizationtypes` (`organizationTypeID`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `organization`
--

LOCK TABLES `organization` WRITE;
/*!40000 ALTER TABLE `organization` DISABLE KEYS */;
INSERT INTO `organization` VALUES (1,'Renaldo','Renaldo','333333333','Renaldos','Renaldo',2,''),(2,'werwer','33','4444s','55555','666',1,'\0');
/*!40000 ALTER TABLE `organization` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `organizationtypes`
--

DROP TABLE IF EXISTS `organizationtypes`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `organizationtypes` (
  `organizationTypeID` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(150) DEFAULT NULL,
  `description` varchar(150) DEFAULT NULL,
  PRIMARY KEY (`organizationTypeID`),
  UNIQUE KEY `organizationTypeID_UNIQUE` (`organizationTypeID`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `organizationtypes`
--

LOCK TABLES `organizationtypes` WRITE;
/*!40000 ALTER TABLE `organizationtypes` DISABLE KEYS */;
INSERT INTO `organizationtypes` VALUES (1,'Company Buyer','Company Buyer'),(2,'Company Seller','Company Seller');
/*!40000 ALTER TABLE `organizationtypes` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `rfq`
--

DROP TABLE IF EXISTS `rfq`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `rfq` (
  `rfqID` int(11) NOT NULL AUTO_INCREMENT,
  `reference` varchar(45) DEFAULT NULL,
  `userID` int(11) DEFAULT NULL,
  `expertiseSubCategoryID` int(11) DEFAULT NULL,
  `rfqDetails` varchar(5000) DEFAULT NULL,
  `rfqTypeID` int(11) DEFAULT NULL,
  `dateCreated` datetime DEFAULT NULL,
  `expiryDate` datetime DEFAULT NULL,
  `status` varchar(45) DEFAULT NULL,
  PRIMARY KEY (`rfqID`),
  KEY `rfq1_idx` (`rfqTypeID`),
  KEY `rfq2_idx` (`userID`),
  KEY `rfq3_idx` (`expertiseSubCategoryID`),
  CONSTRAINT `rfq1` FOREIGN KEY (`rfqTypeID`) REFERENCES `rfqtype` (`rfqTypeID`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  CONSTRAINT `rfq2` FOREIGN KEY (`userID`) REFERENCES `users` (`userID`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  CONSTRAINT `rfq3` FOREIGN KEY (`expertiseSubCategoryID`) REFERENCES `expertisesubcategory` (`ExpertiseSubCategoryID`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `rfq`
--

LOCK TABLES `rfq` WRITE;
/*!40000 ALTER TABLE `rfq` DISABLE KEYS */;
/*!40000 ALTER TABLE `rfq` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `rfqtype`
--

DROP TABLE IF EXISTS `rfqtype`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `rfqtype` (
  `rfqTypeID` int(11) NOT NULL AUTO_INCREMENT,
  `code` varchar(45) DEFAULT NULL,
  `description` varchar(200) DEFAULT NULL,
  `Prefix` varchar(3) DEFAULT NULL,
  PRIMARY KEY (`rfqTypeID`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `rfqtype`
--

LOCK TABLES `rfqtype` WRITE;
/*!40000 ALTER TABLE `rfqtype` DISABLE KEYS */;
INSERT INTO `rfqtype` VALUES (1,'RFQ','RFQ','RFQ'),(2,'OTT','OTT','OTT'),(3,'CTT','CTT','CTT');
/*!40000 ALTER TABLE `rfqtype` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `users`
--

DROP TABLE IF EXISTS `users`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `users` (
  `userID` int(11) NOT NULL AUTO_INCREMENT,
  `organizationID` int(11) DEFAULT NULL,
  `username` varchar(45) NOT NULL,
  `password` varchar(100) NOT NULL,
  `passwordSalt` varchar(45) NOT NULL,
  `title` varchar(45) NOT NULL,
  `firstname` varchar(100) NOT NULL,
  `surname` varchar(100) NOT NULL,
  `identificationNumber` varchar(45) NOT NULL,
  `isApproved` bit(1) NOT NULL,
  `isLockedOut` varchar(45) NOT NULL,
  `lastActivityDate` datetime DEFAULT NULL,
  `lastPasswordChange` datetime DEFAULT NULL,
  `lastLoginDate` datetime DEFAULT NULL,
  `failedPasswordAttemptCount` int(11) DEFAULT NULL,
  `created` datetime NOT NULL,
  `updated` datetime DEFAULT NULL,
  PRIMARY KEY (`userID`)
) ENGINE=InnoDB AUTO_INCREMENT=13 DEFAULT CHARSET=utf8 COMMENT='User';
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `users`
--

LOCK TABLES `users` WRITE;
/*!40000 ALTER TABLE `users` DISABLE KEYS */;
INSERT INTO `users` VALUES (1,NULL,'Renaldo','G0tvwKJvCYo6FdLvyzXxVw==','X62HARR1XS','Mr','Renaldo','Renaldo','Renaldo','','false','2016-05-26 20:02:24','2016-05-26 20:02:24','2016-05-26 20:02:24',0,'2016-05-26 20:05:24',NULL),(2,NULL,'Renaldo','63OY1dnQul77A673kXswDw==','Q88N915EB5','Mr','Renaldo','Renaldo','Renaldo','','false','2016-05-26 20:05:24','2016-05-26 20:05:24','2016-05-26 20:05:24',0,'2016-05-26 20:05:24',NULL),(3,NULL,'Renaldo','UzHNCFFvK5t2ZNL8mVqujw==','RPQX6A8UFM','Mr','Renaldo','Renaldo','Renaldo','','false','2016-05-26 20:08:10','2016-05-26 20:08:10','2016-05-26 20:08:10',0,'2016-05-26 20:08:10',NULL),(4,1,'Renaldo','zCWg5g6skJmtoBy+uN2/DQ==','9KEH1RNQDY','Mr','Renaldo','Renaldo','Renaldo','','false','2016-05-26 20:10:33','2016-05-26 20:10:33','2016-05-26 20:10:33',0,'2016-05-26 20:05:24',NULL),(5,NULL,'wer','NhLa2ylWMq2HRAvE7p9QgQ==','2ZE47IS7QX','Mr','wer','wer','werwer','','false','2016-05-28 10:11:51','2016-05-28 10:11:51','2016-05-28 10:11:51',0,'2016-05-28 10:11:51',NULL),(6,2,'wer','YpDtiI6k3Xj2dLKe+fzgUw==','NP5O7M0T16','Mr','wer','wer','werwer','','false','2016-05-28 10:13:06','2016-05-28 10:13:06','2016-05-28 10:13:06',0,'2016-05-28 10:13:06',NULL),(7,1,'Hello','Co8jlx4OyljOlGOmXEYNqg==','GD9U7R7WBO','Hello','Hello','Hello','Hello','','false','2016-05-29 17:15:14','2016-05-29 17:15:14','2016-05-29 17:15:14',0,'2016-05-29 17:15:14',NULL),(8,1,'Hello2','jmgp8K91vi2p0pVRaL4E7w==','8K5YG8VCO4','Hello2','HelloHello2','HelloHello2','Hello2','','false','2016-05-29 17:15:42','2016-05-29 17:15:42','2016-05-29 17:15:42',0,'2016-05-29 17:15:42',NULL),(9,1,'gsdfg','EVTptsPiOfhPwLRa0zSRYw==','EHH9DG9NNE','sdfgsdf','sdfgsdg','sdfg','sdfgsdfg','','false','2016-05-29 17:16:47','2016-05-29 17:16:47','2016-05-29 17:16:47',0,'2016-05-29 17:16:47',NULL),(10,1,'eeeeee','MDma22uk7aliu/NDFLaj3w==','MRQK1H0SWV','eeeeeee','eeeeeee','eeeeeeee','eeeeeee','','false','2016-05-29 17:17:31','2016-05-29 17:17:31','2016-05-29 17:17:31',0,'2016-05-29 17:17:31',NULL),(11,1,'uuuu','q6klcxjmyt5GXFjH2Eq0SQ==','V68Y2JX7C6','uuuuuuu','uuuuuu','uuuuuu','uuuuu','','false','2016-05-29 17:18:09','2016-05-29 17:18:09','2016-05-29 17:18:09',0,'2016-05-29 17:18:09',NULL),(12,1,'zzzzzzz','nsqDwSdYFTxSWJIOubz3ig==','VPUMHP5RXG','zz','zzzzz','zzzzzz','zzzzzzzz','','false','2016-06-04 11:12:15','2016-06-04 11:12:15','2016-06-04 11:12:15',0,'2016-06-04 11:12:15',NULL);
/*!40000 ALTER TABLE `users` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2016-06-16  8:09:14
