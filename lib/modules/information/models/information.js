'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _mongoose = require('mongoose');

var _mongoose2 = _interopRequireDefault(_mongoose);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var InformationSchema = new _mongoose.Schema({
  openId: String,
  username: String,
  message: String,
  createTime: Number,
  updateTime: Number
});

exports.default = _mongoose2.default.model('Information', InformationSchema, 'information');