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

/*Table structure for table `log` */

DROP TABLE IF EXISTS `log`;

CREATE TABLE `log` (
  `logId` int(20) NOT NULL AUTO_INCREMENT,
  `type` varchar(20) DEFAULT NULL,
  `user` varchar(20) DEFAULT NULL,
  `time` int(20) DEFAULT NULL,
  `remark` varchar(20) DEFAULT NULL,
  `content` varchar(20) DEFAULT NULL,
  `sets` varchar(20) DEFAULT NULL,
  `parking` varchar(20) DEFAULT NULL,
  PRIMARY KEY (`logId`)
) ENGINE=InnoDB AUTO_INCREMENT=8 DEFAULT CHARSET=utf8;

/*Data for the table `log` */

insert  into `log`(`logId`,`type`,`user`,`time`,`remark`,`content`,`sets`,`parking`) values (1,'登录','asdf',1495206540,'舍得坊','是打发色粉',NULL,NULL),(2,'出车',NULL,1496244808,NULL,'出车',NULL,NULL),(3,'停车',NULL,1496245324,NULL,'停车',NULL,NULL),(6,'出车',NULL,1496247164,NULL,'出车',NULL,'aaa'),(7,'出车',NULL,1496248173,NULL,'出车',NULL,'锦园停车场');

/*Table structure for table `parking` */

DROP TABLE IF EXISTS `parking`;

CREATE TABLE `parking` (
  `parkingId` int(20) NOT NULL AUTO_INCREMENT,
  `name` varchar(20) DEFAULT NULL,
  `address` varchar(20) DEFAULT NULL,
  PRIMARY KEY (`parkingId`)
) ENGINE=InnoDB AUTO_INCREMENT=33 DEFAULT CHARSET=utf8;

/*Data for the table `parking` */

insert  into `parking`(`parkingId`,`name`,`address`) values (1,'锦园停车场','莲湖区桃园南路'),(2,'军兴饭店停车场','碑林区草场坡'),(8,'家世界停车场','莲湖区大庆路'),(9,'金鹰酒店停车场','未央区凤城一路'),(10,'联桥招待所','停车场灞桥区酒十路'),(11,'晶众家乐购物广场停车场','碑林区东关南街'),(12,'经贸宾馆停车场','未央区未央路'),(13,'金三角饭店停车场未','86254148'),(14,'大庆停车场（华清东路）','2513308'),(15,'家乐购物广场停车场','未央区玄武路'),(16,'金穗宾馆停车场','碑林区围墙巷'),(17,'建华饭店停车场','碑林区环城南路东段100号'),(18,'金隆小区停车场','莲湖区环城西路'),(19,'陕西中大国际大厦停车场','碑林区南大街'),(20,'明德门地下停车场（友谊西路）','雁塔区友谊西路'),(21,'陕西能源职业技术学院停车场','碑林区含光北路'),(22,'商住大厦停车场','碑林区火炬路'),(23,'陕西省劳动和社会保障局招待所停车场','碑林区建设东路33号'),(24,'陕西省体育场停车场','碑林区长安北路'),(25,'三府湾停车场','新城区华清西路'),(26,'莲湖环卫停车场','雁塔区昆明路'),(27,'明德华园大厦停车场','雁塔区友谊西路'),(28,'陕西丰阳招待所停车场','新城区联志路'),(29,'南方货运停车场-灞桥区米秦路029','86729508'),(30,'庆运总公司招待所停车场','莲湖区沣惠北路'),(31,'德发长酒店停车场','新城区案板路'),(32,'百隆广场停车场','雁塔区小寨东路');

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
) ENGINE=InnoDB AUTO_INCREMENT=123466 DEFAULT CHARSET=utf8;

/*Data for the table `user` */

insert  into `user`(`userId`,`userType`,`name`,`age`,`photo`,`gender`,`birth`,`ID`,`address`,`cellPhone`,`email`,`startDate`,`curVehicle`,`lastRecordTime`,`password`) values (123,'司机','大超市2','123','123','男','123','123','123','123456789','123@qq.com','1169078520000','123',1496237740,'123'),(123458,'guest','asasas',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL),(123459,'g1','testName 1','g3','g4','g5','123',NULL,'g8','g9','g40','11',NULL,123123,NULL),(123460,'g1','testName 2','g3','g4','g5','123',NULL,'g8','g9','g40','11',NULL,123123,NULL),(123462,'51','15','7496','132','1543','156356','586','126','49','456','456','456',456,'156'),(123463,NULL,'而言他','135',NULL,'男','1493645280',NULL,NULL,NULL,NULL,'1494595680',NULL,NULL,NULL),(123464,'司机','对对对','12',NULL,'男','1493731740',NULL,'123','12312','123','1494336540',NULL,NULL,NULL),(123465,'司机','会通过','45',NULL,'男','1494336720',NULL,'231',NULL,NULL,'1493818320',NULL,1496237536,NULL);

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

insert  into `vehicle`(`license`,`route`,`photo`,`model`,`purchasedDate`,`maintenance`,`km`,`lastRecordTime`,`curStat`,`nextStart`,`parkingId`,`curSet`) values ('abcd','routeeee','pho】','9699',0,'一级',1234,1496247163,'出车',14,1,NULL),('bbb','ag','xca','dsf',123123,NULL,NULL,12312,NULL,1231,1,6),('京212312','123',NULL,'SS',NULL,'一级',123,NULL,'出车',NULL,1,NULL),('京A2SSSS','123',NULL,'22',NULL,'新车',123,NULL,'出车',NULL,1,NULL),('京DA1233','1234',NULL,'123',NULL,'一级',222,NULL,'出车',NULL,1,NULL),('沪SDCXCV','routeeee',NULL,'123',1495030560,'一级',23,1496153797,'出车',NULL,1,NULL),('渝212334','routeeee',NULL,'dfg',1495461,'新车',123,1496248173,'出车',NULL,1,NULL);

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;
