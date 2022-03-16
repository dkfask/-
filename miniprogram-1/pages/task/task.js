const { formatTime } = require("../../utils/util");
const util = require("../../utils/util.js");
const app = getApp()
// pages/task/task.js
Page({

    /**
     * 页面的初始数据
     */
    data: {
        signState: false, //签到状态
        showDialog_0: false,
        showDialog_1: false,
        setTime:false,
        
    },
    onLoad: function (options) {
    
    this.add()
    var date = util.formatTime(new Date())
    console.log(date)
    
    wx.setNavigationBarTitle({

      title: "任务"
   
    })

         
        
         
        
  },
  
  onPullDownRefresh: function () {
    this.onLoad()
    wx.stopPullDownRefresh()
  },
    add()
    {
      const db = wx.cloud.database();
      var openid =app.globalData.openid 
      console.log(openid,"1")
      const _ = db.command
      db.collection('User').where({
        _openid:openid
    }).get().then(res=>{
        console.log(res)
        if(openid==undefined)
        {
          console.log("openid为空")
        }
        else{
          if(res.data.length==0) 
          {
            console.log("用户不存在，添加用户")
            this.user_add(openid);
          }else
          {
            if(res.data[0]._openid==openid)
            {
              console.log("存在用户");
            }else{
              console.log("用户不存在，添加用户")
              this.user_add(openid);
            }
          
          }
        }
     
    })
    },
    user_add(id)
    {
      const db = wx.cloud.database();
      console.log("调用add函数")
      db.collection("User").add({
        data:{
          jifeng:0,
        }
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
    user_add_date(id,date)
    {

      const db = wx.cloud.database();
      db.collection("User").doc(id
      ).update({
        data:{
          date:date,
        }
      }).then(res=>{
        console.log("增加成功")
      }).catch(res=>{
        console.log("增加失败")
      })
      console.log("调用时间增加函数")
    },
    user_updata_date(id,date)
    {

      const db = wx.cloud.database();
      db.collection("User").doc(id
      ).update({
        data:{
          date:date,
        }
      }).then(res=>{
        console.log("时间修改成功")
      }).catch(res=>{
        console.log("时间修改失败")
      })
  
    },
submit_0(e){
        var hms_0 = "06:00:00"
        var hms_1 = "08:30:00"
        var date = util.formatTime(new Date())
        var openid =app.globalData.openid
        const db = wx.cloud.database();
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
          if(res.data[0].date == undefined)
          {
              var sum = res.data[0].jifeng + 30
              this.user_updata(res.data[0]._id,sum)
              this.user_add_date(res.data[0]._id,date)
              wx.showToast({
                title: '签到成功',
              })
          }else{
            console.log(res.data[0].date)
            if(date.split(" ")[1]<=hms_0||date.split(" ")[1]>=hms_1)
            {
              console.log("不在签到时间")
              wx.showToast({
                title: '不在签到时间',
                icon:"error"
              })
          }else{
            if(date.split(" ")[0]==res.data[0].date.split(" ")[0])
            {
              console.log("无需更改时间")
              wx.showToast({
                title: '今天已签到',
                icon:"error"
              })
            }
            var sum = res.data[0].jifeng + 30
              
              this.user_updata(res.data[0]._id,sum)
              this.user_updata_date(res.data[0]._id,date)
              wx.showToast({
                title: '积分+30',
              })
          }
          }
        }).catch(err=>{
          console.log(err)
          console.log("查询失败")
        })
  
      
     
   
},
interpreter(){
  wx.navigateTo({
    url: '../interpreter/interpreter?id=1'
  })
} ,  
submit_1(e){
        var hms_0 = "08:00:00"
        var hms_1 = "09:00:00"
        var date = util.formatTime(new Date())
        var openid =app.globalData.openid
        if(openid == undefined)
        {
          wx.showToast({
            title: '请先登录',
            icon:'error'
          })
          return 
        }
        const db = wx.cloud.database();
        db.collection("User").where({
          _openid : openid,
        }).get().then(res=>{
          
          if(res.data[0].date_1 == undefined)
          {
            db.collection("User").doc(res.data[0]._id
            ).update({
              data:{
                date_1:date,
              }
            }).then(r=>{
              console.log("增加成功1")
              console.log(res)
              var sum = res.data[0].jifeng + 10
              this.user_updata(res.data[0]._id,sum)
              wx.showToast({
                title: '签到成功',
              })
            }).catch(err=>{
              console.log(err)
              console.log("增加失败")
            })
            console.log("调用时间增加函数")
          }else{
            console.log(res.data[0].date_1)
            if(date.split(" ")[0]==res.data[0].date_1.split(" ")[0])
            {
              if(date.split(" ")[1]>=hms_0&&date.split(" ")[1]<=hms_1)
              {
                console.log("无需更改时间")
              wx.showToast({
                title: '今天已签到',
                icon:"error"
              })
               
              }else
              {
                console.log("不在签到时间")
                wx.showToast({
                  title: '不在签到时间',
                  icon:"error"
                })
            }
            }
            else{
              var sum = res.data[0].jifeng + 10
              console.log(sum)
              const db = wx.cloud.database();
              db.collection("User").doc(res.data[0]._id
              ).update({
                data:{
                  date_1:date,
                }
              }).then(res=>{
                console.log("时间修改成功")
              }).catch(res=>{
                console.log("时间修改失败")
              })
              this.user_updata(res.data[0]._id,sum)
              wx.showToast({
                title: '积分+10',
              })
            }
          }
        }).catch(err=>{
          console.log(err)
          console.log("查询失败")
        })
},
submit_2(e){
  var hms_0 = "06:00:00"
  var hms_1 = "23:59:59"
  var date = util.formatTime(new Date())
  var openid =app.globalData.openid
  if(openid == undefined)
  {
    wx.showToast({
      title: '请先登录',
      icon:'error'
    })
    return 
  }
  const db = wx.cloud.database();
  db.collection("User").where({
    _openid : openid,
  }).get().then(res=>{
    
    if(res.data[0].date_2 == undefined)
    {
      db.collection("User").doc(res.data[0]._id
      ).update({
        data:{
          date_2:date,
        }
      }).then(r=>{
        
        console.log(res)
        var sum = res.data[0].jifeng + 10
        this.user_updata(res.data[0]._id,sum)
        wx.showToast({
          title: '签到成功',
        })
      }).catch(err=>{
        console.log(err)
        console.log("增加失败")
      })
      console.log("调用时间增加函数")
    }else{
      console.log(res.data[0].date_2)
      if(date.split(" ")[0]==res.data[0].date_2.split(" ")[0])
      {
        if(date.split(" ")[1]>=hms_0&&date.split(" ")[1]<=hms_1)
        {
          console.log("无需更改时间")
        wx.showToast({
          title: '今天已签到',
          icon:"error"
        })
         
        }else
        {
          console.log("不在签到时间")
          wx.showToast({
            title: '不在签到时间',
            icon:"error"
          })
      }
      }
      else{
        var sum = res.data[0].jifeng + 10
        console.log(sum)
        const db = wx.cloud.database();
        db.collection("User").doc(res.data[0]._id
        ).update({
          data:{
            date_2:date,
          }
        }).then(res=>{
          console.log("时间修改成功")
        }).catch(res=>{
          console.log("时间修改失败")
        })
        this.user_updata(res.data[0]._id,sum)
        wx.showToast({
          title: '积分+10',
        })
      }
    }
  }).catch(err=>{
    console.log(err)
    console.log("查询失败")
  })
},
submit_3(e){
  var hms_0 = "06:00:00"
  var hms_1 = "23:59:59"
  var date = util.formatTime(new Date())
  var openid =app.globalData.openid
  if(openid == undefined)
  {
    wx.showToast({
      title: '请先登录',
      icon:'error'
    })
    return 
  }
  const db = wx.cloud.database();
  db.collection("User").where({
    _openid : openid,
  }).get().then(res=>{
    
    if(res.data[0].date_3 == undefined)
    {
      db.collection("User").doc(res.data[0]._id
      ).update({
        data:{
          date_3:date,
        }
      }).then(r=>{
        console.log("增加成功1")
        console.log(res)
        var sum = res.data[0].jifeng + 15
        this.user_updata(res.data[0]._id,sum)
        wx.showToast({
          title: '签到成功',
        })
      }).catch(err=>{
        console.log(err)
        console.log("增加失败")
      })
      console.log("调用时间增加函数")
    }else{
      console.log(res.data[0].date_3)
      if(date.split(" ")[0]==res.data[0].date_3.split(" ")[0])
      {
        if(date.split(" ")[1]>=hms_0&&date.split(" ")[1]<=hms_1)
        {
          console.log("无需更改时间")
        wx.showToast({
          title: '今天已签到',
          icon:"error"
        })
         
        }else
        {
          console.log("不在签到时间")
          wx.showToast({
            title: '不在签到时间',
            icon:"error"
          })
      }
      }
      else{
        var sum = res.data[0].jifeng + 15
        console.log(sum)
        const db = wx.cloud.database();
        db.collection("User").doc(res.data[0]._id
        ).update({
          data:{
            date_3:date,
          }
        }).then(res=>{
          console.log("时间修改成功")
        }).catch(res=>{
          console.log("时间修改失败")
        })
        this.user_updata(res.data[0]._id,sum)
        wx.showToast({
          title: '积分+15',
        })
      }
    }
  }).catch(err=>{
    console.log(err)
    console.log("查询失败")
  })
},
submit_4(e){
  var hms_0 = "06:00:00"
  var hms_1 = "23:59:59"
  var date = util.formatTime(new Date())
  var openid =app.globalData.openid
  if(openid == undefined)
  {
    wx.showToast({
      title: '请先登录',
      icon:'error'
    })
    return 
  }
  const db = wx.cloud.database();
  db.collection("User").where({
    _openid : openid,
  }).get().then(res=>{
    
    if(res.data[0].date_4 == undefined)
    {
      db.collection("User").doc(res.data[0]._id
      ).update({
        data:{
          date_4:date,
        }
      }).then(r=>{
        console.log("增加成功1")
        console.log(res)
        var sum = res.data[0].jifeng + 20
        this.user_updata(res.data[0]._id,sum)
        wx.showToast({
          title: '签到成功',
        })
      }).catch(err=>{
        console.log(err)
        console.log("增加失败")
      })
      console.log("调用时间增加函数")
    }else{
      console.log(res.data[0].date_4)
      if(date.split(" ")[0]==res.data[0].date_4.split(" ")[0])
      {
        if(date.split(" ")[1]>=hms_0&&date.split(" ")[1]<=hms_1)
        {
          console.log("无需更改时间")
        wx.showToast({
          title: '今天已签到',
          icon:"error"
        })
         
        }else
        {
          console.log("不在签到时间")
          wx.showToast({
            title: '不在签到时间',
            icon:"error"
          })
      }
      }
      else{
        var sum = res.data[0].jifeng + 20
        console.log(sum)
        const db = wx.cloud.database();
        db.collection("User").doc(res.data[0]._id
        ).update({
          data:{
            date_4:date,
          }
        }).then(res=>{
          console.log("时间修改成功")
        }).catch(res=>{
          console.log("时间修改失败")
        })
        this.user_updata(res.data[0]._id,sum)
        wx.showToast({
          title: '积分+20',
        })
      } 
    }
  }).catch(err=>{
    console.log(err)
    console.log("查询失败")
  })
},
submit_5(e){
  var hms_0 = "06:00:00"
  var hms_1 = "23:59:59"
  var date = util.formatTime(new Date())
  var openid =app.globalData.openid
  if(openid == undefined)
  {
    wx.showToast({
      title: '请先登录',
      icon:'error'
    })
    return 
  }
  const db = wx.cloud.database();
  db.collection("User").where({
    _openid : openid,
  }).get().then(res=>{
    
    if(res.data[0].date_5 == undefined)
    {
      db.collection("User").doc(res.data[0]._id
      ).update({
        data:{
          date_5:date,
        }
      }).then(r=>{
        console.log("增加成功1")
        console.log(res)
        var sum = res.data[0].jifeng + 10
        this.user_updata(res.data[0]._id,sum)
        wx.showToast({
          title: '签到成功',
        })
      }).catch(err=>{
        console.log(err)
        console.log("增加失败")
      })
      console.log("调用时间增加函数")
    }else{
      console.log(res.data[0].date_5)
      if(date.split(" ")[0]==res.data[0].date_5.split(" ")[0])
      {
        if(date.split(" ")[1]>=hms_0&&date.split(" ")[1]<=hms_1)
        {
          console.log("无需更改时间")
        wx.showToast({
          title: '今天已签到',
          icon:"error"
        })
         
        }else
        {
          console.log("不在签到时间")
          wx.showToast({
            title: '不在签到时间',
            icon:"error"
          })
      }
      }
      else{
        var sum = res.data[0].jifeng + 10
        console.log(sum)
        const db = wx.cloud.database();
        db.collection("User").doc(res.data[0]._id
        ).update({
          data:{
            date_5:date,
          }
        }).then(res=>{
          console.log("时间修改成功")
        }).catch(res=>{
          console.log("时间修改失败")
        })
        this.user_updata(res.data[0]._id,sum)
        wx.showToast({
          title: '积分+10',
        })
      }
    }
  }).catch(err=>{
    console.log(err)
    console.log("查询失败")
  })
},
submit_6(e){
  var hms_0 = "00:00:00"
  var hms_1 = "23:59:59"
  var  aDate,  oDate1,  oDate2,  iDays ,odate1,odate2
  var date = util.formatTime(new Date())
  var openid =app.globalData.openid
  if(openid == undefined)
  {
    wx.showToast({
      title: '请先登录',
      icon:'error'
    })
    return 
  }
  const db = wx.cloud.database();
  db.collection("User").where({
    _openid : openid,
  }).get().then(res=>{
    
    if(res.data[0].date_6 == undefined)
    {
      db.collection("User").doc(res.data[0]._id
      ).update({
        data:{
          date_6:date,
        }
      }).then(r=>{
        console.log("增加成功1")
        console.log(res)
        var sum = res.data[0].jifeng + 30
        this.user_updata(res.data[0]._id,sum)
        wx.showToast({
          title: '签到成功',
        })
      }).catch(err=>{
        console.log(err)
        console.log("增加失败")
      })
      console.log("调用时间增加函数")
    }else{
      console.log(res.data[0].date_6)
      odate1 = new Date(date.split(" ")[0])
      odate2 = new  Date(res.data[0].date_6.split(" ")[0]) 
      iDays = parseInt(Math.abs(odate1  -  odate2)/1000/60/60/24)
          
      if(iDays<2)
      {
        if(date.split(" ")[1]>=hms_0&&date.split(" ")[1]<=hms_1)
        {
         
          
        wx.showToast({
          title: '本次已签到',
          icon:"error"
        })
         
        }else
        {
          console.log("不在签到时间")
          wx.showToast({
            title: '不在签到时间',
            icon:"error"
          })
      }
      }
      else{
          
        var sum = res.data[0].jifeng + 20
      
        const db = wx.cloud.database();
        db.collection("User").doc(res.data[0]._id
        ).update({
          data:{
            date_6:date,
          }
        }).then(res=>{
          console.log("时间修改成功")
        }).catch(res=>{
          console.log("时间修改失败")
        })
        this.user_updata(res.data[0]._id,sum)
        wx.showToast({
          title: '20',
        })
      }
    }
  }).catch(err=>{
    console.log(err)
    console.log("查询失败")
  })
},

})