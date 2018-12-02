// pages/newinfo/newinfo.js
var newListData = require('../../../data/new-list.js');
Page({
  data: {
    newDatas: {}, // 点击的数据
    collectorImg: '/image/icon/collection-anti.png',
    newId: '', // 新闻ID
  },

  onLoad(option) {
    let collector = {};
    let newId = option.newId;
    let newDatas = newListData.newList || [];
    this.setData({
      newDatas: newDatas[newId] || {},
      newId: newId
    });
    collector = wx.getStorageSync('collector') || {};
    if (collector[newId.toString()]) {
      collector[newId] = true;
    } else {
      collector[newId] = false;
    }
    this.setData({
      collectorImg: collector[newId] ? '/image/icon/collection.png' : '/image/icon/collection-anti.png'
    });
  },
  
  /**
   * 收藏
   */
  collector() {
    let newId = this.data.newId.toString();
    let collector = {};
    collector = wx.getStorageSync('collector') || {};
    if (collector[newId]) {
      collector[newId] = false;
    } else {
      collector[newId] = true;
    }
    this.setData({
      collectorImg: collector[newId] ? '/image/icon/collection.png' : '/image/icon/collection-anti.png'
    });
    wx.setStorageSync('collector', collector);
  }   
})
