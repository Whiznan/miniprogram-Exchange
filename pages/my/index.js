import request from '~/api/request';
import useToastBehavior from '~/behaviors/useToast';

Page({
  behaviors: [useToastBehavior],

  data: {
    isLoad: false,
    personalInfo: {},
    gridList: [
      {
        name: '全部发布',
        img: '/static/iconfont/全部发布.svg',
        type: 'all',
        url: '',
      },
      {
        name: '审核中',
        img: '/static/iconfont/审核中.svg',
        type: 'progress',
        url: '',
      },
      {
        name: '已发布',
        img: '/static/iconfont/已发布.svg',
        type: 'published',
        url: '',
      },
      {
        name: '草稿箱',
        img: '/static/iconfont/草稿箱.svg',
        type: 'draft',
        url: '',
      },
    ],

    settingList: [
      { name: '联系客服', img: '/static/iconfont/联系客服.svg', type: 'service' },
      { name: '设置', img: '/static/iconfont/设置.svg', type: 'setting', url: '/pages/setting/index' },
    ],
  },

  onLoad() {},

  async onShow() {
    const Token = wx.getStorageSync('access_token');
    const personalInfo = await this.getPersonalInfo();

    if (Token) {
      this.setData({
        isLoad: true,
        personalInfo,
      });
    }
  },

  async getPersonalInfo() {
    const info = await request('/api/genPersonalInfo').then((res) => res.data.data);
    return info;
  },

  onLogin(e) {
    wx.navigateTo({
      url: '/pages/login/login',
    });
  },

  onNavigateTo() {
    wx.navigateTo({ url: `/pages/my/info-edit/index` });
  },

  onEleClick(e) {
    const { name, url } = e.currentTarget.dataset.data;
    if (url) return;
    this.onShowToast('#t-toast', name);
  },
});
