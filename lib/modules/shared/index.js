'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _controller = require('./controller');

var _controller2 = _interopRequireDefault(_controller);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var prefix = 'shared';

exports.default = function (router) {
  router.post('/' + prefix + '/group', _controller2.default);
  router.post('/' + prefix + '/invited', _controller2.default);
};