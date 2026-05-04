export default {
  path: '/login/wxLogin',
  data: {
    token: 'mock_access_token_' + Date.now(),
    user: {
      nickName: '微信用户',
      avatarUrl: '/static/avatar1.png',
    },
  },
};
