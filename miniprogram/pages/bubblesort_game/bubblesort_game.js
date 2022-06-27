// test/test.js
Page({

      /**
       * 页面的初始数据
       */
      data: {
        hidden:true,
        flag:false,
        x:0,
        y:0,
        data:[{index:1},
          { index: 2 },
          { index: 3 },
          { index: 4 },
          { index: 5 },
          { index: 6 },
          { index: 9 },
        ],
        disabled: true,
        elements:[]
      },
    // 产生随机数事件
    changeNumber:function(e){
        const list = this.data.elements;
        let rand = this.data.data
        // rand=[];
        for(var j=0;j<list.length;j++){
            const item = list[j];

            const index = item.dataset.index
            // var r=0;
            while(index==0){
            index=parseInt(Math.random() * 32);              
            }    //生成不为0的数                         
            index=(index/Math.pow(10,2)).toFixed(2).substr(2)  //控制生成数的形式为两位，在一位数的前面补“0”

            rand[j]=index;
            for (var i=0;i<j;i++){
            if (rand[i]==index){j=j-1;}
            }    //保证与之前生成的数不重复            
            // console.log(rand[i]);
        }
        this.setData({
            data:rand
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
      //触摸结束
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
            if(Math.abs(beginIndex-endIndex)<=1){
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
              data: data
            })
        }
          }
        }
        this.setData({
          hidden: true,
          flag: false
        })
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
      }
    })