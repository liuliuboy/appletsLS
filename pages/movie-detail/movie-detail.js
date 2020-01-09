// pages/movie-detail/movie-detail.js
var appData = getApp();
var urils = require('../../utils/util.js');
Page({
  /**
   * 页面的初始数据
   */
  data: {
    movieInfo: {}
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let movieId = options.id || '';
    let url = `${appData.glbalData.g_DouBanBase}/v2/movie/subject/${movieId}`;
    this.getMovieInfo(url);
  },
  
  /**
   * 获取电影详情
   */
  getMovieInfo(url) {
    let { httpRequest } = urils;
    httpRequest(url).then((data = {}) => {
      this.setMovieData(data);
    }).catch((err) => {
    })
  },

  /**
   * 存入后端返回的值
   */
  setMovieData(data = {}) {
    let {starsImg, convertToCastString, convertToCastInfos} = urils;
    let director = {
      avater: '',
      name: '',
      id: ''
    };
    let direactors = data.directors || [];
    if (direactors[0]) {
      let item = direactors[0];
      if (item.avatars) {
        director.avater = item.avatars.large || '';
      }
      director.name = item.name || '';
      director.id = item.id || '';
    }

    let movie = {
      movieImg: data.images ? data.images.large : "",
      country: data.countries[0] || '',
      title: data.title || '',
      originalTitle: data.original_title || '',
      wishCount: data.wish_count || '',
      commentCount: data.comments_count || '',
      year: data.year || '',
      generes: data.genres.join("、"),
      stars: starsImg(data.rating.stars),
      score: data.rating.average,
      director: director,
      casts: convertToCastString(data.casts),
      castsInfo: convertToCastInfos(data.casts),
      summary: data.summary
    };
    this.setData({
      movieInfo: movie
    })
  }
})