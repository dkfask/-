// pages/Shop/Shop.js
const app = getApp()
Page({

    /**
     * 页面的初始数据
     */
    data: {
        userInfo: {},
        hasUserInfo: false,
        name :"",
        list:{},
        array: ['20', '50', '100', '200'],
        array0:['20-100', '100-300', '300-500', '500-1000'],
        array_0: ['400', '1000', '2000', '4000'],
        array_1: ['800', '2000', '4000', '8000'],
        array_2: ['1500', '4000', '8000', '12000'],
    },
    bindPickerChange: function(e) {
      console.log('picker发送选择改变，携带值为', e.detail.value)
      this.setData({
        index: e.detail.value
      })
    },
    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) { 
        this.getdata() 
        
        this.setData({
          name : app.globalData.userInfo
        })
        wx.setNavigationBarTitle({

          title: "商店"
       
        })
        this.name = app.globalData.userInfo
    },
    
    onRefresh(){
    
    },

    onPullDownRefresh: function () {
      this.onLoad()
      wx.stopPullDownRefresh()
    },
   
add_user_shop(text,num)
    {
      const db = wx.cloud.database();
      var openid =app.globalData.openid 
      var sum = 0  ;
      console.log(openid,"1")
      const _ = db.command
      db.collection('user_shop').where({
        _openid:openid,
        name :text
    }).get().then(res=>{
        console.log(res)
        if(openid==undefined)
        {
          console.log("openid为空")
        }
        else{
          if(res.data.length==0) 
          {
            console.log("商品不存在，添加商品")
            db.collection("user_shop").add({
              data:{
                name:text,
                num:sum+num
              }
            })
          }else
          {
            db.collection("user_shop").where({
              name : text
            }).get().then(re=>{
              console.log(re)
              db.collection("user_shop").doc(re.data[0]._id).update({
                data:{
                  num : re.data[0].num + num
                }
              })
            }).catch(err=>{
              console.log(err)
            })
          
          }
        }
     
    })
    },
    user_addshop(id)
    {
      db.collection("user_shop").doc(id).update({

      })
    },
    user_updata(id,sum)
    {

      const db = wx.cloud.database();
      db.collection("User").doc(id
      ).update({
        data:{
          jifeng: sum,
        }
      }).then(res=>{
        console.log("积分修改成功")
      }).catch(res=>{
        console.log("积分修改失败")
      })
      console.log("调用更新函数")
    },
    goumai_0(e){
      // var id = wx.getStorageSync('id')
      var openid = app.globalData.openid
      var db=wx.cloud.database()
      
     
      db.collection("User").where({
        _openid : openid,
      }).get().then(res=>{
        if(e.target.dataset.text==null)
        {wx.showToast({
          title:'请正确输入',
          icon:"error"
        })
      }else{
        var sum = res.data[0].jifeng - e.target.dataset.text
        if(sum<0){
          wx.showToast({
            title:'无法购买',
            icon:"error"
          })
        }else
          {
            this.user_updata(res.data[0]._id,sum)
            this.add_user_shop(e.target.dataset.name,1)
            wx.showToast({
              title: e.target.dataset.name+'购买成功,请截图', 
              icon : "none",
              duration: 10000
            })
          
          }
        }
      }).catch(err=>{
        console.log(err,"购买失败")
      })
    },
    getdata(){
      // var id = wx.getStorageSync('id')
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
      console.log(openid)
      db.collection("User").where({
        _openid : openid,
      }).get().then(res=>{
        console.log("查询成功")
        console.log(res.data)
        this.setData({
          list : res.data[0]
        })
      }).catch(err=>{
        console.log("查询失败")
      })
    }, 
    
})