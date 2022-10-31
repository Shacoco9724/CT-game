//获取应用实例
const app = getApp()

// 连接云数据库
const db = wx.cloud.database();
// 获取集合的引用
const bubblesort_score = db.collection('bubblesort_score');
const search_db = db.collection('search_db');
const binarysearch_db = db.collection('binarysearch_db');
const hanoi_db = db.collection('hanoi_db');
// 数据库操作符
const _ = db.command;

Page({
  data: {
    scrollTop:0,
    currentType:3,
    rankList1: [],
    rankList2:[],
    rankList3:[],
    rankList4:[]
  },
  
  onLoad() {
    this.getRankList(this.data.currentType);
  },

  getRankList:function(r) {
    // var r = e.currentTarget.dataset.type;
    // 显示 loading 提示框
    wx.showLoading({
      title: '拼命加载中'
    });
    if(r==3){
      bubblesort_score.where({       //类似于where，对记录进行筛选
        _openid: _.exists(true)
      })
      .orderBy('timecount', 'desc')
      .get()
      .then(res => {
        // 获取集合数据，或获取根据查询条件筛选后的集合数据。
        console.log('[冒泡排序云数据库] [排行榜] 查询成功')
         console.log(res.data)
        let data = res.data || [];
        
          // for(var i=0;i<data.length;i++){                  
          //   for(var j=0;j<=i;j++){
          //     if(data[j].nickName==data[i].nickName){
          //       if(data[j].score<=data[i].score){
          //         data[j] = data[i];
          //         // data.splice(i,1);
          //       }
          //     }
          //   }
          //   // console.log(data[i].nickName);
          // }
        // 将数据从逻辑层发送到视图层，通俗的说，也就是更新数据到页面展示
        this.setData({
          rankList1:data,
        });
  
        // 隐藏 loading 提示框
        wx.hideLoading();
      })
    }
    if(r==4){
      search_db.where({       //类似于where，对记录进行筛选
        _openid: _.exists(true)
      })
      .orderBy('score', 'desc')
      .get()
      .then(res => {
        // 获取集合数据，或获取根据查询条件筛选后的集合数据。
        console.log('[顺序查找云数据库] [排行榜] 查询成功')
         console.log(res.data)
        let data = res.data || [];
        
          // for(var i=0;i<data.length;i++){                  
          //   for(var j=0;j<=i;j++){
          //     if(data[j].nickName==data[i].nickName){
          //       if(data[j].score<=data[i].score){
          //         data[j] = data[i];
          //         // data.splice(i,1);
                
          //       }
          //     }
          //   }
          //   // console.log(data[i].nickName);
          // }
        // 将数据从逻辑层发送到视图层，通俗的说，也就是更新数据到页面展示
        this.setData({
          rankList2:data,
        });
  
        // 隐藏 loading 提示框
        wx.hideLoading();
      })
    }
    // 数据库集合的聚合操作实例
    if(r==5){
      hanoi_db.where({       //类似于where，对记录进行筛选
        _openid: _.exists(true)
      })
      .orderBy('count', 'desc') 
      .get()
      .then(res => {
        // 获取集合数据，或获取根据查询条件筛选后的集合数据。
        console.log('[汉诺塔云数据库] [排行榜] 查询成功')
         console.log(res.data)
        let data = res.data || [];
        
          // for(var i=0;i<data.length;i++){                  
          //   for(var j=0;j<=i;j++){
          //     if(data[j].nickName==data[i].nickName){
          //       if(data[j].score<=data[i].score){
          //         data[j] = data[i];
          //         // data.splice(i,1);
                
          //       }
          //     }
          //   }
          //   // console.log(data[i].nickName);
          // }
        // 将数据从逻辑层发送到视图层，通俗的说，也就是更新数据到页面展示
        this.setData({
          rankList3:data,
        });
  
        // 隐藏 loading 提示框
        wx.hideLoading();
      })
    }
    if(r==6){
      binarysearch_db.where({       //类似于where，对记录进行筛选
        _openid: _.exists(true)
      })
      .orderBy('restcount', 'desc')
      .get()
      .then(res => {
        // 获取集合数据，或获取根据查询条件筛选后的集合数据。
        console.log('[二分查找云数据库] [排行榜] 查询成功')
         console.log(res.data)
        let data = res.data || [];
        
          // for(var i=0;i<data.length;i++){                  
          //   for(var j=0;j<=i;j++){
          //     if(data[j].nickName==data[i].nickName){
          //       if(data[j].score<=data[i].score){
          //         data[j] = data[i];
          //         // data.splice(i,1);
                
          //       }
          //     }
          //   }
          //   // console.log(data[i].nickName);
          // }
        // 将数据从逻辑层发送到视图层，通俗的说，也就是更新数据到页面展示
        this.setData({
          rankList4:data,
        });
  
        // 隐藏 loading 提示框
        wx.hideLoading();
      })
    }
  },

  onButtonTap:function(e){
    var t = this;
    var r = e.currentTarget.dataset.type;
    t.setData({
       currentType: r
     })
     console.log('type',r)
     this.getRankList(r);
  },
  // 监听页面滚动
  onPageScroll:function(e){
    this.setData({
      scrollTop:e.scrollTop
    })
  },
})
