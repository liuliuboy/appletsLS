// pages/movies/movies.js
var utils = require('../../utils/util.js');
var appData = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    inTheatersData: {},
    comingSooData: {},
    top250Data: {}
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad (options) {
    this.init();
  },

  init() {
    this.sendRequert();
  },
  
  /**
   * 获取电影列表
   */
  sendRequert() {
    let douBanUrl = appData.glbalData.g_DouBanBase;
    let inTheatersUrl = `${douBanUrl}/v2/movie/in_theaters?start=0&count=3`;
    let comingSooUrl = douBanUrl + '/v2/movie/coming_soon?start=0&count=3';
    let top250Url = douBanUrl + '/v2/movie/top250?start=0&count=3';
    this.requestData(inTheatersUrl, 'inTheatersData', '正在热映');
    this.requestData(comingSooUrl, 'comingSooData', '即将上映');
    this.requestData(top250Url, 'top250Data', '豆瓣Top250');
  },
  
  /**
   * 请求函数
   */
  requestData(url = '', key = '', columnTitle = '') {
    let that = this;
    let utilsFn = utils.utils;
    utilsFn.httpRequest(url).then((data ={}) => {
      let subjects = data.subjects || []
      that.getListData(subjects, key, columnTitle);
    }).catch((err) => {
      console.log(err);
    });
  },

  /**
   * 获取数据
   * 
   */
  getListData(data = [], key = '', columnTitle = '') {
    var movieArr = [];
    for(let k = 0; k < data.length; k++) {
      let item = data[k] || {};
      let title = item.title || '';
      if (title.length >= 6) {
        title = item.title.substring(0, 6) + '...';
      };
      let temp = {
        title: title,
        average: item.rating.average,
        large: item.images.large,
        movieId: item.id,
        startArr: utils.utils.starsImg(item.rating.stars || '00')
      };
      movieArr.push(temp);
    }
    this.setData({
      [key]: {
        columnTitle: columnTitle,
        movies: movieArr
      }
    });
  },
  
  /**
   * 点击更多
   */
  moreMovie(ev) {
    let movieTitle = ev.currentTarget.dataset.tltletext || '';
    wx.navigateTo({
      url: '/pages/more-movie/more-movie?movieTitle=' + movieTitle,
    })
  }
})