// pages/more-movie/more-movie.js
var utils = require('../../utils/util.js');
var appData = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    // 电影大标题
    movieTitle: '',
    // 整合的电影数据
    movieListData: []
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options = {}) {
    let tltleText = options.movieTitle || '';
    this.setData({
      movieTitle: tltleText,
    });
  },

  /**
   * 页面加载完毕
   */
  onReady() {
    wx.setNavigationBarTitle({
      title: this.data.movieTitle,
    });
    this.getMovieResuestUrl();
  },

  /**
   * 获取点击的电影类的请求地址
   */
  getMovieResuestUrl() {
    let douBanUrl = appData.glbalData.g_DouBanBase;
    let inTheatersUrl = `${douBanUrl}/v2/movie/in_theaters`;
    let comingSooUrl = douBanUrl + '/v2/movie/coming_soon';
    let top250Url = douBanUrl + '/v2/movie/top250';
    let urlObj = {
      '正在热映': inTheatersUrl,
      '即将上映': comingSooUrl,
      '豆瓣Top250': top250Url
    };
    this.getClssMovieList(urlObj[this.data.movieTitle]);
  },
  
  /**
   * 获取点击的电影类的所有数据
   */
  getClssMovieList(url) {
    let utilsFn = utils.utils;
    utilsFn.httpRequest(url).then((data = {}) => {
      let result = data.subjects || {};
      // 整合获取的数据
      this.getListData(result);
    }).catch((err) => {
      console.log(err, '>>>>>>>>>>>>');
    });
  },

  /**
   * 整合获取的数据
   */
  getListData(data = []) {
    var movieArr = [];
    for (let k = 0; k < data.length; k++) {
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
      movieListData: movieArr
    });
  },
})