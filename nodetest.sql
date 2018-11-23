/*
 Navicat Premium Data Transfer

 Source Server         : devtest
 Source Server Type    : MySQL
 Source Server Version : 80013
 Source Host           : localhost:3306
 Source Schema         : nodetest

 Target Server Type    : MySQL
 Target Server Version : 80013
 File Encoding         : 65001

 Date: 23/11/2018 16:30:23
*/

SET NAMES utf8mb4;
SET FOREIGN_KEY_CHECKS = 0;

-- ----------------------------
-- Table structure for socketinfo
-- ----------------------------
DROP TABLE IF EXISTS `socketinfo`;
CREATE TABLE `socketinfo`  (
  `userId` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `socketId` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `status` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  PRIMARY KEY (`userId`) USING BTREE
) ENGINE = InnoDB CHARACTER SET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of socketinfo
-- ----------------------------
INSERT INTO `socketinfo` VALUES ('5150510110', 'XigAvuA1kypbfpyBAAAB', 'offline');
INSERT INTO `socketinfo` VALUES ('5150510115', '9V3OHC27HVwK4QEAAAAA', 'a');
INSERT INTO `socketinfo` VALUES ('5150510116', 'ItvWWZMEVFN4ZiOQAAAD', 'online');

-- ----------------------------
-- Table structure for studentinfo
-- ----------------------------
DROP TABLE IF EXISTS `studentinfo`;
CREATE TABLE `studentinfo`  (
  `name` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `studentId` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `idCard` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `sex` varchar(20) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `password` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `tel` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `bloodType` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `allergy` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `otherInfo` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  PRIMARY KEY (`studentId`) USING BTREE
) ENGINE = InnoDB CHARACTER SET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of studentinfo
-- ----------------------------
INSERT INTO `studentinfo` VALUES ('Alex', '5150510110', '330821199703104213', '男', '123456', '15869106432', 'A', '暂无过敏', '暂无');
INSERT INTO `studentinfo` VALUES ('Alex', '5150510111', '330821199703104213', '男', '123456', '15869106432', 'D', '暂无过敏', '暂无');
INSERT INTO `studentinfo` VALUES ('Alex', '5150510113', '330821199703104213', '男', '123456', '15869106432', 'C', '暂无过敏', '暂无');
INSERT INTO `studentinfo` VALUES ('Alex', '5150510114', '330821199703104213', '男', '123456', '15869106432', 'B', '暂无过敏', '暂无');
INSERT INTO `studentinfo` VALUES ('Alexia', '5150510115', '330821199703104213', '男', '123456', '15869106432', 'A', '暂无过敏', '暂无');
INSERT INTO `studentinfo` VALUES ('Alex', '5150510116', '330821199703104213', '男', '123456', '15869106432', 'B', '暂无过敏', '暂无');

SET FOREIGN_KEY_CHECKS = 1;
