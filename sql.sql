/*
SQLyog v10.2 
MySQL - 5.5.19 : Database - bryning
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
  `license` varchar(20) DEFAULT NULL,
  PRIMARY KEY (`logId`)
) ENGINE=InnoDB AUTO_INCREMENT=34 DEFAULT CHARSET=utf8;

/*Data for the table `log` */

insert  into `log`(`logId`,`type`,`user`,`time`,`remark`,`content`,`sets`,`parking`,`license`) values (1,'登录','asdf',1495106540,'舍得坊','是打发色粉',NULL,NULL,NULL),(2,'出车',NULL,1496144808,NULL,'出车',NULL,NULL,NULL),(3,'停车',NULL,1496145324,NULL,'停车',NULL,NULL,NULL),(6,'移车',NULL,1496147164,NULL,'移动车辆','aa','锦园停车场','京212312'),(7,'出车',NULL,1496248173,NULL,'出车',NULL,'锦园停车场','bbb'),(8,'登录','大超市2',1496276830,NULL,'用户登录',NULL,NULL,NULL),(9,'移车',NULL,1496278394,NULL,'移动车辆','pbkjs','锦园停车场','bbb'),(10,'移车',NULL,1496281735,NULL,'移动车辆','aa','锦园停车场','京212312'),(11,'移车',NULL,1496281754,NULL,'移动车辆','aa','锦园停车场','bbb'),(12,'移车',NULL,1496281754,NULL,'移动车辆','pbkjs','锦园停车场','京212312'),(13,'移车',NULL,1499281754,NULL,'移动车辆','aa','锦园停车场','bbb'),(14,'登录','大超市2',1496317865,NULL,'用户登录',NULL,NULL,NULL),(15,'停车',NULL,1496333857,NULL,'停车',NULL,'锦园停车场','abcd'),(16,'停车',NULL,1496333860,NULL,'停车',NULL,'锦园停车场','渝212334'),(17,'出车',NULL,1496333866,NULL,'出车',NULL,'锦园停车场','abcd'),(18,'出车',NULL,1496333867,NULL,'出车',NULL,'锦园停车场','渝212334'),(19,'停车',NULL,1496333875,NULL,'停车',NULL,'锦园停车场','abcd'),(20,'停车',NULL,1496333878,NULL,'停车',NULL,'锦园停车场','渝212334'),(21,'移车',NULL,1496334127,NULL,'移动车辆','3F','锦园停车场','沪SDCXCV'),(22,'移车',NULL,1496334137,NULL,'移动车辆','3F','锦园停车场','渝212334'),(23,'移车',NULL,1496334150,NULL,'移动车辆','3F','锦园停车场','京A2SSSS'),(24,'移车',NULL,1496337083,NULL,'移动车辆','3F','锦园停车场','渝212334'),(25,'移车',NULL,1496337087,NULL,'移动车辆','pbkjs','锦园停车场','bbb'),(26,'移车',NULL,1496337088,NULL,'移动车辆','aa','锦园停车场','京212312'),(27,'移车',NULL,1496337093,NULL,'移动车辆','aa','锦园停车场','abcd'),(28,'移车',NULL,1496337614,NULL,'移动车辆','vv','锦园停车场','渝212334'),(29,'移车',NULL,1496337614,NULL,'移动车辆','3F','锦园停车场','bbb'),(30,'移车',NULL,1496337615,NULL,'移动车辆','pbkjs','锦园停车场','abcd'),(31,'移车',NULL,1496337615,NULL,'移动车辆','aa','锦园停车场','沪SDCXCV'),(32,'登录','大超市2',1496337837,NULL,'用户登录',NULL,NULL,NULL),(33,'登录','大超市2',1496375820,NULL,'用户登录',NULL,NULL,NULL);

/*Table structure for table `parking` */

DROP TABLE IF EXISTS `parking`;

CREATE TABLE `parking` (
  `parkingId` int(20) NOT NULL AUTO_INCREMENT,
  `name` varchar(20) DEFAULT NULL,
  `address` varchar(20) DEFAULT NULL,
  PRIMARY KEY (`parkingId`)
) ENGINE=InnoDB AUTO_INCREMENT=33 DEFAULT CHARSET=utf8;

/*Data for the table `parking` */

insert  into `parking`(`parkingId`,`name`,`address`) values (1,'锦园停车场','莲湖区桃园南路'),(2,'军兴饭店停车场','碑林区草场坡'),(8,'家世界停车场','莲湖区大庆路'),(9,'金鹰酒店停车场','未央区凤城一路'),(10,'联桥招待所','停车场灞桥区酒十路'),(11,'晶众家乐购物广场停车场','碑林区东关南街'),(12,'经贸宾馆停车场','未央区未央路'),(13,'金三角饭店停车场未','86254148'),(14,'大庆停车场（华清东路）','2513308'),(15,'家乐购物广场停车场','未央区玄武路'),(16,'金穗宾馆停车场','碑林区围墙巷'),(17,'建华饭店停车场','碑林区环城南路东段100号'),(18,'金隆小区停车场','莲湖区环城西路'),(19,'陕西中大国际大厦停车场','碑林区南大街'),(20,'明德门地下停车场（友谊西路）','雁塔区友谊西路'),(21,'陕西能源职业技术学院停车场','碑林区含光北路'),(22,'商住大厦停车场','碑林区火炬路'),(23,'陕西省劳动和社会保障局招待所停车场','碑林区建设东路33号'),(24,'陕西省体育场停车场','碑林区长安北路'),(25,'三府湾停车场','新城区华清西路'),(26,'莲湖环卫停车场','雁塔区昆明路'),(27,'明德华园大厦停车场','雁塔区友谊西路'),(28,'陕西丰阳招待所停车场','新城区联志路'),(29,'南方货运停车场','灞桥区米秦路029-86729508'),(30,'庆运总公司招待所停车场','莲湖区沣惠北路'),(31,'德发长酒店停车场','新城区案板路'),(32,'百隆广场停车场','雁塔区小寨东路');

/*Table structure for table `parkingset` */

DROP TABLE IF EXISTS `parkingset`;

CREATE TABLE `parkingset` (
  `name` varchar(20) NOT NULL,
  `parkingId` varchar(20) NOT NULL,
  `available` varchar(20) DEFAULT NULL,
  `curVehicle` varchar(20) DEFAULT NULL,
  `lastRecordTime` int(20) DEFAULT NULL,
  `setId` int(20) NOT NULL AUTO_INCREMENT,
  `weight` int(20) DEFAULT NULL,
  PRIMARY KEY (`setId`)
) ENGINE=InnoDB AUTO_INCREMENT=8 DEFAULT CHARSET=utf8;

/*Data for the table `parkingset` */

insert  into `parkingset`(`name`,`parkingId`,`available`,`curVehicle`,`lastRecordTime`,`setId`,`weight`) values ('aa','1','true','沪SDCXCV',15345345,3,NULL),('pbkjs','1','true','abcd',1496148770,4,NULL),('3F','1','true','bbb',1496148930,6,NULL),('vv','1','true','渝212334',1496337609,7,NULL);

/*Table structure for table `scenedata` */

DROP TABLE IF EXISTS `scenedata`;

CREATE TABLE `scenedata` (
  `parkingId` int(20) NOT NULL,
  `data` varchar(5000) DEFAULT NULL,
  PRIMARY KEY (`parkingId`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

/*Data for the table `scenedata` */

insert  into `scenedata`(`parkingId`,`data`) values (1,'123');

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
) ENGINE=InnoDB AUTO_INCREMENT=123499 DEFAULT CHARSET=utf8;

/*Data for the table `user` */

insert  into `user`(`userId`,`userType`,`name`,`age`,`photo`,`gender`,`birth`,`ID`,`address`,`cellPhone`,`email`,`startDate`,`curVehicle`,`lastRecordTime`,`password`) values (123,'司机','大超市2','123','123','男','123','123','123','123456789','123@qq.com','1169078520000','123',1496237740,'123'),(123458,'guest','asasas',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL),(123459,'g1','testName 1','g3','g4','g5','123',NULL,'g8','g9','g40','11',NULL,123123,NULL),(123460,'g1','testName 2','g3','g4','g5','123',NULL,'g8','g9','g40','11',NULL,123123,NULL),(123462,'51','15','7496','132','1543','156356','586','126','49','456','456','456',456,'156'),(123463,NULL,'而言他','135',NULL,'男','1493645280',NULL,NULL,NULL,NULL,'1494595680',NULL,NULL,NULL),(123464,'司机','对对对','12',NULL,'男','1493731740',NULL,'123','12312','123888','1494336540',NULL,NULL,NULL),(123465,'司机','会通过','45',NULL,'男','1494336720',NULL,'231',NULL,NULL,'1493818320',NULL,1496237536,NULL),(123466,'管理员','阿里','12',NULL,'男','794764800','3215431','sadf','4851354','51@qq.com','794764800',NULL,NULL,NULL),(123467,'管理员','x','13',NULL,'男','794851200','3215432','sadf','4851355','52@qq.com','794851200',NULL,NULL,NULL),(123468,'管理员','1','14',NULL,'男','794937600','3215433','sadf','4851356','53@qq.com','794937600',NULL,NULL,NULL),(123469,'管理员','asdf','15',NULL,'男','795024000','3215434','sadf','4851357','54@qq.com','795024000',NULL,NULL,NULL),(123470,'管理员','zdxvf','16',NULL,'男','795110400','3215435','sadf','4851358','55@qq.com','795110400',NULL,NULL,NULL),(123471,'管理员','sadf','17',NULL,'男','795196800','3215436','sadf','4851359','56@qq.com','795196800',NULL,NULL,NULL),(123472,'管理员','cxv','18',NULL,'男','795283200','3215437','sadf','4851360','57@qq.com','795283200',NULL,NULL,NULL),(123473,'管理员','asdf','19',NULL,'男','795369600','3215438','sadf','4851361','58@qq.com','795369600',NULL,NULL,NULL),(123474,'管理员','asdfv','20',NULL,'男','795456000','3215439','sadf','4851362','59@qq.com','795456000',NULL,NULL,NULL),(123475,'管理员','aaa1','21',NULL,'男','795542400','3215440','sadf','4851363','60@qq.com','795542400',NULL,NULL,NULL),(123476,'管理员','aaa2','22',NULL,'男','795628800','3215441','sadf','4851364','61@qq.com','795628800',NULL,NULL,NULL),(123477,'管理员','aaa3','23',NULL,'男','795715200','3215442','sadf','4851365','62@qq.com','795715200',NULL,NULL,NULL),(123478,'管理员','aaa4','24',NULL,'男','795801600','3215443','sadf','4851366','63@qq.com','795801600',NULL,NULL,NULL),(123479,'管理员','aaa5','25',NULL,'男','795888000','3215444','sadf','4851367','64@qq.com','795888000',NULL,NULL,NULL),(123480,'管理员','aaa6','26',NULL,'男','795974400','3215445','sadf','4851368','65@qq.com','795974400',NULL,NULL,NULL),(123481,'管理员','aaa7','27',NULL,'男','796060800','3215446','sadf','4851369','66@qq.com','796060800',NULL,NULL,NULL),(123482,'管理员','aaa8','28',NULL,'男','796147200','3215447','sadf','4851370','67@qq.com','796147200',NULL,NULL,NULL),(123483,'管理员','aaa9','29',NULL,'男','796233600','3215448','sadf','4851371','68@qq.com','796233600',NULL,NULL,NULL),(123484,'管理员','aaa10','30',NULL,'男','796320000','3215449','sadf','4851372','69@qq.com','796320000',NULL,NULL,NULL),(123485,'管理员','aaa11','31',NULL,'男','796406400','3215450','sadf','4851373','70@qq.com','796406400',NULL,NULL,NULL),(123486,'管理员','aaa12','32',NULL,'男','796492800','3215451','sadf','4851374','71@qq.com','796492800',NULL,NULL,NULL),(123487,'管理员','aaa13','33',NULL,'男','796579200','3215452','sadf','4851375','72@qq.com','796579200',NULL,NULL,NULL),(123488,'管理员','aaa14','34',NULL,'男','796665600','3215453','sadf','4851376','73@qq.com','796665600',NULL,NULL,NULL),(123489,'管理员','aaa15','35',NULL,'男','796752000','3215454','sadf','4851377','74@qq.com','796752000',NULL,NULL,NULL),(123490,'管理员','aaa16','36',NULL,'男','796838400','3215455','sadf','4851378','75@qq.com','796838400',NULL,NULL,NULL),(123491,'管理员','aaa17','37',NULL,'男','796924800','3215456','sadf','4851379','76@qq.com','796924800',NULL,NULL,NULL),(123492,'管理员','aaa18','38',NULL,'男','797011200','3215457','sadf','4851380','77@qq.com','797011200',NULL,NULL,NULL),(123493,'管理员','aaa19','39',NULL,'男','797097600','3215458','sadf','4851381','78@qq.com','797097600',NULL,NULL,NULL),(123494,'管理员','aaa20','40',NULL,'男','797184000','3215459','sadf','4851382','79@qq.com','797184000',NULL,NULL,NULL),(123495,'管理员','aaa21','41',NULL,'男','797270400','3215460','sadf','4851383','80@qq.com','797270400',NULL,NULL,NULL),(123496,'管理员','aaa22','42',NULL,'男','797356800','3215461','sadf','4851384','81@qq.com','797356800',NULL,NULL,NULL),(123497,'管理员','aaa23','43',NULL,'男','797443200','3215462','sadf','4851385','82@qq.com','797443200',NULL,NULL,NULL),(123498,'管理员','aaa24','44',NULL,'男','797529600','3215463','sadf','4851386','83@qq.com','797529600',NULL,NULL,NULL);

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

insert  into `vehicle`(`license`,`route`,`photo`,`model`,`purchasedDate`,`maintenance`,`km`,`lastRecordTime`,`curStat`,`nextStart`,`parkingId`,`curSet`) values ('abcd','routeeee','pho】','9699',0,'一级',1234,1496333875,'停车',14,1,4),('bbb','ag','xca','dsf',123123,NULL,NULL,12312,NULL,1231,1,6),('京212312','123',NULL,'SS',NULL,'一级',123,NULL,'出车',NULL,1,NULL),('京A2SSSS','123',NULL,'22',NULL,'新车',123,NULL,'出车',NULL,1,NULL),('京DA1233','1234',NULL,'123',NULL,'一级',222,NULL,'出车',NULL,1,NULL),('沪SDCXCV','routeeee',NULL,'123',1495030560,'一级',23,1496153797,'出车',NULL,1,3),('渝212334','routeeee',NULL,'dfg',1,'新车',123,1496333878,'停车',NULL,1,7);

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;
