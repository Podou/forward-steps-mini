import * as paymentApi from './paymentApi';
import qcloud from '../../../qcloud';

/**
 * 订单和数据的相关处理
 */

const { mysql } = qcloud;
const STATUS_WAITING_PAY = 'STATUS_WAITING_PAY';
const STATUS_PLACE_FAIL = 'STATUS_PLACE_FAIL';
// const STATUS_END_WITHOUT_PAY = 'STATUS_END_WITHOUT_PAY';
// const STATUS_ENDT_WITH_PAY = 'STATUS_ENDT_WITH_PAY';
// const STATUS_REFUND = 'STATUS_REFUND';
// const STATUS_APPLY_REFUND = 'STATUS_APPLY_REFUND';

const placeOrder = async (openId) => {
  const options = paymentApi.getPlaceOrderOptions(openId);
  const orderResult = await paymentApi.placeOrder(options);
  const saveOptions = {
    open_id: options.openid,
    app_id: options.appid,
    mch_id: options.mch_id,
    nonce_str: options.nonce_str,
    body: options.body,
    detail: options.detail,
    attach: options.attach,
    out_trade_no: options.out_trade_no,
    total_fee: options.total_fee,
    spbill_create_ip: options.spbill_create_ip,
    notify_url: options.notify_url,
    trade_type: options.trade_type,
    status: STATUS_WAITING_PAY,
    time_place_order: new Date().getTime(),
  };

  if (orderResult.return_code === 'SUCCESS') {
    saveOptions.prepay_id = orderResult.prepay_id;
  } else {
    saveOptions.status = STATUS_PLACE_FAIL;
  }

  const paymentOptions = paymentApi.getPaymentPayload(orderResult);
  await mysql('payment').insert(saveOptions);
  return paymentOptions;
};

const notify = () => {};

export { placeOrder, notify };
