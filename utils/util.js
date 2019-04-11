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
  }
}

module.exports = {
  utils: utils
};