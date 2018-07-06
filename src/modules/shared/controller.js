
import WXBizDataCrypt from '../../utils/WXBizDataCrypt';
import config from '../../../config';

export default async (ctx) => {
  const { body: { openId, data }, header } = ctx.request;
  const sessionKey = header['x-wx-skey'];
  console.log(openId, data.encryptedData, sessionKey);
  const pc = new WXBizDataCrypt(config.appId, sessionKey);
  const groupInfo = pc.decryptData(data.encryptedData, data.iv);
  ctx.state.data = groupInfo;
};
