// components/mybutton/index.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    round: { //声明自定义属性round,定义圆角,默认为false
      type: Boolean,
      value: false
    },
    color: {//声明自定义属性color,定义背景色
      type: String,
      value: 'crimson'
    },
    title: { //声明自定义属性title
      type: String,
      value: '默认按钮'
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
    last: 0 //保存上次点击按钮的时间毫秒数
  },

  /**
   * 组件的方法列表
   */
  methods: {
    handleTap(){//单击button时触发
      let now = new Date().getTime()//当前时间毫秒数
      let last = this.data.last
      if(now-last < 350){//达到了双击的条件
        //需要主动触发父组件的doubletap事件,通知父组件
        this.triggerEvent("doubletap")
      this.data.last = 0
      } else {
      this.data.last = now 
      }
    }
  }
})
