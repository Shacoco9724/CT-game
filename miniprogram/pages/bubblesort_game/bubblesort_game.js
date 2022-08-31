// test/test.js
const util = require('../../utils/util.js')
const app = getApp();
//连接云数据库
const db = wx.cloud.database();
//获取云数据库中数据集合的引用
const bubblesort_score = db.collection('bubblesort_score');
//数据库操作符
const _ = db.command;
// 提交状态值
let submit = 0;
Page({

      /**
       * 页面的初始数据
       */
      data: {

        checked: false,
        begin:0,
        end:0,

        hidden:true,
        flag:false,
        x:0,
        y:0,
        maopaotimes:0,
        changetimes:0,
        changetimesok:0,
        textarea:'',
        score:0,
        userInfo:{nickName:'',
        avataUrl:'',},
    // 进入页面开始显示的数字：以随机数显示
    //     data:[{index:Math.round(Math.random()*100)},
    //       { index: Math.round(Math.random()*100) },
    //       { index: Math.round(Math.random()*100) },
    //       { index: Math.round(Math.random()*100) },
    //       { index: Math.round(Math.random()*100) },
    //       { index: Math.round(Math.random()*100) },
    //       { index: Math.round(Math.random()*100) },
    //     ],
    data:[{index:6},
        {index:8},
        {index:5},
        {index:1},
        {index:7},
        {index:4},
        {index:2}],
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
    // 在进入冒泡排序页面后进行的操作都会执行
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
        // 进入冒泡排序页面就加1
        this.data.maopaotimes+=1;
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
       this.player(wx.getBackgroundAudioManager())
      },
    
      /**
       * 生命周期函数--监听页面隐藏
       */
      onHide: function () {
        // 小程序隐藏时候暂停播放（不加页面将一直播放）
           wx.getBackgroundAudioManager().stop();
      },
    
      /**
       * 生命周期函数--监听页面卸载
       */
    // 在退出冒泡排序页面后的数据就是在这个监听页面卸载执行
      onUnload: function () {
        if(submit==0 && this.data.changetimes!=0)
        {
           // 如果用户没有点击提交排序结果按钮 并且 移动次数不为0，直接返回到首页时，这里返回后可以把数据存储到数据库
            let sortResult = {
                // 从全局变量中获取用户信息
                nickName:app.globalData.hasUserInfo?app.globalData.userInfo.nickName:'',
                // avatarUrl:app.globalData.hasUserInfo?app.globalData.userInfo.avatarUrl:''
                score:this.data.score,
                changeTimes:this.data.changetimes,
                changeTimesok:this.data.changetimesok
            };
            bubblesort_score.add({
                data:{
                    ...sortResult,
                    // 创建当前时间
                    // createDate:db.serverDate()
                    time:util.formatTime(new Date())
                }
            })   
        }

     // 页面卸载时候暂停播放（不加页面将一直播放）
        wx.getBackgroundAudioManager().stop();
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
            else if(Math.abs(beginIndex-endIndex)==0)
            {
                this.setData({
                    textarea: '和相邻的元素进行交换哦'
                })
            }
            else{
                this.setData({
                    textarea:'不能交换哦',
                    score:this.data.score-5,
                })
            }
            this.data.begin = data[beginIndex];
            this.data.end = data[endIndex]
            }
        }
        this.setData({
            hidden: true,
            flag: false

        })
        // 每移动卡牌数字一次就把次数加1
        this.data.changetimes+=1;
        // 把排序页面中的进入页面次数、成功交换卡牌数字次数、总共移动交换卡牌次数和获取的分数存入数据池
        // var developer = {
        //     mpt:this.data.maopaotimes,
        //     ctok:this.data.changetimesok,
        //     ct:this.data.changetimes,
        //     score:this.data.score,
        // }
        // 存入数据池函数
        // wx.setStorageSync('developer',developer);

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
    submit(){
        // let submit = 0 
        let sortResult = {
            // 从全局变量中获取用户信息
            nickName:app.globalData.hasUserInfo?app.globalData.userInfo.nickName:'',
            // avatarUrl:app.globalData.hasUserInfo?app.globalData.userInfo.avatarUrl:''
            score:this.data.score,
            changeTimes:this.data.changetimes,
            changeTimesok:this.data.changetimesok
        };
        wx.showModal({
         title: '提示',
         content: '确认要提交此次排序结果?',
         success: function (res) {
            // 用户点击确定
          if (res.confirm) {
            bubblesort_score.add({
                data:{
                    ...sortResult,
                    // 创建当前时间
                    // createDate:db.serverDate()
                    time:util.formatTime(new Date())
                }
            })
            wx.showToast({
            title: '提交成功',
            })
            submit = 1
            }
            else if (res.cancel) {
                console.log('用户点击取消')
            }
        }
    })
    },

    // checkMusic() {
    //     console.log(11)
    //     this.setData({
    //       checked: !this.data.checked
    //     })
    //     if (this.data.checked) {
    //       wx.getBackgroundAudioManager().pause();
    //     } else {
    //         // this.player();
    //       this.player(wx.getBackgroundAudioManager())
    //     }
    //   },
    //   player(e) {
    //     e.title = '游戏音乐'
    //     // e.src = "http://music.163.com/song/media/outer/url?id=36587407.mp3"
    //     e.src = " https://music.163.com/song/media/outer/url?id=529916247.mp3"
    //     //音乐播放结束后继续播放此音乐，循环不停的播放
    //     e.onEnded(() => {
    //       this.player(wx.getBackgroundAudioManager())
    //     })
    //   }
     
     
     

})

    