// pages/search/search.js
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    word:'',
    phon:'',
    test:[],
    webdetail: [],
    web: '',
    speakurl:''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      word:options.word
    })
    this.getdata(options.word)
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
  getdata: function (a) {

    var self = this;
    console.log(a);
    wx.request({
      url: app.globalData.baseURL + '/word/getByWord',
      data: {
        word: a,
        userId:app.globalData.user.userId
      },
      header: ({
        "context-type": "text/xml"
      }),
      method: "GET",
      dataType: 'json',
      success: function (res) {
        //console.log('getdata.() success');
        console.log(res.data);
        if (res.data.basic != null) {
          var transl = res.data.basic.explains;
          console.log(transl)
          self.setData({
            word: a,
            test: transl,

          })
          if (res.data.basic.phonetic != null) {
            self.setData({
              phon: '音标: /' + res.data.basic.phonetic.replace(";", "/,/") + '/'
            })
          }
          else {
            self.setData({
              phon: '无音标'
            })

          }
          if (res.data.web != null) {
            var webinfo = res.data.web;
            console.log(webinfo);
            self.setData({
              web: '以下内容来自网络',
              webdetail: webinfo
            })
          }
        }
        else if (res.data.translation != null) {
          var transl = res.data.translation;
          self.setData({
            word: a,
            phon: '无音标',
            test: transl
          })
        }

        else
          self.setData({
            word: a,
            test: ["未查到"]
          })
        
        self.setData({
          speakurl:res.data.speakUrl
        })
        // wx.showToast({
        //   title: 'ok',
        //   icon: 'success'
        // })
      },
      fail: function (res) {
        console.log('getdata.() fail');
      },
      complete: function (res) {
        console.log('getdata.() complete');
      }


    })



  },
  back:function(){
    wx.navigateBack({
      delta:1
    })
  },
  play: function () {
    var innerAudioContext = wx.createInnerAudioContext();
    innerAudioContext.src = this.data.speakurl;
    innerAudioContext.play();
  }

})