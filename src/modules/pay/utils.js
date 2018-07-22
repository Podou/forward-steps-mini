import uuid from 'uuid/v1';
import moment from 'moment';
import { md5 } from '../../utils/crypto';

const getNonceStr = () => {
  return uuid().replace(/-/g, '').toUpperCase();
};

const getSign = (options = {}, mchKey = '') => {
  const params = [];
  const keys = Object.keys(options).sort();
  for (const key of keys) {
    params.push(`${key}=${options[key]}`);
  }
  const stringA = params.join('&');
  const stringSignTemp = mchKey ? `${stringA}&key=${mchKey}` : mchKey;
  return md5(stringSignTemp).toUpperCase();
};

const getPaymentSign = (options, appId, mchKey = '') => {
  const signOptions = Object.assign({ appId }, options);
  return getSign(signOptions, mchKey);
};

const getOrderId = () => {
  const random = Math.floor(Math.random() * 100000);
  return `${moment().format('YYYYMMDDHHmmssSSS')}${random}`;
};

/**
  <xml>
    <appid>wx2421b1c4370ec43b</appid>
    <attach>支付测试</attach>
    <body>JSAPI支付测试</body>
    <mch_id>10000100</mch_id>
    <detail><![CDATA[{ "goods_detail":[
      { "goods_id":"iphone6s_16G", "wxpay_goods_id":"1001", "goods_name":"iPhone6s 16G",
      "quantity":1, "price":528800, "goods_category":"123456", "body":"苹果手机" },
      { "goods_id":"iphone6s_32G", "wxpay_goods_id":"1002", "goods_name":"iPhone6s 32G",
      "quantity":1, "price":608800, "goods_category":"123789", "body":"苹果手机" } ] }]]></detail>
    <nonce_str>1add1a30ac87aa2db72f57a2375d8fec</nonce_str>
    <notify_url>http://wxpay.wxutil.com/pub_v2/pay/notify.v2.php</notify_url>
    <openid>oUpF8uMuAJO_M2pxb1Q9zNjWeS6o</openid>
    <out_trade_no>1415659990</out_trade_no>
    <spbill_create_ip>14.23.150.211</spbill_create_ip>
    <total_fee>1</total_fee>
    <trade_type>JSAPI</trade_type>
    <sign>0CB01533B8C1EF103065174F50BCA001</sign>
  </xml>
*/
const getOrderPayload = (options = {}) => {
  let content = `<appid>${options.appid}</appid>`;
  if (options.attach) {
    content += `<attach>${options.attach}</attach>`;
  }
  content += `<body>${options.body}</body>`;
  content += `<mch_id>${options.mch_id}</mch_id>`;
  if (options.detail) {
    content += `<detail>${options.detail}</detail>`;
  }
  content += `<nonce_str>${options.nonce_str}</nonce_str>`;
  content += `<notify_url>${options.notify_url}</notify_url>`;
  content += `<openid>${options.openid}</openid>`;
  content += `<out_trade_no>${options.out_trade_no}</out_trade_no>`;
  content += `<spbill_create_ip>${options.spbill_create_ip}</spbill_create_ip>`;
  content += `<total_fee>${options.total_fee}</total_fee>`;
  content += `<trade_type>${options.trade_type}</trade_type>`;
  content += `<sign>${options.sign}</sign>`;
  return `<xml>${content}</xml>`;
};

export { getNonceStr, getSign, getPaymentSign, getOrderPayload, getOrderId };
