/*
SQLyog Ultimate v11.27 (32 bit)
MySQL - 5.6.21 : Database - bryning
*********************************************************************
*/

/*!40101 SET NAMES utf8 */;

/*!40101 SET SQL_MODE=''*/;

/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;
CREATE DATABASE /*!32312 IF NOT EXISTS*/`bryning` /*!40100 DEFAULT CHARACTER SET utf8 */;

USE `bryning`;

/*Table structure for table `parking` */

DROP TABLE IF EXISTS `parking`;

CREATE TABLE `parking` (
  `parkingId` int(20) NOT NULL AUTO_INCREMENT,
  `name` varchar(20) DEFAULT NULL,
  `address` varchar(20) DEFAULT NULL,
  PRIMARY KEY (`parkingId`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8;

/*Data for the table `parking` */

insert  into `parking`(`parkingId`,`name`,`address`) values (1,'aaa','bbb'),(2,'设定','1231245'),(3,'不包','12');

/*Table structure for table `parkingset` */

DROP TABLE IF EXISTS `parkingset`;

CREATE TABLE `parkingset` (
  `name` varchar(20) NOT NULL,
  `parkingId` varchar(20) NOT NULL,
  `available` varchar(20) DEFAULT NULL,
  `curVehicle` varchar(20) DEFAULT NULL,
  `lastRecordTime` int(20) DEFAULT NULL,
  `setId` int(20) NOT NULL AUTO_INCREMENT,
  PRIMARY KEY (`setId`)
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8;

/*Data for the table `parkingset` */

insert  into `parkingset`(`name`,`parkingId`,`available`,`curVehicle`,`lastRecordTime`,`setId`) values ('aa','1','true',NULL,15345345,3),('pbkjs','1','true',NULL,1496148770,4),('3F','1','true','bbb',1496148930,6);

/*Table structure for table `user` */

DROP TABLE IF EXISTS `user`;

CREATE TABLE `user` (
  `userId` int(20) NOT NULL AUTO_INCREMENT,
  `userType` varchar(20) DEFAULT NULL,
  `name` varchar(20) DEFAULT NULL,
  `age` varchar(20) DEFAULT NULL,
  `photo` varchar(20) DEFAULT NULL,
  `gender` varchar(20) DEFAULT NULL,
  `birth` varchar(20) DEFAULT NULL,
  `ID` varchar(20) DEFAULT NULL,
  `address` varchar(20) DEFAULT NULL,
  `cellPhone` varchar(20) DEFAULT NULL,
  `email` varchar(20) DEFAULT NULL,
  `startDate` varchar(20) DEFAULT NULL,
  `curVehicle` varchar(20) DEFAULT NULL,
  `lastRecordTime` int(20) DEFAULT NULL,
  `password` varchar(32) DEFAULT NULL,
  PRIMARY KEY (`userId`)
) ENGINE=InnoDB AUTO_INCREMENT=123463 DEFAULT CHARSET=utf8;

/*Data for the table `user` */

insert  into `user`(`userId`,`userType`,`name`,`age`,`photo`,`gender`,`birth`,`ID`,`address`,`cellPhone`,`email`,`startDate`,`curVehicle`,`lastRecordTime`,`password`) values (123,'555','123','123','123','123','123','123','123','123456789','123@qq.com','123','123',123,'123'),(123458,'guest','asasas',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL),(123459,'g1','testName 1','g3','g4','g5','123',NULL,'g8','g9','g40','11',NULL,123123,NULL),(123460,'g1','testName 2','g3','g4','g5','123',NULL,'g8','g9','g40','11',NULL,123123,NULL),(123461,'xx','asd','124','fh','sd','125',NULL,'888','gszh','486','8464868',NULL,123123,NULL),(123462,'51','15','7496','132','1543','156356','586','126','49','456','456','456',456,'156');

/*Table structure for table `vehicle` */

DROP TABLE IF EXISTS `vehicle`;

CREATE TABLE `vehicle` (
  `license` varchar(20) NOT NULL,
  `route` varchar(20) DEFAULT NULL,
  `photo` varchar(20) DEFAULT NULL,
  `model` varchar(20) DEFAULT NULL,
  `purchasedDate` int(20) DEFAULT NULL,
  `maintenance` varchar(20) DEFAULT NULL,
  `km` int(20) DEFAULT NULL,
  `lastRecordTime` int(20) DEFAULT NULL,
  `curStat` varchar(20) DEFAULT NULL,
  `nextStart` int(20) DEFAULT NULL,
  `parkingId` int(20) DEFAULT NULL,
  `curSet` int(20) DEFAULT NULL,
  PRIMARY KEY (`license`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

/*Data for the table `vehicle` */

insert  into `vehicle`(`license`,`route`,`photo`,`model`,`purchasedDate`,`maintenance`,`km`,`lastRecordTime`,`curStat`,`nextStart`,`parkingId`,`curSet`) values ('abcd','routeeee','pho】','9699',1753,'一级',1234,1496154205,'停车',14,55,NULL),('bbb','ag','xca','dsf',123123,NULL,NULL,12312,NULL,1231,1,6),('京212312','123',NULL,'SS',NULL,'一级',123,NULL,'出车',NULL,NULL,NULL),('京A2SSSS','123D',NULL,'22',NULL,'新车',123,NULL,'出车',NULL,NULL,NULL),('京DA1233','1234',NULL,'123',NULL,'一级',222,NULL,'出车',NULL,NULL,NULL),('沪SDCXCV','routeeee',NULL,'123',1495030560,'一级',23,1496153797,'出车',NULL,NULL,NULL),('渝212334','routeeee',NULL,'dfg',1495461,'新车',123,1496154201,'停车',NULL,NULL,NULL);

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;
