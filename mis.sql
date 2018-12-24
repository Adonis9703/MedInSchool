/*
 Navicat Premium Data Transfer

 Source Server         : devtest
 Source Server Type    : MySQL
 Source Server Version : 80013
 Source Host           : localhost:3306
 Source Schema         : mis

 Target Server Type    : MySQL
 Target Server Version : 80013
 File Encoding         : 65001

 Date: 24/12/2018 17:34:28
*/

SET NAMES utf8mb4;
SET FOREIGN_KEY_CHECKS = 0;

-- ----------------------------
-- Table structure for chatinfo
-- ----------------------------
DROP TABLE IF EXISTS `chatinfo`;
CREATE TABLE `chatinfo`  (
  `chatId` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL COMMENT '问诊Id',
  `doctorId` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL COMMENT '医生id',
  `patientId` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL COMMENT '患者id',
  `chatStatus` int(2) NULL DEFAULT NULL COMMENT '问诊状态 0待接诊 1问诊中 2已完成',
  `complain` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL DEFAULT NULL COMMENT '患者主诉',
  `diagnosis` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL DEFAULT NULL COMMENT '医生诊断',
  `chatTime` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL DEFAULT NULL COMMENT '问诊发起时间',
  `rpId` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL DEFAULT NULL COMMENT '处方id',
  `complainImgs` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL DEFAULT NULL COMMENT '主诉图片',
  PRIMARY KEY (`chatId`) USING BTREE
) ENGINE = InnoDB CHARACTER SET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of chatinfo
-- ----------------------------
INSERT INTO `chatinfo` VALUES ('20181224113501160000', '10000000', '5150510116', 0, '脑壳不疼', NULL, '2018-12-24', NULL, NULL);
INSERT INTO `chatinfo` VALUES ('20181224113501160001', '1234', '5678', NULL, '脑壳不疼', NULL, NULL, NULL, NULL);

-- ----------------------------
-- Table structure for medicine
-- ----------------------------
DROP TABLE IF EXISTS `medicine`;
CREATE TABLE `medicine`  (
  `id` int(255) NOT NULL AUTO_INCREMENT,
  `name` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL DEFAULT NULL,
  `amount` int(255) NULL DEFAULT NULL,
  `amountUnit` varchar(20) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL DEFAULT NULL,
  `price` float(255, 0) NULL DEFAULT NULL,
  `editTime` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL DEFAULT NULL,
  `editPerson` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL DEFAULT NULL,
  `dosage` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL DEFAULT NULL,
  `dosageUnit` varchar(20) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL DEFAULT NULL,
  `method` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL DEFAULT NULL,
  `timeState` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL DEFAULT NULL,
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB CHARACTER SET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of medicine
-- ----------------------------
INSERT INTO `medicine` VALUES (1, '测试药品', 20, '盒', 12, '2018-12-25-4 11:35', '测试医师', '30', '毫克', '口服', '一天三次');
INSERT INTO `medicine` VALUES (2, '记忆面包', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL);

-- ----------------------------
-- Table structure for msghistory
-- ----------------------------
DROP TABLE IF EXISTS `msghistory`;
CREATE TABLE `msghistory`  (
  `chatId` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL COMMENT '问诊唯一id chatId',
  `msgText` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL DEFAULT NULL COMMENT '聊天文字信息',
  `senderType` int(2) NULL DEFAULT NULL COMMENT '发送者类型0患者 1医生',
  `msgTime` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL DEFAULT NULL COMMENT '消息时间',
  `msgImgs` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL DEFAULT NULL COMMENT '聊天图片信息',
  `senderId` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL COMMENT '发送者id',
  `receiverId` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL COMMENT '接收者id',
  `id` int(255) NOT NULL AUTO_INCREMENT,
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB CHARACTER SET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of msghistory
-- ----------------------------
INSERT INTO `msghistory` VALUES ('20181224113501160000', '你好', 1, '2018-12-24', NULL, '5150510116', '123123123', 1);
INSERT INTO `msghistory` VALUES ('20181224113501160000', '测试', 0, NULL, NULL, '5150510116', '10000000', 2);

-- ----------------------------
-- Table structure for rpinfo
-- ----------------------------
DROP TABLE IF EXISTS `rpinfo`;
CREATE TABLE `rpinfo`  (
  `rpId` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL COMMENT '处方id',
  `chatId` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL COMMENT '问诊id',
  `medicines` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL DEFAULT NULL COMMENT '拼接的药品信息',
  `chatPrice` float(10, 2) NULL DEFAULT NULL COMMENT '问诊费用',
  `medPrice` float(10, 2) NULL DEFAULT NULL COMMENT '药品费用',
  `otherPrice` float(10, 2) NULL DEFAULT NULL COMMENT '其他费用',
  PRIMARY KEY (`rpId`) USING BTREE
) ENGINE = InnoDB CHARACTER SET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of rpinfo
-- ----------------------------
INSERT INTO `rpinfo` VALUES ('1', '20181224113501160000', NULL, 1.00, 23.00, 1.00);
INSERT INTO `rpinfo` VALUES ('2', '123456', '正天丸一天三次', NULL, NULL, NULL);

-- ----------------------------
-- Table structure for socketinfo
-- ----------------------------
DROP TABLE IF EXISTS `socketinfo`;
CREATE TABLE `socketinfo`  (
  `userId` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL COMMENT '用户id',
  `socketId` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL DEFAULT NULL COMMENT 'socket id',
  PRIMARY KEY (`userId`) USING BTREE
) ENGINE = InnoDB CHARACTER SET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Table structure for userinfo
-- ----------------------------
DROP TABLE IF EXISTS `userinfo`;
CREATE TABLE `userinfo`  (
  `userId` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL COMMENT '学号或者工号',
  `name` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL DEFAULT NULL COMMENT '用户姓名',
  `sex` varchar(10) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL DEFAULT NULL COMMENT '用户性别',
  `tel` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL DEFAULT NULL COMMENT '用户手机号',
  `bloodType` varchar(10) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL DEFAULT NULL COMMENT '血型',
  `allergy` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL DEFAULT NULL COMMENT '过敏信息',
  `other` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL DEFAULT NULL COMMENT '备注信息',
  `age` int(5) NULL DEFAULT NULL COMMENT '年龄',
  `title` varchar(10) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL DEFAULT NULL COMMENT '医生职称',
  `department` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL DEFAULT NULL COMMENT '医生科室',
  `password` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL COMMENT '用户密码',
  `userType` int(2) NULL DEFAULT NULL COMMENT '用户类型 0患者 1医生',
  PRIMARY KEY (`userId`) USING BTREE
) ENGINE = InnoDB CHARACTER SET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of userinfo
-- ----------------------------
INSERT INTO `userinfo` VALUES ('10000000', '测试医生', '男', '15869106432', NULL, NULL, NULL, NULL, '医师', '全科', '123456', 1);
INSERT INTO `userinfo` VALUES ('12522101333', '新增', '男', '131313131313', NULL, NULL, NULL, NULL, NULL, NULL, '123456789', NULL);
INSERT INTO `userinfo` VALUES ('12522104233', '新增', '男', '131313131313', NULL, NULL, NULL, NULL, NULL, NULL, '123456789', NULL);
INSERT INTO `userinfo` VALUES ('12522104433', '新增', '男', '131313131313', NULL, NULL, NULL, NULL, NULL, NULL, '123456789', NULL);
INSERT INTO `userinfo` VALUES ('12532101333', '新增', '男', '131313131313', NULL, NULL, NULL, NULL, NULL, NULL, '123456789', NULL);
INSERT INTO `userinfo` VALUES ('5150510111', '新增', '男', '131313131313', NULL, NULL, NULL, NULL, NULL, NULL, '123456789', NULL);
INSERT INTO `userinfo` VALUES ('5150510116', 'Alex', '男', '15869106432', 'A', '傻子过敏', '备注测试', 21, NULL, NULL, '123456', 0);
INSERT INTO `userinfo` VALUES ('5150510117', 'Alex', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '1234567', NULL);
INSERT INTO `userinfo` VALUES ('5150510118', '新增', '男', '131313131313', NULL, NULL, NULL, NULL, NULL, NULL, '123456789', NULL);
INSERT INTO `userinfo` VALUES ('51505101211', '新增', '男', '131313131313', NULL, NULL, NULL, NULL, NULL, NULL, '123456789', NULL);
INSERT INTO `userinfo` VALUES ('51505101232', '新增', '男', '131313131313', NULL, NULL, NULL, NULL, NULL, NULL, '123456789', NULL);
INSERT INTO `userinfo` VALUES ('51505101333', '新增', '男', '131313131313', NULL, NULL, NULL, NULL, NULL, NULL, '123456789', NULL);
INSERT INTO `userinfo` VALUES ('51532101333', '新增', '男', '131313131313', NULL, NULL, NULL, NULL, NULL, NULL, '123456789', NULL);

SET FOREIGN_KEY_CHECKS = 1;
