/* eslint-disable */
var __request = wx.request;
var Mock = require('./mock.js');
Object.defineProperty(wx, 'request', { writable: true });
wx.request = function (config) {
  var requestUrl = config.url;
  // 去除查询参数，用于模糊匹配
  var baseUrl = requestUrl.split('?')[0];
  var matchedKey = null;

  // 遍历所有已注册的 Mock 路径，进行模糊匹配
  for (var key in Mock._mocked) {
    if (key === baseUrl || requestUrl.indexOf(key) === 0) {
      matchedKey = key;
      break;
    }
  }

  if (matchedKey == null) {
    __request(config);
    return;
  }

  var resTemplate = Mock._mocked[matchedKey].template;
  var response = Mock.mock(resTemplate);
  if (typeof config.success == 'function') {
    config.success(response);
  }
  if (typeof config.complete == 'function') {
    config.complete(response);
  }
};
module.exports = Mock;
