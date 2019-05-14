// pages/choice/choice.js
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    question:'',
    markA:'',
    markB:'',
    markC:'',
    markD:'',
    answer:''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

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
  getQuestion:function(){

    if (app.globalData.user != null) {
      wx.navigateTo({
        url: '/pages/question/question',
      })
    }
    else {
      wx.showToast({
        title: '请先注册/登录',
        image: '/images/alert-circle.svg',
        duration: 1000,
        mask: true,
        success: function (res) { },
        fail: function (res) { },
        complete: function (res) { },
      })
    }

   
  },
  errorlist:function(){
    if (app.globalData.user != null) {
      wx.navigateTo({
        url: '/pages/errorques/errorques?start=0',
      })
    }
    else {
      wx.showToast({
        title: '请先注册/登录',
        image: '/images/alert-circle.svg',
        duration: 1000,
        mask: true,
        success: function (res) { },
        fail: function (res) { },
        complete: function (res) { },
      })
    }


    
  }
})