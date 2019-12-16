let utils = {

  /**
   * 评星显示
   * num 分数
   */
  starsImg: (num = '00') => {
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
  httpRequest: (url="") => {
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
  },

  convertToCastString: (casts) => {
    var castsjoin = "";
    for (var idx in casts) {
      castsjoin = castsjoin + casts[idx].name + " / ";
    }
    return castsjoin.substring(0, castsjoin.length - 2);
  },

  convertToCastInfos: (casts) => {
    var castsArray = []
    for (var idx in casts) {
      var cast = {
        img: casts[idx].avatars ? casts[idx].avatars.large : "",
        name: casts[idx].name
      }
      castsArray.push(cast);
    }
    return castsArray;
  }
}

module.exports = { ...utils};