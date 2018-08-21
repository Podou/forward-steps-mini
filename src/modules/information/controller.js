import * as services from './services';

export const createInformation = async (ctx) => {
  const { body } = ctx.request;
  try {
    const response = await services.createInformation(body);
    ctx.state.data = response;
  } catch (err) {
    ctx.state.data = err.message;
  }
};

export const getInformations = async (ctx) => {
  const { openId, start, count } = ctx.query;
  try {
    const response = await services.getInformations(
      openId,
      parseInt(start, 10),
      parseInt(count, 10),
    );
    ctx.state.data = response;
  } catch (err) {
    ctx.state.data = err.message;
  }
};
