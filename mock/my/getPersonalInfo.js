import { getLocalUrl } from '~/utils/util.js';

export default {
  path: '/api/genPersonalInfo',
  data: {
    code: 200,
    message: 'success',
    data: {
      image: '/static/avatar1.png',
      name: '小小超',
      gender: 0,
      address: ['440000', '440300'],
    },
  },
};
