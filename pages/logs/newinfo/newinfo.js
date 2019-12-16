// pages/newinfo/newinfo.js
var newListData = require('../../../data/new-list.js');
var appData = getApp(); // 获取全局变量
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
    if (appData.glbalData.g_isPlayingMusin && appData.glbalData.g_isPlayMusinId === newId) {
      // 音乐正在播放
      this.palyMinsic();
    }
    // 监听音乐播发
    this.onMiusicPlay();
    // 监听音乐暂停
    this.onMiusicStop();
    // 音乐播放完毕
    this.onMiusicAudioStop();
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
    let {data} = this;
    let offMiusic = data.offMiusic;
    if (offMiusic) {
      this.stopMiusicTab();
    } else {
      this.playMinsicAudio();
    }
  },
  
  /**
   * 音乐停止函数
   */
  minsicStop() {
    let newDatas = newListData.newList || [];
    let id = this.data.newId;
    this.setData({
      offMiusic: false,
      titleImg: newDatas[id].headImgSrc || '',
    });
    appData.glbalData.g_isPlayingMusin = false;
    appData.glbalData.g_isPlayMusinId = null;
  },

  /**
   * 播放音乐
   */
  palyMinsic() {
    let {data} = this;
    let urlData = data.newDatas.music || {};
    let newDatas = newListData.newList || [];
    let id = data.newId;
    appData.glbalData.g_isPlayingMusin = true;
    appData.glbalData.g_isPlayMusinId = id;
    this.setData({
      titleImg: urlData.coverImg || newDatas[id].headImgSrc || '',
      offMiusic: true
    });
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
       that.palyMinsic()
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
        appData.glbalData.g_isPlayingMusin = false;
        appData.glbalData.g_isPlayMusinId = null;
      }
    });
  },

  /**
   * 监听音乐播放
   */
  onMiusicPlay() {
    let that = this;
    wx.onBackgroundAudioPlay(function() {
      // 播放音乐变换背景图
      that.palyMinsic();
    });
  },

  /**
   * 监听音乐暂停
   */
  onMiusicStop() {
    wx.onBackgroundAudioPause(() => {
      this.minsicStop();
    })
  },

  /**
   * 监听音乐停止
   */
  onMiusicAudioStop() {
    wx.onBackgroundAudioStop(() => {
      this.minsicStop();
    });
  }
})