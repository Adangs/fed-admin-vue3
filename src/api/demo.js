import request from '@/utils/x-request';

export default {
  getApi(params) {
    return request({
      url: '/app/mock/125191/api/v1/success',
      method: 'get',
      params,
    });
  },
  getList(params) {
    return request({
      url: '/app/mock/125191/api/alarm/page',
      method: 'get',
      params,
    });
  },
};
