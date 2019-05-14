// pages/errorques/errorques.js
const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    start:0,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(options.start)
    var that = this;
    if(options.start<0){
      that.setData({
        start: 0
      })
    }
    else{
      that.setData({
        start:options.start
      })
    }
    wx.request({
      url: app.globalData.baseURL + '/choice/getErrorList',
      data: {
        userId:app.globalData.user.userId,
        start:that.data.start
      },
      header: {
        'content-type': 'application/json' //默认值
      },
      success: function (res) {
        console.log(res.data);
        if(res.data.question!=null){
          if (res.data.markC != null) {
            that.setData({
              question: res.data.question,
              markA: res.data.markA,
              markB: res.data.markB,
              markC: res.data.markC,
              markD: res.data.markD,
              time: res.data.createTime,
              author: res.data.author,
              id: res.data.id,
              isRuleTrue: true
            })
          }
          else {
            that.setData({
              question: res.data.question,
              markA: res.data.markA,
              markB: res.data.markB,
              time: res.data.createTime,
              author: res.data.author,
              id: res.data.id,
              isRuleTrue: false
            })
          }
        }
        else{
          var start = parseInt(that.data.start);
          that.setData({
            start: start - 1
          })
          wx.showToast({
            title: '没有错题了',
            image: '/images/check-circle.svg',
            duration: 300,
            mask: true,
            success: function (res) { },
            fail: function (res) { },
            complete: function (res) { },
          })
          var timeOut = setTimeout(function () {
            console.log("延迟调用============")
            wx.navigateBack()
          }, 300)
        }
        

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
  back:function(){
    var that = this;
    var start = parseInt(that.data.start);
    if(start>0){
      that.setData({
        start: start - 1
      })
      wx.request({
        url: app.globalData.baseURL + '/choice/getErrorList',
        data: {
          userId: app.globalData.user.userId,
          start: that.data.start
        },
        header: {
          'content-type': 'application/json' //默认值
        },
        success: function (res) {
          console.log(res.data);
          if (res.data.question != null) {
            if (res.data.markC != null) {
              that.setData({
                question: res.data.question,
                markA: res.data.markA,
                markB: res.data.markB,
                markC: res.data.markC,
                markD: res.data.markD,
                time: res.data.createTime,
                author: res.data.author,
                id: res.data.id,
                isRuleTrue: true
              })
            }
            else {
              that.setData({
                question: res.data.question,
                markA: res.data.markA,
                markB: res.data.markB,
                time: res.data.createTime,
                author: res.data.author,
                id: res.data.id,
                isRuleTrue: false
              })
            }
          }
          else {
            var start = parseInt(that.data.start);
            that.setData({
              start: start - 1
            })
            wx.showToast({
              title: '没有更多了',
              image: '/images/check-circle.svg',
              duration: 300,
              mask: true,
              success: function (res) { },
              fail: function (res) { },
              complete: function (res) { },
            })
          }


        }

      })
    }
    else{
      that.setData({
        start:0
      })
      wx.showToast({
        title: '已是第一题',
        image: '/images/check-circle.svg',
        duration: 300,
        mask: true,
        success: function (res) { },
        fail: function (res) { },
        complete: function (res) { },
      })
    }
    
  },
  go:function(){
    var that = this;
    var start = parseInt(that.data.start);
    that.setData({
      start: start + 1
    })
    wx.request({
      url: app.globalData.baseURL + '/choice/getErrorList',
      data: {
        userId: app.globalData.user.userId,
        start: that.data.start
      },
      header: {
        'content-type': 'application/json' //默认值
      },
      success: function (res) {
        console.log(res.data);
        if (res.data.question != null) {
          if (res.data.markC != null) {
            that.setData({
              question: res.data.question,
              markA: res.data.markA,
              markB: res.data.markB,
              markC: res.data.markC,
              markD: res.data.markD,
              time: res.data.createTime,
              author: res.data.author,
              id: res.data.id,
              isRuleTrue: true
            })
          }
          else {
            that.setData({
              question: res.data.question,
              markA: res.data.markA,
              markB: res.data.markB,
              time: res.data.createTime,
              author: res.data.author,
              id: res.data.id,
              isRuleTrue: false
            })
          }
        }
        else {
          var start = parseInt(that.data.start);
          that.setData({
            start: start - 1
          })
          wx.showToast({
            title: '已是最后一题',
            image: '/images/check-circle.svg',
            duration: 300,
            mask: true,
            success: function (res) { },
            fail: function (res) { },
            complete: function (res) { },
          })
        }


      }

    })
  }
})