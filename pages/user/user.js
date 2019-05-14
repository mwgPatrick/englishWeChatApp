// pages/user/user.js
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    user: { userName:'未知',
    },
    isRuleTrue: false,
    userInfo: {},
    hasUserInfo: false,
    canIUse: wx.canIUse('button.open-type.getUserInfo')
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    //console.log(JSON.parse(options.user))
    var that = this;
    if (app.globalData.userInfo) {
      that.login();
      this.setData({
        userInfo: app.globalData.userInfo,
        hasUserInfo: true
      })
    } else if (this.data.canIUse) {
      // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
      // 所以此处加入 callback 以防止这种情况
      app.userInfoReadyCallback = res => {
        that.login();
        this.setData({
          userInfo: res.userInfo,
          hasUserInfo: true
        })
      }
    } else {
      // 在没有 open-type=getUserInfo 版本的兼容处理
      wx.getUserInfo({
        success: res => {
          app.globalData.userInfo = res.userInfo
          that.login();
          this.setData({
            userInfo: res.userInfo,
            hasUserInfo: true
          })
        }
      })
    }
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
    this.login();
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
  getUserInfo: function (e) {
    console.log(e)
    app.globalData.userInfo = e.detail.userInfo
    console.log(e.detail.userInfo)
    this.login();
    this.setData({
      userInfo: e.detail.userInfo,
      hasUserInfo: true
    })

  },
  login: function () {
    var that = this;
    wx.login({
      success: function (res) {
        console.log(res.code)
        var userInfo = app.globalData.userInfo
        console.log(app.globalData.userInfo)
        //发送请求
        wx.request({
          url: app.globalData.baseURL + '/user/login', //接口地址
          data: {
            code: res.code,
            userSex: userInfo.gender,
            userName: userInfo.nickName,
            userCity: userInfo.city,
            userProvince: userInfo.province
          },
          header: {
            'content-type': 'application/json' //默认值
          },
          success: function (res) {
            console.log(res.data);
            app.globalData.user = res.data;
            var user = res.data;
            if (user.userSex == '1') { that.setData({userSex:'♂'}) }
            else if (user.userSex == '0') { that.setData({ userSex: '♀' })  }
            else { that.setData({ userSex: '未知' })  }
            that.setData({
              user:user
            })
          }
        })
      }
    })
  },
  tongji:function(){
    if(app.globalData.user!=null){
      wx.navigateTo({
        url: '/pages/tongji/tongji?id=' + app.globalData.user.userId,
      })
    }
    else{
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
  about:function(){
    wx.navigateTo({
      url: '/pages/about/about',
    })
  },
  fankui:function(){
    this.setData({
      isRuleTrue:true
    })
  },
  hideRule:function(){
    this.setData({
      isRuleTrue: false
    })
  },
  kefu:function(){
    this.hideRule();
  },
  setting:function(){
    if (app.globalData.user != null) {
      wx.navigateTo({
        url: '/pages/setting/setting',
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