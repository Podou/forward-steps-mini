import crypto from 'crypto';

const md5 = (text) => {
  return crypto.createHash('md5').update(text, 'utf8').digest('hex');
};

const sha256 = (text) => {
  return crypto.createHash('sha256').update(text, 'utf8').digest('hex');
};

export { md5, sha256 };
