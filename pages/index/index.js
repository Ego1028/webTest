//index.js
//获取应用实例
const app = getApp()

var util = require('../../utils/util.js');

// Generate four random hex digits.  
function S4() {
  return (((1 + Math.random()) * 0x10000) | 0).toString(16).substring(1);
};
// Generate a pseudo-GUID by concatenating random hexadecimal.  
function guid() {
  return (S4() + S4() + "-" + S4() + "-" + S4() + "-" + S4() + "-" + S4() + S4() + S4());
};

Page({
  data: {
    //motto: 'Hello World',
    //userInfo: {},
    //hasUserInfo: false,
    //canIUse: wx.canIUse('button.open-type.getUserInfo'),
    guid: 0,
    webService:['ATT','Verizon','中国移动','中国联通'],
    networkType: '',
    index:0,
    yw_latency_trail: 1,
    yw_latency: [0,0,0,0,0],
    yw_latency_avg: 0,
    ic_latency_trail: 1,
    ic_latency: [0,0,0,0,0],
    ic_latency_avg: 0,
    name:'',
    web:'',
    currentUrl:'',
    button:true,
    location:'', 
    longitude: 0,
    latitude: 0,
    /** 
    data: {
      "tester_name":'',
      "test_case_id":'',
      "network_type": '',
      "network_service_name": '',
      "longitude": 0,
      "latitude":'',
      "formatted_address": '',
      "test_start_time" : 0,
      "test_end_time" : 0,
      "upload_start_time" : 0,
      "upload_end_time": 0,
      "tests":[     ],
    },*/
  },
  //事件处理函数
  onSubmit: function(e){
    if(e.detail.value.name!=''){
      this.setData({
        name:e.detail.value.name,
        web:e.detail.value.service,
        button: false,
      })
    }
    else{
      wx.showModal({
        title: '出错啦x_x',
        content: '请输入姓名',
      })
    }
  },
  serviceChange: function(e){
    this.setData({
      index: e.detail.value,
      web: this.data.webService[e.detail.value],
    })
  },
  nameChange: function(e){
    this.setData({
      name: e.detail.value
    })
  },
  bindViewTap: function() {
    wx.navigateTo({
      url: '../logs/logs'
    })
  },
  startTest: function(){
    var that = this;
    that.setData({
      guid: guid(),
      test_start_time: util.formatTime(new Date())
    })
    var trail = 0;
    var testStartTime = util.formatTime(new Date());
    that.setData({
      currentUrl: 'ywappbackend',
    })
    var dummy=[];
    var start=util.getMili(new Date);
    wx.request({
      url: 'https://ywappbackend-demo.youworld.us/miniapp/test.json',
      header: {
        'content-type': 'application/json'
      },
      success(res) {
        var end = util.getMili(new Date);
        if(end>start){
          var diff = end - start;
        }
        else{
          var diff = end+1000-start;
        }
        console.log('latency: ',diff,'ms');
        dummy[trail]=diff;
        trail++;
        //console.log(dummy);
        start = util.getMili(new Date);
        wx.request({
          url: 'https://ywappbackend-demo.youworld.us/miniapp/test.json',
          header: {
            'content-type': 'application/json'
          },
          success(res) {
            that.setData({
              yw_latency_trail: 2
            })
            end = util.getMili(new Date);
            if (end > start) {
              diff = end - start;
            }
            else {
              diff = end + 1000 - start;
            }
            console.log('latency: ', diff, 'ms');
            dummy[trail] = diff;
            trail++;
            //console.log(dummy);
            start = util.getMili(new Date);
            wx.request({
              url: 'https://ywappbackend-demo.youworld.us/miniapp/test.json',
              header: {
                'content-type': 'application/json'
              },
              success(res) {
                that.setData({
                  yw_latency_trail: 3
                })
                end = util.getMili(new Date);
                if (end > start) {
                  diff = end - start;
                }
                else {
                  diff = end + 1000 - start;
                }
                console.log('latency: ', diff, 'ms');
                dummy[trail] = diff;
                trail++;
                //console.log(dummy);
                start = util.getMili(new Date);
                wx.request({
                  url: 'https://ywappbackend-demo.youworld.us/miniapp/test.json',
                  header: {
                    'content-type': 'application/json'
                  },
                  success(res) {
                    that.setData({
                      yw_latency_trail: 4
                    })
                    end = util.getMili(new Date);
                    if (end > start) {
                      diff = end - start;
                    }
                    else {
                      diff = end + 1000 - start;
                    }
                    console.log('latency: ', diff, 'ms');
                    dummy[trail] = diff;
                    trail++;
                    //console.log(dummy);
                    start = util.getMili(new Date);
                    wx.request({
                      url: 'https://ywappbackend-demo.youworld.us/miniapp/test.json',
                      header: {
                        'content-type': 'application/json'
                      },
                      success(res) {
                        that.setData({
                          yw_latency_trail: 5
                        })
                        end = util.getMili(new Date);
                        if (end > start) {
                          diff = end - start;
                        }
                        else {
                          diff = end + 1000 - start;
                        }
                        console.log('latency: ', diff, 'ms');
                        dummy[trail] = diff;
                        trail++;
                        //console.log(dummy);
                        var sum=0;
                        for(var i=0;i<5;i++){
                          sum+=dummy[i]
                        }
                        var avg=sum/5;
                        that.setData({
                          yw_latency: dummy,
                          yw_latency_avg:avg,
                          currentUrl:'',
                          yw_latency_trail: 1
                        })
                        //console.log(that.data.yw_latency);
                        //console.log(that.data.yw_latency_avg);
                        var testEndTime = util.formatTime(new Date());
                        that.setData({
                          test_end_time : testEndTime,
                        })
                        console.log(that.data)
                        var result = {
                          "data":
                          {
                            "tester_name": that.data.name,
                            "test_case_id": that.data.guid,
                            "network_type": that.data.networkType,
                            "network_service_name": that.data.web,
                            "longitude": that.data.longitude,
                            "latitude": that.data.latitude,
                            "formatted_address": that.data.location,
                            "test_start_time": that.data.test_start_time,
                            "test_end_time": that.data.test_end_time,
                            "upload_start_time": util.formatTime(new Date()),
                            "upload_end_time": 12312312,
                            "tests": [
                              {
                                "api_url": 'https://ywappbackend-demo.youworld.us/miniapp/test.json',
                                "api_name": "ywbackend",
                                "request_sent_from_client_time": 12312312,
                                "request_received_by_server_time": 12312312,
                                "response_sent_from_server_time": 12312312,
                                "response_received_by_client_time": 12312312
                              }
                            ]
                          }
                        }
                        wx.request({
                          url: 'https://cta0q1qb4c.execute-api.us-west-1.amazonaws.com/prod/send-result',
                          method: 'POST',
                          header: {
                            "Content-Type": "application/x-www-form-urlencoded"
                          },
                          data: JSON.stringify(result),
                          success(res){
                            wx.navigateTo({
                              url: '../result/result?name=' + that.data.name + '&web=' + that.data.web + '&yw_latency_avg=' + that.data.yw_latency_avg + '&location=' + that.data.location,
                            })
                          }
                        })
                      }
                    })
                  }
                })
              }
            })
          }
        })
      }
    })
  },
  onLoad: function () {
    if (app.globalData.userInfo) {
      this.setData({
        userInfo: app.globalData.userInfo,
        hasUserInfo: true
      })
    } else if (this.data.canIUse){
      // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
      // 所以此处加入 callback 以防止这种情况
      app.userInfoReadyCallback = res => {
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
          this.setData({
            userInfo: res.userInfo,
            hasUserInfo: true
          })
        }
      })
    }
  },
  onReady: function(){
    var that = this;
    var latitude = 0;
    var longitude = 0;
    wx.getNetworkType({
      success: function(res) {
        that.setData({
          networkType: res.networkType
        })
      },
    })
    wx.getLocation({
      success: function(res) {
        latitude = res.latitude;
        longitude = res.longitude;
        wx.request({
          url: 'https://maps.googleapis.com/maps/api/geocode/json',
          data:{
            latlng:''+latitude+','+longitude,
            key: 'AIzaSyAUd1MvJkwuVgauwE6hszDRYcvdDxdToek',
          },
          success(res){
            that.setData({
              location: res.data.results[0].formatted_address,
              longitude: longitude,
              latitude: latitude,
            })
          }
        })
      },
    })
  },
  getUserInfo: function(e) {
    console.log(e)
    app.globalData.userInfo = e.detail.userInfo
    this.setData({
      userInfo: e.detail.userInfo,
      hasUserInfo: true
    })
  }
})
