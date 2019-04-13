let utils = {

  /**
   * 评星显示
   * num 分数
   */
  starsImg: function(num = '00') {
    let starsArr = [];
    let numArr = num.split('');
    for(let i = 0; i < 5; i++){
      if (i < numArr[0]) {
        starsArr.push('1');
      } else {
        starsArr.push('0');
      }
    }
    return starsArr;
  },

  /**
   * 请求参数
   */
  httpRequest: function(url="") {
    return new Promise(function(resove, reject) {
      wx.request({
        url: url,
        success: function(data) {
          let result = data.data || {};
          resove(result);
        },
        fail: function(err) {
          reject(err)
        }
      })
    });
  }
}

module.exports = {
  utils: utils
};