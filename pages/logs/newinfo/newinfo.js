// pages/newinfo/newinfo.js
var newListData = require('../../../data/new-list.js');
Page({
  data: {
    newDatas: {}, // 点击的数据
    collectorImg: '/image/icon/collection-anti.png',
    newId: '', // 新闻ID
    titleImg: '', // title图片
    offMiusic: false, // 是否播放音乐
  },

  onLoad(option) {
    let collector = {};
    let newId = option.newId;
    let newDatas = newListData.newList || [];
    collector = wx.getStorageSync('collector') || {};
    if (collector[newId.toString()]) {
      collector[newId] = true;
    } else {
      collector[newId] = false;
    }
    this.setData({
      newDatas: newDatas[newId] || {},
      newId: newId,
      titleImg: newDatas[newId].headImgSrc || '',
      collectorImg: collector[newId] ? '/image/icon/collection.png' : '/image/icon/collection-anti.png',
    });
  },
  
  /**
   * 收藏
   */
  collector(ev) {
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
    wx.showToast({
      title: collector[newId] ? '收藏成功' : '取消成功',
      duration: 1000
    })
  },
  
  /**
   * 分享
   */
  share(ev) {
    wx.showActionSheet({
      itemList: [
        '分享给微信好友',
        '分享到朋友圈',
        '分享到微博'
      ],
      itemColor: '#405f80',
      success: (mes) => {
        console.log(mes);
      }
    });
  },
  
  /**
   * 点击音乐
   */
  onMiusicTab(ev) {
    let offMiusic = this.data.offMiusic;
    if (offMiusic) {
      this.stopMiusicTab();
    } else {
      this.playMinsicAudio();
    }
  },

  /**
   * 播放音乐
   */
  playMinsicAudio() {
    let that = this;
    let urlData = this.data.newDatas.music || {};
    wx.playBackgroundAudio({
      dataUrl: urlData.url || '',
      title: urlData.title || '',
      coverImgUrl: urlData.coverImg || '',
      success: function () {
        that.setData({
          titleImg: urlData.coverImg || newListData.headImgSrc,
          offMiusic: true
        });
      }
    })
  },

  /**
   * 暂停音乐播放
   */
  stopMiusicTab() {
    let that = this;
    wx.pauseBackgroundAudio({
      success: function() {
        that.setData({
          offMiusic: false
        });
      }
    });
  }
})