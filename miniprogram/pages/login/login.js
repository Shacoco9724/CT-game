// pages/login/login.js
const util = require('../../utils/util.js')
const app = getApp();
Page({
    /**
     * 页面的初始数据
     */
    data: {
        // userInfo:{nickName:'点击登录'},
        hasUserInfo:false,
        islogin: false, //声明一个变量,默认为false,一旦登录成功,改为true
        nickname:'',
    },

    onChooseAvatar:function(e) {
      const { avatarUrl } = e.detail 
      this.setData({
        avatarUrl,
      })
    },

    getinput:function(e){
      if(e.detail.value){
        console.log(e)
        this.setData({
          nickname:e.detail.value,
          islogin:true,
        })
      }
    },
    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
     
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

    //点击登录后执行
  handleTapLogin:function(){
    if(this.data.islogin){
       return; //若已经登录,则直接返回,不会执行后面的语句
    }
    wx.getUserProfile({
      desc: '获取用户信息用于维护会员权益',
      lang:'zh_CN',
      success:(res)=>{
    //     // 在控制台显示
    //     // console.log('获取用户信息',res)
    //     // 获取当前登陆时间
        let time = util.formatTime(new Date());
    //     //将用户数据存入data,更新UI
        this.setData({
          islogin: true,//登录成功,改为true
    //         // 登陆成功后,在数据库中显示的users集合中的信息是userInfo
    //         // 这里可以更改userInfo的值
            userInfo: res.userInfo,
            hasUserInfo:true
        })
        // 把当前登录用户的信息保存到全局变量中
        app.globalData.userInfo = res.userInfo
        app.globalData.hasUserInfo = true
        console.log(app.globalData.userInfo)
        //去自己家数据库进行查询,看一下当前用户的最新数据
        this.login()
        // 在登陆后更新云数据库,每次登陆就增加一条记录
        let db = wx.cloud.database()
        // var userInfo = res.userInfo;
        db.collection("users").add({
          data:{
            // userInfo:res.userInfo
            userInfo:{
               _id: res.userInfo._id,
               nickName: res.userInfo.nickName,
                time:time
            }
          }
        })
    }
  })
  },
 
//   跳转到游戏选择页面
  skip(){
    //   检查是否是登陆状态
    // if(this.data.islogin){
    //     wx.navigateTo({
    //         url: '/pages/login/index'
    //       })
    //  }
    //  else{
         wx.showToast({
           title: '没有登陆，请先登录',
           icon:"none",
           duration:2000
         })
    //  }
  },
  //访问自己家数据库执行登录业务
  //1.若在users集合中找到用户信息,那么直接更新UI
  //2.若在users集合中没有找到用户信息,执行注册业务
  login(){
    let db = wx.cloud.database()   //获取数据库信息
    //users集合有权限设置,导致只能查到自己以前添加过得数据
    db.collection('users').get().then(res=>{
      //  console.log('查询当前用户',res)
      if(res.data.length==0){//没有查到用户
        this.regist() //调一个方法,去注册
      }else{//查到了用户
        // let userInfo = res.data[0] //拿到数据库里面的数据
          this.data.userInfo = res.userInfo
          this.data.hasUserInfo = true  //直接更新到data,这样页面就更新了
        }
      })
    //   登陆成功后才可以执行跳转页面，跳到游戏选择页面
      // this.skip()
  },
  //注册业务  将userInfo存入users集合
  regist(){
    let db = wx.cloud.database() //获取数据库信息
    db.collection('users').add({  //在users中添加数据
      data:this.data.userInfo,    //把userInfo中的新数据存入data
      success:(res)=>{
        // console.log('注册用户',res) //执行成功后打印
        //将_id存入 this.data.userInfo
        this.data.userInfo._id = res._id
      }
    })
  }
 

})