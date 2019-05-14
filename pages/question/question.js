// pages/question/question.js
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    id:'',
    question:'',
    markA:'',
    markB:'',
    markC:'',
    markD:'',
    answer:'',
    remark:'',
    author:'',
    time:'',
    isRuleTrue:true,
    isA:false,
    isB:false,
    isC:false,
    isD:false,
    current:-1,
    isRuleTrueMa:false
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getQuestion();
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
    var that = this;
    wx.request({
      url: app.globalData.baseURL + '/choice/getRandomChoice',
      data: {
      },
      header: {
        'content-type': 'application/json' //默认值
      },
      success: function (res) {
        console.log(res.data);
        if(res.data.markC!=null){
          that.setData({
            question: res.data.question,
            markA: res.data.markA,
            markB: res.data.markB,
            markC: res.data.markC,
            markD: res.data.markD,
            time: res.data.createTime,
            author: res.data.author,
            id: res.data.id,
            isRuleTrue:true
          })
        }
        else{
          that.setData({
            question: res.data.question,
            markA: res.data.markA,
            markB: res.data.markB,
            time: res.data.createTime,
            author: res.data.author,
            id: res.data.id,
            isRuleTrue:false
          })
        }
        
      }

    })
  },
  selectA:function(){
    this.setData({
      isA:true,
      isB:false,
      isC:false,
      isD:false,
      current:0
    })
  },
  selectB: function () {
    this.setData({
      isA: false,
      isB: true,
      isC: false,
      isD: false,
      current: 1
    })
  },
  selectC: function () {
    this.setData({
      isA: false,
      isB: false,
      isC: true,
      isD: false,
      current: 2
    })
  },
  selectD: function () {
    this.setData({
      isA: false,
      isB: false,
      isC: false,
      isD: true,
      current: 3
    })
  },
  submit:function(){
    var that = this;
    if(that.data.current!=-1)
    wx.request({
      url: app.globalData.baseURL + '/choice/getAnswerById',
      data: {
        id:this.data.id,
        select:this.data.current,
        userId:app.globalData.user.userId
      },
      header: {
        'content-type': 'application/json' //默认值
      },
      success: function (res) {
        console.log(res.data);
        that.setData({
          answer:res.data.answer,
          remark:'解析：' + res.data.remark
        })
        if (that.data.answer == that.data.current) {
          that.setData({
            daan: '恭喜您答对了这道题。'
          })
        }
        else {
          that.setData({
            daan: '很遗憾没能答对。'
          })
        }
      }

    })
    else{
      that.setData({
        daan:'您没有作答',
        remark:'解析：无'
      })
    }
    this.setData({
      isRuleTrueMa:true
    })
  },
  hideRule:function(){
    this.setData({
      isRuleTrueMa: false
    })
    wx.redirectTo({
      url: '/pages/question/question',
    })
  },
  exit:function(){
    wx.switchTab({
      url: '/pages/choice/choice',
    })
  }
})