// pages/article/article.js
const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    article:[],
    art:[],
    time:0,
    textcolor: 'rgb(247, 244, 244)',
    isRuleTrue:false,
    readtime:0
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(options.id);
    console.log(app.globalData.user)
    this.getArticle(options.id)
    var that = this;
    var interval = setInterval(function () {
      that.setData({
        time: that.data.time + 1
      })
        
    }, 1000)
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
  getArticle:function(id){
    var that = this;
    wx.request({
      url: app.globalData.baseURL + '/article/getArticleById',
      data: {
        id:id,
        userId: app.globalData.user.userId
      },
      header: {
        'content-type': 'application/json' //默认值
      },
      success: function (res) {
        //console.log(res.data);
        var arti = res.data;
        //console.log(arti.article)
        var artic = arti.article.replace(/\\n/g,"");
        console.log(artic.split(" "))
        that.setData({
          article: arti,
          art:artic.split(" ")
        })
      }

    })
  },
  getWord: function (b) {
    var self = this;
    var a = b.target.dataset.text;
    this.setData({
      textcolor:'rgb(250,169,62)'
    })
    wx.navigateTo({
      url: '/pages/search/search?word=' + a,
    })
  },
  updateWordCount:function(){
    var that =this;
    that.setData({
      readtime: that.data.time
    })

    if(app.globalData.user != null) {
      if (that.data.time >= 15) {

        wx.request({
          url: app.globalData.baseURL + '/article/updateWordCount',
          data: {
            wordCount: this.data.article.wordCount,
            articleId: this.data.article.id,
            userId: app.globalData.user.userId,
            readTime: that.data.readtime
          },
          header: {
            'content-type': 'application/json' //默认值
          },

        })
        wx.showToast({
          title: '阅读完成',
          image: '/images/check-circle.svg',
          duration: 1000,
          mask: true,
          success: function (res) { },
          fail: function (res) { },
          complete: function (res) { },
        })

        //if(that.data.readtime>=60){
        var read = that.data.readtime;
        var min = read / 60;
        var sec = read - min.toFixed(2).split(".")[0] * 60;
        that.setData({
          readtime: "耗时" + min.toFixed(2).split(".")[0] + "分" + sec + "秒"
        })
        // }
        //console.log("延迟调用============")
        that.showRule();

      }
      else {
        wx.showToast({
          title: '请仔细阅读',
          image: '/images/alert-circle.svg',
          duration: 1000,
          mask: true,
          success: function (res) { },
          fail: function (res) { },
          complete: function (res) { },
        })

      }
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
  showRule: function () {
    this.setData({
      isRuleTrue: true
    })
  },
  hideRule: function () {
    var that = this;
    // wx.request({
    //   url: app.globalData.baseURL + '/article/completeRead',
    //   data: {
    //     userId: app.globalData.user.userId,
    //     articleId: that.data.article.id,
    //     wordCount: that.data.article.wordCount,
    //     readTime: that.data.readtime
    //   },
    //   header: {
    //     'content-type': 'application/json' //默认值
    //   },

    // })
    wx.navigateBack({
      delta:1
    })
  }
  
})