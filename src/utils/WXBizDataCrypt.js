import crypto from 'crypto';

class WXBizDataCrypt {
  constructor(appId, sessionKey) {
    this.appId = appId;
    this.sessionKey = sessionKey;
  }

  decryptData(encrypted, iv) {
    // base64 decode
    const sessionKey = new Buffer(this.sessionKey, 'base64');
    const encryptedData = new Buffer(encrypted, 'base64');
    const newIv = new Buffer(iv, 'base64');
    let decoded = {};
    try {
      // 解密
      const decipher = crypto.createDecipheriv('aes-128-cbc', sessionKey, newIv);
      // 设置自动 padding 为 true，删除填充补位
      decipher.setAutoPadding(true);
      decoded = decipher.update(encryptedData, 'binary', 'utf8');
      decoded += decipher.final('utf8');
      console.log(decoded);
      decoded = JSON.parse(decoded);
    } catch (err) {
      throw new Error('Illegal Buffer');
    }

    if (decoded && decoded.watermark && decoded.watermark.appid !== this.appId) {
      console.log('ssssss');
      throw new Error('Illegal Buffer');
    }

    return decoded;
  }
}

export default WXBizDataCrypt;
