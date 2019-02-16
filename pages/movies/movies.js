// pages/movies/movies.js
var appData = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad (options) {
    this.init()
  },

  init() {
    this.getListData();
  },
  
  /**
   * 获取电影列表
   */
  getListData() {
    let douBanUrl = appData.glbalData.g_DouBanBase;
    let inTheatersUrl = douBanUrl + '/v2/movie/in_theaters';
    let comingSooUrl = douBanUrl + '/v2/movie/coming_soon';
    let top250Url = douBanUrl + '/v2/movie/top250';
    this.requestData(inTheatersUrl);
    this.requestData(comingSooUrl);
    this.requestData(top250Url);
  },
  
  /**
   * 请求函数
   */
  requestData(url = '') {
    wx.request({
      url: url,
      method: 'GET',
      header: {
        'Content-Type': 'application/json'
      },
      success: (data = {}) => {
        console.log(data);
      },
      fail: (err) => {
        console.log(err);
      }
    })
  }
})