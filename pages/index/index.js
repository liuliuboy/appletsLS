// pages/index/index.js
Page({
  /**
   * 跳转页面
   * redirectTo 卸载跳转页面
   * navigateTo 保留跳转的页面
   */
  linkPage(ev) {
    wx.switchTab({
      url: '../logs/logs'
    })
  },
})