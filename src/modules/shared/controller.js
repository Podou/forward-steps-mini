
import WXBizDataCrypt from '../../utils/WXBizDataCrypt';
import config from '../../../config';
import qcloud from '../../qcloud';

const { mysql } = qcloud;

export default async (ctx) => {
  const { body: { openId, data } } = ctx.request;
  const sessionKeys = await mysql('cSessionInfo').select('session_key').where('open_id', openId);
  if (sessionKeys && sessionKeys.length > 0) {
    const sessionKey = sessionKeys[0].session_key;
    const pc = new WXBizDataCrypt(config.appId, sessionKey);
    // { openGId: 'GH6D20Mv3F6YRinFChZXnf3TOOOQ',
    //   watermark: { timestamp: 1530889060, appid: 'wx8f50b613d2ea6dca' } }
    const groupInfo = pc.decryptData(data.encryptedData, data.iv);
    const { openGId, watermark: { appid } } = groupInfo;
    const sharedGroupInfo = {
      openId,
      openGId,
      appid,
      createTimeStamp: new Date().getTime(),
    };

    const sharedGroups = await mysql('sharedGroup')
      .select('*')
      .where('openId', openId)
      .andWhere('openGId', openGId);

    if (sharedGroups && sharedGroups.length > 0) {
      // const sharedGroup = sharedGroups[0];
      await mysql('sharedGroup')
        .update('timestamp', new Date().getTime())
        .where('openId', openId)
        .andWhere('openGId', openGId);
    } else {
      await mysql('sharedGroup').insert(sharedGroupInfo);
    }
    ctx.state.data = groupInfo;
  }
};
