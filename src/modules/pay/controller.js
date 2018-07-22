import { placeOrder } from './services/payment';

// https://api.mch.weixin.qq.com/pay/unifiedorder
const unifiedorder = async (ctx) => {
  const { body: { openId } } = ctx.request;
  const payload = await placeOrder(openId);
  ctx.state.data = payload;
};

const notify = async (ctx) => {
  const { request: { body } } = ctx;
  console.log(body);
  ctx.body = body;
};

export { notify, unifiedorder };
