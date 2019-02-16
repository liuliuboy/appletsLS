// pages/index/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
  
  },

  /**
   * 跳转页面
   */
  linkPage(ev) {
    wx.switchTab({
      url: '../logs/logs',
    })
  }
})