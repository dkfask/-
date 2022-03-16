// index.js
// 获取应用实例
const app = getApp()

Page({
  data: {
    motto: '欢迎使用积分系统',
    userInfo: {},
    hasUserInfo: false,
    canIUse: wx.canIUse('button.open-type.getUserInfo'),
    canIUseGetUserProfile: false,
    canIUseOpenData: false ,// 如需尝试获取用户信息可改为false
    openid:""
  },
  // 事件处理函数
  bindViewTap() {
    this.getUserProfile()
    // wx.navigateTo({
    //    url: '../logs/logs'
    // })
  },
  onShow(){
  
  },
  onLoad() {
    wx.setNavigationBarTitle({

      title: "首页"
   
    })
   
    if (wx.getUserProfile) {
      
      this.setData({
        canIUseGetUserProfile: true
      })
    }
   
  },
  getUserProfile(e) {
    // 推荐使用wx.getUserProfile获取用户信息，开发者每次通过该接口获取用户个人信息均需用户确认，开发者妥善保管用户快速填写的头像昵称，避免重复弹窗
    wx.getUserProfile({
      desc: '展示用户信息', // 声明获取用户个人信息后的用途，后续会展示在弹窗中，请谨慎填写
      success: (res) => { 
        // console.log(res)
        // console.log(res.userInfo.nickName) 
        app.globalData.userInfo = res.userInfo.nickName
        app.globalData.cloudId = res.cloudID
        app.globalData.hs_url = res.userInfo.avatarUrl
        // console.log(app.globalData.userInfo,app.globalData.cloudId,app.globalData.hs_url)
       
        this.getOpenid() 
        this.setData({
          userInfo: res.userInfo,
          hasUserInfo: true
        })
      }
    })
  },
  onLuanch(){
    
    },
  getOpenid(){
    let page = this;
    wx.cloud.callFunction({
      name:'getopenid',
      complete:res=>{
        // console.log('openid--',res)
        var openid = res.result.openid
        app.globalData.openid = openid 
        // console.log(app.globalData.openid)
      }
    })
  },
 
})
