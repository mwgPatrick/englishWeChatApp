//index.js
//获取应用实例
const app = getApp()

Page({
  data: {
    motto: 'Welcome!',
    userInfo: {},
    article:[],
    start:0,
    end:10,
    imageUrl:app.globalData.baseURL + '/image/m_logo.png'
  },
  //事件处理函数,
  onLoad: function () {
    this.getArticleTitle(this.data.start, this.data.end);  
  },
  onReachBottom: function () {
    
  },
  getArticleTitle:function(st,en){
    console.log(st)
    var that = this;
    wx.request({
      url: app.globalData.baseURL + '/article/getRangeTitle',
      data:{
        start: st,
        end: en
      },
      header: {
        'content-type': 'application/json' //默认值
      },
      success: function (res) {
        console.log(res.data);
        var article = res.data;
        if(res.data.length!=0){
          that.setData({
            //imageUrl:app.globalData.baseURL + article.imageUrl,
            article: res.data,
            start: that.data.start + 10,
          })
        }
        else{
          wx.showToast({
            title: '已到最后',
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
  },
  getArticleDetail:function(e){
    console.log(e.target.dataset.text);
    var id = e.target.dataset.text

    if (app.globalData.user != null) {
      wx.navigateTo({
        url: '/pages/article/article?id=' + id
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
  getMore:function(){
    this.getArticleTitle(this.data.start, this.data.end);
  },
  getBack:function(){
    var start = this.data.start;
    console.log(start)
    if(start>=20){
      this.setData({
        start: start - 20
      })
    }
    else{
      this.setData({
        start: start - 10
      })
      wx.showToast({
        title: '已到最前',
        image: '/images/alert-circle.svg',
        duration: 300,
        mask: true,
        success: function (res) { },
        fail: function (res) { },
        complete: function (res) { },
      })
    }
    this.getArticleTitle(this.data.start, this.data.end);
  }
  
})
