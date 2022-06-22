// index.js
 
Page({
    data: {
    
    },
    initial:function(){
      this.setData({
        // Math.round取整
        //Math.random()取随机数只是0-1之间的小数 所以在此我们*100取0-100之间随机数
        answer:Math.round(Math.random()*100),
        // 回合数
        count:0,
        // 提示语句
        tip:'',
        // 用户猜的数字
        x:-1,
        // 游戏已经开始
        isGameStart:true
      });
      //控制台打印出来系统随机数答案
      console.log("答案是"+this.data.answer);
    },
    // 获取用户输入的数字
    getNumber:function(e){
      this.setData({
        x : e.detail.value
      });
    },
    // 本回合开始猜数字
    guess:function(){
      // 获取用户本回合填写的数字
      let x = this.data.x;
      // 重置x为未获得新数字状态
      this.setData({x:-1});
      if(x<0){
        // 提示语
        wx.showToast({
          title: '不能小于0',
        });
      }else if(x>100){
        wx.showToast({
          title:'不能大于100',
        });
      }else{
        // 回合数增加
        let count = this.data.count + 1;
        // 获取当前提示信息
        let tip = this.data.tip;
        // 获取正确答案
        let answer = this.data.answer;
   
        if(x == answer){
          tip += '\n第' + count +'回合:' + x +',猜对了!';
          // 游戏结束
          this.setData({isGameStart:false});
        }else if(x > answer){
          tip += '\n第' + count +'回合:' + x +',大了!';
        }else{
          tip += '\n第' + count +'回合:' + x +',小了!';
        }
          //count回合数，这里我设置的是用户只能猜5次
        if(count == 5){
          tip += '\n游戏结束';
          this.setData({isGameStart:false});
        }
        // 更新提示语句和回合数
        this.setData({
          tip:tip,
          count:count
        });
      }
    },
    // 游戏重新开始
    restartGame:function(){
      this.initial();
    },
    //options(Object)
    onLoad: function(options) {
      this.initial();
    }
})