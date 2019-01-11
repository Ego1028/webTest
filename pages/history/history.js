const app = getApp()

var util = require('../../utils/util.js');

Page({

  /**
   * 页面的初始数据
   */
  data: {
    history:[],
  },

  checkResult: function(e){
    wx.navigateTo({
      url: '../history-result/history-result?name=' + this.data.history[e.currentTarget.dataset.id].name + '&web=' + this.data.history[e.currentTarget.dataset.id].web + '&yw_latency_avg=' + this.data.history[e.currentTarget.dataset.id].yw_latency_avg + '&location=' + this.data.history[e.currentTarget.dataset.id].location,
    })
  },

  clearHistory: function(){
    wx.clearStorageSync();
    wx.setStorageSync('history', []);
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
    var history = wx.getStorageSync('history');
    this.setData({
      history: history
    })
    //console.log(this.data.history);
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
    
  }
})