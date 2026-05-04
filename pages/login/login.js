import request from '~/api/request';

Page({
  data: {
    isCheck: false,
    radioValue: '',
  },

  onCheckChange(e) {
    const { value } = e.detail;
    this.setData({
      radioValue: value,
      isCheck: value === 'agree',
    });
  },

  async wxLogin() {
    if (!this.data.isCheck) return;
    wx.login({
      success: async (res) => {
        const response = await request('/login/wxLogin', 'post', { code: res.code });
        if (response.success) {
          await wx.setStorageSync('access_token', response.data.token);
          wx.switchTab({
            url: '/pages/my/index',
          });
        }
      },
    });
  },
});
