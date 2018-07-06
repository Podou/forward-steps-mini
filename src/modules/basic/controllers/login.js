import qcloud from '../../../qcloud';

const { mysql } = qcloud;

const saveUserInfo = async (user) => {
  if (user && user.userinfo) {
    const userInfo = user.userinfo;
    const newUser = {
      openId: userInfo.openId,
      nickName: userInfo.nickName,
      gender: userInfo.gender,
      language: userInfo.language,
      city: userInfo.city,
      province: userInfo.province,
      country: userInfo.country,
      avatarUrl: userInfo.avatarUrl,
      timestamp: userInfo.watermark.timestamp,
      appid: userInfo.watermark.appid,
      createTimeStamp: new Date().getTime(),
    };
    const existUser = await mysql('user').select('*').where({
      openId: newUser.openId,
    });
    if (existUser && existUser.length === 0) {
      await mysql('user').insert(newUser);
    }
  }
};

// 登录授权接口
export default async (ctx) => {
  // 通过 Koa 中间件进行登录之后
  // 登录信息会被存储到 ctx.state.$wxInfo
  // 具体查看：
  if (ctx.state.$wxInfo.loginState) {
    await saveUserInfo(ctx.state.$wxInfo.userinfo);
    ctx.state.data = ctx.state.$wxInfo.userinfo;
    ctx.state.data.time = Math.floor(Date.now() / 1000);
  }
};
