// pages/tongji/tongji.js
let Charts = require('./../../utils/wxcharts.js');
const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    countArticle: 0,
    sumReadWord: 0, 
    avgReadTime: 0, 
    sumReadTime: 0, 
    countQues: 0, 
    countRight: 0, 
    countError: 0, 
    rightRate: 0, 
    wordSearch: 0,
    errorOnce:0,
    errorTwice:0,
    errorMuch:0
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) { 
    console.log(app.globalData.user.userId)
    var that = this
    wx.request({
      url: app.globalData.baseURL + '/user/getStatistic?userId=' + app.globalData.user.userId,
      header: ({
        "context-type": "text/xml"
      }),
      method: "GET",
      dataType: 'json',
      success: function (res) {
        //console.log('getdata.() success');
        console.log(res.data);
        that.setData({
          countArticle:res.data.countArticle,
          sumReadTime:Math.floor(res.data.sumReadTime/3600) + '时' + Math.floor(Math.floor(res.data.sumReadTime%3600)/60) + '分' + res.data.sumReadTime%60 + '秒',
          avgReadTime: Math.floor(res.data.avgReadTime / 3600) + '时' + Math.floor(Math.floor(res.data.avgReadTime % 3600) / 60) + '分' + res.data.avgReadTime % 60 + '秒',
          sumReadWord:res.data.sumReadWord,
          countQues:res.data.countQues,
          countRight:res.data.countRight,
          countError:res.data.countError,
          rightRate:res.data.rightRate,
          wordSearch:res.data.wordSearch,
          errorOnce:res.data.errorOnce,
          errorTwice:res.data.errorTwice,
          errorMuch:res.data.errorMuch
        })
        new Charts({
          canvasId: 'canvas1',
          type: 'pie',
          series: [{ name: '正确', data: that.data.countRight },
          { name: '错一次', data: that.data.errorOnce },
          { name: '错两次', data: that.data.errorTwice },
          { name: '错三次及以上', data: that.data.errorMuch }],
          width: 320,
          height: 300,
          dataLabel: true,
        });
        new Charts({
          canvasId: 'canvas2',
          type: '',
          series: [{ name: '正确', data: that.data.countRight },
          { name: '错一次', data: that.data.errorOnce },
          { name: '错两次', data: that.data.errorTwice },
          { name: '错三次及以上', data: that.data.errorMuch }],
          width: 320,
          height: 300,
          dataLabel: true,
        });
        
      },
      fail: function (res) {
        console.log('getStatistic.() fail');
      },
      complete: function (res) {
        console.log('getStatistic complete');
      }
    })
    
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  },
  
})