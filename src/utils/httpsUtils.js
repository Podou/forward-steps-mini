import request from 'request-promise';

export const post = async (requestUrl, payload) => {
  const options = {
    url: requestUrl,
    method: 'POST',
    body: payload,
  };
  console.log(requestUrl);
  return await request(options);
};

export const get = async (url) => {
  console.log(url);
};
