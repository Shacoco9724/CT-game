// test/test.js
const util = require('../../utils/util.js')
Page({

      /**
       * 页面的初始数据
       */
      data: {
        hidden:true,
        flag:false,
        x:0,
        y:0,
        maopaotimes:0,
        changetimes:0,
        changetimesok:0,
        textarea:'',
        score:0,
    // 进入页面开始显示的数字：以随机数显示
        data:[{index:Math.round(Math.random()*100)},
          { index: Math.round(Math.random()*100) },
          { index: Math.round(Math.random()*100) },
          { index: Math.round(Math.random()*100) },
          { index: Math.round(Math.random()*100) },
          { index: Math.round(Math.random()*100) },
          { index: Math.round(Math.random()*100) },
        ],
        disabled: true,
        elements:[]
      },

    // 产生随机数事件
    changeNumber:function(e){
        let data = this.data.data;
        for(var i = 0;i<7;i++)
        {
            data[i].index = Math.round(Math.random()*100);
        }
        this.setData({
            data:data
        })
    },
      /**
       * 生命周期函数--监听页面加载
       */
      onLoad: function (options) {
        
          var query = wx.createSelectorQuery();
          var nodesRef = query.selectAll(".item");
          nodesRef.fields({
          dataset: true,
          rect:true
          
        },(result)=>{
            this.setData({
              elements: result
            })
            }).exec()

        this.data.maopaotimes+=1;
        // wx.getUserProfile({
        //     desc: '获取用户信息用于维护会员权益',
        //     lang:'zh_CN',
        //     success:(res)=>{
        // let db = wx.cloud.database()
        // // var userInfo = res.userInfo;
        // db.collection("bubble_users").add({
        //   data:{
        //     // userInfo:res.userInfo
        //     // _id:res._id,
        //     maopaotimes:this.data.maopaotimes,
        //     changetimes:this.data.changetimes,
        //     changetimesok:this.data.changetimesok,
        //     score:this.data.score,
        //     time:util.formatTime(new Date())
        //   }
        // })
//     }
// })

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
    // 在进入冒泡排序页面后进行的操作都会执行
    // 在退出冒泡排序页面后的数据就是在这个监听页面卸载执行
      onUnload: function () {
        let db = wx.cloud.database()
        db.collection("bubble_users").add({
            // 在数据库存储的数据还包括用户每次登陆的id和唯一的用户openid，可以用来识别是哪一个用户
          data:{
            maopaotimes:this.data.maopaotimes,
            changetimes:this.data.changetimes,
            changetimesok:this.data.changetimesok,
            score:this.data.score,
            time:util.formatTime(new Date())
          }
        })
      },
    
      /**
       * 页面相关事件处理函数--监听用户下拉动作
       */
      onPullDownRefresh: function () {
      
    },
      /**
       * 页面上拉触底事件的处理函数
       */
      onReachBottom:function () {
      
      },
    
      /**
       * 用户点击右上角分享
       */
      onShareAppMessage: function () {
      
      },
    
      //长按
      _longtap:function(e){
        const detail = e.detail;
        this.setData({
          x: e.currentTarget.offsetLeft,
          y: e.currentTarget.offsetTop
        })
        this.setData({
          hidden: false,
          flag:true
        })
      },
      //触摸开始
      touchs:function(e){
        this.setData({
          beginIndex:e.currentTarget.dataset.index
        })
      },
      //触摸结束（完成数字交换）
      touchend:function(e){
        if (!this.data.flag) {
          return;
        }
        const x = e.changedTouches[0].pageX
        const y = e.changedTouches[0].pageY
        const list = this.data.elements;
        let data = this.data.data
        for(var j = 0; j<list.length; j++){
          const item = list[j];
          if(x>item.left && x<item.right && y>item.top && y<item.bottom){
            const endIndex = item.dataset.index;
            const beginIndex = this.data.beginIndex;
            // 加了这个条件 是保证不能让不相邻的元素进行交换
            if(Math.abs(beginIndex-endIndex)==1){
            //向后移动
            if (beginIndex < endIndex) {
              let tem = data[beginIndex];
              for (let i = beginIndex; i < endIndex; i++) {
                data[i] = data[i + 1]
              }
              data[endIndex] = tem;
            }
            //向前移动
            if (beginIndex > endIndex) {
              let tem = data[beginIndex];
              for (let i = beginIndex; i > endIndex; i--) {
                data[i] = data[i - 1]
              }
              data[endIndex] = tem;
            }
            this.setData({
                data: data,
                textarea:'做的好，继续加油！',
                score:this.data.score+=10
            })
            // 每成功交换一次就把交换成功次数加1
            this.data.changetimesok+=1;
            }
            else{
                this.setData({
                    textarea:'不能交换哦',
                    score:this.data.score-5
                })
            }
            }
        }
        this.setData({
            hidden: true,
            flag: false
        })
        // 每移动卡牌数字一次就把次数加1
        this.data.changetimes+=1;
        // 把排序页面中的进入页面次数、成功交换卡牌数字次数、总共移动交换卡牌次数和获取的分数存入数据池
        
        var developer = {
            mpt:this.data.maopaotimes,
            ctok:this.data.changetimesok,
            ct:this.data.changetimes,
            score:this.data.score,
        }
        
        // 存入数据池函数
        wx.setStorageSync('developer',developer);

    },
      //滑动
      touchm:function(e){
        if(this.data.flag){
          const x = e.touches[0].pageX
          const y = e.touches[0].pageY
          this.setData({
            x: x - 35,
            y: y - 45
          })
        }
      },

    })
    