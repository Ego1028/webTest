const app = getApp()

var util = require('../../utils/util.js');

Page({

  /**
   * 页面的初始数据
   */
  data: {
    name:'',
    web:'',
    yw_latency_avg:0,
    location:'',
    time: '',
    history : [],
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    
    var dummy = wx.getStorageSync('history');
    var time = util.formatTime(new Date());
    this.setData({
      name:options.name,
      web:options.web,
      yw_latency_avg: options.yw_latency_avg,
      location:options.location,
      time:time,
      history:dummy,
    })
    this.data.history.push(
      {
        'name':this.data.name,
        'web':this.data.web,
        'yw_latency_avg':this.data.yw_latency_avg,
        'location':this.data.location,
        'time':this.data.time,
      }
    );
    wx.setStorageSync('history', this.data.history);
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
    
  }
})