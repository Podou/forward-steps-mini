'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _mongoose = require('mongoose');

var _mongoose2 = _interopRequireDefault(_mongoose);

var _contants = require('../../contants.json');

var _contants2 = _interopRequireDefault(_contants);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var mongoConfig = _contants2.default.mongoConfig;

// Connect to MongoDB databse with user & pass
var uri = 'mongodb://' + mongoConfig.username + ':' + mongoConfig.password + '@' + mongoConfig.host + ':' + mongoConfig.port + '/' + mongoConfig.database;
// const mongoConnection = mongoose.createConnection(uri);

exports.default = function () {
  _mongoose2.default.connect(uri);
};