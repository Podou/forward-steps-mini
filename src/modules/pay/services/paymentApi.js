import xml2js from 'xml2js';

import * as payUtils from '../utils';
import * as httpsUtils from '../../../utils/httpsUtils';
import config from '../../../../config';

const getPaymentPayload = (options) => {
  const paymentOptions = {
    timeStamp: String(new Date().getTime()),
    nonceStr: payUtils.getNonceStr(),
    package: `prepay_id=${options.prepay_id}`,
    signType: 'MD5',
  };
  const sign = payUtils.getPaymentSign(
    paymentOptions,
    config.appId,
    config.mchKey,
  );
  paymentOptions.paySign = sign;
  return paymentOptions;
};

const getPlaceOrderOptions = (openId) => {
  const options = {
    appid: config.appId,
    mch_id: config.mchId,
    nonce_str: payUtils.getNonceStr(),
    body: '天才口算-道具',
    detail: '天才口算小道具',
    attach: '天才口算',
    out_trade_no: payUtils.getOrderId(),
    total_fee: 1,
    spbill_create_ip: '192.168.105.99',
    notify_url: 'https://mini.duastone.com/webapp/pay/notify',
    trade_type: 'JSAPI',
    openid: openId,
  };
  const sign = payUtils.getSign(options, config.mchKey);
  options.sign = sign;
  return options;
};

const placeOrder = async (options) => {
  const requestUrl = 'https://api.mch.weixin.qq.com/pay/unifiedorder';
  const payload = payUtils.getOrderPayload(options);
  try {
    const res = await httpsUtils.post(requestUrl, payload);
    const parser = new xml2js.Parser({ explicitArray: false });
    return new Promise((resolve, reject) => {
      parser.parseString(res, (err, result) => {
        if (err) {
          reject(err);
        } else if (result && result.xml) {
          // resolve(getPaymentPayload(result.xml));
          resolve(result.xml);
        }
      });
    });
  } catch (err) {
    console.log('ssssss');
    console.error(err);
  }
  return payload;
};

const handleNotify = () => {};

export { placeOrder, getPlaceOrderOptions, getPaymentPayload, handleNotify };
