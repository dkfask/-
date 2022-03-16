// app.js
App({
  globalData:{
    userInfo: null,
    cloudId:null,
    openid:null,
    hs_url:null
  },
  onLaunch() {
    // 展示本地存储能力
    const logs = wx.getStorageSync('logs') || []
    logs.unshift(Date.now())
    wx.setStorageSync('logs', logs)
    wx.cloud.init() 
    
    wx.login({
      success: re => {
        // 发送 res.code 到后台换取 openId, sessionKey, unionId
      }
    }) 
    // 登录
   
  },
   
  
})
