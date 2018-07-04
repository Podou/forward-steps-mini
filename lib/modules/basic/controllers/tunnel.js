'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _regenerator = require('babel-runtime/regenerator');

var _regenerator2 = _interopRequireDefault(_regenerator);

var _asyncToGenerator2 = require('babel-runtime/helpers/asyncToGenerator');

var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);

var _debug = require('debug');

var _debug2 = _interopRequireDefault(_debug);

var _qcloud = require('../../../qcloud');

var _qcloud2 = _interopRequireDefault(_qcloud);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var tunnel = _qcloud2.default.tunnel;

var debug = (0, _debug2.default)('koa-weapp-demo');
/**
 * 这里实现一个简单的聊天室
 * userMap 为 tunnelId 和 用户信息的映射
 * 实际使用请使用数据库存储
 */
var userMap = {};

// 保存 当前已连接的 WebSocket 信道ID列表
var connectedTunnelIds = [];

/**
 * 调用 tunnel.broadcast() 进行广播
 * @param  {String} type  消息类型
 * @param  {String} content 消息内容
 */
var $broadcast = function $broadcast(type, content) {
  tunnel.broadcast(connectedTunnelIds, type, content).then(function (result) {
    var invalidTunnelIds = result.data && result.data.invalidTunnelIds || [];

    if (invalidTunnelIds.length) {
      console.log('检测到无效的信道 IDs =>', invalidTunnelIds);

      // 从 userMap 和 connectedTunnelIds 中将无效的信道记录移除
      invalidTunnelIds.forEach(function (tunnelId) {
        delete userMap[tunnelId];

        var index = connectedTunnelIds.indexOf(tunnelId);
        if (~index) {
          connectedTunnelIds.splice(index, 1);
        }
      });
    }
  });
};

/**
 * 调用 TunnelService.closeTunnel() 关闭信道
 * @param  {String} tunnelId 信道ID
 */
var $close = function $close(tunnelId) {
  tunnel.closeTunnel(tunnelId);
};

/**
 * 实现 onConnect 方法
 * 在客户端成功连接 WebSocket 信道服务之后会调用该方法，
 * 此时通知所有其它在线的用户当前总人数以及刚加入的用户是谁
 */
var onConnect = function onConnect(tunnelId) {
  console.log('[onConnect] =>', { tunnelId: tunnelId });

  if (tunnelId in userMap) {
    connectedTunnelIds.push(tunnelId);

    $broadcast('people', {
      total: connectedTunnelIds.length,
      enter: userMap[tunnelId]
    });
  } else {
    console.log('Unknown tunnelId(' + tunnelId + ') was connectd, close it');
    $close(tunnelId);
  }
};

/**
 * 实现 onMessage 方法
 * 客户端推送消息到 WebSocket 信道服务器上后，会调用该方法，此时可以处理信道的消息。
 * 在本示例，我们处理 `speak` 类型的消息，该消息表示有用户发言。
 * 我们把这个发言的信息广播到所有在线的 WebSocket 信道上
 */
var onMessage = function onMessage(tunnelId, type, content) {
  console.log('[onMessage] =>', { tunnelId: tunnelId, type: type, content: content });

  switch (type) {
    case 'speak':
      if (tunnelId in userMap) {
        $broadcast('speak', {
          who: userMap[tunnelId],
          word: content.word
        });
      } else {
        $close(tunnelId);
      }
      break;

    default:
      break;
  }
};

/**
 * 实现 onClose 方法
 * 客户端关闭 WebSocket 信道或者被信道服务器判断为已断开后，
 * 会调用该方法，此时可以进行清理及通知操作
 */
var onClose = function onClose(tunnelId) {
  console.log('[onClose] =>', { tunnelId: tunnelId });

  if (!(tunnelId in userMap)) {
    console.log('[onClose][Invalid TunnelId]=>', tunnelId);
    $close(tunnelId);
    return;
  }

  var leaveUser = userMap[tunnelId];
  delete userMap[tunnelId];

  var index = connectedTunnelIds.indexOf(tunnelId);
  if (~index) {
    connectedTunnelIds.splice(index, 1);
  }

  // 聊天室没有人了（即无信道ID）不再需要广播消息
  if (connectedTunnelIds.length > 0) {
    $broadcast('people', {
      total: connectedTunnelIds.length,
      leave: leaveUser
    });
  }
};

exports.default = {
  // 小程序请求 websocket 地址
  get: function () {
    var _ref = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee(ctx) {
      var data, tunnelInfo;
      return _regenerator2.default.wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              _context.next = 2;
              return tunnel.getTunnelUrl(ctx.req);

            case 2:
              data = _context.sent;
              tunnelInfo = data.tunnel;


              userMap[tunnelInfo.tunnelId] = data.userinfo;

              ctx.state.data = tunnelInfo;

            case 6:
            case 'end':
              return _context.stop();
          }
        }
      }, _callee, undefined);
    }));

    return function get(_x) {
      return _ref.apply(this, arguments);
    };
  }(),

  // 信道将信息传输过来的时候
  post: function () {
    var _ref2 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee2(ctx) {
      var packet;
      return _regenerator2.default.wrap(function _callee2$(_context2) {
        while (1) {
          switch (_context2.prev = _context2.next) {
            case 0:
              _context2.next = 2;
              return tunnel.onTunnelMessage(ctx.request.body);

            case 2:
              packet = _context2.sent;


              debug('Tunnel recive a package: %o', packet);

              _context2.t0 = packet.type;
              _context2.next = _context2.t0 === 'connect' ? 7 : _context2.t0 === 'message' ? 9 : _context2.t0 === 'close' ? 11 : 13;
              break;

            case 7:
              onConnect(packet.tunnelId);
              return _context2.abrupt('break', 14);

            case 9:
              onMessage(packet.tunnelId, packet.content.messageType, packet.content.messageContent);
              return _context2.abrupt('break', 14);

            case 11:
              onClose(packet.tunnelId);
              return _context2.abrupt('break', 14);

            case 13:
              return _context2.abrupt('break', 14);

            case 14:
            case 'end':
              return _context2.stop();
          }
        }
      }, _callee2, undefined);
    }));

    return function post(_x2) {
      return _ref2.apply(this, arguments);
    };
  }()
};