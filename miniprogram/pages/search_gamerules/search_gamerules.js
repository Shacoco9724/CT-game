const util = require('../../utils/util.js')
const app = getApp();
//连接云数据库
const db = wx.cloud.database();
//获取云数据库中数据集合的引用
const search_db = db.collection('search_db');
//数据库操作符
const _ = db.command;
Page({
        /** * 页面的初始数据 */
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
                }, {
                    id: 2,
                    number:Math.round(Math.random()*100),
                    showA: 'block',
                    showB: 'none',
                    card_b:'rgb(255, 246, 123)',
                }, {
                    id: 3,
                    number:Math.round(Math.random()*100),
                    showA: 'block',
                    showB: 'none',
    card_b:'rgb(255, 246, 123)',
                },  {
                    id: 4,
                    number:Math.round(Math.random()*100),
                    showA: 'block',
                    showB: 'none',
    card_b:'rgb(255, 246, 123)',
                }, {
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
                }, {
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
        this.setData({
            rand : this.data.newArr[a].number
        })
        this.sort();
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
                time:util.formatTime(new Date())
            }
            }) 
        }
    },
    onButtonTap: function(e) {
        var a = this;
        var newArr = a.data.newArr;
        switch (e.currentTarget.id) {
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
            }
        },
        sort(){
            var newArr = this.data.newArr;
            for(var i=0;i<17;i++)
            {       
                newArr[i].showA = 'block';
                newArr[i].showB = 'none';
                for(var j=i+1;j<18;j++)
                {
                    
                    if(newArr[i].number > newArr[j].number)
                    {
                        // console.log('hhhhh',newArr[i].number, newArr[j].number);
                        var t;
                        t = newArr[i].number;
                        newArr[i].number = newArr[j].number;
                        newArr[j].number = t;
                    }
                    newArr[j].showA = 'block';
                    newArr[j].showB = 'none';
                }
                
                this.setData({
                    newArr:newArr
                });
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
            for(var i=0;i<18;i++){}
            if(id==9 && (newArr[id-1].showA='block')){
                if(this.data.rand == newArr[id-1].number){
                    for(var i=0;i<18;i++){
                        newArr[i].showA = 'none';
                        newArr[i].showB = 'block';
                        newArr[id-1].card_b='rgb(255,255,255)';  }
                    wx.showToast({ title: '一下找到啦', }) }
                else if(this.data.rand > newArr[id-1].number){
                    for(var i=0;i<id;i++){
                        newArr[i].showA = 'none';
                        newArr[i].showB = 'block'  } }
                else if(this.data.rand < newArr[id-1].number){
                    for(var i=id-1;i<18;i++){
                        newArr[i].showA = 'none';
                        newArr[i].showB = 'block'; } }
                this.setData({ newArr:newArr,  })  }
            if(id != 9 && newArr[id-1].showA == 'block' && newArr[8].showA == 'none'){
                if(id>9){
                    if(id == 14){
                        if(this.data.rand == newArr[id-1].number){
                            for(var i=9;i<18;i++) {
                                newArr[i].showA = 'none';
                                newArr[i].showB = 'block';
                                newArr[id-1].card_b='rgb(255,255,255)'; }
                            wx.showToast({  title: '一下找到啦',  })  }
                        else if(this.data.rand > newArr[id-1].number){
                            for(var i=9;i<id;i++){
                                newArr[i].showA = 'none';
                                newArr[i].showB = 'block'    }  }
                        else if(this.data.rand < newArr[id-1].number){
                            for(var i=id-1;i<18;i++){
                                newArr[i].showA = 'none';
                                newArr[i].showB = 'block';  } }
                        this.setData({ newArr:newArr,}) }
                    if(id != 14 && newArr[id-1].showA == 'block' && newArr[13].showA == 'none'){
                        if(id>14){
                            if(id==16){
                                if(this.data.rand == newArr[id-1].number){
                                    for(var i=14;i<18;i++){
                                        newArr[i].showA = 'none';
                                        newArr[i].showB = 'block';
                                        newArr[id-1].card_b='rgb(255,255,255)'; }
                                    wx.showToast({ title: '一下找到啦', })  }
                                else if(this.data.rand > newArr[id-1].number){
                                    for(var i=14;i<id;i++) {
                                        newArr[i].showA = 'none';
                                        newArr[i].showB = 'block'  } }
                                else if(this.data.rand < newArr[id-1].number){
                                    for(var i=id-1;i<18;i++) {
                                        newArr[i].showA = 'none';
                                        newArr[i].showB = 'block'; } }
                                this.setData({ newArr:newArr, }) }
                            if(id != 16 && newArr[id-1].showA == 'block' && newArr[15].showA == 'none'){
                                if(id>16){
                                    if(id == 17){
                                        if(this.data.rand == newArr[id-1].number){
                                            newArr[id].showA = 'none';
                                            newArr[id].showB = 'block';
                                            newArr[id-1].showA = 'none';
                                            newArr[id-1].showB = 'block';
                                            newArr[id-1].card_b='rgb(255,255,255)';
                                            wx.showToast({  title: '一下找到啦',   }) }
                                        else if(this.data.rand > newArr[id-1].number){
                                            newArr[id-1].showA = 'none';
                                            newArr[id-1].showB = 'block'  }
                                        this.setData({   newArr:newArr,  })  }
                                    if(id != 17 && newArr[16].showA == 'none' && newArr[id-1].showA == 'block'){
                                        if(id==18){
                                            if(this.data.rand == newArr[id-1].number){
                                            newArr[id-1].showA = 'none';
                                            newArr[id-1].showB = 'block';
                                            newArr[id-1].card_b='rgb(255,255,255)';
                                            wx.showToast({ title: '一下找到啦',  })  }
                                            else{
                                                wx.showToast({title: '那就没有啦',  }) }
                                            this.setData({ newArr:newArr, })  } }
                                    if(newArr[id-1].showA == 'block' && newArr[16].showA == 'block'){
                                        wx.showToast({ title: '点击17的数字哦', }) } }
                                if(id<16){
                                    if(id == 15){
                                        if(this.data.rand == newArr[id-1].number){
                                            newArr[id-1].showA = 'none';
                                            newArr[id-1].showB = 'block';
                                            newArr[id-1].card_b='rgb(255,255,255)';
                                            wx.showToast({  title: '一下找到啦', }) }
                                        else{
                                            wx.showToast({ title: '那就没有啦', }) }
                                        this.setData({ newArr:newArr,  }) }} }
                            if(newArr[id-1].showA == 'block' && newArr[15].showA == 'block'){
                                wx.showToast({  title: '点击15-18中间的数字哦', }) }}
                        if(id<14){
                            if(id == 11){
                                if(this.data.rand == newArr[id-1].number){
                                    for(var i=0;i<18;i++) {
                                        newArr[i].showA = 'none';
                                        newArr[i].showB = 'block';
                                        newArr[id-1].card_b='rgb(255,255,255)'; }
                                    wx.showToast({ title: '一下找到啦', })  }
                                else if(this.data.rand > newArr[id-1].number){
                                    for(var i=9;i<id;i++) {
                                        newArr[i].showA = 'none';
                                        newArr[i].showB = 'block'  } }
                                else if(this.data.rand < newArr[id-1].number){
                                    for(var i=id-1;i<13;i++) {
                                        newArr[i].showA = 'none';
                                        newArr[i].showB = 'block';  } }
                                this.setData({ newArr:newArr, }) }
                            if(id != 11 && newArr[id-1].showA == 'block' && newArr[10].showA == 'none'){
                                if(id>11){
                                    if(id == 12){
                                        if(this.data.rand == newArr[id-1].number){
                                            for(var i=0;i<18;i++){
                                                newArr[i].showA = 'none';
                                                newArr[i].showB = 'block';
                                                newArr[id-1].card_b='rgb(255,255,255)';  }
                                            wx.showToast({ title: '一下找到啦', }) }
                                        else if(this.data.rand > newArr[id-1].number){
                                                newArr[id-1].showA = 'none';
                                                newArr[id-1].showB = 'block' }
                                        this.setData({  newArr:newArr, }) }
                                    if(id != 12 && newArr[id-1].showA == 'block' && newArr[11].showA == 'none'){
                                        if(id==13){
                                            if(this.data.rand == newArr[id-1].number){
                                                for(var i=0;i<18;i++){
                                                    newArr[i].showA = 'none';
                                                    newArr[i].showB = 'block';
                                                    newArr[id-1].card_b='rgb(255,255,255)'; }
                                                wx.showToast({ title: '一下找到啦', }) }
                                            else{
                                                wx.showToast({ title: '那就没有啦', }) }
                                            this.setData({newArr:newArr,}) } }
                                    if(newArr[id-1].showA == 'block' && newArr[11].showA == 'block'){
                                        wx.showToast({ title: '点击12的数字哦', }) } }
                                if(id<11){
                                    if(id == 10){
                                        if(this.data.rand == newArr[id-1].number){
                                            for(var i=0;i<18;i++){
                                                newArr[i].showA = 'none';
                                                newArr[i].showB = 'block';
                                                newArr[id-1].card_b='rgb(255,255,255)'; }
                                            wx.showToast({ title: '一下找到啦', })  }
                                        else{
                                            wx.showToast({ title: '那就没有啦',  }) }
                                        this.setData({ newArr:newArr, })} } }
                            if(newArr[id-1].showA == 'block' && newArr[10].showA == 'block'){
                                wx.showToast({ title: '点击10-13中间的数字哦', }) } } }
                    if(newArr[id-1].showA == 'block' && newArr[13].showA == 'block'){
                        wx.showToast({ title: '点击9-18中间的数字哦',  }) } }
                if(id<9){
                    if(id==4){
                        if(this.data.rand == newArr[id-1].number){
                            for(var i=0;i<18;i++){
                                newArr[i].showA = 'none';
                                newArr[i].showB = 'block';
                                newArr[id-1].card_b='rgb(255,255,255)'; }
                            wx.showToast({  title: '一下找到啦',  }) }
                        else if(this.data.rand > newArr[id-1].number){
                            for(var i=0;i<id;i++){
                                newArr[i].showA = 'none';
                                newArr[i].showB = 'block'  }   }
                        else if(this.data.rand < newArr[id-1].number){
                            for(var i=id-1;i<9;i++) {
                                newArr[i].showA = 'none';
                                newArr[i].showB = 'block'; }  }
                        this.setData({newArr:newArr, }) }
                    if(id != 4 && newArr[id-1].showA == 'block' && newArr[3].showA == 'none'){
                        if(id<4){
                            if(id==2){
                                if(this.data.rand == newArr[id-1].number){
                                    for(var i=0;i<18;i++){
                                        newArr[i].showA = 'none';
                                        newArr[i].showB = 'block';
                                        newArr[id-1].card_b='rgb(255,255,255)';}
                                    wx.showToast({  title: '一下找到啦', }) }
                                else if(this.data.rand > newArr[id-1].number){
                                    for(var i=0;i<id;i++) {
                                        newArr[i].showA = 'none';
                                        newArr[i].showB = 'block'} }
                                else if(this.data.rand < newArr[id-1].number){
                                    for(var i=id-1;i<4;i++){
                                        newArr[i].showA = 'none';
                                        newArr[i].showB = 'block';  } }
                                this.setData({ newArr:newArr, })  }
                            if(id !=2 && newArr[1].showA == 'none' && newArr[id-1].showA == 'block'){
                                if(id>2){
                                    if(id == 3){
                                        if(this.data.rand == newArr[id-1].number){
                                            for(var i=0;i<18;i++){
                                                newArr[i].showA = 'none';
                                                newArr[i].showB = 'block';
                                                newArr[id-1].card_b='rgb(255,255,255)'; }
                                            wx.showToast({ title: '一下找到啦', }) }
                                        else{
                                            wx.showToast({ title: '那就没有啦',  }) }
                                        this.setData({ newArr:newArr,  })   }
                                    else{
                                        wx.showToast({title: '点击3的数字哦',  })  }}
                                if(id<2){
                                    if(id == 1){
                                        if(this.data.rand == newArr[id-1].number){
                                            for(var i=0;i<18;i++) {
                                                newArr[i].showA = 'none';
                                                newArr[i].showB = 'block';
                                                newArr[id-1].card_b='rgb(255,255,255)'; }
                                            wx.showToast({ title: '一下找到啦', }) }
                                        else{
                                            wx.showToast({ title: '那就没有啦',})  }
                                        this.setData({ newArr:newArr, })  }
                                    else{
                                        wx.showToast({title: '点击数字1哦' }) } } }
                            if(newArr[id-1].showA == 'block' && newArr[1].showA == 'block'){
                                wx.showToast({ title: '点击1-3中间的数字哦', }) } }
                        if(id>4){
                            if(id==6){
                                if(this.data.rand == newArr[id-1].number){
                                    for(var i=0;i<18;i++){
                                        newArr[i].showA = 'block';
                                        newArr[i].showB = 'none';
                                        newArr[id-1].card_b='rgb(255,255,255)'; }
                                    wx.showToast({ title: '一下找到啦',  })  }
                                else if(this.data.rand > newArr[id-1].number){
                                    for(var i=4;i<id;i++){
                                        newArr[i].showA = 'none';
                                        newArr[i].showB = 'block' } }
                                else if(this.data.rand < newArr[id-1].number){
                                    for(var i=id-1;i<8;i++){
                                        newArr[i].showA = 'none';
                                        newArr[i].showB = 'block'; }}
                                this.setData({ newArr:newArr,}) }
                            if(id != 6 && newArr[id-1].showA == 'block' && newArr[5].showA == 'none'){
                                if(id>6){
                                    if(id==7){
                                        if(this.data.rand == newArr[id-1].number){
                                            for(var i=0;i<18;i++){
                                                newArr[i].showA = 'none';
                                                newArr[i].showB = 'block';
                                                newArr[id-1].card_b='rgb(255,255,255)'; }
                                            wx.showToast({  title: '一下找到啦', }) }
                                        else if(this.data.rand > newArr[id-1].number){
                                            for(var i=0;i<id;i++){
                                                newArr[i].showA = 'none';
                                                newArr[i].showB = 'block'  } }
                                        this.setData({  newArr:newArr, })}
                                    if(id!=7 && newArr[6].showA == 'none'){
                                        if(id==8){
                                            if(this.data.rand == newArr[id-1].number){
                                                for(var i=0;i<18;i++) {
                                                    newArr[i].showA = 'none';
                                                    newArr[i].showB = 'block';
                                                    newArr[id-1].card_b='rgb(255,255,255)'; }
                                                wx.showToast({title: '一下找到啦',  }) }
                                            else{
                                                wx.showToast({ title: '那就没有啦', }) }
                                            this.setData({ newArr:newArr, })} }
                                    else if(newArr[id-1].showA == 'block' && newArr[6].showA == 'block'){
                                        wx.showToast({ title: '点击7的数字哦', }) }}
                                if(id<6){
                                    if(id==5){
                                        if(this.data.rand == newArr[id-1].number){
                                            for(var i=0;i<18;i++){
                                                newArr[i].showA = 'none';
                                                newArr[i].showB = 'block';
                                                newArr[id-1].card_b='rgb(255,255,255)'; }
                                            wx.showToast({  title: '一下找到啦',  }) }
                                        else{
                                            wx.showToast({title: '那就没有啦', })}
                                        this.setData({ newArr:newArr, }) }
                                    else{
                                        wx.showToast({ title: '点击5的数字哦',}) }  }}
                            if(newArr[id-1].showA == 'block' && newArr[5].showA == 'block'){
                                wx.showToast({ title: '点击5-8中间的数字哦',  })  } } }
                    if(newArr[id-1].showA == 'block' && newArr[3].showA == 'block'){
                        wx.showToast({  title: '点击1-9中间的数字哦', })  } }}
            if(newArr[id-1].showA == 'block' && newArr[8].showA == 'block'){
                wx.showToast({ title: '点击1-18中间的数字哦',}) }
        },
    })