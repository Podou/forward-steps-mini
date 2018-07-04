'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _assign = require('babel-runtime/core-js/object/assign');

var _assign2 = _interopRequireDefault(_assign);

var _fs = require('fs');

var _fs2 = _interopRequireDefault(_fs);

var _waferNodeSdk = require('wafer-node-sdk');

var _waferNodeSdk2 = _interopRequireDefault(_waferNodeSdk);

var _config = require('../config');

var _config2 = _interopRequireDefault(_config);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// 获取 sdk.config
var sdkConfig = function () {
  var sdkConfigPath = '/data/release/sdk.config.json';

  // 检查文件是否存在
  try {
    var stats = _fs2.default.statSync(sdkConfigPath);
    if (!stats.isFile()) {
      console.log('sdk.config.json 不存在，将使用 config.js 中的配置');
      return {};
    }
  } catch (e) {
    return _config2.default;
  }
  // 返回配置信息
  try {
    var content = _fs2.default.readFileSync(sdkConfigPath, 'utf8');
    return JSON.parse(content);
  } catch (e) {
    // 如果配置读取错误或者 JSON 解析错误，则输出空配置项
    console.log('sdk.config.json 解析错误，不是 JSON 字符串');
    return _config2.default;
  }
}();

// 初始化 SDK
// 将基础配置和 sdk.config 合并传入 SDK 并导出初始化完成的 SDK


// 获取基础配置
exports.default = (0, _waferNodeSdk2.default)((0, _assign2.default)({}, sdkConfig, _config2.default));