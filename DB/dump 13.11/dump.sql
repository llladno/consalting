-- MySQL dump 10.13  Distrib 8.0.31, for Win64 (x86_64)
--
-- Host: localhost    Database: company
-- ------------------------------------------------------
-- Server version	8.1.0

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `client`
--

DROP TABLE IF EXISTS `client`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `client` (
  `idclient` int NOT NULL AUTO_INCREMENT,
  `surname` varchar(45) NOT NULL,
  `clientname` varchar(45) NOT NULL,
  `companyname` varchar(45) NOT NULL,
  `addresscompany` varchar(45) NOT NULL,
  `email` varchar(45) NOT NULL,
  `phone` varchar(45) NOT NULL,
  `passwd` varchar(45) NOT NULL,
  `parent` varchar(45) NOT NULL,
  PRIMARY KEY (`idclient`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `client`
--

LOCK TABLES `client` WRITE;
/*!40000 ALTER TABLE `client` DISABLE KEYS */;
INSERT INTO `client` VALUES (1,'test2','test2','test2','test2','test','test2','1','test2');
/*!40000 ALTER TABLE `client` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `employee`
--

DROP TABLE IF EXISTS `employee`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `employee` (
  `idemployee` int NOT NULL AUTO_INCREMENT,
  `surname` varchar(45) NOT NULL,
  `fname` varchar(45) NOT NULL,
  `thrname` varchar(45) NOT NULL,
  `mail` varchar(45) NOT NULL,
  `phone` varchar(45) NOT NULL,
  `activity` varchar(45) NOT NULL,
  `passwd` varchar(45) NOT NULL,
  PRIMARY KEY (`idemployee`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `employee`
--

LOCK TABLES `employee` WRITE;
/*!40000 ALTER TABLE `employee` DISABLE KEYS */;
INSERT INTO `employee` VALUES (1,'Иванов ','Иван','Иванович','ivanov_ii@example.com','+7 (123) 456-7890','accounting','123'),(2,'Петрова','Анна ','Сергеевна','petrova_as@example.com','+7 (987) 654-3210','marketing','123'),(3,'Смирнов','Алексей','Дмитриевич','smirnov_ad@example.com','+7 (345) 678-9012','hr','123'),(4,'Козлова ','Елена','Андреевна','kozlova_ea@example.com','+7 (567) 890-1234','strategy','123');
/*!40000 ALTER TABLE `employee` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `mainorder`
--

DROP TABLE IF EXISTS `mainorder`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `mainorder` (
  `idorder` int NOT NULL AUTO_INCREMENT,
  `idclient` int NOT NULL,
  `idservice` varchar(45) NOT NULL,
  `descriptionorder` varchar(200) NOT NULL,
  `costorder` int NOT NULL,
  `dateorder` varchar(45) NOT NULL,
  `orderwrite` int NOT NULL,
  PRIMARY KEY (`idorder`),
  KEY `idservice` (`idservice`),
  KEY `idclient` (`idclient`),
  CONSTRAINT `mainorder_ibfk_2` FOREIGN KEY (`idclient`) REFERENCES `client` (`idclient`)
) ENGINE=InnoDB AUTO_INCREMENT=51 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `mainorder`
--

LOCK TABLES `mainorder` WRITE;
/*!40000 ALTER TABLE `mainorder` DISABLE KEYS */;
INSERT INTO `mainorder` VALUES (5,1,'9','ivanov_ii@example.com',5000,'02.11.2023',0),(6,1,'9','ivanov_ii@example.com',5000,'02.11.2023',0),(7,1,'9','ivanov_ii@example.com',5000,'02.11.2023',1),(8,1,'9','ivanov_ii@example.com',3000,'03.11.2023',2),(9,1,'8','ivanov_ii@example.com',2000,'03.11.2023',2),(10,1,'12','ivanov_ii@example.com',2000,'04.11.2023',3),(11,1,'11','ivanov_ii@example.com',2000,'04.11.2023',3),(12,1,'10','ivanov_ii@example.com',1500,'04.11.2023',3),(13,1,'15','ivanov_ii@example.com',2000,'04.11.2023',4),(14,1,'14','ivanov_ii@example.com',2000,'04.11.2023',4),(15,1,'13','ivanov_ii@example.com',1500,'04.11.2023',4),(16,1,'18','ivanov_ii@example.com',2000,'04.11.2023',5),(17,1,'17','ivanov_ii@example.com',2000,'04.11.2023',5),(18,1,'16','ivanov_ii@example.com',1500,'04.11.2023',5),(22,1,'27','ivanov_ii@example.com',2000,'04.11.2023',7),(23,1,'26','ivanov_ii@example.com',2000,'04.11.2023',7),(24,1,'25','ivanov_ii@example.com',1500,'04.11.2023',7),(25,1,'30','ivanov_ii@example.com',2000,'04.11.2023',8),(26,1,'29','ivanov_ii@example.com',2000,'04.11.2023',8),(27,1,'28','ivanov_ii@example.com',1500,'04.11.2023',8),(28,1,'31','ivanov_ii@example.com',2000,'09.11.2023',9),(29,1,'33','ivanov_ii@example.com',2000,'09.11.2023',10),(30,1,'32','ivanov_ii@example.com',1500,'09.11.2023',10),(31,1,'34','ivanov_ii@example.com',2000,'09.11.2023',11),(32,1,'35','ivanov_ii@example.com',2000,'09.11.2023',12),(33,1,'37','ivanov_ii@example.com',3000,'09.11.2023',13),(34,1,'36','ivanov_ii@example.com',2000,'09.11.2023',13),(35,1,'39','ivanov_ii@example.com',3000,'09.11.2023',14),(36,1,'38','ivanov_ii@example.com',2000,'09.11.2023',14),(37,1,'40','ivanov_ii@example.com',3000,'09.11.2023',15),(38,1,'41','ivanov_ii@example.com',3000,'09.11.2023',16),(39,1,'43','ivanov_ii@example.com',2000,'09.11.2023',17),(40,1,'42','ivanov_ii@example.com',1500,'09.11.2023',17),(41,1,'44','ivanov_ii@example.com',1500,'12.11.2023',18),(42,1,'45','ivanov_ii@example.com',1500,'12.11.2023',19),(43,1,'46','ivanov_ii@example.com',3000,'12.11.2023',20),(44,1,'50','Change',5000,'13.11.2023',21),(45,1,'48','ivanov_ii@example.com',1500,'12.11.2023',22),(46,1,'50','ivanov_ii@example.com',3000,'12.11.2023',23),(47,1,'49','ivanov_ii@example.com',2000,'12.11.2023',23),(48,1,'53','ivanov_ii@example.com',3000,'12.11.2023',24),(49,1,'53','ivanov_ii@example.com',3000,'12.11.2023',24),(50,1,'52','ivanov_ii@example.com',2000,'12.11.2023',24);
/*!40000 ALTER TABLE `mainorder` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `ordercheck`
--

DROP TABLE IF EXISTS `ordercheck`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `ordercheck` (
  `idordercheck` int NOT NULL AUTO_INCREMENT,
  `idclient` int NOT NULL,
  `idorder` varchar(45) NOT NULL,
  `dateordercheck` varchar(45) NOT NULL,
  `dateorderpay` varchar(45) NOT NULL,
  `sumordercost` int NOT NULL,
  `statusordercheck` varchar(10) DEFAULT NULL,
  `orderwrite` varchar(45) NOT NULL,
  PRIMARY KEY (`idordercheck`),
  KEY `idclient` (`idclient`),
  CONSTRAINT `ordercheck_ibfk_1` FOREIGN KEY (`idclient`) REFERENCES `client` (`idclient`)
) ENGINE=InnoDB AUTO_INCREMENT=16 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `ordercheck`
--

LOCK TABLES `ordercheck` WRITE;
/*!40000 ALTER TABLE `ordercheck` DISABLE KEYS */;
INSERT INTO `ordercheck` VALUES (11,1,'47','12.11.2023','Не оплачено',1500,'Не готов','21'),(12,1,'48','12.11.2023','Не оплачено',1500,'Не готов','22'),(13,1,'50','13.11.2023','13.11.2023',5000,'Готов','23'),(14,1,'53,53,52','12.11.2023','Не оплачено',8000,'Не готов','24'),(15,1,'53,53,52','12.11.2023','Не оплачено',8000,'Не готов','24');
/*!40000 ALTER TABLE `ordercheck` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `report`
--

DROP TABLE IF EXISTS `report`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `report` (
  `idreport` int NOT NULL AUTO_INCREMENT,
  `idservice` int NOT NULL,
  `datereport` varchar(45) NOT NULL,
  `readyreport` tinyint(1) DEFAULT NULL,
  `readyservice` tinyint(1) DEFAULT NULL,
  `filepath` varchar(500) DEFAULT NULL,
  PRIMARY KEY (`idreport`)
) ENGINE=InnoDB AUTO_INCREMENT=17 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `report`
--

LOCK TABLES `report` WRITE;
/*!40000 ALTER TABLE `report` DISABLE KEYS */;
INSERT INTO `report` VALUES (1,39,'09.11.2023',0,0,''),(2,38,'09.11.2023',0,0,''),(3,40,'09.11.2023',0,0,''),(4,41,'09.11.2023',0,0,''),(5,43,'09.11.2023',0,0,''),(6,42,'09.11.2023',0,0,''),(7,44,'12.11.2023',0,0,''),(8,45,'12.11.2023',0,0,''),(9,46,'12.11.2023',0,0,''),(10,47,'12.11.2023',0,0,''),(11,48,'12.11.2023',0,0,''),(12,50,'12.11.2023',0,0,''),(13,49,'12.11.2023',0,0,''),(16,55,'13.11.2023',1,1,'');
/*!40000 ALTER TABLE `report` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `service`
--

DROP TABLE IF EXISTS `service`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `service` (
  `idserice` int NOT NULL AUTO_INCREMENT,
  `idemployee` int NOT NULL,
  `nameservice` varchar(45) NOT NULL,
  `costservice` int NOT NULL,
  `descriptionservice` varchar(45) NOT NULL,
  PRIMARY KEY (`idserice`),
  KEY `idemployee` (`idemployee`),
  CONSTRAINT `service_ibfk_1` FOREIGN KEY (`idemployee`) REFERENCES `employee` (`idemployee`)
) ENGINE=InnoDB AUTO_INCREMENT=54 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `service`
--

LOCK TABLES `service` WRITE;
/*!40000 ALTER TABLE `service` DISABLE KEYS */;
INSERT INTO `service` VALUES (1,1,'accounting',1500,'Описание'),(2,3,'hr',2000,''),(3,4,'strategy',3000,''),(4,3,'hr',2000,''),(5,4,'strategy',3000,''),(6,3,'hr',2000,''),(7,4,'strategy',3000,''),(8,3,'hr',2000,''),(9,4,'strategy',3000,''),(10,1,'accounting',1500,'Описание'),(11,2,'marketing',2000,''),(12,3,'hr',2000,''),(13,1,'accounting',1500,'Описание'),(14,2,'marketing',2000,''),(15,3,'hr',2000,''),(16,1,'accounting',1500,'Описание'),(17,2,'marketing',2000,''),(18,3,'hr',2000,''),(19,1,'accounting',1500,'Описание'),(20,2,'marketing',2000,''),(21,3,'hr',2000,''),(22,1,'accounting',1500,'Описание'),(23,2,'marketing',2000,''),(24,3,'hr',2000,''),(25,1,'accounting',1500,'Описание'),(26,2,'marketing',2000,''),(27,3,'hr',2000,''),(28,1,'accounting',1500,'Описание'),(29,2,'marketing',2000,''),(30,3,'hr',2000,''),(31,3,'hr',2000,''),(32,1,'accounting',1500,'Описание'),(33,2,'marketing',2000,''),(34,3,'hr',2000,''),(35,2,'marketing',2000,''),(36,3,'hr',2000,''),(37,4,'strategy',3000,''),(38,3,'hr',2000,''),(39,4,'strategy',3000,''),(40,4,'strategy',3000,''),(41,4,'strategy',3000,''),(42,1,'accounting',1500,'Описание'),(43,3,'hr',2000,''),(44,4,'strategy',1500,'123'),(45,3,'hr',1500,'123333'),(46,4,'strategy',3000,''),(47,1,'accounting',1500,'Описание'),(48,3,'hr',1500,'2321321'),(49,3,'hr',2000,''),(50,4,'strategy',3000,''),(52,2,'hr',1000,'111111'),(53,4,'strategy',3000,'');
/*!40000 ALTER TABLE `service` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2023-11-13 22:53:13
