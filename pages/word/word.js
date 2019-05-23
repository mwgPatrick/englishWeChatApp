// pages/word/word.js
const app = getApp()

//var word = 'SunGlow'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    user: '1',
    dog: 'a',
    test: ['n.朝霞,晚霞,日光'],
    word: 'SunGlow',
    phon: '/\'sʌnɡləʊ/',
    webdetail:[],
    web:'',
    speakurl:''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(this.data.word)
    this.getdata(this.data.word);
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
    console.log(this.data.word)
    this.getdata(this.data.word);
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
  word: function (e) {
    var that=this;
   // console.log(e.detail);
    if(e.detail.value.length>=40){
      wx.showToast({
        title: '最多输入40字符'
      })
    }
    if(e.detail.value==""){
      //console.log("1111111111")
      that.setData({
        focus:true,
        word:'未输入单词',
        test:['单词释义'],
        web:'网络释义',
        phon: '',
        webdetail: []
      })
    }
    else{
      that.setData({
        focus: true,
        word: e.detail.value,
        test: ['单词释义'],
        phon: '',
        web: '网络释义',
        webdetail: []
      })
    }
    
    //this.getdata(this.data.word)
  },
  suo: function (e) {
    console.log(e);
  },
  searchWord:function(){
    this.getdata(this.data.word)
  },
  getdata: function (a) {

    var self = this;
    console.log(a);
    
    if(app.globalData.user!=null){
      wx.request({
        url: app.globalData.baseURL + '/word/getByWord',
        data: {
          word: a,
          userId: app.globalData.user.userId
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
            speakurl: res.data.speakUrl,
            
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
  getByDb:function(a){
    var self = this;
    console.log(a);
    wx.request({
      url: app.globalData.baseURL + '/word/getWordByDB',
      data: {
        word: a
      },
      header: ({
        "context-type": "text/xml"
      }),
      method: "GET",
      dataType: 'json',
      success: function (res) {
        //console.log('getdata.() success');
        console.log(res.data);
        if (res.data.translation != null)
          self.setData({
            word: a,
            test: [res.data.translation.replace(";","\n")]
          })
        else
          self.setData({
            word: a,
            test: ['未查到']
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
  play:function(){
    // const version = wx.getSystemInfoSync().SDKVersion;
    // if (util.compareVersion(version, '2.3.0') >= 0) {
    //   wx.setInnerAudioOption({
    //     obeyMuteSwitch: false
    //   })
    // } else {
    //   wx.showModal({
    //     title: '提示',
    //     content: '当前微信版本过低，静音模式下可能会导致播放音频失败。'
    //   })
    // }
    var innerAudioContext = wx.createInnerAudioContext()
    innerAudioContext.src = this.data.speakurl;
    innerAudioContext.play();
  },
  random:function(){
    if (app.globalData.user != null) {
      wx.navigateTo({
        url: '/pages/randword/randword',
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