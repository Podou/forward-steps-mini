import InformationModel from './models/information';

export const createInformation = async (options = {}) => {
  if (!options.openId) {
    throw new Error('Unknow openid');
  }

  if (!options.nickName) {
    throw new Error('Unknow nick name');
  }
  if (!options.message) {
    throw new Error('Unknow message');
  }

  try {
    const information = {
      openId: options.openId,
      nickName: options.nickName,
      message: options.message,
      createTime: new Date().getTime(),
      updateTime: new Date().getTime(),
    };
    return await InformationModel.create(information);
  } catch (err) {
    throw err;
  }
};

export const getInformations = async (openId) => {
  if (!openId) {
    throw new Error('Unknow openid');
  }
  return await InformationModel.find({ openId });
};

export const getInformation = () => {};

export const updateInformation = () => {};
export const deleteInformation = () => {};
