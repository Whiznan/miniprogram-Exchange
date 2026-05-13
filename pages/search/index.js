Page({
  data: {
    searchValue: '',
  },

  goBack() {
    wx.navigateBack();
  },

  handleSubmit(e) {
    const { value } = e.detail;
    if (value.length === 0) return;

    wx.navigateTo({
      url: `/pages/goods/result/index?searchValue=${value}`,
    });
  },

  actionHandle() {
    this.setData({
      searchValue: '',
    });
    wx.switchTab({ url: '/pages/home/index' });
  },
});
