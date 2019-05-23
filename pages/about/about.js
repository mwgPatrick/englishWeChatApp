// pages/about/about.js
const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    about:'',
    time:''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    wx.request({
      url: app.globalData.baseURL + '/tips/getAbout',
      header: ({
        "context-type": "text/xml"
      }),
      method: "GET",
      dataType: 'json',
      success: function (res) {
        //console.log('getdata.() success');
        console.log(res.data);
        that.setData({
          about: res.data.about,
          time:res.data.time
        })
      },
      fail: function (res) {
        console.log('getRandomTip.() fail');
      },
      complete: function (res) {
        console.log('getRandomTip.() complete');
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
  goback:function(){
    wx.navigateBack({
      delta:1
    })
  }
})