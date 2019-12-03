// pages/index/index.js
Page({
  /**
   * 跳转页面
   */
  linkPage(ev) {
    wx.switchTab({
      url: '../logs/logs',
    })
  }
})