/*
 Navicat Premium Data Transfer

 Source Server         : Localhost
 Source Server Type    : MySQL
 Source Server Version : 50717
 Source Host           : localhost
 Source Database       : cAuth

 Target Server Type    : MySQL
 Target Server Version : 50717
 File Encoding         : utf-8

 Date: 08/10/2017 22:22:52 PM
*/

SET NAMES utf8;
SET FOREIGN_KEY_CHECKS = 0;

-- ----------------------------
--  Table structure for `cSessionInfo`
-- ----------------------------
DROP TABLE IF EXISTS `cSessionInfo`;
CREATE TABLE `cSessionInfo` (
  `open_id` varchar(100) COLLATE utf8mb4_unicode_ci NOT NULL,
  `uuid` varchar(100) COLLATE utf8mb4_unicode_ci NOT NULL,
  `skey` varchar(100) COLLATE utf8mb4_unicode_ci NOT NULL,
  `create_time` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `last_visit_time` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `session_key` varchar(100) COLLATE utf8mb4_unicode_ci NOT NULL,
  `user_info` varchar(2048) COLLATE utf8mb4_unicode_ci NOT NULL,
  PRIMARY KEY (`open_id`),
  KEY `openid` (`open_id`) USING BTREE,
  KEY `skey` (`skey`) USING BTREE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci COMMENT='会话管理用户信息';

-- ----------------------------
--  Table structure for `user`
-- ----------------------------
 CREATE TABLE IF NOT EXISTS `user` (
  `openId` varchar(100) COLLATE utf8mb4_unicode_ci NOT NULL,
  `avatarUrl` varchar(300) COLLATE utf8mb4_unicode_ci,
  `city` varchar(100) COLLATE utf8mb4_unicode_ci,
  `country` varchar(100) COLLATE utf8mb4_unicode_ci,
  `gender` int(100) DEFAULT 0 NOT NULL,
  `language` varchar(100) COLLATE utf8mb4_unicode_ci,
  `nickName` varchar(100) COLLATE utf8mb4_unicode_ci,
  `province` varchar(100) COLLATE utf8mb4_unicode_ci,
  `appid` varchar(100) COLLATE utf8mb4_unicode_ci,
  `timestamp` BIGINT(100) DEFAULT 0 NOT NULL,
  `createTimestamp` BIGINT(100) DEFAULT 0 NOT NULL
 ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci COMMENT='微信用户信息';

-- ----------------------------
--  Table structure for `payment`
-- ----------------------------
CREATE TABLE IF NOT EXISTS `payment` (
  `open_id` varchar(100) COLLATE utf8mb4_unicode_ci NOT NULL,
  `app_id` varchar(100) COLLATE utf8mb4_unicode_ci NOT NULL,
  `mch_id` varchar(100) COLLATE utf8mb4_unicode_ci,
  `nonce_str` varchar(100) COLLATE utf8mb4_unicode_ci,
  `body` varchar(100) COLLATE utf8mb4_unicode_ci,
  `detail` varchar(100) COLLATE utf8mb4_unicode_ci,
  `attach` varchar(100) COLLATE utf8mb4_unicode_ci,
  `out_trade_no` varchar(30) COLLATE utf8mb4_unicode_ci,
  `total_fee` varchar(30) COLLATE utf8mb4_unicode_ci,
  `spbill_create_ip` varchar(30) COLLATE utf8mb4_unicode_ci,
  `notify_url` varchar(30) COLLATE utf8mb4_unicode_ci,
  `trade_type` varchar(30) COLLATE utf8mb4_unicode_ci,
  `status` varchar(30) COLLATE utf8mb4_unicode_ci,
  `time_place_order` BIGINT(100) DEFAULT 0 NOT NULL,
  `time_over_order` BIGINT(100) DEFAULT 0 NOT NULL,
  `time_refund_order` BIGINT(100) DEFAULT 0 NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci COMMENT='微信支付订单信息';payment

SET FOREIGN_KEY_CHECKS = 1;
