import useToastBehavior from '~/behaviors/useToast';

Page({
  behaviors: [useToastBehavior],
  data: {
    menuData: [
      [
        {
          title: '通用设置',
          url: '',
          icon: 'app',
        },
        {
          title: '通知设置',
          url: '',
          icon: 'notification',
        },
      ],
      [
        {
          title: '账号安全',
          url: '',
          icon: 'secured',
        },
        {
          title: '隐私',
          url: '',
          icon: 'info-circle',
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
