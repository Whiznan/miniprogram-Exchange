import useToastBehavior from '~/behaviors/useToast';

Page({
  behaviors: [useToastBehavior],
  data: {
    menuData: [
      [
        {
          title: '通用设置',
          url: '',
          img: '/static/iconfont/通用设置.svg',
        },
        {
          title: '通知设置',
          url: '',
          img: '/static/iconfont/通知设置.svg',
        },
      ],
      [
        {
          title: '账号安全',
          url: '',
          img: '/static/iconfont/账号安全.svg',
        },
        {
          title: '隐私',
          url: '',
          img: '/static/iconfont/隐私.svg',
        },
      ],
    ],
  },

  onEleClick(e) {
    const { title, url } = e.currentTarget.dataset.data;
    if (url) return;
    this.onShowToast('#t-toast', title);
  },
});
