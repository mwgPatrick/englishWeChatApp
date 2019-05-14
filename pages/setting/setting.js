// pages/setting/setting.js
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    array: ['女','男'],
    index:0,
    contactEmail:'',
    contactNumber:'',
    contactQq:''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(app.globalData.user)
    this.setData({
      user:app.globalData.user,
      userName: app.globalData.user.userName,
      index:app.globalData.user.userSex,
      contactEmail:app.globalData.user.contactEmail,
      contactQq:app.globalData.user.contactQq,
      contactNumber:app.globalData.user.contactNumber
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
  changeSex:function(e){
    console.log(e.detail.value)
    this.setData({
      index: e.detail.value
    })
  },

  userName:function(e){
    this.setData({
      userName:e.detail.value
    })
  },
  contactNumber:function(e){
    this.setData({
      contactNumber:e.detail.value
    })
  },
  contactEmail:function(e){
    this.setData({
      contactEmail:e.detail.value
    })
  },
  contactQq:function(e){
    this.setData({
      contactQq:e.detail.value
    })
  },

  updateUserInfo:function(){
    var that = this;
    wx.request({
      url: app.globalData.baseURL + '/user/update',
      data: {
        userName: that.data.userName,
        userSex:that.data.index,
        userId:app.globalData.user.userId,
        contactEmail:that.data.contactEmail,
        contactQq:that.data.contactQq,
        contactNumber:that.data.contactNumber,
        currentGrade:0
      },
      header: {
        'content-type': 'application/json' //默认值
      },
      success: function (res) {
        wx.showToast({
          title: '提交成功',
          image: '/images/check-circle.svg',
          duration: 500,
          mask: true,
          success: function (res) { },
          fail: function (res) { },
          complete: function (res) { },
        })
        var timeOut = setTimeout(function () {
          console.log("延迟调用============")
          wx.navigateBack()
        }, 500)
      }

    })
  },
})