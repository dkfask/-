// pages/my/my.js
const app = getApp()
Page({

    /**
     * 页面的初始数据
     */
    data: {
            url : null,
            name :null,
            num:null,
            arr :[],
            len :null
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        this.get_data()
        this.get_usershop()
        this.setData({
            url : app.globalData.hs_url,
            name :app.globalData.userInfo
        })
    },
    get_usershop(){
    var openid = app.globalData.openid 
    var db=wx.cloud.database()
    if(openid == undefined)
    {
      wx.showToast({
        title: '请先登录',
        icon:'error'
      })
      return
    }
    db.collection("user_shop").where({
        _openid : openid,
    }).get().then(res=>{
        console.log(res.data)
        this.setData({
            arr:res.data,
            len:res.length
        })
        
    })
    },
    get_data()
{
    var openid = app.globalData.openid 
    var db=wx.cloud.database()
    if(openid == undefined)
    {
      wx.showToast({
        title: '请先登录',
        icon:'error'
      })
      return
    }
    db.collection("User").where({
        _openid : openid,
    }).get().then(res=>{
        console.log("查询成功")
        console.log(res.data[0].jifeng)
        this.setData({
            num:res.data[0].jifeng
        })
    })
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
        this.onLoad()
        wx.stopPullDownRefresh()
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