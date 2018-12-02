var newListData = require('../../data/new-list.js');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    dataList: []
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      dataList: newListData.newList
    });
  },

  /**
   * 点击列表进入详情页
   */
  pushNewInfo(event) {
    let newId = event.currentTarget.dataset.newid;
    wx.navigateTo({
      url: 'newinfo/newinfo?newId=' + newId,
    });
  },

  /**
   * 点赞
   */
  addXing(event) {
  }
})
