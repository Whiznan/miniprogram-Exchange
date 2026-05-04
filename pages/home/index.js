import Message from 'tdesign-miniprogram/message/index';
import request from '~/api/request';

Page({
  data: {
    enable: false,
    swiperList: [],
    cardInfo: [],
    filteredCardInfo: [],
    categories: [
      { label: '二手', value: 'second-hand' },
      { label: '宠物', value: 'pet' },
      { label: '互助', value: 'help' },
      { label: '广场', value: 'square' },
    ],
    activeCategory: 'second-hand',
    motto: 'Hello World',
    userInfo: {},
    hasUserInfo: false,
    canIUse: wx.canIUse('button.open-type.getUserInfo'),
    canIUseGetUserProfile: false,
    canIUseOpenData: wx.canIUse('open-data.type.userAvatarUrl') && wx.canIUse('open-data.type.userNickName'),
  },
  async onReady() {
    const [cardRes, swiperRes] = await Promise.all([
      request('/home/cards').then((res) => res.data),
      request('/home/swipers').then((res) => res.data),
    ]);

    const { activeCategory, categories } = this.data;
    const matched = cardRes.filter((card) =>
      card.tags.some((tag) => tag.text === categories.find((c) => c.value === activeCategory)?.label)
    );
    this.setData({
      cardInfo: cardRes,
      filteredCardInfo: matched.length > 0 ? matched : cardRes,
      swiperList: swiperRes,
    });
  },
  onLoad(option) {
    if (wx.getUserProfile) {
      this.setData({
        canIUseGetUserProfile: true,
      });
    }
    if (option.oper) {
      let content = '';
      if (option.oper === 'release') {
        content = '发布成功';
      } else if (option.oper === 'save') {
        content = '保存成功';
      }
      this.showOperMsg(content);
    }
  },
  onCategoryChange(e) {
    const { value } = e.detail;
    const { cardInfo } = this.data;
    const filtered = cardInfo.filter((card) =>
      card.tags.some((tag) => tag.text === this.data.categories.find((c) => c.value === value)?.label)
    );
    this.setData({
      activeCategory: value,
      filteredCardInfo: filtered.length > 0 ? filtered : cardInfo,
    });
  },
  onRefresh() {
    this.refresh();
  },
  async refresh() {
    this.setData({
      enable: true,
    });
    const [cardRes, swiperRes] = await Promise.all([
      request('/home/cards').then((res) => res.data),
      request('/home/swipers').then((res) => res.data),
    ]);

    setTimeout(() => {
      const { activeCategory, categories } = this.data;
      let filtered = cardRes;
      const matched = cardRes.filter((card) =>
        card.tags.some((tag) => tag.text === categories.find((c) => c.value === activeCategory)?.label)
      );
      if (matched.length > 0) {
        filtered = matched;
      }
      this.setData({
        enable: false,
        cardInfo: cardRes,
        filteredCardInfo: filtered,
        swiperList: swiperRes,
      });
    }, 1500);
  },
  showOperMsg(content) {
    Message.success({
      context: this,
      offset: [120, 32],
      duration: 4000,
      content,
    });
  },
  goRelease() {
    wx.navigateTo({
      url: '/pages/release/index',
    });
  },
});
