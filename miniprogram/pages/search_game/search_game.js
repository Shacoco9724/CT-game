const util = require('../../utils/util.js')
const app = getApp();
//连接云数据库
const db = wx.cloud.database();
//获取云数据库中数据集合的引用
const search_db = db.collection('search_db');
//数据库操作符
const _ = db.command;
Page({
        /**
         * 页面的初始数据
         */
        data: {
            isWin:0,
            search_times:0,
            search_timesok:0,
            newArr: [{
                    id: 1,
                    number:Math.round(Math.random()*100),
                    showA: 'block',
                    showB: 'none',
                    card_b:'rgb(255, 246, 123)',
                },
                {
                    id: 2,
                    number:Math.round(Math.random()*100),
                    showA: 'block',
                    showB: 'none',
                    card_b:'rgb(255, 246, 123)',
                },
                {
                    id: 3,
                    number:Math.round(Math.random()*100),
                    showA: 'block',
                    showB: 'none',
    card_b:'rgb(255, 246, 123)',
                }, 
                {
                    id: 4,
                    number:Math.round(Math.random()*100),
                    showA: 'block',
                    showB: 'none',
    card_b:'rgb(255, 246, 123)',
                },
                {
                    id: 5,
                    number:Math.round(Math.random()*100),
                    showA: 'block',
                    showB: 'none',
        card_b:'rgb(255, 246, 123)',
                },{
                    id: 6,
                    number:Math.round(Math.random()*100),
                    showA: 'block',
                    showB: 'none',
    card_b:'rgb(255, 246, 123)',
                },{
                    id: 7,
                    number:Math.round(Math.random()*100),
                    showA: 'block',
                    showB: 'none',
    card_b:'rgb(255, 246, 123)',
                },
                {
                    id: 8,
                    number:Math.round(Math.random()*100),
                    showA: 'block',
                    showB: 'none',
    card_b:'rgb(255, 246, 123)',
                },{
                    id: 9,
                    number:Math.round(Math.random()*100),
                    showA: 'block',
                    showB: 'none',
    card_b:'rgb(255, 246, 123)',
                },{
                    id: 10,
                    number:Math.round(Math.random()*100),
                    showA: 'block',
                    showB: 'none',
    card_b:'rgb(255, 246, 123)',
                },{
                    id: 11,
                    number:Math.round(Math.random()*100),
                    showA: 'block',
                    showB: 'none',
    card_b:'rgb(255, 246, 123)',
                },{
                    id: 12,
                    number:Math.round(Math.random()*100),
                    showA: 'block',
                    showB: 'none',
    card_b:'rgb(255, 246, 123)',
                },{
                    id: 13,
                    number:Math.round(Math.random()*100),
                    showA: 'block',
                    showB: 'none',
    card_b:'rgb(255, 246, 123)',
                },{
                    id: 14,
                    number:Math.round(Math.random()*100),
                    showA: 'block',
                    showB: 'none',
    card_b:'rgb(255, 246, 123)',
                },{
                    id: 15,
                    number:Math.round(Math.random()*100),
                    showA: 'block',
                    showB: 'none',
    card_b:'rgb(255, 246, 123)',
                },{
                    id: 16,
                    number:Math.round(Math.random()*100),
                    showA: 'block',
                    showB: 'none',
    card_b:'rgb(255, 246, 123)',
                },{
                    id: 17,
                    number:Math.round(Math.random()*100),
                    showA: 'block',
                    showB: 'none',
    card_b:'rgb(255, 246, 123)',
                },{
                    id: 18,
                    number:Math.round(Math.random()*100),
                    showA: 'block',
                    showB: 'none',
    card_b:'rgb(255, 246, 123)',
                },
            ],
            firstClickId: 0,
            rand:0,
        },
    onLoad: function (options) {
        var a = Math.floor(Math.random()*17);
        console.log(a);
        this.setData({
            rand : this.data.newArr[a].number
        })
        // this.data.rand = this.data.newArr[a].number;
        // console.log(rand)
    },
// 在退出冒泡排序页面后的数据就是在这个监听页面卸载执行
  onUnload: function () {
    if(this.data.search_times!=0&&this.data.search_times!=this.data.search_timesok)
    {
        let searchResult = {
            // 从全局变量中获取用户信息
            nickName:app.globalData.hasUserInfo?app.globalData.userInfo.nickName:'',
            // avatarUrl:app.globalData.hasUserInfo?app.globalData.userInfo.avatarUrl:''
            search_times:this.data.search_times,
            search_timesok:this.data.search_timesok,
        };
        search_db.add({
            data:{
                ...searchResult,
                // 创建当前时间
                // createDate:db.serverDate()
                time:util.formatTime(new Date())
            }
        }) 
    }
    },
    onButtonTap: function(e) {
        var a = this;
        var newArr = a.data.newArr;
        switch (e.currentTarget.id) {
        //   case "btnHelp":
        //     var r = "以最快速度从 1 选到 " + a.data.level * a.data.level;
        //     wx.showModal({
        //         title: "帮助",
        //         content: r,
        //         showCancel: !1
        //     });
        //     break;

          case "btnOk":
           for(var i=0;i<18;i++)
           {
                newArr[i].number = Math.round(Math.random()*100);
                newArr[i].showA = 'block';
                newArr[i].showB = 'none';
                newArr[i].card_b='rgb(255, 246, 123)';
           };
           this.setData({
               isWin:0,
               newArr:newArr
           });
           a.onLoad();
            break;

          case "btnBack":
            1 < getCurrentPages().length ? wx.navigateBack({}) : wx.redirectTo({
                url: "../index/index.wxml"
            });
            break;

        //   case "item":
        //     var n = e.currentTarget.dataset.number;
        //     n == t && (n == a.data.level * a.data.level ? (this.setData({
        //         currentNumber: n
        //     }), a.endGame()) : (t = n + 1, this.setData({
        //         currentNumber: n
        //     })));
        }
    },



        //点击切换卡片
        change: function(e) {
            this.data.search_times++;
            var id = e.currentTarget.dataset.id;
            this.data.firstClickId = id;
            var newArr = this.data.newArr;
            //得到当前的卡片
            var currentData = newArr[id - 1];
    // 点击第一个数字时
            if(id == 1)
            {
                // this.data.search_times++;
                // 恰好第一个数字就是要找的
                if(this.data.rand == currentData.number)
                {
                    // 把数字背景更换
                    currentData.showA = 'none';
                    currentData.showB = 'block';
                    newArr[id - 1] = currentData;
                    // 并换成找到的颜色
                    newArr[id - 1].card_b='rgb(255, 46, 46)'
                    // 更新数据，表明找到
                    this.setData({
                        isWin:1,
                        newArr: newArr,
                        search_timesok:1
                    })
                    wx.showToast({
                      title: 'bingo!',
                    })
                    // 找到之后其他数字不变颜色
                    // for(var i = id;i<=18;i++)
                    // {
                    //     newArr[i].showA = 'block';
                    //     newArr[i].showB = 'none';
                    // }
                    // this.setData({
                    //      newArr: newArr
                    // })
                     // 查找次数就是id的值
                // this.data.search_times = id;
                let searchResult = {
                    // 从全局变量中获取用户信息
                    nickName:app.globalData.hasUserInfo?app.globalData.userInfo.nickName:'',
                    // avatarUrl:app.globalData.hasUserInfo?app.globalData.userInfo.avatarUrl:''
                    search_times:this.data.search_times,
                    search_timesok:this.data.search_timesok,
                };
                search_db.add({
                    data:{
                        ...searchResult,
                        // 创建当前时间
                        // createDate:db.serverDate()
                        time:util.formatTime(new Date())
                    }
                }) 
                }
                else{
                    // 如果第一个不是要找的，换数字背景（并不是找到的背景颜色）
                    currentData.showA = 'none';
                    currentData.showB = 'block';
                    newArr[id - 1] = currentData;
                    this.setData({
                        newArr: newArr
                    })
                }
                
            }
            // 如果不在第一个数字中查找，点击其他的数字
            else if(id>1 && id<=18 && newArr[id-2].showA == 'none' && currentData.showA == 'block'){
    //         if (currentData.showA == 'block') {
                // 找到了数字
                // this.data.search_times++;
                if(this.data.rand == currentData.number)
                {
                    currentData.showA = 'none';
                    currentData.showB = 'block';
                    newArr[id - 1] = currentData;
                    newArr[id - 1].card_b='rgb(255, 46, 46)'
                    this.setData({
                         isWin:1,
                        newArr: newArr,
                       search_timesok:id
                    })
                    wx.showToast({
                      title: 'bingo!',
                    })
                    // 找到之后把其他数字不变颜色
                //     for(var i = id;i<=18;i++)
                //     {
                //         newArr[i].showA = 'block';
                //         newArr[i].showB = 'none';
                //     }
                //     this.setData({
                //        newArr: newArr
                //    })
                    console.log('hello'); 
// 查找次数就是id的值
                // this.data.search_times = id;
                let searchResult = {
                    // 从全局变量中获取用户信息
                    nickName:app.globalData.hasUserInfo?app.globalData.userInfo.nickName:'',
                    // avatarUrl:app.globalData.hasUserInfo?app.globalData.userInfo.avatarUrl:''
                    search_times:this.data.search_times,
                    search_timesok:this.data.search_timesok,
                };
                search_db.add({
                    data:{
                        ...searchResult,
                        // 创建当前时间
                        // createDate:db.serverDate()
                        time:util.formatTime(new Date())
                    }
                }) 


                }
                // 没找到
                else{
                    currentData.showA = 'none';
                    currentData.showB = 'block';
                    newArr[id - 1] = currentData;
                    this.setData({
                         newArr: newArr
                    })
                }
                
            } 
            else{
                // this.data.search_times++;
                if(this.data.isWin == 1){
                    wx.showToast({
                        title: '已经赢啦',
                    })
                }
                else{
                    wx.showToast({
                      title: '顺序点击查找哦',
                    })
            }
        }

        

    },
   
    })